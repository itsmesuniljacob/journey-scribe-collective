import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="text-[11px] tracked-sm uppercase text-muted-foreground">Error 404</p>
        <h1 className="mt-4 font-serif text-5xl italic">Off the map.</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          This page doesn't exist — or we haven't written it yet.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center border-b border-foreground pb-1 text-[11px] tracked-sm uppercase hover:text-rust hover:border-rust"
        >
          Back to the homepage
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="text-[11px] tracked-sm uppercase text-muted-foreground">Something broke</p>
        <h1 className="mt-4 font-serif text-4xl italic">This page didn't load.</h1>
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="border-b border-foreground pb-1 text-[11px] tracked-sm uppercase hover:text-rust"
          >Try again</button>
          <a href="/" className="border-b border-foreground pb-1 text-[11px] tracked-sm uppercase hover:text-rust">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "My Travel Blog — Stories, guides & slow itineraries" },
      { name: "description", content: "A travel diary and slow-guide for people who'd rather stay an extra day than tick a fifth city. Itineraries, city guides, budgets and honest stays." },
      { name: "author", content: "My Travel Blog" },
      { name: "theme-color", content: "#FDFCF8" },
      { property: "og:title", content: "My Travel Blog" },
      { property: "og:description", content: "Travel stories, slow itineraries and honest guides." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Inter+Tight:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Outlet />
        <Toaster position="bottom-center" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
