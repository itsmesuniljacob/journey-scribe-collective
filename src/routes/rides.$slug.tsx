import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { getRideBySlug, rides } from "@/content/rides";
import type { PostBlock } from "@/content/types";

const SITE_URL = "https://wanderinglens.in";

export const Route = createFileRoute("/rides/$slug")({
  loader: ({ params }) => {
    const ride = getRideBySlug(params.slug);
    if (!ride) throw notFound();
    return { ride };
  },
  head: ({ loaderData, params }) => {
    const r = loaderData?.ride;
    if (!r) return {};
    const url = `${SITE_URL}/rides/${params.slug}`;
    const image = r.image.startsWith("http") ? r.image : `${SITE_URL}${r.image}`;
    const articleType = r.category === "Gear" ? "Article" : "BlogPosting";

    const articleLd = {
      "@context": "https://schema.org",
      "@type": articleType,
      headline: r.title,
      description: r.excerpt,
      image: [image],
      datePublished: r.publishedAt,
      dateModified: r.publishedAt,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      author: { "@type": "Person", name: "Wandering Lens" },
      publisher: {
        "@type": "Organization",
        name: "Wandering Lens",
        logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.ico` },
      },
      articleSection: r.category,
      keywords: [r.category, r.region, r.terrain, "motorcycle", "ride"].filter(Boolean).join(", "),
    };

    const breadcrumbLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Rides", item: `${SITE_URL}/rides` },
        { "@type": "ListItem", position: 3, name: r.title, item: url },
      ],
    };

    return {
      meta: [
        { title: `${r.title} — Rides` },
        { name: "description", content: r.excerpt },
        { property: "og:title", content: r.title },
        { property: "og:description", content: r.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        { property: "article:published_time", content: r.publishedAt },
        { property: "article:section", content: r.category },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: r.title },
        { name: "twitter:description", content: r.excerpt },
        { name: "twitter:image", content: image },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(articleLd) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumbLd) },
      ],
    };
  },
  component: RidePage,
  notFoundComponent: () => (
    <PageShell>
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <p className="text-[11px] tracked-sm uppercase text-muted-foreground">404</p>
        <h1 className="mt-4 font-serif italic text-5xl">This ride hasn't been written yet.</h1>
        <Link to="/rides" className="mt-8 inline-block border-b border-foreground pb-1 text-[11px] tracked-sm uppercase hover:text-rust hover:border-rust">
          See all rides →
        </Link>
      </div>
    </PageShell>
  ),
});

function RidePage() {
  const { ride: r } = Route.useLoaderData();
  const related = rides.filter((x) => x.slug !== r.slug).slice(0, 3);

  return (
    <PageShell overlay>
      <section className="relative h-screen w-full overflow-hidden bg-black text-white">
        <img src={r.image} alt={r.title} className="absolute inset-0 h-full w-full object-cover ken-burns" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/40" />
        <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-24 md:pb-32 text-center">
          <p className="fade-up text-[11px] font-medium tracking-[0.3em] uppercase opacity-90">{r.category} · {r.region}</p>
          <h1 className="fade-up mt-5 font-serif italic text-6xl leading-[0.95] md:text-8xl lg:text-[7.5rem] max-w-5xl" style={{ animationDelay: "120ms" }}>{r.title}</h1>
          <p className="fade-up mt-5 max-w-2xl text-lg font-light leading-relaxed opacity-90" style={{ animationDelay: "240ms" }}>{r.tagline}</p>
        </div>
      </section>

      {r.distanceKm > 0 && (
        <section className="border-b hairline">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-border px-0 md:grid-cols-5">
            <Stat label="Route" value={`${r.startPoint} → ${r.endPoint}`} />
            <Stat label="Distance" value={`${r.distanceKm} km`} />
            <Stat label="Days" value={String(r.days)} />
            <Stat label="Difficulty" value={r.difficulty} />
            <Stat label="Best months" value={r.bestMonths} />
          </div>
        </section>
      )}

      <article className="mx-auto max-w-2xl px-6 py-20 lg:py-28">
        <p className="font-serif italic text-2xl leading-snug text-muted-foreground">{r.excerpt}</p>
        <div className="mt-10 space-y-6">
          {r.body.map((block: PostBlock, i: number) => (
            <Block key={i} block={block} />
          ))}
        </div>

        {r.gear && r.gear.length > 0 && (
          <div className="mt-12 border hairline p-6">
            <p className="text-[11px] tracked-sm uppercase text-rust">Gear list</p>
            <ul className="mt-4 space-y-2 text-sm">
              {r.gear.map((g: string, i: number) => <li key={i}>· {g}</li>)}
            </ul>
          </div>
        )}

        {r.lessons && r.lessons.length > 0 && (
          <div className="mt-8 border-l-2 border-rust pl-5">
            <p className="text-[11px] tracked-sm uppercase text-rust">What I'd do differently</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {r.lessons.map((l: string, i: number) => <li key={i}>{l}</li>)}
            </ul>
          </div>
        )}
      </article>

      {related.length > 0 && (
        <section className="border-t hairline">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
            <h2 className="font-serif italic text-3xl md:text-4xl">More rides</h2>
            <div className="mt-10 grid gap-10 md:grid-cols-3">
              {related.map((p) => (
                <Link key={p.slug} to="/rides/$slug" params={{ slug: p.slug }} className="group block">
                  <div className="overflow-hidden border hairline">
                    <img src={p.image} alt={p.title} loading="lazy" width={1200} height={800}
                      className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  </div>
                  <p className="mt-4 text-[10px] tracked-sm uppercase text-rust">{p.category}</p>
                  <h3 className="mt-1 font-serif text-xl group-hover:text-rust transition-colors">{p.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-background px-5 py-6">
      <p className="text-[10px] tracked-sm uppercase text-muted-foreground">{label}</p>
      <p className="mt-2 font-serif text-base">{value}</p>
    </div>
  );
}

function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case "p":
      return <p className="text-base leading-relaxed text-foreground/90">{block.text}</p>;
    case "h2":
      return <h2 className="mt-10 font-serif italic text-3xl">{block.text}</h2>;
    case "h3":
      return <h3 className="mt-6 font-serif text-2xl">{block.text}</h3>;
    case "list":
      return (
        <ul className="space-y-2 text-base text-foreground/90">
          {block.items.map((it, i) => <li key={i}>· {it}</li>)}
        </ul>
      );
    case "callout":
      return (
        <aside className={[
          "border-l-2 pl-5 py-2",
          block.tone === "warn" ? "border-rust" : block.tone === "tip" ? "border-foreground" : "border-muted-foreground",
        ].join(" ")}>
          {block.title && <p className="text-[11px] tracked-sm uppercase text-rust">{block.title}</p>}
          <p className="mt-1 text-base text-foreground/90">{block.text}</p>
        </aside>
      );
    case "itinerary":
      return (
        <div className="border hairline p-5">
          <p className="text-[11px] tracked-sm uppercase text-rust">Day {block.day} · {block.title}</p>
          <ul className="mt-3 space-y-1 text-sm text-foreground/90">
            {block.items.map((it, i) => <li key={i}>· {it}</li>)}
          </ul>
        </div>
      );
    case "quote":
      return (
        <blockquote className="border-l-2 border-rust pl-5 font-serif italic text-2xl">
          "{block.text}"
          {block.cite && <footer className="mt-2 text-[11px] tracked-sm uppercase not-italic text-muted-foreground">— {block.cite}</footer>}
        </blockquote>
      );
    case "image":
      return (
        <figure className="my-6">
          <img src={block.src} alt={block.caption ?? ""} loading="lazy" className="w-full border hairline" />
          {block.caption && <figcaption className="mt-2 text-[11px] tracked-sm uppercase text-muted-foreground">{block.caption}</figcaption>}
        </figure>
      );
    default:
      return null;
  }
}
