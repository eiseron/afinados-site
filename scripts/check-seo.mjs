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
  check("sitemap.xml excludes versioned docs", !/\/v\d+\.\d+\//.test(sitemap));
}

const versionedPage = join(dist, "docs", "v0.1", "fuel-passage-area", "model.html");
check("versioned page is built", existsSync(versionedPage));
if (existsSync(versionedPage)) {
  const html = readFileSync(versionedPage, "utf8");
  check("versioned page is noindex", /<meta name="robots" content="noindex/.test(html));
}

const latestPage = join(dist, "docs", "fuel-passage-area", "model.html");
check("latest page is built", existsSync(latestPage));
if (existsSync(latestPage)) {
  const html = readFileSync(latestPage, "utf8");
  check("latest page is indexable", /<meta name="robots" content="index, follow/.test(html));
}

const icoPath = join(dist, "favicon.ico");
check("favicon.ico exists", existsSync(icoPath));
if (existsSync(icoPath)) {
  const ico = readFileSync(icoPath);
  check("favicon.ico has ICO signature", ico.readUInt16LE(0) === 0 && ico.readUInt16LE(2) === 1);
}

check("apple-touch-icon.png exists", existsSync(join(dist, "apple-touch-icon.png")));

const IMAGE_BUDGET_BYTES = 260 * 1024;
for (const image of ["carburador.webp", "kart.webp", "yz250.webp"]) {
  const path = join(dist, image);
  if (!existsSync(path)) {
    check(`${image} exists`, false);
    continue;
  }
  const bytes = readFileSync(path).length;
  check(
    `${image} is within the ${IMAGE_BUDGET_BYTES / 1024} KiB budget (${Math.round(bytes / 1024)} KiB)`,
    bytes <= IMAGE_BUDGET_BYTES,
  );
}

for (const base of ["carburador", "kart", "yz250"]) {
  for (const width of ["480", "800"]) {
    check(`${base}-${width}.webp responsive variant exists`, existsSync(join(dist, `${base}-${width}.webp`)));
  }
}

const headersPath = join(dist, "_headers");
check("_headers exists", existsSync(headersPath));
if (existsSync(headersPath)) {
  const headers = readFileSync(headersPath, "utf8");
  check("_headers caches hashed assets immutably", /\/assets\/\*[\s\S]*immutable/.test(headers));
}

if (failures.length > 0) {
  process.stderr.write("SEO checks failed:\n");
  failures.forEach((f) => process.stderr.write(`  - ${f}\n`));
  process.exit(1);
}

process.stdout.write("SEO checks passed\n");
