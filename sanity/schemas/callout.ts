import { defineType, defineField } from "sanity";

export default defineType({
  name: "callout",
  title: "Callout",
  type: "object",
  fields: [
    defineField({
      name: "tone",
      title: "Tone",
      type: "string",
      options: {
        list: [
          { title: "Tip", value: "tip" },
          { title: "Note", value: "note" },
          { title: "Warn", value: "warn" },
        ],
      },
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
    }),
  ],
});
