import { Resvg } from "@resvg/resvg-js";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const publicDir = join(here, "..", "src", "public");
const source = join(publicDir, "og-image.svg");
const target = join(publicDir, "og-image.png");

const svg = readFileSync(source);
const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } });
const png = resvg.render().asPng();

writeFileSync(target, png);
process.stdout.write(`og-image.png written (${png.length} bytes)\n`);
