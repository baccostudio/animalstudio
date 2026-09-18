// Full-page screenshots at desktop (1440) and mobile (375) widths.
// Usage: node screenshot.mjs <url> <name>   → shots/<name>-1440.png, shots/<name>-375.png
// Requires: npm i -D puppeteer-core (uses the Chrome/Edge already installed on the machine).
import { existsSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(process.cwd() + "/package.json");
const puppeteer = require("puppeteer-core");

const CANDIDATES = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
];
const executablePath = process.env.CHROME_PATH || CANDIDATES.find((p) => existsSync(p));
if (!executablePath) throw new Error("No Chrome/Edge found; set CHROME_PATH");

const [url = "http://localhost:3000", name = "site"] = process.argv.slice(2);
const SIZES = [
  [1440, 900],
  [375, 812],
];
mkdirSync("shots", { recursive: true });

const browser = await puppeteer.launch({ executablePath, headless: true, args: ["--hide-scrollbars"] });
for (const [width, height] of SIZES) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "networkidle0" });
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = "auto";
    const total = document.body.scrollHeight;
    for (let y = 0; y <= total; y += 250) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo(0, total);
    await new Promise((r) => setTimeout(r, 1800));
    document.querySelectorAll("*").forEach((el) => {
      if (getComputedStyle(el).animationName !== "none") el.style.animationPlayState = "paused";
    });
  });
  const total = await page.evaluate(() => document.body.scrollHeight);
  const file = `shots/${name}-${width}.png`;
  await page.screenshot({ path: file, fullPage: true });
  console.log(`${file}  (${width}x${total})`);
  await page.close();
}
await browser.close();
