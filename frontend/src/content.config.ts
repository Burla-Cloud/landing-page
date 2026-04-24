import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const USER_DOCS_PATH = process.env.USER_DOCS_PATH ?? "../../user-docs";

const docs = defineCollection({
  loader: glob({
    pattern: ["**/*.md", "!SUMMARY.md", "!.gitbook/**"],
    base: USER_DOCS_PATH,
    generateId: ({ entry }) => entry.replace(/\.md$/i, ""),
  }),
});

export const collections = { docs };
