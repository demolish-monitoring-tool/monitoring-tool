// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import svgr from 'vite-plugin-svgr';

// https://astro.build/config
export default defineConfig({
  // Template placeholder — replace with your real domain before deploying
  // so the sitemap and canonical URLs point at the live site.
  site: 'https://demolish-monitoring-tool.github.io',
  base: '/demolish-monitoring/',
  integrations: [
        sitemap(),
        react()
    ],
  vite: {
    plugins: [svgr()],
    css: {
      preprocessorOptions: {
        // Bulma 1.0.4 still uses the legacy Sass if() function; silence the
        // dependency warning without hiding warnings from our own styles.
        scss: {
          silenceDeprecations: ['if-function'],
        },
      },
    },
  },
});
