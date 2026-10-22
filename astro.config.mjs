// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import sitemap from '@astrojs/sitemap';
import es from './src/i18n/es.json' with { type: 'json' };
import pt from './src/i18n/pt.json' with { type: 'json' };

// The production domain is still [DOMINIO]; until SITE_URL is set, builds use a reserved
// .invalid host so canonical/hreflang URLs are obviously placeholders.
const PLACEHOLDER_SITE = 'https://dominio-pendiente.invalid';
/** @typedef {'es' | 'pt'} Lang */
/** @typedef {keyof typeof es.routes} PageId */
/** @type {Record<Lang, string>} */
const SITEMAP_LOCALES = { es: 'es-ES', pt: 'pt-PT' };
/** @type {Record<Lang, typeof es.routes>} */
const ROUTES = { es: es.routes, pt: pt.routes };
const LANGS = /** @type {Lang[]} */ (Object.keys(ROUTES));
const PAGE_IDS = /** @type {PageId[]} */ (Object.keys(es.routes));

const { SITE_URL } = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');

/** @param {string | undefined} value */
function resolveSite(value) {
  if (!value) return PLACEHOLDER_SITE;
  try {
    return new URL(value).origin;
  } catch {
    return PLACEHOLDER_SITE;
  }
}

const site = resolveSite(SITE_URL);

/**
 * @param {Lang} lang
 * @param {string} slug
 */
function pagePath(lang, slug) {
  return slug ? `/${lang}/${slug}/` : `/${lang}/`;
}

// Slugs are translated (servicios ↔ servicos), so the sitemap's default prefix-based
// matching can't pair them; build the alternates from the route map instead.
/** @param {string} pathname */
function alternatesFor(pathname) {
  for (const pageId of PAGE_IDS) {
    const candidates = LANGS.map((lang) => ({
      lang,
      url: new URL(pagePath(lang, ROUTES[lang][pageId]), site).href,
    }));
    if (candidates.some(({ url }) => new URL(url).pathname === pathname)) {
      return candidates.map(({ lang, url }) => ({ lang: SITEMAP_LOCALES[lang], url }));
    }
  }
  return undefined;
}

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  i18n: {
    locales: ['es', 'pt'],
    defaultLocale: 'es',
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
  integrations: [
    sitemap({
      // The root page only redirects to a language.
      filter: (page) => new URL(page).pathname !== '/',
      serialize(item) {
        const links = alternatesFor(new URL(item.url).pathname);
        return links ? { ...item, links } : item;
      },
    }),
  ],
});
