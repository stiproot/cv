# Simon Stipcich - CV

This repository contains my professional CV, built with [Astro](https://astro.build/) and
[Tailwind CSS v4](https://tailwindcss.com/), deployed to [Firebase Hosting](https://firebase.google.com/products/hosting).

## Live Sites

**Current (active):** https://stiproot-cv.web.app/

**Legacy (frozen):** https://stiproot.github.io/cv/ — the previous VitePress site
remains live but is no longer updated.

## Local Development

```bash
# Install dependencies (requires bun 1.3.12+)
bun install

# Start dev server (hot reload at localhost:3000)
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Type check
bun run type-check

# Lint and format
bun run lint
bun run format

# Generate PDF
bun run generate:pdf

# Build and generate PDF
bun run build:with-pdf
```

## Tech Stack

- **Framework**: Astro 7 (static site generation)
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite`
- **Linting**: oxlint + oxfmt
- **Package manager**: bun
- **PDF generation**: Playwright (headless Chrome)
- **Deployment**: Firebase Hosting via GitHub Actions
- **Node**: 20.x LTS

## Repository Structure

```text
cv/
├── .github/workflows/    # GitHub Actions deployment
├── src/
│   ├── config/site.ts    # Site constants, links, INDEXABLE flag
│   ├── data/cv.ts        # Typed CV content
│   ├── layouts/
│   │   └── BaseLayout.astro      # Renders robots meta, imports styles
│   ├── pages/
│   │   ├── index.astro   # Home page
│   │   ├── 404.astro
│   │   └── robots.txt.ts
│   └── styles/
│       ├── tokens.css    # Hand-authored design tokens
│       └── global.css    # Tailwind + print styles
├── scripts/
│   ├── check-tokens.ts   # Guard: fails on hardcoded design values
│   └── generate-pdf.mjs  # Playwright: render HTML -> PDF
├── astro.config.mjs      # Astro configuration
├── firebase.json         # Firebase Hosting config
├── tsconfig.json
├── .oxlintrc.json
├── CLAUDE.md             # Development guide
└── README.md             # This file
```

## Deployment

The site deploys automatically to Firebase Hosting when changes are pushed to `main`:

1. GitHub Actions runs on `main` push or `workflow_dispatch`
2. `bun install --frozen-lockfile`
3. `bunx playwright install --with-deps chromium`
4. `bun run lint` and `bun run type-check`
5. `bun run build:with-pdf` (Astro build + PDF generation)
6. Firebase Hosting action deploys `dist/` to live channel

Manual deployment can be triggered via the Actions tab in GitHub.

## One-time Firebase Setup

The owner must set up Firebase hosting once:

```bash
# Create Firebase project and hosting site (CLI or console)
firebase projects:create cv
firebase hosting:sites:create stiproot-cv

# Add repo secrets to GitHub
FIREBASE_SERVICE_ACCOUNT    # Service account JSON key
FIREBASE_PROJECT_ID         # Project ID (e.g., cv-abc123)
```

See [Firebase docs](https://firebase.google.com/docs/hosting) for details.

## PDF Generation

The CV renders as `dist/simon-stipcich-cv.pdf` as part of the build. It uses:

- Playwright's headless Chrome to render the built HTML
- CSS `@media print` rules in `global.css` to hide navigation and format for print
- A4 paper size with 20/15mm margins (top/bottom × left/right)
- No DOM manipulation — styling handles print layout entirely

## Indexing

Indexing is **OFF by default** (`INDEXABLE = false` in `src/config/site.ts`):

- BaseLayout emits `<meta name="robots" content="noindex, nofollow">`
- `robots.txt` disallows all crawlers

To enable indexing (e.g., at cutover), flip the `INDEXABLE` flag — everything else
adjusts automatically.

## Design Tokens

All design values (colors, spacing, typography, radii) are defined in
`src/styles/tokens.css`. No literal hex colours or px values elsewhere in `src/`.
`bun run check-tokens` (part of lint) fails if you hardcode a design value.

## Contact

- **Email**: code.stip.si@gmail.com
- **GitHub**: [@stiproot](https://github.com/stiproot)
- **LinkedIn**: [Simon Stipcich](https://www.linkedin.com/in/stiproot)

---

_Built with Astro + Tailwind CSS + Firebase Hosting_
