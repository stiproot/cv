# CLAUDE.md — CV Site

Simon Stipcich's CV: static Astro site with Tailwind v4 on Firebase Hosting.

## Commands

```sh
bun run dev             # astro dev on localhost:3000
bun run build           # astro build -> dist/
bun run preview         # serve dist/
bun run type-check      # astro check
bun run lint            # oxlint + oxfmt + check-tokens
bun run format          # oxfmt format
bun run generate:pdf    # render dist/index.html -> dist/simon-stipcich-cv.pdf
bun run build:with-pdf  # build then generate:pdf
```

## Non-negotiable rules

- **No literal design values in `src/`** — no hex colours, no `rgb()`, no raw
  `font-size`/`border-radius`/`font-weight`. Use `var(--color-*)`, `var(--text-*)`,
  `var(--radius-*)` from `src/styles/tokens.css`. `bun run lint` fails if you don't
  (via `scripts/check-tokens.ts`).
- **Link-kind colour rule** — every outbound link carries a `kind` that determines its
  colour. The eight kind-colour hex values (`#1d4ed8`, `#eef3fe`, `#047857`, `#e8f6f0`,
  `#c2410c`, `#fdf0e8`, `#6d28d9`, `#f3eefd`) must appear ONLY in `tokens.css`, never
  hard-coded elsewhere. Use `LinkChip` component for every outbound link.
- **Every section must read with JavaScript disabled.** The site is a static
  CV, not an interactive app; JavaScript is optional.
- **Honour `prefers-reduced-motion`.** CSS animations are disabled in the base
  layer.
- **No `/cv/` paths.** The site lives at the root, not under `/cv/`. All links
  to PDFs, assets, etc. are root-relative: `/simon-stipcich-cv.pdf`, not
  `/cv/simon-stipcich-cv.pdf`.

## PDF generation

The PDF is generated from the built `dist/index.html` using Playwright in
headless mode. It renders at 100% zoom and uses the browser's print styles
defined in `src/styles/global.css` under `@media print`.

- **Print styles hide navigation and buttons** via `.no-print` class.
- **Tech badges are comma-separated in print** via `::after` pseudo-element in
  `global.css`.
- **No DOM surgery.** The PDF generation script does not remove elements by
  class name; instead, it relies on CSS to handle layout for print.
- **A4 paper, 20/15mm margins** — keep `src/styles/tokens.css` in sync.

## Layout

```text
src/
  config/site.ts      every externally-visible constant (URLs, email, INDEXABLE)
  data/cv.ts          typed CV content (sections, badges, links)
  styles/             tokens.css (hand-authored), global.css (@tailwind + @media print)
  layouts/            BaseLayout.astro (renders robots meta, imports styles)
  pages/              index.astro (home page), robots.txt.ts, 404.astro
scripts/              check-tokens.ts, generate-pdf.mjs
```

CV content is typed in `src/data/cv.ts` — a single source of truth. The home page
(`src/pages/index.astro`) renders it. This makes updates atomic: no markdown,
no stale links, no missed badge.

## Components

- **`LinkChip.astro`** — renders every outbound link in the page with kind-based colouring.
  Props: `kind` (one of `'repo'`, `'site'`, `'article'`, `'package'`), `label` (link text),
  `href` (URL), `inverted?` (boolean, makes chip translucent white for the featured Trxy card).
  Outputs a tinted-background chip with `↗` arrow, min 36px tall. No hard-coded colours.

## Gotchas

- **Astro 7 needs Node >= 22.12.** `package.json` `engines` declares it and the deploy
  workflow's `setup-node` must match: on Node 20 `astro check` refuses to run, and a dev machine
  on a newer Node never shows it.
- **`@theme static`, not `@theme`.** Tailwind v4 only emits theme variables that
  some generated utility references. Use `@theme static` to force emission of
  custom tokens.
- **Semantic spacing stays off Tailwind's `--spacing-*` namespace.** Tailwind
  reuses it for t-shirt sizing. The semantic scale is `--space-*` on `:root`.
- **Astro does not extend a parent's scope hash to a child component's
  elements.** A scoped `.my-headline` rule in a child component matches nothing.
  Shared styles live in `global.css`.
- **oxlint has no `.astro` parser** — it reads the file as TypeScript and fails
  on the template. `.astro` is excluded in `.oxlintrc.json`; `bun run type-check`
  (`astro check`) covers those files.
- **Do not put `.astro` in tsconfig `exclude`.** That directory holds the
  generated content-collection types; excluding it drops them from the program.
- **Indexing is OFF by default.** `INDEXABLE = false` in `src/config/site.ts`
  makes BaseLayout emit `<meta name="robots" content="noindex, nofollow">` and
  `robots.txt` disallows all. Flip the flag when the site is live.

## Framework docs

Astro: <https://docs.astro.build/llms.txt>
Tailwind v4: <https://tailwindcss.com/docs>
