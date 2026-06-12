import { sanityClient, urlFor } from "./sanity";
import type { Post, Destination, PostBlock } from "@/content/types";
import { posts as localPosts } from "@/content/posts";
import { destinations as localDestinations } from "@/content/destinations";

// --- Sanity result types (loose) ---
interface SanityImage { _type?: string; asset?: { _ref?: string } }
interface SanityPortableBlock {
  _type: string;
  _key?: string;
  style?: string;
  listItem?: string;
  children?: { text?: string }[];
  caption?: string;
  asset?: SanityImage["asset"];
  // custom block fields
  tone?: "tip" | "warn" | "note";
  title?: string;
  text?: string;
  pros?: string[];
  cons?: string[];
  day?: number;
  items?: (string | { q?: string; a?: string })[];
  rows?: { label?: string; amount?: string }[];
  total?: string;
}
interface SanityPost {
  _id: string;
  title: string;
  slug?: { current?: string };
  excerpt?: string;
  coverImage?: SanityImage;
  publishedAt?: string;
  readingMinutes?: number;
  tags?: string[];
  destination?: { name?: string; region?: string };
  body?: SanityPortableBlock[];
}
interface SanityDestination {
  _id: string;
  name: string;
  slug?: { current?: string };
  country?: string;
  region?: string;
  summary?: string;
  bestTime?: string;
  currency?: string;
  heroImage?: SanityImage;
  guidesNote?: string;
  visited?: boolean;
}

const POST_PROJECTION = `{
  _id, title, slug, excerpt, coverImage, publishedAt, readingMinutes, tags,
  "destination": destination->{name, region},
  body
}`;

const DEST_PROJECTION = `{
  _id, name, slug, country, region, summary, bestTime, currency, heroImage, guidesNote, visited
}`;

// --- Mappers ---
type SanityImageSource = Parameters<typeof urlFor>[0];
// Hotspot-aware crop. fit("crop") respects the hotspot set in Sanity Studio
// so the focal subject (e.g. Notre-Dame's facade) survives the crop.
function imgUrl(src?: SanityImage, w = 1600, h = 1067): string | null {
  if (!src?.asset?._ref) return null;
  try {
    return urlFor(src as SanityImageSource)
      .width(w).height(h).fit("crop").auto("format").quality(85).url();
  } catch { return null; }
}
// Uncropped variant — preserves natural ratio. Use for in-body images.
function imgUrlMax(src?: SanityImage, w = 1600): string | null {
  if (!src?.asset?._ref) return null;
  try {
    return urlFor(src as SanityImageSource)
      .width(w).fit("max").auto("format").quality(85).url();
  } catch { return null; }
}

// h3 titles that should turn the following paragraph into a callout box
const CALLOUT_TITLES = /^(insider tip|tip|pro tip|note|heads? up|warning|watch out|important|good to know)\b/i;
const DAY_HEADING = /^day\s+(\d+)\s*(?:[:\-–—.)]\s*|\s+)(.*)$/i;
const PROS_TITLES = /^(worth it|pros|do this|highlights|the good)\b/i;
const CONS_TITLES = /^(skip|cons|don'?t bother|avoid|the bad|what we'?d skip)\b/i;
const BUDGET_TITLES = /^(budget|cost breakdown|costs?|what it cost|spend(ing)?)\b/i;
const BUDGET_ROW = /^(.+?)\s*[—–\-:]\s*([^\s].*)$/;
const FAQ_TITLES = /^(faq|frequently asked|questions?|q\s*&\s*a)\b/i;

interface NormalBlock { _type: "block"; style?: string; listItem?: string; children?: { text?: string }[] }

function readBullets(pt: SanityPortableBlock[], start: number): { items: string[]; next: number } {
  const items: string[] = [];
  let j = start;
  while (j < pt.length && (pt[j] as NormalBlock).listItem === "bullet") {
    items.push(((pt[j] as NormalBlock).children || []).map((c) => c.text || "").join(""));
    j++;
  }
  return { items, next: j };
}

function portableToBlocks(pt?: SanityPortableBlock[]): PostBlock[] {
  if (!pt) return [];
  const out: PostBlock[] = [];
  let i = 0;
  // collect adjacent bullet items into a single list
  const flushList = (items: string[]) => { if (items.length) out.push({ type: "list", items }); };
  while (i < pt.length) {
    const b = pt[i];
    if (b._type === "block") {
      const nb = b as NormalBlock;
      const text = (nb.children || []).map((c) => c.text || "").join("");
      if (!text.trim()) { i++; continue; }
      // bullet list run
      if (nb.listItem === "bullet") {
        const { items, next } = readBullets(pt, i);
        flushList(items);
        i = next;
        continue;
      }
      // callout: h3 with known title + next normal paragraph
      if (nb.style === "h3" && CALLOUT_TITLES.test(text.trim())) {
        const next = pt[i + 1] as NormalBlock | undefined;
        if (next && next._type === "block" && (!next.style || next.style === "normal") && !next.listItem) {
          const body = (next.children || []).map((c) => c.text || "").join("");
          if (body.trim()) {
            out.push({ type: "callout", title: text.trim(), text: body });
            i += 2;
            continue;
          }
        }
      }
      // itinerary: heading "Day N: title" followed by bullets
      if ((nb.style === "h2" || nb.style === "h3") && DAY_HEADING.test(text.trim())) {
        const m = text.trim().match(DAY_HEADING)!;
        const after = pt[i + 1] as NormalBlock | undefined;
        if (after && after._type === "block" && after.listItem === "bullet") {
          const { items, next } = readBullets(pt, i + 1);
          out.push({ type: "itinerary", day: Number(m[1]), title: m[2] || "", items });
          i = next;
          continue;
        }
      }
      // proscons: h3 "Worth it/Pros" + bullets, then h3 "Skip/Cons" + bullets
      if (nb.style === "h3" && PROS_TITLES.test(text.trim())) {
        const prosBullets = pt[i + 1] as NormalBlock | undefined;
        if (prosBullets && prosBullets._type === "block" && prosBullets.listItem === "bullet") {
          const { items: pros, next: afterPros } = readBullets(pt, i + 1);
          const consBlock = pt[afterPros] as NormalBlock | undefined;
          if (consBlock && consBlock._type === "block" && consBlock.style === "h3") {
            const consTitle = (consBlock.children || []).map((c) => c.text || "").join("").trim();
            const consList = pt[afterPros + 1] as NormalBlock | undefined;
            if (CONS_TITLES.test(consTitle) && consList && consList.listItem === "bullet") {
              const { items: cons, next: afterCons } = readBullets(pt, afterPros + 1);
              out.push({ type: "proscons", pros, cons });
              i = afterCons;
              continue;
            }
          }
        }
      }
      // budget: heading "Budget…" followed by bullets like "Label — $123"
      if ((nb.style === "h2" || nb.style === "h3") && BUDGET_TITLES.test(text.trim())) {
        const after = pt[i + 1] as NormalBlock | undefined;
        if (after && after.listItem === "bullet") {
          const { items, next } = readBullets(pt, i + 1);
          const rows: { label: string; amount: string }[] = [];
          let total: string | undefined;
          for (const it of items) {
            const m = it.match(BUDGET_ROW);
            if (!m) { rows.length = 0; break; }
            const label = m[1].trim();
            const amount = m[2].trim();
            if (/^total\b/i.test(label)) total = amount;
            else rows.push({ label, amount });
          }
          if (rows.length) {
            out.push({ type: "budget", rows, total });
            i = next;
            continue;
          }
        }
      }
      // faq: heading "FAQ/Questions" followed by alternating h3 question + paragraph
      if ((nb.style === "h2" || nb.style === "h3") && FAQ_TITLES.test(text.trim())) {
        const items: { q: string; a: string }[] = [];
        let j = i + 1;
        while (j < pt.length) {
          const qb = pt[j] as NormalBlock;
          if (!qb || qb._type !== "block" || qb.style !== "h3") break;
          const q = (qb.children || []).map((c) => c.text || "").join("").trim();
          const ab = pt[j + 1] as NormalBlock | undefined;
          if (!ab || ab._type !== "block" || ab.listItem || (ab.style && ab.style !== "normal")) break;
          const a = (ab.children || []).map((c) => c.text || "").join("").trim();
          if (!q || !a) break;
          items.push({ q, a });
          j += 2;
        }
        if (items.length) {
          out.push({ type: "faq", items });
          i = j;
          continue;
        }
      }
      if (nb.style === "h2") out.push({ type: "h2", text });
      else if (nb.style === "h3") out.push({ type: "h3", text });
      else if (nb.style === "blockquote") out.push({ type: "quote", text });
      else out.push({ type: "p", text });
      i++;
    } else if (b._type === "image") {
      const src = imgUrlMax(b as unknown as SanityImage, 1600);
      if (src) out.push({ type: "image", src, caption: b.caption });
      i++;
    } else if (b._type === "callout") {
      out.push({ type: "callout", tone: b.tone, title: b.title, text: b.text || "" });
      i++;
    } else if (b._type === "prosCons") {
      out.push({ type: "proscons", pros: b.pros || [], cons: b.cons || [] });
      i++;
    } else if (b._type === "itineraryDay") {
      out.push({ type: "itinerary", day: b.day || 1, title: b.title || "", items: (b.items as string[]) || [] });
      i++;
    } else if (b._type === "budget") {
      out.push({
        type: "budget",
        rows: (b.rows || []).map((r) => ({ label: r.label || "", amount: r.amount || "" })),
        total: b.total,
      });
      i++;
    } else if (b._type === "faq") {
      const items = ((b.items as { q?: string; a?: string }[]) || []).map((it) => ({ q: it.q || "", a: it.a || "" }));
      out.push({ type: "faq", items });
      i++;
    } else {
      i++;
    }

  }
  return out;
}

function mapPost(s: SanityPost): Post {
  const cover = imgUrl(s.coverImage, 1600, 1067);
  return {
    slug: s.slug?.current || s._id,
    title: s.title,
    subtitle: s.excerpt || "",
    excerpt: s.excerpt || "",
    category: "Itineraries",
    destination: s.destination?.name || "",
    region: s.destination?.region || "",
    readMinutes: s.readingMinutes || 6,
    publishedAt: s.publishedAt || new Date().toISOString(),
    image: cover || localPosts[0].image,
    tags: s.tags || [],
    body: portableToBlocks(s.body),
  };
}

function mapDestination(s: SanityDestination): Destination {
  const hero = imgUrl(s.heroImage, 1200, 1500);
  return {
    slug: s.slug?.current || s._id,
    name: s.name,
    country: s.country || "",
    region: s.region || "Other",
    tagline: s.summary?.split(/\.|\n/)[0] || "",
    description: s.summary || "",
    image: hero || localDestinations[0].image,
    bestTime: s.bestTime || "",
    currency: s.currency || "",
    visited: s.visited ?? true,
    guidesNote: s.guidesNote || undefined,
  };
}

// --- Fetchers with local fallback ---
export async function fetchPosts(): Promise<Post[]> {
  try {
    const data = await sanityClient.fetch<SanityPost[]>(
      `*[_type == "post" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc) ${POST_PROJECTION}`
    );
    if (data?.length) return data.map(mapPost);
  } catch (e) { console.warn("[sanity] fetchPosts failed, using local", e); }
  return localPosts;
}

export async function fetchPostBySlug(slug: string): Promise<Post | undefined> {
  try {
    const data = await sanityClient.fetch<SanityPost | null>(
      `*[_type == "post" && slug.current == $slug][0] ${POST_PROJECTION}`,
      { slug }
    );
    if (data) return mapPost(data);
  } catch (e) { console.warn("[sanity] fetchPostBySlug failed, using local", e); }
  return localPosts.find((p) => p.slug === slug);
}

export async function fetchDestinations(): Promise<Destination[]> {
  try {
    const data = await sanityClient.fetch<SanityDestination[]>(
      `*[_type == "destination" && defined(slug.current)] | order(name asc) ${DEST_PROJECTION}`
    );
    if (data?.length) return data.map(mapDestination);
  } catch (e) { console.warn("[sanity] fetchDestinations failed, using local", e); }
  return localDestinations;
}

export async function fetchDestinationBySlug(slug: string): Promise<Destination | undefined> {
  try {
    const data = await sanityClient.fetch<SanityDestination | null>(
      `*[_type == "destination" && slug.current == $slug][0] ${DEST_PROJECTION}`,
      { slug }
    );
    if (data) return mapDestination(data);
  } catch (e) { console.warn("[sanity] fetchDestinationBySlug failed, using local", e); }
  return localDestinations.find((d) => d.slug === slug);
}

// --- React Query keys ---
export const contentKeys = {
  posts: ["sanity", "posts"] as const,
  post: (slug: string) => ["sanity", "post", slug] as const,
  destinations: ["sanity", "destinations"] as const,
  destination: (slug: string) => ["sanity", "destination", slug] as const,
};
