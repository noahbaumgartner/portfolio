import type { PostDTO } from '$lib/dtos/PostDTO';
import { loadPosts } from '$lib/services/postService';
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
            gif: metadata.gif || "",
            colors: metadata.colors.split(",").map((c: string) => c.trim()),
        }

        const posts = await loadPosts();
        const index = posts.findIndex((p) => p.slug === params.slug);
        const previous = index > 0 ? posts[index - 1] : undefined;
        const next = index >= 0 && index < posts.length - 1 ? posts[index + 1] : undefined;

        return { post, Content: page.default, previous, next };
    } catch (err) {
        console.error(err);
        error(404, 'Not found');
    }
}