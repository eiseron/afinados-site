import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const dist = join(here, "..", ".vitepress", "dist");

const failures = [];
function check(label, condition) {
  if (!condition) failures.push(label);
}

const robotsPath = join(dist, "robots.txt");
check("robots.txt exists", existsSync(robotsPath));
if (existsSync(robotsPath)) {
  const robots = readFileSync(robotsPath, "utf8");
  check("robots.txt has User-agent", /^User-agent:\s*\*/m.test(robots));
  check(
    "robots.txt references the sitemap",
    /^Sitemap:\s*https:\/\/afinados\.io\/sitemap\.xml$/m.test(robots),
  );
}

const sitemapPath = join(dist, "sitemap.xml");
check("sitemap.xml exists", existsSync(sitemapPath));
if (existsSync(sitemapPath)) {
  const sitemap = readFileSync(sitemapPath, "utf8");
  check("sitemap.xml uses the production hostname", sitemap.includes("https://afinados.io/"));
  check('sitemap.xml declares hreflang="x-default"', sitemap.includes('hreflang="x-default"'));
}

const icoPath = join(dist, "favicon.ico");
check("favicon.ico exists", existsSync(icoPath));
if (existsSync(icoPath)) {
  const ico = readFileSync(icoPath);
  check("favicon.ico has ICO signature", ico.readUInt16LE(0) === 0 && ico.readUInt16LE(2) === 1);
}

check("apple-touch-icon.png exists", existsSync(join(dist, "apple-touch-icon.png")));

if (failures.length > 0) {
  process.stderr.write("SEO checks failed:\n");
  failures.forEach((f) => process.stderr.write(`  - ${f}\n`));
  process.exit(1);
}

process.stdout.write("SEO checks passed\n");
