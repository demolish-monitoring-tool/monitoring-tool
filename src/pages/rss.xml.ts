import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { site, withBase } from '../data/site';

export async function GET(context: APIContext) {
  const newsItems = await getCollection('news', ({ data }) => data.status && data.langcode === 'en');
  const sorted = [...newsItems].sort(
    (a, b) => new Date(b.data.created).getTime() - new Date(a.data.created).getTime(),
  );

  return rss({
    title: `${site.name} News`,
    description: site.description,
    site: context.site ?? site.url,
    items: sorted.map((item) => ({
      title: item.data.title,
      description: item.data.summary || item.data.title,
      pubDate: new Date(item.data.created),
      link: withBase(item.data.path_alias || `/all-news/${item.data.slug}`),
    })),
  });
}
