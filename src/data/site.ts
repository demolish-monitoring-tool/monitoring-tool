import siteData from './site.json';
import pathAliases from './path_aliases.json';

const rawBase = import.meta.env.BASE_URL || '/';
export const basePath = rawBase === '/' ? '' : rawBase.replace(/\/$/, '');

/**
 * Prefixes a root-relative path (e.g. '/files/logo.png') with Astro's configured `base` path.
 */
export function withBase(path: string | null | undefined): string {
  if (!path) return '';
  if (
    path === '#' ||
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('mailto:') ||
    path.startsWith('tel:') ||
    path.startsWith('data:')
  ) {
    return path;
  }
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (basePath && (normalized === basePath || normalized.startsWith(`${basePath}/`))) {
    return normalized;
  }
  return `${basePath}${normalized}`;
}

/**
 * Rewrites root-relative src="/..." and href="/..." attributes inside raw HTML snippets
 * so they include Astro's configured `base` path.
 */
export function withBaseHtml(html: string | null | undefined): string {
  if (!html) return '';
  if (!basePath) return html;
  return html.replace(/\b(src|href)="\/(?!\/)/g, `$1="${basePath}/`);
}

export function stripBase(pathname: string): string {
  if (basePath && pathname.startsWith(basePath)) {
    const rest = pathname.slice(basePath.length);
    return rest.startsWith('/') ? rest : `/${rest}`;
  }
  return pathname || '/';
}

export const site = {
  name: siteData.site.name || 'demolish',
  slogan: siteData.site.slogan || '',
  description:
    'DeMoLiSH: Fighting Bias, Building Bridges — an innovative, multidisciplinary research project addressing hate speech and xenophobia in Greece.',
  email: siteData.site.mail || 'alkolovou@athenarc.gr',
  url: 'https://demolish-monitoring-tool.github.io',
  logo: withBase('/files/path_newFont_bold.png'),
  favicon: withBase('/files/favicon_0.png'),
  facebook: 'https://www.facebook.com/profile.php?id=61555622441328',
  twitter: 'https://twitter.com/DemolishProject',
} as const;

export type LangCode = 'en' | 'el';

/**
 * Localizes an internal URL for the given language ('en' or 'el') and prepends Astro's base path.
 */
export function localizeUrl(url: string, lang: LangCode): string {
  if (!url || url === '#' || url.startsWith('http://') || url.startsWith('https://')) {
    return url || '#';
  }
  const stripped = stripBase(url);
  const clean = stripped.startsWith('/el/')
    ? stripped.slice(3)
    : stripped === '/el'
      ? '/'
      : stripped.startsWith('/')
        ? stripped
        : `/${stripped}`;

  const langPath = lang === 'el' ? (clean === '/' ? '/el' : `/el${clean}`) : clean;
  return withBase(langPath);
}

/**
 * Given the current pathname, returns the equivalent URL in English and Greek.
 */
export function getLanguageSwitchUrls(pathname: string): { en: string; el: string } {
  const withoutBase = stripBase(pathname);
  const normalized =
    withoutBase.endsWith('/') && withoutBase.length > 1 ? withoutBase.slice(0, -1) : withoutBase;
  const isEl = normalized === '/el' || normalized.startsWith('/el/');
  const baseRoute = isEl ? (normalized === '/el' ? '/' : normalized.slice(3)) : normalized || '/';

  const matchedAlias = pathAliases.find((a) => a.alias === baseRoute);
  if (matchedAlias) {
    const enMatch = pathAliases.find((a) => a.path === matchedAlias.path && a.langcode === 'en');
    const elMatch = pathAliases.find((a) => a.path === matchedAlias.path && a.langcode === 'el');
    const targetEn = enMatch?.alias || baseRoute;
    const targetEl = elMatch?.alias || enMatch?.alias || baseRoute;
    return {
      en: withBase(targetEn),
      el: withBase(targetEl === '/' ? '/el' : `/el${targetEl}`),
    };
  }

  return {
    en: withBase(baseRoute),
    el: withBase(baseRoute === '/' ? '/el' : `/el${baseRoute}`),
  };
}
