import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { DefaultTheme } from "vitepress";

export type FM = Record<string, string>;

export type FileData = { slug: string; fm: FM };

export type DirData = {
  name: string;
  indexFm?: FM;
  files: FileData[];
};

export type DocsData = {
  rootFm?: FM;
  rootFiles: FileData[];
  subdirs: DirData[];
};

export function parseFrontmatter(content: string): FM {
  const { data } = matter(content);
  return Object.fromEntries(
    Object.entries(data)
      .filter(([, v]) => typeof v === "string")
      .map(([k, v]) => [k, v as string]),
  );
}

export function buildSidebarItems(
  { rootFm, rootFiles, subdirs }: DocsData,
  urlPrefix: string,
  overviewLabel: string,
): DefaultTheme.SidebarItem[] {
  const sections: DefaultTheme.SidebarItem[] = [];

  const rootItems: DefaultTheme.SidebarItem[] = [
    ...(rootFm ? [{ text: rootFm.nav_title || overviewLabel, link: `${urlPrefix}/` }] : []),
    ...rootFiles.map(({ slug, fm }) => ({
      text: fm.nav_title || fm.title || slug,
      link: `${urlPrefix}/${slug}`,
    })),
  ];

  if (rootItems.length > 0) {
    sections.push({
      text: rootFm?.nav_section || rootFm?.title || "Docs",
      items: rootItems,
    });
  }

  for (const { name, indexFm, files } of subdirs) {
    const sectionTitle =
      indexFm?.title ??
      name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

    const dirUrl = `${urlPrefix}/${name}`;
    const dirItems: DefaultTheme.SidebarItem[] = [
      ...(indexFm ? [{ text: indexFm.nav_title || overviewLabel, link: `${dirUrl}/` }] : []),
      ...files.map(({ slug, fm }) => ({
        text: fm.nav_title || fm.title || slug,
        link: `${dirUrl}/${slug}`,
      })),
    ];

    if (dirItems.length > 0) {
      sections.push({ text: sectionTitle, items: dirItems });
    }
  }

  return sections;
}

function loadFrontmatter(filePath: string): FM {
  try {
    return parseFrontmatter(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return {};
  }
}

function readMdFiles(dir: string): string[] {
  try {
    return fs.readdirSync(dir).filter((f) => f.endsWith(".md") && f !== "index.md").sort();
  } catch {
    return [];
  }
}

function readSubdirs(dir: string): fs.Dirent[] {
  try {
    return fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
}

export function loadDocsData(docsDir: string): DocsData {
  const rootIndexPath = path.join(docsDir, "index.md");
  const rootFm = fs.existsSync(rootIndexPath) ? loadFrontmatter(rootIndexPath) : undefined;

  const rootFiles = readMdFiles(docsDir).map((f) => ({
    slug: f.replace(/\.md$/, ""),
    fm: loadFrontmatter(path.join(docsDir, f)),
  }));

  const subdirs = readSubdirs(docsDir)
    .filter((e) => e.isDirectory() && !/^v\d/.test(e.name))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((entry) => {
      const dirPath = path.join(docsDir, entry.name);
      const subIndexPath = path.join(dirPath, "index.md");
      const indexFm = fs.existsSync(subIndexPath) ? loadFrontmatter(subIndexPath) : undefined;
      const files = readMdFiles(dirPath).map((f) => ({
        slug: f.replace(/\.md$/, ""),
        fm: loadFrontmatter(path.join(dirPath, f)),
      }));
      return { name: entry.name, indexFm, files };
    });

  return { rootFm, rootFiles, subdirs };
}

export function sidebarConfig(
  srcDir: string,
  versions: string[],
  locale: string,
  overviewLabel: string,
): DefaultTheme.Sidebar {
  const prefix = locale ? `/${locale}/docs` : "/docs";
  const baseDir = locale ? path.join(srcDir, locale, "docs") : path.join(srcDir, "docs");

  const config: DefaultTheme.Sidebar = {
    [`${prefix}/`]: buildSidebarItems(loadDocsData(baseDir), prefix, overviewLabel),
  };

  for (const version of versions) {
    const versionDir = path.join(baseDir, version);
    if (fs.existsSync(versionDir)) {
      config[`${prefix}/${version}/`] = buildSidebarItems(
        loadDocsData(versionDir),
        `${prefix}/${version}`,
        overviewLabel,
      );
    }
  }

  return config;
}
