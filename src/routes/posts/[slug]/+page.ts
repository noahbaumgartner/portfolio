import type { PostDTO } from '$lib/dtos/PostDTO';
import { error } from '@sveltejs/kit'

export const load = async ({ params }) => {
    try {
        const page = await import(`../../../content/posts/${params.slug}.md`)
        const { metadata } = page;
        const post: PostDTO = {
            slug: params.slug,
            title: metadata.title,
            description: metadata.description,
            icon: metadata.icon,
            period: `${new Date(metadata.year, metadata.month - 1).toLocaleString('de-DE', { month: 'long' })} ${metadata.year}`,
            url: metadata.url || "",
            github: metadata.github || "",
            tags: metadata.tags.split(",") || [],
            colors: metadata.colors.split(",").map((c: string) => c.trim()),
        }

        return { post, Content: page.default };
    } catch (err) {
        console.error(err);
        error(404, 'Not found');
    }
}