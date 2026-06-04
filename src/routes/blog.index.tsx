import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { posts as localPosts } from "@/content/posts";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { contentKeys, fetchPosts } from "@/lib/content-queries";

export const Route = createFileRoute("/blog/")({
  component: BlogIndex,
  head: () => ({
    meta: [
      { title: "Guides & Stories — My Travel Blog" },
      { name: "description", content: "All travel guides, itineraries, city guides and budget breakdowns." },
    ],
  }),
});

const CATEGORIES = ["All", "Itineraries", "City Guides", "Budget", "Stays", "Food"] as const;

function BlogIndex() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const { data: posts = localPosts } = useQuery({
    queryKey: contentKeys.posts,
    queryFn: fetchPosts,
    initialData: localPosts,
  });
  const filtered = useMemo(
    () => (cat === "All" ? posts : posts.filter((p) => p.category === cat)),
    [cat, posts]
  );
  return (
    <PageShell>
      <section className="border-b hairline">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <p className="text-[11px] tracked-sm uppercase text-muted-foreground">The guides</p>
          <h1 className="mt-3 font-serif italic text-5xl md:text-7xl leading-[0.95]">All stories</h1>
          <p className="mt-6 max-w-2xl text-base text-muted-foreground">
            Slow itineraries, budget breakdowns, city guides and honest stays — written after the trip, not during.
          </p>

          <div className="mt-10 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={
                  "border hairline px-4 py-2 text-[11px] tracked-sm uppercase transition-colors " +
                  (cat === c ? "bg-foreground text-background border-foreground" : "hover:border-foreground")
                }
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group block">
              <div className="overflow-hidden border hairline">
                <img src={p.image} alt={p.title} loading="lazy" width={1200} height={800}
                  className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
              </div>
              <p className="mt-5 text-[10px] tracked-sm uppercase text-rust">{p.category} · {p.destination}</p>
              <h3 className="mt-2 font-serif text-2xl leading-snug group-hover:text-rust transition-colors">{p.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
              <p className="mt-3 text-[10px] tracked-sm uppercase text-muted-foreground">{p.readMinutes} min read</p>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
