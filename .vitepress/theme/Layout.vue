<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import { useData } from "vitepress";
import { watch } from "vue";
import Landing from "./Landing.vue";

const { Layout } = DefaultTheme;
const { frontmatter, isDark } = useData();

const THEME_COLORS = { light: "#e9ebea", dark: "#181a19" };

if (!import.meta.env.SSR) {
  watch(
    isDark,
    (dark) => {
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", dark ? THEME_COLORS.dark : THEME_COLORS.light);
    },
    { immediate: true },
  );
}
</script>

<template>
  <Landing v-if="frontmatter.landing" />
  <Layout v-else />
</template>
