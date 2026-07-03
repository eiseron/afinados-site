import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitepress";
import versions from "../versions.json";
import { sidebarConfig } from "./sidebar";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.resolve(__dirname, "../src");

const appUrl = "https://app.afinados.io";
const SITE_URL = "https://afinados.io";
const SITE_DESCRIPTION =
  "Afinados, ferramentas de cálculo para acerto e preparação de motores.";
const OG_IMAGE = `${SITE_URL}/og-image.png`;
const VERSIONED_PATH = /(^|\/)v\d+(\.\d+)*\//;

function versionNav(prefix: string) {
  if (versions.length === 0) return null;
  const latest = versions[versions.length - 1];
  return {
    text: `${latest} (latest)`,
    items: [
      { text: "latest", link: `${prefix}/` },
      ...[...versions].reverse().map((v) => ({ text: v, link: `${prefix}/${v}/` })),
    ],
  };
}

const ptVersions = versionNav("/docs");
const enVersions = versionNav("/en/docs");

export default defineConfig({
  srcDir: "./src",
  outDir: "./.vitepress/dist",
  cleanUrls: true,
  title: "Afinados",
  titleTemplate: ":title — Afinados",
  description: SITE_DESCRIPTION,
  sitemap: {
    hostname: SITE_URL,
    transformItems(items) {
      return items
        .filter((item) => !VERSIONED_PATH.test(item.url))
        .map((item) => {
          if (!item.links) return item;
          const fallback = item.links.find((link) => link.lang === "pt-BR") ?? item.links[0];
          return { ...item, links: [...item.links, { lang: "x-default", url: fallback.url }] };
        });
    },
  },

  transformPageData(pageData) {
    const url = `${SITE_URL}/${pageData.relativePath}`
      .replace(/index\.md$/, "")
      .replace(/\.md$/, "");
    const title = pageData.frontmatter.title || pageData.title || "Afinados";
    const description =
      pageData.frontmatter.description || pageData.description || SITE_DESCRIPTION;
    const robots = VERSIONED_PATH.test(pageData.relativePath)
      ? "noindex, follow"
      : "index, follow, max-image-preview:large";
    pageData.frontmatter.head ??= [];
    pageData.frontmatter.head.push(
      ["meta", { name: "robots", content: robots }],
      ["link", { rel: "canonical", href: url }],
      ["meta", { property: "og:title", content: title }],
      ["meta", { property: "og:description", content: description }],
      ["meta", { property: "og:url", content: url }],
      ["meta", { name: "twitter:title", content: title }],
      ["meta", { name: "twitter:description", content: description }],
    );
  },

  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
    ["link", { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" }],
    ["link", { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" }],
    ["meta", { name: "theme-color", content: "#e9ebea" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:site_name", content: "Afinados" }],
    ["meta", { property: "og:image", content: OG_IMAGE }],
    ["meta", { property: "og:image:type", content: "image/png" }],
    ["meta", { property: "og:image:width", content: "1200" }],
    ["meta", { property: "og:image:height", content: "630" }],
    ["meta", { property: "og:image:alt", content: "Afinados" }],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:image", content: OG_IMAGE }],
    ["meta", { name: "twitter:image:alt", content: "Afinados" }],
    [
      "script",
      { type: "application/ld+json" },
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Afinados",
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        publisher: {
          "@type": "Organization",
          name: "Eiseron",
          url: "https://eiseron.com",
        },
      }),
    ],
  ],

  themeConfig: {
    socialLinks: [{ icon: "github", link: "https://github.com/eiseron/afinados" }],
    search: { provider: "local" },
    footer: {
      message: "Distribuído sob a Functional Source License (FSL).",
      copyright: "Afinados, um produto da Eiseron.",
    },
  },

  locales: {
    root: {
      label: "Português",
      lang: "pt-BR",
      themeConfig: {
        nav: [
          { text: "Início", link: "/" },
          { text: "Documentação", link: "/docs/" },
          { text: "Simulador", link: appUrl },
          ...(ptVersions ? [ptVersions] : []),
        ],
        sidebar: sidebarConfig(srcDir, versions, "", "Visão geral"),
        outlineTitle: "Nesta página",
        returnToTopLabel: "Voltar ao topo",
        sidebarMenuLabel: "Menu",
        darkModeSwitchLabel: "Aparência",
        docFooter: { prev: "Anterior", next: "Próximo" },
      },
    },
    en: {
      label: "English",
      lang: "en-US",
      themeConfig: {
        nav: [
          { text: "Home", link: "/en/" },
          { text: "Documentation", link: "/en/docs/" },
          { text: "Simulator", link: appUrl },
          ...(enVersions ? [enVersions] : []),
        ],
        sidebar: sidebarConfig(srcDir, versions, "en", "Overview"),
      },
    },
  },
});
