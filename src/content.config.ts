import { defineCollection } from 'astro:content';

import { glob } from 'astro/loaders';

import { z } from 'astro/zod';

import { discordStatsLoader } from './loaders/discord';

const statSchema = z.object({
  label: z.string(),
  value: z.string(),
  order: z.number(),
});

export const collections = {
  blog: defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      date: z.string(),
      author: z.string(),
      topics: z.array(z.string()),
      readTime: z.string(),
    }),
  }),
  projects: defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
    schema: z.object({
      name: z.string(),
      desc: z.string(),
      tech: z.string(),
      status: z.enum(['Active', 'Beta', 'Planning']),
      members: z.number(),
      leads: z.array(z.string()).default([]),
      order: z.number(),
    }),
  }),
  leadership: defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/leadership' }),
    schema: z.object({
      name: z.string(),
      role: z.string(),
      focus: z.string(),
      email: z.string(),
      order: z.number(),
    }),
  }),
  stats: defineCollection({
    loader: glob({ pattern: '**/*.json', base: './src/content/stats' }),
    schema: statSchema,
  }),
  discordStats: defineCollection({
    loader: discordStatsLoader(),
    schema: statSchema,
  }),
  sponsors: defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/sponsors' }),
    schema: z.object({
      name: z.string(),
      tier: z.enum(['Gold', 'Silver', 'Bronze']),
      logo: z.string(),
      order: z.number(),
    }),
  }),
};
