import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { buildSidebarItems, loadDocsData, parseFrontmatter, sidebarConfig } from "../.vitepress/sidebar";
import type { DocsData } from "../.vitepress/sidebar";

describe("parseFrontmatter", () => {
  it("extracts title and description", () => {
    const content = `---
title: My Title
description: Some description
---
# Content`;
    expect(parseFrontmatter(content)).toMatchObject({
      title: "My Title",
      description: "Some description",
    });
  });

  it("extracts nav_section and nav_title", () => {
    const content = `---
title: Documentação do Afinados
nav_section: Início
nav_title: Visão geral
---`;
    const fm = parseFrontmatter(content);
    expect(fm.nav_section).toBe("Início");
    expect(fm.nav_title).toBe("Visão geral");
  });

  it("strips surrounding quotes from values", () => {
    const content = `---
title: "Quoted Title"
nav_section: 'Single Quoted'
---`;
    const fm = parseFrontmatter(content);
    expect(fm.title).toBe("Quoted Title");
    expect(fm.nav_section).toBe("Single Quoted");
  });

  it("returns empty object for content without frontmatter", () => {
    expect(parseFrontmatter("# Just a heading")).toEqual({});
  });

  it("returns empty object for empty content", () => {
    expect(parseFrontmatter("")).toEqual({});
  });

  it("ignores non-string frontmatter values", () => {
    const content = `---
title: My Title
count: 42
enabled: true
tags:
  - a
  - b
---`;
    const fm = parseFrontmatter(content);
    expect(fm.title).toBe("My Title");
    expect(fm.count).toBeUndefined();
    expect(fm.enabled).toBeUndefined();
    expect(fm.tags).toBeUndefined();
  });
});

describe("buildSidebarItems", () => {
  const overviewLabel = "Visão geral";

  it("builds root section with nav_section as group title", () => {
    const data: DocsData = {
      rootFm: { title: "Documentação do Afinados", nav_section: "Início" },
      rootFiles: [],
      subdirs: [],
    };
    const items = buildSidebarItems(data, "/docs", overviewLabel);
    expect(items).toHaveLength(1);
    expect(items[0].text).toBe("Início");
    expect(items[0].items).toEqual([{ text: overviewLabel, link: "/docs/" }]);
  });

  it("falls back to title when nav_section is absent", () => {
    const data: DocsData = {
      rootFm: { title: "Afinados Documentation" },
      rootFiles: [],
      subdirs: [],
    };
    const items = buildSidebarItems(data, "/en/docs", "Overview");
    expect(items[0].text).toBe("Afinados Documentation");
  });

  it("uses nav_title for root index item when set", () => {
    const data: DocsData = {
      rootFm: { title: "Docs", nav_section: "Start", nav_title: "Overview" },
      rootFiles: [],
      subdirs: [],
    };
    const items = buildSidebarItems(data, "/en/docs", "Overview");
    expect(items[0].items![0].text).toBe("Overview");
  });

  it("appends root-level files to the first section", () => {
    const data: DocsData = {
      rootFm: { title: "Docs", nav_section: "Início" },
      rootFiles: [{ slug: "releases", fm: { title: "Novidades" } }],
      subdirs: [],
    };
    const items = buildSidebarItems(data, "/docs", overviewLabel);
    expect(items[0].items).toHaveLength(2);
    expect(items[0].items![1]).toEqual({ text: "Novidades", link: "/docs/releases" });
  });

  it("uses nav_title for root-level files when set", () => {
    const data: DocsData = {
      rootFm: { title: "Docs", nav_section: "Início" },
      rootFiles: [{ slug: "terms", fm: { title: "Termos de Uso", nav_title: "Termos de uso" } }],
      subdirs: [],
    };
    const items = buildSidebarItems(data, "/docs", overviewLabel);
    expect(items[0].items![1].text).toBe("Termos de uso");
  });

  it("creates sections from subdirs using index title", () => {
    const data: DocsData = {
      rootFm: { title: "Docs", nav_section: "Início" },
      rootFiles: [],
      subdirs: [
        {
          name: "fuel-passage-area",
          indexFm: { title: "Área de passagem de combustível" },
          files: [
            { slug: "interface", fm: { title: "Usando a interface" } },
            { slug: "model", fm: { title: "Modelo da área de passagem", nav_title: "O modelo" } },
          ],
        },
      ],
    };
    const items = buildSidebarItems(data, "/docs", overviewLabel);
    expect(items).toHaveLength(2);
    const section = items[1];
    expect(section.text).toBe("Área de passagem de combustível");
    expect(section.items).toEqual([
      { text: overviewLabel, link: "/docs/fuel-passage-area/" },
      { text: "Usando a interface", link: "/docs/fuel-passage-area/interface" },
      { text: "O modelo", link: "/docs/fuel-passage-area/model" },
    ]);
  });

  it("prettifies dir name as section title when no index.md", () => {
    const data: DocsData = {
      rootFm: { title: "Docs", nav_section: "Início" },
      rootFiles: [],
      subdirs: [
        {
          name: "legal",
          indexFm: undefined,
          files: [
            { slug: "privacy", fm: { title: "Política de Privacidade", nav_title: "Política de privacidade" } },
            { slug: "terms", fm: { title: "Termos de Uso", nav_title: "Termos de uso" } },
          ],
        },
      ],
    };
    const items = buildSidebarItems(data, "/docs", overviewLabel);
    const legal = items[1];
    expect(legal.text).toBe("Legal");
    expect(legal.items).toEqual([
      { text: "Política de privacidade", link: "/docs/legal/privacy" },
      { text: "Termos de uso", link: "/docs/legal/terms" },
    ]);
  });

  it("returns no root section when rootFm is absent and no root files", () => {
    const data: DocsData = {
      rootFm: undefined,
      rootFiles: [],
      subdirs: [],
    };
    const items = buildSidebarItems(data, "/docs", overviewLabel);
    expect(items).toHaveLength(0);
  });

  it("builds versioned sidebar with correct prefixes", () => {
    const data: DocsData = {
      rootFm: { title: "Docs", nav_section: "Início" },
      rootFiles: [],
      subdirs: [],
    };
    const items = buildSidebarItems(data, "/docs/v0.3", overviewLabel);
    expect(items[0].items![0].link).toBe("/docs/v0.3/");
  });
});

describe("loadDocsData", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "sidebar-test-"));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  function write(relPath: string, content: string) {
    const abs = path.join(tmpDir, relPath);
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, content);
  }

  it("returns empty data for non-existent directory", () => {
    const data = loadDocsData(path.join(tmpDir, "nonexistent"));
    expect(data.rootFm).toBeUndefined();
    expect(data.rootFiles).toEqual([]);
    expect(data.subdirs).toEqual([]);
  });

  it("reads root index.md into rootFm", () => {
    write("index.md", "---\ntitle: Docs\nnav_section: Início\n---");
    const data = loadDocsData(tmpDir);
    expect(data.rootFm?.title).toBe("Docs");
    expect(data.rootFm?.nav_section).toBe("Início");
  });

  it("reads root-level .md files (excluding index.md) into rootFiles", () => {
    write("index.md", "---\ntitle: Docs\n---");
    write("releases.md", "---\ntitle: Novidades\n---");
    const data = loadDocsData(tmpDir);
    expect(data.rootFiles).toHaveLength(1);
    expect(data.rootFiles[0].slug).toBe("releases");
    expect(data.rootFiles[0].fm.title).toBe("Novidades");
  });

  it("excludes v* versioned directories from subdirs", () => {
    write("index.md", "---\ntitle: Docs\n---");
    write("tools/index.md", "---\ntitle: Tools\n---");
    write("v0.1/index.md", "---\ntitle: V0.1\n---");
    write("v0.2/index.md", "---\ntitle: V0.2\n---");
    const data = loadDocsData(tmpDir);
    const names = data.subdirs.map((d) => d.name);
    expect(names).toContain("tools");
    expect(names).not.toContain("v0.1");
    expect(names).not.toContain("v0.2");
  });

  it("reads subdir index.md into indexFm", () => {
    write("index.md", "---\ntitle: Docs\n---");
    write("fuel-passage-area/index.md", "---\ntitle: Área de passagem de combustível\n---");
    write("fuel-passage-area/model.md", "---\ntitle: Modelo da área de passagem\nnav_title: O modelo\n---");
    const data = loadDocsData(tmpDir);
    expect(data.subdirs).toHaveLength(1);
    expect(data.subdirs[0].indexFm?.title).toBe("Área de passagem de combustível");
    expect(data.subdirs[0].files[0].fm.nav_title).toBe("O modelo");
  });

  it("sorts subdirs alphabetically", () => {
    write("index.md", "---\ntitle: Docs\n---");
    write("legal/privacy.md", "---\ntitle: Privacy\n---");
    write("fuel-passage-area/index.md", "---\ntitle: FPA\n---");
    const data = loadDocsData(tmpDir);
    expect(data.subdirs.map((d) => d.name)).toEqual(["fuel-passage-area", "legal"]);
  });
});

describe("sidebarConfig", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "sidebar-config-test-"));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  function write(relPath: string, content: string) {
    const abs = path.join(tmpDir, relPath);
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, content);
  }

  it("generates latest sidebar key", () => {
    write("docs/index.md", "---\ntitle: Docs\nnav_section: Início\n---");
    const config = sidebarConfig(tmpDir, [], "", "Visão geral");
    expect(config).toHaveProperty("/docs/");
  });

  it("generates versioned sidebar keys for existing versions", () => {
    write("docs/index.md", "---\ntitle: Docs\nnav_section: Início\n---");
    write("docs/v0.1/index.md", "---\ntitle: Docs v0.1\nnav_section: Início\n---");
    const config = sidebarConfig(tmpDir, ["v0.1", "v0.2"], "", "Visão geral");
    expect(config).toHaveProperty("/docs/v0.1/");
    expect(config).not.toHaveProperty("/docs/v0.2/");
  });

  it("generates EN sidebar under /en/docs/ prefix", () => {
    write("en/docs/index.md", "---\ntitle: Afinados Documentation\nnav_section: Start\n---");
    const config = sidebarConfig(tmpDir, [], "en", "Overview");
    expect(config).toHaveProperty("/en/docs/");
    const items = config["/en/docs/"] as { text: string; items: { text: string }[] }[];
    expect(items[0].text).toBe("Start");
    expect(items[0].items[0].text).toBe("Overview");
  });

  it("each version sidebar reflects its own file structure", () => {
    write("docs/index.md", "---\ntitle: Docs\nnav_section: Início\n---");
    write("docs/intake-sizing/index.md", "---\ntitle: Dimensionamento\n---");
    write("docs/v0.1/index.md", "---\ntitle: Docs v0.1\nnav_section: Início\n---");
    const config = sidebarConfig(tmpDir, ["v0.1"], "", "Visão geral");
    const latest = config["/docs/"] as { text: string }[];
    const v01 = config["/docs/v0.1/"] as { text: string }[];
    expect(latest.map((s) => s.text)).toContain("Dimensionamento");
    expect(v01.map((s) => s.text)).not.toContain("Dimensionamento");
  });
});
