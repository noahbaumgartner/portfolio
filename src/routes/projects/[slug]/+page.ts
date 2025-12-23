import type { ProjectDTO } from '$lib/dtos/ProjectDTO';
import { error } from '@sveltejs/kit'

export const load = async ({ params }) => {
    try {
        const page = await import(`../../../content/projects/${params.slug}.svx`)
        const { metadata } = page;
        const project: ProjectDTO = {
            slug: params.slug,
            title: metadata.title,
            description: metadata.description,
            image: `/images/projects/${params.slug}.webp`,
            period: `${new Date(metadata.year, metadata.month - 1).toLocaleString('default', { month: 'long' })} ${metadata.year}`,
            tags: metadata.tags.split(",") || [],
        }

        return { metadata: project, Content: page.default };
    } catch (err) {
        console.error(err);
        error(404, 'Not found');
    }
}