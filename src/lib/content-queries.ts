import { sanityClient, urlFor } from "./sanity";
import type { Post, Destination, PostBlock } from "@/content/types";
import { posts as localPosts } from "@/content/posts";
import { destinations as localDestinations } from "@/content/destinations";

// --- Sanity result types (loose) ---
interface SanityImage { _type?: string; asset?: { _ref?: string } }
interface SanityPortableBlock { _type: string; _key?: string; style?: string; children?: { text?: string }[]; caption?: string; asset?: SanityImage["asset"] }
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

function portableToBlocks(pt?: SanityPortableBlock[]): PostBlock[] {
  if (!pt) return [];
  const out: PostBlock[] = [];
  for (const b of pt) {
    if (b._type === "block") {
      const text = (b.children || []).map((c) => c.text || "").join("");
      if (!text.trim()) continue;
      if (b.style === "h2") out.push({ type: "h2", text });
      else if (b.style === "h3") out.push({ type: "h3", text });
      else if (b.style === "blockquote") out.push({ type: "quote", text });
      else out.push({ type: "p", text });
    } else if (b._type === "image") {
      const src = imgUrl(b as unknown as SanityImage, 1600, 1067);
      if (src) out.push({ type: "image", src, caption: b.caption });
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
