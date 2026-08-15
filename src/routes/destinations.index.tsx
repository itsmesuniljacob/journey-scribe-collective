import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { PageShell } from "@/components/layout/PageShell";
import { destinations as localDestinations } from "@/content/destinations";
import { useQuery } from "@tanstack/react-query";
import { contentKeys, fetchDestinations } from "@/lib/content-queries";

const destinationsSearchSchema = z.object({
  filter: fallback(z.string(), "all").default("all"),
});

export const Route = createFileRoute("/destinations/")({
  validateSearch: zodValidator(destinationsSearchSchema),
  component: DestinationsIndex,
  head: () => ({
    meta: [
      { title: "Destinations — My Travel Blog" },
      { name: "description", content: "Every country and city covered on My Travel Blog." },
    ],
  }),
});

function DestinationsIndex() {
  const { filter: rawFilter } = useSearch({ from: "/destinations/" });
  const filter = ["visited", "wishlist"].includes(rawFilter) ? (rawFilter as "visited" | "wishlist") : "all";

  const { data: destinations = localDestinations } = useQuery({
    queryKey: contentKeys.destinations,
    queryFn: fetchDestinations,
    initialData: localDestinations,
  });

  const filteredDestinations = destinations.filter((d) => {
    if (filter === "visited") return d.visited;
    if (filter === "wishlist") return !d.visited;
    return true;
  });

  const regions = Array.from(new Set(filteredDestinations.map((d) => d.region)));
  const visitedCount = destinations.filter((d) => d.visited).length;
  const wishlistCount = destinations.length - visitedCount;

  const tabs: { key: "all" | "visited" | "wishlist"; label: string }[] = [
    { key: "all", label: "All" },
    { key: "visited", label: "Visited" },
    { key: "wishlist", label: "On the list" },
  ];

  return (
    <PageShell>
      <section className="border-b hairline">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <p className="text-[11px] tracked-sm uppercase text-muted-foreground">Destinations</p>
          <h1 className="mt-3 font-serif italic text-5xl md:text-7xl leading-[0.95]">
            {destinations.length} places, slowly explored.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-muted-foreground">
            The map keeps growing, but I'd rather know one neighbourhood deeply than five capitals shallowly.
          </p>
          <p className="mt-3 text-[11px] tracked-sm uppercase text-muted-foreground">
            {visitedCount} visited{wishlistCount > 0 && <> · {wishlistCount} on the list</>}
          </p>

          <div className="mt-8 flex flex-wrap gap-3" role="tablist" aria-label="Filter destinations">
            {tabs.map((tab) => {
              const active = filter === tab.key;
              return (
                <Link
                  key={tab.key}
                  from="/destinations/"
                  search={(prev) => ({ ...prev, filter: tab.key === "all" ? undefined : tab.key })}
                  role="tab"
                  aria-selected={active}
                  className={`text-[11px] tracked-sm uppercase px-4 py-2 border hairline transition-colors ${
                    active
                      ? "bg-rust text-cream border-rust"
                      : "bg-background text-muted-foreground hover:text-rust"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {regions.length === 0 ? (
        <section className="border-b hairline">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            <p className="text-muted-foreground text-sm">No destinations match this filter.</p>
          </div>
        </section>
      ) : (
        regions.map((region) => (
          <section key={region} className="border-b hairline">
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
              <p className="text-[11px] tracked-sm uppercase text-muted-foreground">{region}</p>
              <div className="mt-8 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                {filteredDestinations.filter((d) => d.region === region).map((d) => {
                  const visited = d.visited;
                  return (
                    <div key={d.slug} className="group block">
                      <Link to="/destinations/$slug" params={{ slug: d.slug }} className="block">
                        <div className="overflow-hidden border hairline">
                          <img src={d.image} alt={d.name} loading="lazy" width={600} height={750}
                            className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                        </div>
                        <p className="mt-4 text-[10px] tracked-sm uppercase">
                          {visited ? (
                            <span className="text-rust">Visited</span>
                          ) : (
                            <span className="text-muted-foreground">On the list</span>
                          )}
                        </p>
                        <h3 className="font-serif italic text-2xl group-hover:text-rust transition-colors">{d.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{d.tagline}</p>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        ))
      )}
    </PageShell>
  );
}
