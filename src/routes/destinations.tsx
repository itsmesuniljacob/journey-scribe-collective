import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { destinations as localDestinations } from "@/content/destinations";
import { useQuery } from "@tanstack/react-query";
import { contentKeys, fetchDestinations } from "@/lib/content-queries";

export const Route = createFileRoute("/destinations")({
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
  const regions = Array.from(new Set(destinations.map((d) => d.region)));
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
        </div>
      </section>

      {regions.map((region) => (
        <section key={region} className="border-b hairline">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            <p className="text-[11px] tracked-sm uppercase text-muted-foreground">{region}</p>
            <div className="mt-8 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              {destinations.filter((d) => d.region === region).map((d) => (
                <Link key={d.slug} to="/destinations/$slug" params={{ slug: d.slug }} className="group block">
                  <div className="overflow-hidden border hairline">
                    <img src={d.image} alt={d.name} loading="lazy" width={600} height={750}
                      className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  </div>
                  <h3 className="mt-4 font-serif italic text-2xl group-hover:text-rust transition-colors">{d.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{d.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}
    </PageShell>
  );
}
