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
  heroImage?: SanityImage;
}

const POST_PROJECTION = `{
  _id, title, slug, excerpt, coverImage, publishedAt, readingMinutes, tags,
  "destination": destination->{name, region},
  body
}`;

const DEST_PROJECTION = `{
  _id, name, slug, country, region, summary, bestTime, heroImage
}`;

// --- Mappers ---
type SanityImageSource = Parameters<typeof urlFor>[0];
function imgUrl(src?: SanityImage, w = 1600, h = 1067): string | null {
  if (!src?.asset?._ref) return null;
  try {
    return urlFor(src as SanityImageSource).width(w).height(h).fit("crop").auto("format").url();
  } catch { return null; }
}

// h3 titles that should turn the following paragraph into a callout box
const CALLOUT_TITLES = /^(insider tip|tip|pro tip|note|heads? up|warning|watch out|important|good to know)\b/i;

interface NormalBlock { _type: "block"; style?: string; listItem?: string; children?: { text?: string }[] }

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
        const items: string[] = [];
        while (i < pt.length && (pt[i] as NormalBlock).listItem === "bullet") {
          items.push(((pt[i] as NormalBlock).children || []).map((c) => c.text || "").join(""));
          i++;
        }
        flushList(items);
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
      if (nb.style === "h2") out.push({ type: "h2", text });
      else if (nb.style === "h3") out.push({ type: "h3", text });
      else if (nb.style === "blockquote") out.push({ type: "quote", text });
      else out.push({ type: "p", text });
      i++;
    } else if (b._type === "image") {
      const src = imgUrl(b as unknown as SanityImage, 1600, 1067);
      if (src) out.push({ type: "image", src, caption: b.caption });
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
    currency: "",
    visited: true,
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
