# Simon Stipcich - Portfolio

This repository contains my professional portfolio website, built with [VitePress](https://vitepress.dev/).

## Live Site

View the portfolio at: **https://stiproot.github.io/cv/**

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (hot reload at localhost:5173)
npm run docs:dev

# Build for production
npm run docs:build

# Preview production build
npm run docs:preview
```

## Tech Stack

- **Framework**: VitePress (Vue-powered static site generator)
- **Deployment**: GitHub Actions → GitHub Pages
- **Styling**: Custom CSS with VitePress default theme
- **Node**: 20.x LTS

## Repository Structure

```
cv/
├── .github/workflows/     # GitHub Actions deployment workflow
├── .vitepress/           # VitePress configuration and theme
│   ├── config.mts        # Site configuration
│   ├── theme/            # Custom theme
│   └── public/           # Static assets
├── index.md              # Main portfolio content
├── package.json          # Dependencies and scripts
└── README.md             # This file
```

## Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the `main` branch. The deployment workflow:

1. Triggers on push to main (for `.md`, `.vitepress/**`, or workflow changes)
2. Builds the VitePress site
3. Deploys to GitHub Pages

Manual deployment can be triggered via the Actions tab in GitHub.

## Contact

- **Email**: code.stip.si@gmail.com
- **GitHub**: [@stiproot](https://github.com/stiproot)
- **LinkedIn**: [Simon Stipcich](https://www.linkedin.com/in/stiproot)

---

*Portfolio content last updated: January 2026*
