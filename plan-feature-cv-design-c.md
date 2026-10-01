# CV Design Direction C · Cards — Implementation Plan

## Context

Base branch `feature/cv-astro-firebase` (latest commit `4a4cd3c`) renders the CV as one plain column. This run applies design direction **C · Cards**: light grey page, white cards, bold green featured Trxy card, project grid, Articles section, and a colour key where **colour encodes link kind only**.

---

## Phase 1 — Setup

**`package.json`**: Add two font packages to `dependencies`:

- `@fontsource-variable/manrope` (variable font, weights 400–800)
- `@fontsource/ibm-plex-mono` (weights 400 and 500)

---

## Phase 2 — Tokens: Complete redesign of `src/styles/tokens.css`

Add font `@import` directives at top. Replace all existing tokens:

| Token group | Key values                                                                                                                                       |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Page/card   | `--color-page: #F6F7F9`, `--color-card: #FFFFFF`                                                                                                 |
| Text        | `--color-text: #121418`, `--color-text-secondary: #5B6470`                                                                                       |
| Kind ink    | `--color-kind-repo: #1D4ED8`, `--color-kind-site: #047857`, `--color-kind-article: #C2410C`, `--color-kind-package: #6D28D9`                     |
| Kind tint   | `--color-kind-repo-tint: #EEF3FE`, `--color-kind-site-tint: #E8F6F0`, `--color-kind-article-tint: #FDF0E8`, `--color-kind-package-tint: #F3EEFD` |
| Buttons     | `--color-btn-dark: #121418`, `--color-btn-neutral: #EEF0F3`                                                                                      |
| Fonts       | `--font-sans: 'Manrope Variable'…`, `--font-mono: 'IBM Plex Mono'…`                                                                              |
| Radius      | `--radius-card: 1.25rem` (20px)                                                                                                                  |

Remove the `prefers-color-scheme: dark` block (light-only design).

`@theme static` block re-exposes all colour tokens + font families + `--radius-card` for Tailwind utility generation. Semantic spacing stays on `--space-*` (never `--spacing-*`).

---

## Phase 3 — Global CSS: Update `src/styles/global.css`

- Keep `@import "tailwindcss";` as first line
- Update `body` to use `--color-page` background
- Add `.card` base class (white bg, `var(--radius-card)`)
- Remove old `.hero-action` and `.tech-badge` classes
- `@media print`: white bg on all cards, `background: none` on `.featured-card` and `.link-chip`, single-column grid override, buttons hidden via `.no-print`
- Keep `prefers-reduced-motion` block

---

## Phase 4 — Data: Update `src/data/cv.ts`

New types:

```ts
type LinkKind = "repo" | "site" | "article" | "package";
interface Link {
  kind: LinkKind;
  label: string;
  href: string;
}
interface HeroAction {
  label: string;
  href: string;
  variant: "dark" | "repo" | "neutral";
}
interface ArticleEntry {
  type: "article" | "video";
  title: string;
  href: string;
  source: string;
  summary: string;
}
```

All `url` fields → `href`. All project links get `kind` (GitHub→`repo`, NuGet→`package`, live sites/stores/Instagram→`site`). Hero actions become four buttons: Download CV (`dark`), GitHub (`repo`), LinkedIn (`neutral`), Email (`neutral`). `cvData` gains `articles: ArticleEntry[]` — **shipped empty**.

---

## Phase 5 — New components in `src/components/`

| Component            | Purpose                                                                                                                                                                                                                          |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `LinkChip.astro`     | Props: `kind`, `label`, `href`, `inverted?`. Renders tinted chip (or translucent-white when inverted). Uses `style` attr with `var(--color-kind-{kind}-tint)` / `var(--color-kind-{kind})` — no hard-coded hex. Min-height 36px. |
| `ColorKey.astro`     | Four coloured squares + labels (repo, live, article/video, package) using kind CSS vars                                                                                                                                          |
| `ProjectCard.astro`  | Props: `Subsection`. Name (22px/800), mono stack, description, `<details>` for Xo.AzDO.Engine bullets, LinkChips pinned to bottom via `mt-auto`                                                                                  |
| `ArticleCard.astro`  | Props: `ArticleEntry`. 120px tint tile, inline SVG icon, mono eyebrow, title, summary. Entire card is `<a>`.                                                                                                                     |
| `FeaturedCard.astro` | Props: `Subsection` (Trxy). Green bg (`--color-kind-site`), white text, mono eyebrow, name, description, stack, 5 chips with `inverted=true`. NOT an `<a>` itself.                                                               |

---

## Phase 6 — Page: Rewrite `src/pages/index.astro`

Layout (all sections use white `.card` on grey page, max-width 1152px centred):

1. **Header** (2-col grid ≥1024px): name card (h1 ≈60px/800, title, tagline, ≥44px buttons) + FeaturedCard
2. **Profile card**
3. **Projects** (heading + ColorKey + intro + 3→2→1-col grid of ProjectCards, Trxy excluded)
4. **Key Achievements** (cards for Mandy, APC, Campaign Manager; Additional Achievements list)
5. **Articles** (conditional on `articles.length > 0` — entire section hidden when empty)
6. **Bottom row** (2-col ≥1024px): Work card (employer/roles/dates, Derivco sub-roles, Healthbridge/InfoSys bullets) + Toolbox card (skill groups, comma-separated, mono uppercase labels, no chips)
7. **Footer card** (Education + Interests + Contact + "References available upon request")

Data extraction in frontmatter: `trxyProject` filtered out of Personal Projects and passed to FeaturedCard; remaining projects go to the grid.

---

## Phase 7 — Token guard: Update `scripts/check-tokens.ts`

Add rule to `COLOR_RULES` forbidding the eight kind-colour hex values (`#1D4ED8`, `#EEF3FE`, `#047857`, `#E8F6F0`, `#C2410C`, `#FDF0E8`, `#6D28D9`, `#F3EEFD`) anywhere in `src/` except `tokens.css`. The existing file-walker already skips `tokens.css`.

Demonstrate: add `color: #1D4ED8;` to `LinkChip.astro`, run `bun scripts/check-tokens.ts`, record failing output verbatim, revert.

---

## Phase 8 — CLAUDE.md update

Document: (1) the link-kind colour rule and the 8 token names, (2) `LinkChip.astro` props and when to use `inverted=true`.

---

## Verification

1. **Gate**: `bun install --frozen-lockfile && bunx playwright install chromium && bun run type-check && bun run build:with-pdf && bun run lint` → exit 0; `pdfinfo … | grep Pages` ≤ 7
2. **Parity**: Python script → `missing []` for lines and links (hero-label exception noted)
3. **Utility classes**: for each Tailwind class used in `src/`, `grep -c "\.{class}[{:,]"` on compiled CSS ≥ 1
4. **Articles absent**: `grep -c '>Articles<' dist/index.html` → 0
5. **No CDN fonts**: `grep -c fonts.googleapis dist/index.html` → 0
6. **Screenshots**: Playwright over HTTP at 1280×1600 and 390×1600 — visually verify grey page, white cards, two-column header, 3-col project grid, correct gutters
7. **Token-guard demo**: violating line → `check-tokens.ts` fails → revert
