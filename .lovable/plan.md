# First ad campaign for Wandering Lens

## Readiness check (today)
| Area | Status | Notes |
|---|---|---|
| Live website | Ready | wanderinglens.in is published |
| Something for visitors to do | Ready | Newsletter sign-up on the home page saves emails |
| Visit tracking | Ready | Google Analytics is installed |
| Sign-up tracking for ads | Blocked | Ads can't yet tell when an ad visitor subscribes |
| Cookie consent | Blocked | Needed before sending ad tracking for EU/UK visitors |
| Google Ads account | Not connected | |
| Facebook/Instagram account | Not connected | |
| Welcome email | Unknown | Sending domain (notify.wanderinglens.in) still waiting on DNS records |

Verdict: the site is good enough to advertise, but tracking and an ad account must be set up first. Nothing is ever turned on without your approval.

## Proposed campaign (defaults, since questions were skipped — change any)
- Goal: newsletter sign-ups ("Letters from the road")
- Audience: English-speaking travellers in India, 22–45, interested in international trips, city breaks and motorbike rides
- Channel: Facebook and Instagram ads (feeds, Stories, Reels). Your strength is beautiful travel photos, and people discover trips before they search. Alternative: Google "all channels" (Search, YouTube, Discover) if you'd rather catch people searching for guides.
- Ads: 3–4 image ads from your own destination and ride photos, with a headline like "Real trip guides, honest budgets" leading to the home page sign-up
- Budget: ₹500 per day (about ₹15,000 for 30 days); a 14-day test (~₹7,000) before deciding to continue
- Stop date: auto-end after 14 days

## Steps
1. Optional quick research of competitor travel-blog ads (you can skip).
2. Connect your Facebook/Instagram ad account (you sign in; I can't do this for you).
3. Add a simple cookie-consent banner and sign-up tracking (Meta pixel "Lead" event on successful subscribe).
4. Publish, then test a sign-up end to end (marked as a test).
5. Make ad images and copy; you approve both.
6. Create the campaign **paused** and show you the full campaign and exact budget on an approval card. It only goes live when you approve.

## Technical details
- Pixel loaded only after consent; Lead fired in newsletter subscribe success path; dedupe via event_id.
- Brief and assets saved under Files /mnt/documents/marketing/ads/.
