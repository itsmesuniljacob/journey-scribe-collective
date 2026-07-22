## Confirmation: blog hero matches Rides on all devices

Verified `src/routes/blog.$slug.tsx` (lines 112–125) against `src/routes/rides.$slug.tsx` (lines 93–95):

| Property | Rides | Blog |
|---|---|---|
| Container height | `h-[80vh] min-h-[520px]` | `h-[80vh] min-h-[520px]` |
| Image positioning | `absolute inset-0 h-full w-full` | `absolute inset-0 h-full w-full` |
| Crop | `object-cover ken-burns` | `object-cover ken-burns` |
| Gradient overlay | `from-black/30 via-transparent to-black/70` | identical |
| Text placement | bottom-anchored, centered | bottom-anchored, centered |

No responsive branches — the same crop/aspect applies to every post image on mobile, tablet, and desktop. Blog adds an LQIP background (blur placeholder) which sits behind the same `object-cover` image, so it doesn't affect the crop.

**No code changes needed.** If you want me to visually verify on a specific post at mobile + desktop widths with Playwright screenshots, say the word.