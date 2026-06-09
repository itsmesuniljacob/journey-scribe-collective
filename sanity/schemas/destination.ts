import { defineType, defineField } from "sanity";

export default defineType({
  name: "destination",
  title: "Destination",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
    }),
    defineField({
      name: 'guidesNote',
      title: 'Guides empty-state note',
      description: 'Shown on the destination page when no blog posts are linked yet.',
      type: 'text',
      rows: 4,
    }),

    // defineField({ name: "name", title: "Name", type: "text" }),
    // defineField({ name: "slug", title: "Slug", type: "slug" }),
    defineField({ name: "country", title: "Country", type: "string" }),
    defineField({ name: "region", title: "Region", type: "string" }),
    defineField({ name: "summary", title: "Summary", type: "text" }),
    defineField({ name: "bestTime", title: "Best Time", type: "string" }),
    defineField({ name: "currency", title: "Currency", type: "string" }),
    defineField({ name: "heroImage", title: "Hero Image", type: "image" }),
    defineField({ name: "visited", title: "Visited", type: "boolean", initialValue: true, description: "If false, shows as 'On the list' with no guides yet." }),

  ],
});
