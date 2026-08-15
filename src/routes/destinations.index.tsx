import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Bookmark } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { destinations as localDestinations } from "@/content/destinations";
import { useQuery } from "@tanstack/react-query";
import { contentKeys, fetchDestinations } from "@/lib/content-queries";

const STORAGE_KEY = "wl:visited-overrides";

export const Route = createFileRoute("/destinations/")({
  component: DestinationsIndex,
  head: () => ({
    meta: [
      { title: "Destinations — My Travel Blog" },
      { name: "description", content: "Every country and city covered on My Travel Blog." },
    ],
  }),
});

function DestinationsIndex() {
  const { data: destinations = localDestinations } = useQuery({
    queryKey: contentKeys.destinations,
    queryFn: fetchDestinations,
    initialData: localDestinations,
  });
  const [overrides, setOverrides] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setOverrides(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  const isVisited = (slug: string, fallback: boolean) =>
    overrides[slug] ?? fallback;

  const toggleVisited = (slug: string, current: boolean) => {
    setOverrides((prev) => {
      const next = { ...prev, [slug]: !current };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  };

  const regions = Array.from(new Set(destinations.map((d) => d.region)));
  const visitedCount = destinations.filter((d) => isVisited(d.slug, d.visited)).length;
  const wishlistCount = destinations.length - visitedCount;
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
        </div>
      </section>

      {regions.map((region) => (
        <section key={region} className="border-b hairline">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            <p className="text-[11px] tracked-sm uppercase text-muted-foreground">{region}</p>
            <div className="mt-8 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              {destinations.filter((d) => d.region === region).map((d) => {
                const visited = isVisited(d.slug, d.visited);
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
                  <button
                    type="button"
                    onClick={() => toggleVisited(d.slug, visited)}
                    aria-pressed={visited}
                    aria-label={visited ? `Move ${d.name} back to the list` : `Mark ${d.name} as visited`}
                    className={`mt-3 inline-flex items-center gap-2 border hairline px-3 py-1.5 text-[10px] tracked-sm uppercase transition-colors ${
                      visited
                        ? "text-rust hover:bg-rust hover:text-background"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {visited ? <Check className="h-3 w-3" /> : <Bookmark className="h-3 w-3" />}
                    {visited ? "Move to list" : "Mark visited"}
                  </button>
                </div>
                );
              })}
            </div>
          </div>
        </section>
      ))}
    </PageShell>
  );
}
