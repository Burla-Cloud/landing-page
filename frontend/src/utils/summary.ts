import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

export interface SidebarLink {
  kind: "link";
  title: string;
  href: string;
}

export interface SidebarGroup {
  kind: "group";
  title: string;
  href: string;
  items: SidebarLink[];
}

export type SidebarEntry = SidebarLink | SidebarGroup;

export interface SidebarSection {
  heading: string | null;
  entries: SidebarEntry[];
}

const here = dirname(fileURLToPath(import.meta.url));
const DEFAULT_SUMMARY_PATH = resolve(here, "../../../../user-docs/SUMMARY.md");
const SUMMARY_PATH =
  process.env.USER_DOCS_SUMMARY_PATH ??
  (process.env.USER_DOCS_PATH ? resolve(process.env.USER_DOCS_PATH, "SUMMARY.md") : DEFAULT_SUMMARY_PATH);

const URL_PREFIX_ALIASES: Array<[RegExp, string]> = [
  [/^demo-walkthroughs$/, "examples/demo-walkthroughs"],
  [/^demo-blogs\//, "examples/demo-walkthroughs/"],
  [
    /^general-use-cases\/(run-batch-inference-and-vector-embeddings|run-pipeline-stages-on-different-hardware)$/,
    "use-cases/more-use-cases/$1",
  ],
  [/^general-use-cases\//, "use-cases/"],
  [
    /^common-patterns\/(limit-parallelism-for-apis-databases-and-websites|use-custom-docker-images-and-gpus|run-python-in-the-background)$/,
    "how-to/more-how-to-articles/$1",
  ],
  [/^common-patterns\//, "how-to/"],
];

export function idToUrl(rawId: string): string {
  let id = rawId.trim().replace(/\.md$/i, "");
  if (id.startsWith("./")) id = id.slice(2);
  if (id === "README" || id === "") return "/";
  if (id.toLowerCase() === "api-reference") return "/api-reference";
  for (const [re, repl] of URL_PREFIX_ALIASES) id = id.replace(re, repl);
  return "/" + id;
}

export function urlToSlug(url: string): string {
  if (url === "/" || url === "") return "";
  return url.replace(/^\//, "");
}

function mdPathToHref(path: string): string {
  return idToUrl(path);
}

function productionTitle(title: string): string {
  if (title === "Other Examples") return "More Examples";
  return title;
}

const LINK_RE = /^\s*[-*]\s+\[([^\]]+)\]\(([^)]+)\)\s*$/;
const NESTED_LINK_RE = /^\s{2,}[-*]\s+\[([^\]]+)\]\(([^)]+)\)\s*$/;
const H2_RE = /^##\s+(.+?)\s*$/;

export function loadSidebarTitleByUrl(url: string): string | null {
  const sections = loadSidebar();
  for (const section of sections) {
    for (const entry of section.entries) {
      if (entry.kind === "link" && entry.href === url) return entry.title;
      if (entry.kind === "group") {
        if (entry.href === url) return entry.title;
        for (const item of entry.items) {
          if (item.href === url) return item.title;
        }
      }
    }
  }
  return null;
}

export function loadSectionForUrl(url: string): string | null {
  const sections = loadSidebar();
  for (const section of sections) {
    for (const entry of section.entries) {
      if (entry.kind === "link" && entry.href === url) {
        return section.heading;
      }
      if (entry.kind === "group") {
        if (entry.href === url) return section.heading;
        if (entry.items.some((item) => item.href === url)) return section.heading;
      }
    }
  }
  return null;
}

export function loadSidebar(): SidebarSection[] {
  const raw = readFileSync(SUMMARY_PATH, "utf8");
  const lines = raw.split(/\r?\n/);

  const sections: SidebarSection[] = [];
  let current: SidebarSection = { heading: null, entries: [] };
  sections.push(current);

  for (const line of lines) {
    if (!line.trim()) continue;
    if (line.startsWith("#") && !line.startsWith("##")) continue;

    const h2 = H2_RE.exec(line);
    if (h2) {
      current = { heading: h2[1]!.trim(), entries: [] };
      sections.push(current);
      continue;
    }

    const nested = NESTED_LINK_RE.exec(line);
    if (nested) {
      const [, title, path] = nested;
      const last = current.entries[current.entries.length - 1];
      if (last && last.kind === "group") {
        last.items.push({ kind: "link", title: title!, href: mdPathToHref(path!) });
      } else if (last && last.kind === "link") {
        const group: SidebarGroup = { kind: "group", title: productionTitle(last.title), href: last.href, items: [] };
        group.items.push({ kind: "link", title: productionTitle(title!), href: mdPathToHref(path!) });
        current.entries[current.entries.length - 1] = group;
      }
      continue;
    }

    const link = LINK_RE.exec(line);
    if (link) {
      const [, title, path] = link;
      current.entries.push({ kind: "link", title: productionTitle(title!), href: mdPathToHref(path!) });
    }
  }

  const seenHeadings = new Set<string>();
  const uniqueSections = sections.filter((section) => {
    if (!section.heading) return true;
    const key = section.heading.toLowerCase();
    if (seenHeadings.has(key)) return false;
    seenHeadings.add(key);
    return true;
  });

  const essaysIndex = uniqueSections.findIndex((section) => section.heading?.toLowerCase() === "essays");
  if (essaysIndex > 0) {
    const [essays] = uniqueSections.splice(essaysIndex, 1);
    uniqueSections.splice(1, 0, essays);
  }

  return uniqueSections;
}
