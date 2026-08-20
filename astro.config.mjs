// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // TODO(A4): confirm the real production domain before go-live.
  // `site` drives the sitemap, canonical URLs and absolute OG URLs in BaseLayout.
  site: 'https://www.defensalaboralpro.com',

  // Static output (default): every page is prerendered to HTML and served by
  // `serve -s dist` on Coolify. Only the FlowIsland React island ships JS.
  output: 'static',

  integrations: [react(), sitemap()],

  // Opt-in prefetch for internal links (see plan item 8).
  prefetch: true,

  vite: {
    // Tailwind 4 runs through its Vite plugin; tokens live in src/styles/global.css.
    plugins: [tailwindcss()],
    server: {
      // Expose the dev server on the local network (parity with the old Vite config).
      host: true,
    },
  },
});
