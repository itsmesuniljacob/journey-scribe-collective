// import { defineCliConfig } from "sanity/cli";

// export default defineCliConfig({
//   api: {
//     projectId: "rh1al7t7",
//     dataset: "production",
//   },
// });

// sanity.cli.js
import { defineCliConfig } from "sanity/cli";
export default defineCliConfig({
  api: {
    projectId: "rh1al7t7",
    dataset: process.env.SANITY_STUDIO_DATASET ?? "production",
  },
  server: {
    hostname: "localhost",
    port: 3333,
  },
  graphql: [{
    tag: "default",
    playground: true,
    generation: "gen3",
    nonNullDocumentFields: false,
  }],
  vite: (config) => config,
});
