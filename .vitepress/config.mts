import { defineConfig, type DefaultTheme } from "vitepress";
import versions from "../versions.json";

const appUrl = "https://app.afinados.io";
const SITE_URL = "https://afinados.io";
const SITE_DESCRIPTION =
  "Afinados, ferramentas de cálculo para acerto e preparação de motores.";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

function ptSidebar(): DefaultTheme.Sidebar {
  return {
    "/docs/": [
      {
        text: "Início",
        items: [
          { text: "Visão geral", link: "/docs/" },
          { text: "Novidades", link: "/docs/releases" },
        ],
      },
      {
        text: "Área de passagem de combustível",
        items: [
          { text: "Visão geral", link: "/docs/fuel-passage-area/" },
          { text: "Usando a interface", link: "/docs/fuel-passage-area/interface" },
          { text: "O modelo", link: "/docs/fuel-passage-area/model" },
        ],
      },
      {
        text: "Legal",
        items: [
          { text: "Política de Privacidade", link: "/docs/legal/privacy" },
          { text: "Termos de uso", link: "/docs/legal/terms" },
        ],
      },
    ],
  };
}

function enSidebar(): DefaultTheme.Sidebar {
  return {
    "/en/docs/": [
      {
        text: "Start",
        items: [
          { text: "Overview", link: "/en/docs/" },
          { text: "What's new", link: "/en/docs/releases" },
        ],
      },
      {
        text: "Fuel-passage area",
        items: [
          { text: "Overview", link: "/en/docs/fuel-passage-area/" },
          { text: "Using the interface", link: "/en/docs/fuel-passage-area/interface" },
          { text: "The model", link: "/en/docs/fuel-passage-area/model" },
        ],
      },
      {
        text: "Legal",
        items: [
          { text: "Privacy Policy", link: "/en/docs/legal/privacy" },
          { text: "Terms of Use", link: "/en/docs/legal/terms" },
        ],
      },
    ],
  };
}

function versionNav(prefix: string): DefaultTheme.NavItemWithChildren | null {
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
  sitemap: { hostname: SITE_URL },

  transformPageData(pageData) {
    const url = `${SITE_URL}/${pageData.relativePath}`
      .replace(/index\.md$/, "")
      .replace(/\.md$/, "");
    const title = pageData.frontmatter.title || pageData.title || "Afinados";
    const description =
      pageData.frontmatter.description || pageData.description || SITE_DESCRIPTION;
    pageData.frontmatter.head ??= [];
    pageData.frontmatter.head.push(
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
    ["meta", { name: "robots", content: "index, follow, max-image-preview:large" }],
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
        sidebar: ptSidebar(),
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
        sidebar: enSidebar(),
      },
    },
  },
});
