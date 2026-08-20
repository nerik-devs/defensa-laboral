import type { APIRoute } from 'astro';

/**
 * robots.txt — generated at build time so the Sitemap directive always points
 * at the `site` configured in astro.config.mjs (single source of truth for the
 * production domain; see the TODO there).
 */
export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = new URL('/sitemap-index.xml', site).href;
  const body = ['User-agent: *', 'Allow: /', '', `Sitemap: ${sitemapUrl}`, ''].join('\n');
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
