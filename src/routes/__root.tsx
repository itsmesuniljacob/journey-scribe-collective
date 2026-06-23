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
      { property: "og:title", content: "My Travel Blog — Stories, guides & slow itineraries" },
      { property: "og:description", content: "A travel diary and slow-guide for people who'd rather stay an extra day than tick a fifth city. Itineraries, city guides, budgets and honest stays." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "My Travel Blog — Stories, guides & slow itineraries" },
      { name: "twitter:description", content: "A travel diary and slow-guide for people who'd rather stay an extra day than tick a fifth city. Itineraries, city guides, budgets and honest stays." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e4e77bf9-9f3a-493b-a366-ff69011141f9/id-preview-74721c3f--3cc76c89-b910-4bc3-b898-26b418b9616b.lovable.app-1780502888331.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e4e77bf9-9f3a-493b-a366-ff69011141f9/id-preview-74721c3f--3cc76c89-b910-4bc3-b898-26b418b9616b.lovable.app-1780502888331.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/favicon-192x192.png" },
      { rel: "icon", type: "image/png", sizes: "512x512", href: "/favicon-512x512.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
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
      <head>
        <HeadContent />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-M4124Y1N1R" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-M4124Y1N1R');`,
          }}
        />
      </head>
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
