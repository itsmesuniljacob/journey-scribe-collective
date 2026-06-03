## Hero reference (locked)

Mirror the anywhereweroam.com hero exactly in spirit:
- Full-bleed, full-viewport landscape photograph (sky-heavy, cinematic dawn/dusk tones)
- Transparent overlaid top bar: small footprint/serif logo mark top-center-left, horizontal uppercase nav (ABOUT, DESTINATIONS, GUIDES, BLOG), social icons + search top-right
- Vertically centered hero text: lowercase site title "my travel blog" in light sans/serif, tiny uppercase tagline "TRAVEL BLOG / DIARY" below with thin letterspacing
- No CTA button, no slider arrows — just one quiet hero, generous sky
- Subtle ken-burns on the photo; nav fades on scroll

## Rest of the homepage (kept from Refined Editorial direction)

- Latest Stories — asymmetric magazine grid (1 large feature + 2 secondary)
- Destinations strip — horizontal scroll of region cards with serif italic labels
- About the author — split block, short bio + "Read my story"
- Newsletter band — rust-accent background, single email field
- Footer — wordmark, socials, copyright

## Pages & routes
`/`, `/blog`, `/blog/:slug`, `/destinations`, `/destinations/:slug`, `/about`, `/resources`, `/tools/trip-calculator`, `/tools/itinerary-builder`, `/search`, `/auth`

## Visual tokens (locked)
- Bg `#FDFCF8`, ink `#1A1A1A`, accent rust `#A65D43`
- Playfair Display (serif, italic for accents) + Inter (sans, uppercase tracked for nav/meta)
- Sharp corners, 1px hairline borders, restrained motion

## Content source
Sanity CMS for posts/destinations/authors/categories with Portable Text + custom blocks (callout, gallery, itineraryDay, budgetBreakdown, prosCons, faq, mapEmbed). 5 seed posts + 8 destinations.

## Backend (Lovable Cloud)
`profiles`, `comments` (threaded), `bookmarks`, `newsletter_subscribers`, `saved_itineraries`. Email/password auth (auto-confirm). RLS per standard pattern.

## v1 advanced features
Dark mode toggle, reading progress bar, interactive world map (react-simple-maps with rust pins), trip cost calculator, itinerary builder, threaded comments, bookmarks, recently-viewed (localStorage), global search, SEO (React Helmet Async + JSON-LD + sitemap + robots).

## Build order
1. Enable Lovable Cloud + Sanity connection
2. Layout shell (overlay nav, footer, theme provider)
3. Homepage with the anywhereweroam-style hero
4. Article template + Portable Text renderers
5. Destination hub + blog index + search
6. About + world map
7. Auth + comments + bookmarks + newsletter
8. Trip calculator + itinerary builder
9. SEO polish, sitemap, JSON-LD, perf pass

Ready to start on your approval.