import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const baseNodeSchema = z.looseObject({
  nid: z.number(),
  uuid: z.string(),
  type: z.string(),
  langcode: z.enum(['en', 'el']),
  title: z.string(),
  slug: z.string(),
  status: z.boolean(),
  promote: z.boolean().optional(),
  sticky: z.boolean().optional(),
  created: z.string(),
  changed: z.string(),
  internal_path: z.string().optional(),
  path_alias: z.string().nullable().optional(),
  summary: z.string().nullable().optional(),
  body_format: z.string().nullable().optional(),
});

const makeLoader = (base: string) =>
  glob({
    pattern: '**/*.{md,mdx}',
    base,
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ''),
  });

const basic_page = defineCollection({
  loader: makeLoader('./src/content/basic_page'),
  schema: baseNodeSchema,
});

const news = defineCollection({
  loader: makeLoader('./src/content/news'),
  schema: baseNodeSchema,
});

const events = defineCollection({
  loader: makeLoader('./src/content/events'),
  schema: baseNodeSchema,
});

const deliverables = defineCollection({
  loader: makeLoader('./src/content/deliverables'),
  schema: baseNodeSchema,
});

const work_packages = defineCollection({
  loader: makeLoader('./src/content/work_packages'),
  schema: baseNodeSchema,
});

const team_member = defineCollection({
  loader: makeLoader('./src/content/team_member'),
  schema: baseNodeSchema,
});

const blocks_with_icon = defineCollection({
  loader: makeLoader('./src/content/blocks_with_icon'),
  schema: baseNodeSchema,
});

export const collections = {
  basic_page,
  news,
  events,
  deliverables,
  work_packages,
  team_member,
  blocks_with_icon,
};
