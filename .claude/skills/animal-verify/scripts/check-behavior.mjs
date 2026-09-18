// Behavioral checklist for the landing. Prints a JSON report; anything false/odd or entries in `logs` is a problem.
// Usage: node check-behavior.mjs <url>
// Requires: npm i -D puppeteer-core
import { existsSync } from "node:fs";
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

const url = process.argv[2] || "http://localhost:3000";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath, headless: true });
const page = await browser.newPage();
const logs = [];
const requests = [];
page.on("console", (m) => ["error", "warning"].includes(m.type()) && logs.push(`${m.type()}: ${m.text()}`));
page.on("pageerror", (e) => logs.push("pageerror: " + e.message));
page.on("request", (r) => requests.push(r.url()));

await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: "networkidle0" });
const out = {};

out.jsClass = await page.evaluate(() => document.documentElement.classList.contains("js"));
out.headerHiddenAtTop = await page.evaluate(() => getComputedStyle(document.querySelector("header")).visibility === "hidden");
await page.evaluate(() => {
  document.documentElement.style.scrollBehavior = "auto";
  window.scrollTo(0, 700);
});
await wait(900);
out.introDone = await page.evaluate(() => document.documentElement.classList.contains("intro-done"));
out.headerSolid = await page.evaluate(() => {
  const cs = getComputedStyle(document.querySelector("header"));
  return cs.visibility === "visible" && cs.opacity === "1" && cs.backgroundColor === "rgb(19, 35, 54)";
});

await page.evaluate(() => document.querySelector(".breaker-bg").scrollIntoView());
await wait(1800);
out.clock = await page.evaluate(() => document.querySelector(".breaker-bg p:nth-child(2)").textContent);

await page.evaluate(() => window.scrollTo(0, 700));
await wait(300);
await page.click("header button");
await wait(400);
out.modalFromHeader = await page.evaluate(() => ({
  title: document.getElementById("leadModalTitle").textContent,
  focusedFirstInput: document.activeElement.id === "leadName",
  scrollLocked: document.body.style.overflow === "hidden",
}));
await page.keyboard.press("Escape");
await wait(400);
out.escapeCloses = await page.evaluate(() => ({
  scrollUnlocked: document.body.style.overflow === "",
  hidden: getComputedStyle(document.querySelector("[role=dialog]").parentElement).opacity === "0",
  focusRestored: document.activeElement.textContent === "Sumate",
}));

await page.evaluate(() => document.querySelectorAll("#planes button")[1].click());
await wait(300);
out.planTitle = await page.evaluate(() => document.getElementById("leadModalTitle").textContent);
await page.type("#leadName", "Test");
await page.type("#leadEmail", "test@example.com");
await page.type("#leadPhone", "11 5555 1234"); // validation needs 8+ digits
// The submit hits the Server Action (LEAD_PROVIDER from .env.local; defaults to console): wait for the async success
await page.click("[role=dialog] button[type=submit]");
out.submitDisabledWhileSending = await page.evaluate(() => document.querySelector("[role=dialog] button[type=submit]")?.disabled ?? false);
// Up to 20 s: in dev the first call compiles the action
for (let i = 0; i < 200; i++) {
  const t = await page.evaluate(() => document.querySelector("[role=dialog]").textContent);
  if (t.includes("¡Listo!") || t.includes("Demasiados intentos") || t.includes("No pudimos")) break;
  await wait(100);
}
const dialogText = await page.evaluate(() => document.querySelector("[role=dialog]").textContent);
out.successShown = dialogText.includes("¡Listo!");
// The action rate-limits 5 submissions per IP every 10 min (in memory): restart `npm run dev` if this shows up
out.rateLimited = dialogText.includes("Demasiados intentos");
out.providerError = dialogText.includes("No pudimos");
await page.click("[role=dialog] button[aria-label=Cerrar]");
await wait(400);
await page.evaluate(() => [...document.querySelectorAll("footer a")].find((a) => a.textContent === "Empezá tu prueba").click());
await wait(300);
out.reopenResetsForm = await page.evaluate(() => !!document.querySelector("[role=dialog] form"));
await page.keyboard.press("Escape");

out.network = {
  googleFontsRequests: requests.filter((u) => u.includes("fonts.g")).length,
  localWoff2: requests.filter((u) => u.endsWith(".woff2")).length,
  nextImage: requests.filter((u) => u.includes("/_next/image")).length,
};

await page.setViewport({ width: 375, height: 812 });
await page.reload({ waitUntil: "networkidle0" });
await page.evaluate(() => {
  document.documentElement.style.scrollBehavior = "auto";
  window.scrollTo(0, 700);
});
await wait(800);
out.mobile = {};
out.mobile.burgerVisible = await page.evaluate(() => getComputedStyle(document.querySelector("header button[aria-expanded]")).display !== "none");
await page.click("header button[aria-expanded]");
await wait(200);
out.mobile.menuOpens = await page.evaluate(() => {
  const cs = getComputedStyle(document.querySelector("header nav > div"));
  return cs.display === "flex" && cs.position === "fixed" && cs.flexDirection === "column";
});
await page.evaluate(() => document.querySelector("header nav a").click());
await wait(300);
out.mobile.menuClosesOnLink = await page.evaluate(() => getComputedStyle(document.querySelector("header nav > div")).display === "none");

out.logs = logs;
console.log(JSON.stringify(out, null, 2));
await browser.close();
