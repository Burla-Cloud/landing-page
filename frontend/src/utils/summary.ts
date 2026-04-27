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
  [/^general-use-cases\//, "use-cases/"],
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

const LINK_RE = /^\s*[-*]\s+\[([^\]]+)\]\(([^)]+)\)\s*$/;
const NESTED_LINK_RE = /^\s{2,}[-*]\s+\[([^\]]+)\]\(([^)]+)\)\s*$/;
const H2_RE = /^##\s+(.+?)\s*$/;

export function loadSidebarTitleByUrl(url: string): string | null {
  const sections = loadSidebar();
  for (const section of sections) {
    for (const entry of section.entries) {
      if (entry.kind === "link" && entry.href === url) return entry.title;
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
      }
      continue;
    }

    const link = LINK_RE.exec(line);
    if (link) {
      const [, title, path] = link;
      current.entries.push({ kind: "link", title: title!, href: mdPathToHref(path!) });
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

  for (const section of uniqueSections) {
    section.entries = section.entries.map((entry) => {
      if (entry.kind !== "link") return entry;
      if (entry.title === "Other Examples") return { ...entry, title: "Demo walkthroughs" };
      return entry;
    });
  }

  const essaysIndex = uniqueSections.findIndex((section) => section.heading?.toLowerCase() === "essays");
  if (essaysIndex > 0) {
    const [essays] = uniqueSections.splice(essaysIndex, 1);
    uniqueSections.splice(1, 0, essays);
  }

  return uniqueSections;
}
