#!/usr/bin/env bun
// eslint-disable-next-line unicorn/no-process-exit
import { chromium } from "playwright";
import { readFileSync } from "fs";
import { resolve } from "path";

const distDir = resolve(import.meta.dir, "../dist");
const htmlPath = resolve(distDir, "index.html");
const pdfPath = resolve(distDir, "simon-stipcich-cv.pdf");

// eslint-disable-next-line no-console
console.log("Starting PDF generation...");
// eslint-disable-next-line no-console
console.log(`Loading HTML from: ${htmlPath}`);

const html = readFileSync(htmlPath, "utf-8");

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

// Set content with CSS for print
await page.setContent(html, { waitUntil: "networkidle" });

// Wait for any fonts
await page.waitForLoadState("networkidle");

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
