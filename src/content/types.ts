export type Category =
  | "Itineraries"
  | "City Guides"
  | "Budget"
  | "Stays"
  | "Food";

export interface Post {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: Category;
  destination: string;
  region: string;
  readMinutes: number;
  publishedAt: string;
  image: string;
  body: PostBlock[];
  tags: string[];
}

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "callout"; tone?: "tip" | "warn" | "note"; title?: string; text: string }
  | { type: "list"; items: string[] }
  | { type: "image"; src: string; caption?: string }
  | { type: "itinerary"; day: number; title: string; items: string[] }
  | { type: "budget"; rows: { label: string; amount: string }[]; total?: string }
  | { type: "proscons"; pros: string[]; cons: string[] }
  | { type: "faq"; items: { q: string; a: string }[] };

export interface Destination {
  slug: string;
  name: string;
  country: string;
  region: string;
  tagline: string;
  description: string;
  image: string;
  bestTime: string;
  currency: string;
  visited: boolean;
  guidesNote?: string;
}

export type RideCategory = "Story" | "Route" | "Gear";

export interface Ride {
  slug: string;
  title: string;
  tagline: string;
  excerpt: string;
  category: RideCategory;
  region: string;
  startPoint: string;
  endPoint: string;
  distanceKm: number;
  days: number;
  elevationM?: number;
  difficulty: "Easy" | "Moderate" | "Hard" | "Expert";
  terrain: string;
  bestMonths: string;
  publishedAt: string;
  image: string;
  body: PostBlock[];
  gear?: string[];
  lessons?: string[];
}
