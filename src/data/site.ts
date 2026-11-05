import siteData from './site.json';
import pathAliases from './path_aliases.json';

export const site = {
  name: siteData.site.name || 'demolish',
  slogan: siteData.site.slogan || '',
  description:
    'DeMoLiSH: Fighting Bias, Building Bridges — an innovative, multidisciplinary research project addressing hate speech and xenophobia in Greece.',
  email: siteData.site.mail || 'alkolovou@athenarc.gr',
  url: 'https://demolish.gr',
  logo: '/files/path_newFont_bold.png',
  favicon: '/files/favicon_0.png',
  facebook: 'https://www.facebook.com/profile.php?id=61555622441328',
  twitter: 'https://twitter.com/DemolishProject',
} as const;

export type LangCode = 'en' | 'el';

/**
 * Localizes an internal URL for the given language ('en' or 'el').
 */
export function localizeUrl(url: string, lang: LangCode): string {
  if (!url || url === '#' || url.startsWith('http://') || url.startsWith('https://')) {
    return url || '#';
  }
  const clean = url.startsWith('/el/')
    ? url.slice(3)
    : url === '/el'
      ? '/'
      : url.startsWith('/')
        ? url
        : `/${url}`;

  if (lang === 'el') {
    return clean === '/' ? '/el' : `/el${clean}`;
  }
  return clean;
}

/**
 * Given the current pathname, returns the equivalent URL in English and Greek.
 */
export function getLanguageSwitchUrls(pathname: string): { en: string; el: string } {
  const normalized = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
  const isEl = normalized === '/el' || normalized.startsWith('/el/');
  const basePath = isEl ? (normalized === '/el' ? '/' : normalized.slice(3)) : normalized || '/';

  const matchedAlias = pathAliases.find((a) => a.alias === basePath);
  if (matchedAlias) {
    const enMatch = pathAliases.find((a) => a.path === matchedAlias.path && a.langcode === 'en');
    const elMatch = pathAliases.find((a) => a.path === matchedAlias.path && a.langcode === 'el');
    const targetEn = enMatch?.alias || basePath;
    const targetEl = elMatch?.alias || enMatch?.alias || basePath;
    return {
      en: targetEn,
      el: targetEl === '/' ? '/el' : `/el${targetEl}`,
    };
  }

  return {
    en: basePath,
    el: basePath === '/' ? '/el' : `/el${basePath}`,
  };
}
