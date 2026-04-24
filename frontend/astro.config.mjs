import { defineConfig } from "astro/config";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import remarkGitbookSplitParagraphs from "./src/remark/gitbook-split-paragraphs.ts";
import remarkGitbookHint from "./src/remark/gitbook-hint.ts";
import remarkGitbookEmbed from "./src/remark/gitbook-embed.ts";
import remarkGitbookColumns from "./src/remark/gitbook-columns.ts";
import remarkGitbookAssets from "./src/remark/gitbook-assets.ts";
import remarkGitbookLinks from "./src/remark/gitbook-links.ts";


const BASE_PATH = process.env.SITE_BASE_PATH ?? "";

export default defineConfig({
  site: process.env.SITE_URL ?? "https://burla.dev",
  base: BASE_PATH || undefined,
  trailingSlash: "ignore",
  markdown: {
    smartypants: false,
    shikiConfig: {
      theme: "github-light",
      wrap: true,
    },
    remarkPlugins: [
      remarkGitbookSplitParagraphs,
      remarkGitbookAssets,
      remarkGitbookLinks,
      remarkGitbookHint,
      remarkGitbookEmbed,
      remarkGitbookColumns,
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "prepend",
          properties: { className: ["heading-anchor"], ariaLabel: "Direct link to heading" },
          content: {
            type: "element",
            tagName: "span",
            properties: { className: ["heading-anchor__icon"], ariaHidden: "true" },
            children: [{ type: "text", value: "#" }],
          },
        },
      ],
    ],
  },
  build: {
    inlineStylesheets: "auto",
  },
});
