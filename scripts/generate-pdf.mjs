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
