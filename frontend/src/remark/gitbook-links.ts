import { visit } from "unist-util-visit";
import type { Root, Link, Html } from "mdast";

const BASE = (process.env.SITE_BASE_PATH ?? "").replace(/\/$/, "");

const URL_PREFIX_ALIASES: Array<[RegExp, string]> = [
  [/^general-use-cases\//, "use-cases/"],
  [/^common-patterns\//, "how-to/"],
];

function rewriteTarget(raw: string): string | null {
  if (!raw) return null;
  if (/^(https?:|mailto:|tel:|#|\/)/i.test(raw)) return null;

  const [pathPart, hashPart = ""] = raw.split("#", 2);
  if (!/\.md(\?|$)/i.test(pathPart) && !pathPart.endsWith("/")) return null;

  let path = pathPart.replace(/\.md$/i, "");
  if (path.startsWith("./")) path = path.slice(2);

  if (path === "README" || path === "") {
    return hashPart ? `${BASE}/#${hashPart}` : `${BASE}/`;
  }
  if (path.toLowerCase() === "api-reference") {
    return hashPart ? `${BASE}/api-reference#${hashPart}` : `${BASE}/api-reference`;
  }
  for (const [re, repl] of URL_PREFIX_ALIASES) {
    path = path.replace(re, repl);
  }
  return hashPart ? `${BASE}/${path}#${hashPart}` : `${BASE}/${path}`;
}

const HREF_ATTR_RE = /\bhref=(["'])([^"']+)\1/g;

export default function remarkGitbookLinks() {
  return (tree: Root) => {
    visit(tree, "link", (node: Link) => {
      const next = rewriteTarget(node.url);
      if (next) node.url = next;
    });
    visit(tree, "html", (node: Html) => {
      node.value = node.value.replace(HREF_ATTR_RE, (match, quote, href) => {
        const next = rewriteTarget(href);
        return next ? `href=${quote}${next}${quote}` : match;
      });
    });
  };
}
