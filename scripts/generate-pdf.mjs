#!/usr/bin/env bun
// eslint-disable-next-line unicorn/no-process-exit
import { chromium } from "playwright";
import { readFileSync, existsSync, statSync } from "node:fs";
import { resolve, join, extname } from "node:path";
import { createServer } from "node:http";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "../dist");
const pdfPath = resolve(distDir, "simon-stipcich-cv.pdf");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".txt": "text/plain",
  ".xml": "application/xml",
};

function createStaticServer(dir) {
  return createServer((req, res) => {
    let urlPath = (req.url ?? "/").split("?")[0];

    let filePath = join(dir, urlPath);

    if (existsSync(filePath) && statSync(filePath).isDirectory()) {
      filePath = join(filePath, "index.html");
    }

    if (!existsSync(filePath)) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not found");
      return;
    }

    const ext = extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] ?? "application/octet-stream";

    try {
      const content = readFileSync(filePath);
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    } catch {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Server error");
    }
  });
}

// eslint-disable-next-line no-console
console.log("Starting PDF generation...");

const server = createStaticServer(distDir);

await new Promise((resolvePromise) => {
  server.listen(0, "127.0.0.1", resolvePromise);
});

const addr = server.address();
const port = addr.port;

// eslint-disable-next-line no-console
console.log(`Serving dist/ at http://localhost:${port}/`);

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

await page.goto(`http://localhost:${port}/`, {
  waitUntil: "networkidle",
});

// eslint-disable-next-line no-console
console.log("Page loaded, emulating print media...");

await page.emulateMedia({ media: "print", colorScheme: "light" });

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
server.close();

const fileSize = readFileSync(pdfPath).byteLength;
// eslint-disable-next-line no-console
console.log(`PDF generated successfully: ${pdfPath}`);
// eslint-disable-next-line no-console
console.log(`File size: ${fileSize} bytes`);
