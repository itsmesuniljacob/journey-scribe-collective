import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas/schema";

const dataset = import.meta.env.SANITY_STUDIO_DATASET ?? "production";
console.log("[sanity] connected to dataset:", dataset);

export default defineConfig({
  name: "default",
  title: "Wandering Lens Studio",
  projectId: "rh1al7t7",
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
