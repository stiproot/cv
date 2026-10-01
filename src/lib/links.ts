/**
 * Every link that leaves the page — another site, or the CV PDF — opens in a new tab, so a
 * reader never loses their place on the CV. `mailto:` and in-page links stay as they are.
 */
export function newTabAttrs(href: string): { target?: "_blank"; rel?: string } {
  const leavesPage = /^https?:\/\//.test(href) || href.endsWith(".pdf");
  return leavesPage ? { target: "_blank", rel: "noopener noreferrer" } : {};
}
