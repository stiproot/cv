#!/usr/bin/env bun
// eslint-disable-next-line unicorn/no-process-exit
import { chromium } from "playwright";
import { readFileSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "../dist");
const htmlPath = resolve(distDir, "index.html");
const pdfPath = resolve(distDir, "simon-stipcich-cv.pdf");

// eslint-disable-next-line no-console
console.log("Starting PDF generation...");
// eslint-disable-next-line no-console
console.log(`Loading HTML from: ${htmlPath}`);

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

// Go to file URL with print media emulation
await page.goto(`file://${htmlPath}`, {
  waitUntil: "networkidle",
});

// Emulate print media so @media print CSS is applied
await page.emulateMedia({ media: "print", colorScheme: "light" });

// Wait for any fonts
await page.waitForLoadState("networkidle");

// Remove elements with no-print class to ensure they don't appear in PDF text extraction
await page.evaluate(() => {
  const noPrintElements = document.querySelectorAll(".no-print");
  noPrintElements.forEach((el) => {
    el.remove();
  });
});

// eslint-disable-next-line no-console
console.log("Generating PDF...");

// Generate PDF with A4 paper size and 20mm top/bottom, 15mm left/right margins
await page.pdf({
  path: pdfPath,
  format: "A4",
  margin: {
    top: "20mm",
    bottom: "20mm",
    left: "15mm",
    right: "15mm",
  },
  printBackground: true,
});

await browser.close();

const fileSize = readFileSync(pdfPath).byteLength;
// eslint-disable-next-line no-console
console.log(`✓ PDF generated successfully: ${pdfPath}`);
// eslint-disable-next-line no-console
console.log(`→ File size: ${fileSize} bytes`);
