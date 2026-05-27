import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { posts } from "@/content/posts";
import { destinations } from "@/content/destinations";
import { useMemo, useState } from "react";
import { Search as SearchIcon } from "lucide-react";

export const Route = createFileRoute("/search")({
  component: SearchPage,
  head: () => ({ meta: [{ title: "Search — My Travel Blog" }] }),
});

function SearchPage() {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return { posts: [], destinations: [] };
    return {
      posts: posts.filter((p) =>
        [p.title, p.excerpt, p.destination, p.category, ...p.tags].join(" ").toLowerCase().includes(term)
      ),
      destinations: destinations.filter((d) =>
        [d.name, d.country, d.tagline, d.region].join(" ").toLowerCase().includes(term)
      ),
    };
  }, [q]);

  return (
    <PageShell>
      <section className="border-b hairline">
        <div className="mx-auto max-w-3xl px-6 py-20 lg:py-28">
          <p className="text-[11px] tracked-sm uppercase text-muted-foreground">Search</p>
          <h1 className="mt-3 font-serif italic text-5xl md:text-6xl">Find a story.</h1>
          <div className="mt-10 flex items-center border-b border-foreground">
            <SearchIcon size={18} className="text-muted-foreground" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Try “Switzerland” or “cafes”"
              className="ml-3 w-full bg-transparent py-3 text-lg focus:outline-none"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16">
        {!q && <p className="text-muted-foreground">Start typing to search posts and destinations.</p>}

        {q && results.posts.length === 0 && results.destinations.length === 0 && (
          <p className="text-muted-foreground">No matches for "{q}".</p>
        )}

        {results.posts.length > 0 && (
          <div className="mb-12">
            <p className="text-[11px] tracked-sm uppercase text-muted-foreground">Guides</p>
            <ul className="mt-4 divide-y divide-border">
              {results.posts.map((p) => (
                <li key={p.slug}>
                  <Link to="/blog/$slug" params={{ slug: p.slug }} className="block py-5 group">
                    <p className="text-[10px] tracked-sm uppercase text-rust">{p.category}</p>
                    <h3 className="mt-1 font-serif text-2xl group-hover:text-rust">{p.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {results.destinations.length > 0 && (
          <div>
            <p className="text-[11px] tracked-sm uppercase text-muted-foreground">Destinations</p>
            <ul className="mt-4 divide-y divide-border">
              {results.destinations.map((d) => (
                <li key={d.slug}>
                  <Link to="/destinations/$slug" params={{ slug: d.slug }} className="block py-5 group">
                    <p className="text-[10px] tracked-sm uppercase text-muted-foreground">{d.region}</p>
                    <h3 className="mt-1 font-serif italic text-2xl group-hover:text-rust">{d.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{d.tagline}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </PageShell>
  );
}
