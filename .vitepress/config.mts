import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Simon Stipcich",
  description: "Software Developer - Portfolio & CV",

  // Clean URLs (remove .html extension)
  cleanUrls: true,

  // Head metadata for SEO and styling
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'author', content: 'Simon Stipcich' }],
    ['meta', { name: 'keywords', content: 'software developer, C#, Python, JavaScript, TypeScript, full stack developer, .NET, Vue, Angular, Azure' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Simon Stipcich - Software Developer' }],
    ['meta', { property: 'og:description', content: 'Software developer with background in mathematics and physics. Specializing in .NET, Python, and modern web technologies.' }],
  ],

  themeConfig: {
    // Navigation - minimal for single-page portfolio
    nav: [
      { text: 'Home', link: '/' },
      { text: 'GitHub', link: 'https://github.com/stiproot' },
      { text: 'LinkedIn', link: 'https://www.linkedin.com/in/stiproot' }
    ],

    // Social links in nav bar
    socialLinks: [
      { icon: 'github', link: 'https://github.com/stiproot' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/stiproot' }
    ],

    // Footer
    footer: {
      message: 'Built with VitePress',
      copyright: 'Copyright © 2026 Simon Stipcich'
    },

    // Outline for single-page navigation
    outline: {
      level: [2, 3],
      label: 'On this page'
    }
  }
})
