import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { ReadingProgress } from "@/components/layout/ReadingProgress";
import { getPostBySlug, posts as localPosts } from "@/content/posts";
import type { PostBlock } from "@/content/types";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { contentKeys, fetchPostBySlug, fetchPosts } from "@/lib/content-queries";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    // Don't throw notFound for local-misses — Sanity may have it
    return { post: post ?? null, slug: params.slug };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.post;
    if (!p) return {};
    return {
      meta: [
        { title: `${p.title} — My Travel Blog` },
        { name: "description", content: p.excerpt },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:image", content: p.image },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/blog/${p.slug}` }],
    };
  },
  component: PostPage,
});

function PostPage() {
  const { post: initialPost, slug } = Route.useLoaderData() as { post: import("@/content/types").Post | null; slug: string };
  const { data: post, isLoading } = useQuery<import("@/content/types").Post | undefined>({
    queryKey: contentKeys.post(slug),
    queryFn: () => fetchPostBySlug(slug),
    initialData: initialPost ?? undefined,
  });
  const { data: allPosts = localPosts } = useQuery({
    queryKey: contentKeys.posts,
    queryFn: fetchPosts,
    initialData: localPosts,
  });
  if (!post) {
    if (isLoading) return <PageShell><div className="py-32 text-center text-muted-foreground">Loading…</div></PageShell>;
    throw notFound();
  }
  const related = allPosts.filter((p) => p.slug !== post.slug && p.region === post.region).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: "Maya" },
  };

  return (
    <PageShell>
      <ReadingProgress />
      <article>
        {/* Hero */}
        <header className="relative border-b hairline overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            width={1600}
            height={1067}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative mx-auto max-w-4xl px-6 py-32 text-center text-white lg:py-48">
            <p className="text-[11px] tracked-sm uppercase text-white/80">{post.category} · {post.destination}</p>
            <h1 className="mt-6 font-serif italic text-4xl md:text-6xl lg:text-7xl leading-[1.02] text-white">
              {post.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/85 leading-relaxed">{post.subtitle}</p>
            <div className="mt-8 flex items-center justify-center gap-6 text-[11px] tracked-sm uppercase text-white/80">
              <span>{new Date(post.publishedAt).toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" })}</span>
              <span>·</span>
              <span>{post.readMinutes} min read</span>
              <BookmarkButton slug={post.slug} />
            </div>
          </div>
        </header>


        {/* Body */}
        <div className="mx-auto max-w-2xl px-6 py-16 lg:py-24">
          {post.body.map((block, i) => <RenderBlock key={i} block={block} />)}
        </div>

        {/* Tags */}
        <div className="mx-auto max-w-2xl border-t hairline px-6 py-10">
          <p className="text-[11px] tracked-sm uppercase text-muted-foreground">Filed under</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span key={t} className="border hairline px-3 py-1 text-[11px] tracked-sm uppercase">{t}</span>
            ))}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="border-t hairline bg-background">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
              <p className="text-[11px] tracked-sm uppercase text-muted-foreground">Keep reading</p>
              <h2 className="mt-3 font-serif italic text-3xl md:text-4xl">More from {post.region}</h2>
              <div className="mt-10 grid gap-10 md:grid-cols-3">
                {related.map((p) => (
                  <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group block">
                    <div className="overflow-hidden border hairline">
                      <img src={p.image} alt={p.title} loading="lazy" width={1200} height={800}
                        className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                    </div>
                    <h3 className="mt-4 font-serif text-xl leading-snug group-hover:text-rust transition-colors">{p.title}</h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </article>
    </PageShell>
  );
}

function BookmarkButton({ slug }: { slug: string }) {
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    const list: string[] = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    setSaved(list.includes(slug));
  }, [slug]);
  const toggle = () => {
    const list: string[] = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    const next = list.includes(slug) ? list.filter((s) => s !== slug) : [...list, slug];
    localStorage.setItem("bookmarks", JSON.stringify(next));
    setSaved(!saved);
    toast.success(saved ? "Removed from bookmarks" : "Saved to bookmarks");
  };
  return (
    <button onClick={toggle} className="ml-2 inline-flex items-center gap-1 hover:text-rust">
      {saved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
      <span>{saved ? "Saved" : "Save"}</span>
    </button>
  );
}

function RenderBlock({ block }: { block: PostBlock }) {
  switch (block.type) {
    case "p":
      return <p className="mb-6 text-lg leading-[1.8] text-foreground">{block.text}</p>;
    case "h2":
      return <h2 className="mt-12 mb-4 font-serif italic text-3xl md:text-4xl">{block.text}</h2>;
    case "h3":
      return <h3 className="mt-8 mb-3 font-display text-xl font-semibold">{block.text}</h3>;
    case "quote":
      return (
        <blockquote className="my-10 border-l-2 border-rust pl-6">
          <p className="font-serif italic text-2xl leading-snug">"{block.text}"</p>
          {block.cite && <cite className="mt-3 block text-[11px] tracked-sm uppercase text-muted-foreground not-italic">— {block.cite}</cite>}
        </blockquote>
      );
    case "callout":
      return (
        <aside className="my-10 border hairline bg-muted/40 p-6">
          {block.title && <p className="text-[11px] tracked-sm uppercase text-rust">{block.title}</p>}
          <p className="mt-2 text-base leading-relaxed">{block.text}</p>
        </aside>
      );
    case "list":
      return (
        <ul className="my-6 list-disc space-y-2 pl-6 text-lg leading-relaxed">
          {block.items.map((i, k) => <li key={k}>{i}</li>)}
        </ul>
      );
    case "image":
      return (
        <figure className="my-10 -mx-6 md:-mx-16">
          <img src={block.src} alt={block.caption || ""} loading="lazy" className="w-full border hairline" />
          {block.caption && <figcaption className="mt-3 text-center text-[11px] tracked-sm uppercase text-muted-foreground">{block.caption}</figcaption>}
        </figure>
      );
    case "itinerary":
      return (
        <div className="my-8 border hairline p-6">
          <p className="text-[11px] tracked-sm uppercase text-rust">Day {block.day}</p>
          <h4 className="mt-1 font-serif italic text-2xl">{block.title}</h4>
          <ul className="mt-4 space-y-2 text-base">
            {block.items.map((i, k) => (
              <li key={k} className="flex gap-3"><span className="text-rust">—</span>{i}</li>
            ))}
          </ul>
        </div>
      );
    case "budget":
      return (
        <div className="my-10 border hairline">
          <p className="border-b hairline p-4 text-[11px] tracked-sm uppercase text-muted-foreground">Budget breakdown</p>
          <table className="w-full text-sm">
            <tbody>
              {block.rows.map((r, k) => (
                <tr key={k} className="border-b hairline">
                  <td className="p-4">{r.label}</td>
                  <td className="p-4 text-right font-medium">{r.amount}</td>
                </tr>
              ))}
              {block.total && (
                <tr className="bg-muted/50">
                  <td className="p-4 text-[11px] tracked-sm uppercase">Total</td>
                  <td className="p-4 text-right font-semibold">{block.total}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      );
    case "proscons":
      return (
        <div className="my-10 grid gap-6 md:grid-cols-2">
          <div className="border hairline p-6">
            <p className="text-[11px] tracked-sm uppercase text-rust">Worth it</p>
            <ul className="mt-4 space-y-2">{block.pros.map((p, k) => <li key={k} className="flex gap-3"><span className="text-rust">+</span>{p}</li>)}</ul>
          </div>
          <div className="border hairline p-6">
            <p className="text-[11px] tracked-sm uppercase text-muted-foreground">Skip</p>
            <ul className="mt-4 space-y-2">{block.cons.map((p, k) => <li key={k} className="flex gap-3"><span className="text-muted-foreground">—</span>{p}</li>)}</ul>
          </div>
        </div>
      );
    case "faq":
      return (
        <div className="my-10 border-t hairline">
          {block.items.map((f, k) => (
            <details key={k} className="group border-b hairline py-5">
              <summary className="cursor-pointer list-none font-display text-lg font-medium flex justify-between">
                {f.q} <span className="text-rust transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-base text-muted-foreground leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      );
  }
}
