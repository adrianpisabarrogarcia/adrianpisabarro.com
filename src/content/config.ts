import { z, defineCollection } from 'astro:content';
const blogCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string().default(''),
        date: z.date().default(() => new Date()),
        category: z.string().default('Programming'),
        description: z.string().default(''),
        image: z.object({
            src: z.string().default('/assets/images/blog/default.webp'),
            alt: z.string().default(`Imagen predeterminada del artículo ${() => (undefined as unknown as { title: string }).title.toLowerCase()}`),
        }),
        duration: z.string().default('5 min read'),
        author: z.string().default('Adrián Pisabarro García'),
    })
});
export const collections = {
    'blog': blogCollection,
};