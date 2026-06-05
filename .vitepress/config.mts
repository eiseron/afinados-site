import { defineConfig, type DefaultTheme } from "vitepress";
import versions from "../versions.json";

const appUrl = "https://app.afinados.io";
const SITE_URL = "https://afinados.io";

function ptSidebar(): DefaultTheme.Sidebar {
  return {
    "/docs/": [
      { text: "Início", items: [{ text: "Visão geral", link: "/docs/" }] },
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
      { text: "Start", items: [{ text: "Overview", link: "/en/docs/" }] },
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
  description:
    "Documentação do Afinados, ferramentas de cálculo para preparação de moto.",
  sitemap: { hostname: SITE_URL },

  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
    ["meta", { name: "robots", content: "index, follow" }],
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
