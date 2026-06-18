import { Link } from "@tanstack/react-router";
import { Instagram, Mail, Twitter } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t hairline bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-serif italic text-3xl">my travel blog</p>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
              A travel diary and slow-guide for people who'd rather stay an extra day than tick a fifth city off the list.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a aria-label="Instagram" href="https://instagram.com/wanderinglens314" className="hover:text-rust transition-colors"><Instagram size={18} /></a>
              <a aria-label="Twitter" href="https://twitter.com" className="hover:text-rust transition-colors"><Twitter size={18} /></a>
              <a aria-label="Email" href="mailto:xenon.ivybridge@gmail.com" className="hover:text-rust transition-colors"><Mail size={18} /></a>
            </div>
          </div>

          <div>
            <p className="text-[11px] tracked-sm uppercase text-muted-foreground">Explore</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/blog" className="hover:text-rust">Latest guides</Link></li>
              <li><Link to="/destinations" className="hover:text-rust">Destinations</Link></li>
              <li><Link to="/about" className="hover:text-rust">About</Link></li>
              <li><Link to="/search" className="hover:text-rust">Search</Link></li>
              <li><Link to="/trust" className="hover:text-rust">Trust & privacy</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] tracked-sm uppercase text-muted-foreground">Tools</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/tools/trip-calculator" className="hover:text-rust">Trip cost calculator</Link></li>
              <li><Link to="/tools/itinerary-builder" className="hover:text-rust">Itinerary builder</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t hairline pt-6 text-[11px] tracked-sm uppercase text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} My Travel Blog</p>
          <p>Made slowly, from different time zones.</p>
        </div>
      </div>
    </footer>
  );
}
