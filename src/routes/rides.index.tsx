import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { rides } from "@/content/rides";
import type { RideCategory } from "@/content/types";

const SITE_URL = "https://wanderinglens.in";

export const Route = createFileRoute("/rides/")({
  component: RidesIndex,
  head: () => {
    const url = `${SITE_URL}/rides`;
    const itemListLd = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Rides",
      itemListElement: rides.map((r, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/rides/${r.slug}`,
        name: r.title,
      })),
    };
    const breadcrumbLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Rides", item: url },
      ],
    };
    return {
      meta: [
        { title: "Rides — Motorcycle Trips & Routes" },
        { name: "description", content: "Multi-day motorcycle trips, route guides, and the gear I actually use — from the Himalayas to the Western Ghats." },
        { property: "og:title", content: "Rides — Motorcycle Trips & Routes" },
        { property: "og:description", content: "Trip stories, route guides, and honest gear notes from years on two wheels." },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(itemListLd) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumbLd) },
      ],
    };
  },
});

const FILTERS: ("All" | RideCategory)[] = ["All", "Story", "Route", "Gear"];

function RidesIndex() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const visible = filter === "All" ? rides : rides.filter((r) => r.category === filter);
  const [feature, ...rest] = visible;

  return (
    <PageShell>
      <section className="border-b hairline">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <p className="text-[11px] tracked-sm uppercase text-muted-foreground">Rides</p>
          <h1 className="mt-3 font-serif italic text-5xl md:text-7xl leading-[0.95]">
            On two wheels, slowly.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-muted-foreground">
            Long-form trip stories, the routes I'd actually recommend, and the gear I've stopped second-guessing. No sponsored noise.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={[
                  "border hairline px-4 py-2 text-[10px] tracked-sm uppercase transition-colors",
                  filter === f
                    ? "bg-foreground text-background"
                    : "hover:text-rust hover:border-rust",
                ].join(" ")}
              >
                {f === "All" ? "All rides" : f === "Gear" ? "Gear & tips" : `${f}s`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {feature && (
        <section className="border-b hairline">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
            <Link
              to="/rides/$slug"
              params={{ slug: feature.slug }}
              className="group grid gap-10 lg:grid-cols-12"
            >
              <div className="overflow-hidden border hairline lg:col-span-7">
                <img
                  src={feature.image}
                  alt={feature.title}
                  loading="lazy"
                  width={1600}
                  height={1067}
                  className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
              <div className="lg:col-span-5 flex flex-col justify-center">
                <p className="text-[11px] tracked-sm uppercase text-rust">
                  {feature.category} · {feature.region}
                </p>
                <h2 className="mt-3 font-serif italic text-4xl md:text-5xl leading-tight group-hover:text-rust transition-colors">
                  {feature.title}
                </h2>
                <p className="mt-4 text-base text-muted-foreground leading-relaxed">{feature.excerpt}</p>
                {feature.distanceKm > 0 && (
                  <p className="mt-6 text-[11px] tracked-sm uppercase text-muted-foreground">
                    {feature.distanceKm} km · {feature.days} days · {feature.difficulty}
                  </p>
                )}
              </div>
            </Link>
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section>
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((r) => (
                <Link key={r.slug} to="/rides/$slug" params={{ slug: r.slug }} className="group block">
                  <div className="overflow-hidden border hairline">
                    <img
                      src={r.image}
                      alt={r.title}
                      loading="lazy"
                      width={800}
                      height={534}
                      className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="mt-4 text-[10px] tracked-sm uppercase text-rust">
                    {r.category} · {r.region}
                  </p>
                  <h3 className="mt-2 font-serif italic text-2xl group-hover:text-rust transition-colors">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{r.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {visible.length === 0 && (
        <section>
          <div className="mx-auto max-w-7xl px-6 py-24 text-center text-muted-foreground lg:px-10">
            Nothing here yet. Try another filter.
          </div>
        </section>
      )}
    </PageShell>
  );
}
