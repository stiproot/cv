/**
 * Every externally-visible constant the site renders lives here, so copy that
 * has to stay in step with external links is centralized in one place.
 */

/** Canonical origin — Firebase Hosting site. */
export const SITE_URL = "https://stiproot-cv.web.app";

/**
 * Indexing starts OFF. A comment by the flag says flipping it is the cutover.
 * This single flag drives both signals (BaseLayout.astro's robots meta tag and
 * robots.txt.ts), so indexability has one switch rather than two that can drift.
 */
export const INDEXABLE = false;

export const AUTHOR = {
  name: "Simon Stipcich",
  email: "code.stip.si@gmail.com",
  copyrightYear: 2026,
} as const;

export const LINKS = {
  github: "https://github.com/stiproot",
  linkedin: "https://www.linkedin.com/in/stiproot",
  email: "mailto:code.stip.si@gmail.com",
} as const;
