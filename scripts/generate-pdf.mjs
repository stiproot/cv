import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

async function generatePDF() {
  console.log('Starting PDF generation...');

  // Path to built HTML and output PDF
  const htmlPath = join(rootDir, '.vitepress', 'dist', 'index.html');
  const pdfOutputPath = join(rootDir, 'public', 'simon-stipcich-cv.pdf');

  // Ensure public directory exists
  const publicDir = join(rootDir, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Check if built HTML exists
  if (!fs.existsSync(htmlPath)) {
    throw new Error('Build output not found. Run "npm run docs:build" first.');
  }

  console.log(`Loading HTML from: ${htmlPath}`);

  // Launch browser
  const browser = await chromium.launch({
    headless: true
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to built HTML
  await page.goto(`file://${htmlPath}`, {
    waitUntil: 'networkidle'
  });

  console.log('Page loaded, waiting for fonts...');

  // Wait for fonts to load
  await page.waitForTimeout(2000);

  console.log('Cleaning up page for PDF...');

  // Clean up the page for PDF generation
  await page.evaluate(() => {
    // Remove all navigation elements
    const selectorsToRemove = [
      '.VPNavBar',
      '.VPNav',
      '.VPSidebar',
      '.VPDocFooter',
      '.VPFooter',
      '.VPLocalNav',
      '.VPSkipLink',
      'nav',
      'header',
      '[class*="NavBar"]',
      '[class*="Appearance"]',
    ];

    selectorsToRemove.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => el.remove());
    });

    // Remove Download PDF button from hero actions
    document.querySelectorAll('a[href*="simon-stipcich-cv.pdf"]').forEach(el => {
      el.remove();
    });

    // Fix tech badge spacing - add comma and space after each badge
    document.querySelectorAll('.tech-badge').forEach((badge, index, badges) => {
      // Add comma after each badge except the last one in a group
      const nextSibling = badge.nextElementSibling;
      const isLastInGroup = !nextSibling || !nextSibling.classList.contains('tech-badge');

      if (!isLastInGroup) {
        const delimiter = document.createTextNode(', ');
        badge.parentNode.insertBefore(delimiter, badge.nextSibling);
      }
    });

    // Optimize hero section for print
    const hero = document.querySelector('.VPHero');
    if (hero) {
      hero.style.paddingTop = '16px';
      hero.style.paddingBottom = '24px';
    }

    const heroName = document.querySelector('.VPHero .name');
    if (heroName) {
      heroName.style.fontSize = '40px';
      heroName.style.lineHeight = '1.2';
    }

    const heroText = document.querySelector('.VPHero .text');
    if (heroText) {
      heroText.style.fontSize = '24px';
      heroText.style.lineHeight = '1.3';
    }

    const heroTagline = document.querySelector('.VPHero .tagline');
    if (heroTagline) {
      heroTagline.style.fontSize = '15px';
      heroTagline.style.lineHeight = '1.5';
    }

    // Style remaining hero buttons - remove borders
    document.querySelectorAll('.VPHero .actions .VPButton').forEach(btn => {
      btn.style.fontSize = '13px';
      btn.style.padding = '6px 14px';
      btn.style.border = 'none';
      btn.style.background = 'transparent';
      btn.style.color = '#000';
      btn.style.textDecoration = 'underline';
    });
  });

  console.log('Generating PDF...');

  // Generate PDF
  await page.pdf({
    path: pdfOutputPath,
    format: 'A4',
    printBackground: true,  // Include background colors/images
    margin: {
      top: '20mm',
      right: '15mm',
      bottom: '20mm',
      left: '15mm'
    },
    preferCSSPageSize: false
  });

  await browser.close();

  console.log(`✓ PDF generated successfully: ${pdfOutputPath}`);
  console.log('→ Run "npm run docs:build" again to include PDF in dist/');
}

generatePDF().catch(err => {
  console.error('PDF generation failed:', err);
  process.exit(1);
});
