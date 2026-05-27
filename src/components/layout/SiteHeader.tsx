import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Instagram, Search, Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

interface Props {
  /** When true the header sits over a dark hero image — start as transparent white text. */
  overlay?: boolean;
}

export function SiteHeader({ overlay = false }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = overlay && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        transparent
          ? "bg-transparent text-white"
          : "bg-background/95 text-foreground backdrop-blur border-b hairline"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link to="/" className="group flex items-center gap-2">
          <span className="font-display text-[11px] tracked-sm uppercase">My</span>
          <span className="font-serif italic text-lg leading-none">travel</span>
          <span className="font-display text-[11px] tracked-sm uppercase">Blog</span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-[11px] tracked-sm uppercase font-medium hover:text-rust transition-colors [&.active]:text-rust"
              activeProps={{ className: "active" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <a aria-label="Instagram" href="https://instagram.com" className="hover:text-rust transition-colors">
            <Instagram size={16} />
          </a>
          <Link aria-label="Search" to="/search" className="hover:text-rust transition-colors">
            <Search size={16} />
          </Link>
          <button aria-label="Toggle theme" onClick={toggle} className="hover:text-rust transition-colors">
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        <button
          aria-label="Menu"
          className="md:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t hairline bg-background text-foreground">
          <nav className="flex flex-col px-6 py-6">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="py-3 text-[11px] tracked-sm uppercase font-medium border-b hairline last:border-b-0"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center gap-5 pt-5">
              <a href="https://instagram.com" aria-label="Instagram"><Instagram size={18} /></a>
              <Link to="/search" aria-label="Search"><Search size={18} /></Link>
              <button onClick={toggle} aria-label="Toggle theme">
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

const NAV = [
  { to: "/about", label: "About" },
  { to: "/destinations", label: "Destinations" },
  { to: "/blog", label: "Guides" },
  { to: "/tools/trip-calculator", label: "Tools" },
] as const;
