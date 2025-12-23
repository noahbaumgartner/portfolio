import type { ProjectDTO } from '$lib/dtos/ProjectDTO';
import { error } from '@sveltejs/kit'

export const load = async () => {
    try {
        const files = await import.meta.glob('../content/projects/*', { eager: true });
        const projects = Object.entries(files).map(([path, module]) => {
            const { metadata } = module as { metadata: any };

            const slug = path.split('/')[3].split('.')[0];
            const project: ProjectDTO = {
                slug,
                title: metadata.title,
                description: metadata.description,
                image: `/images/projects/${slug}.webp`,
                period: `${new Date(metadata.year, metadata.month - 1).toLocaleString('default', { month: 'long' })} ${metadata.year}`,
                tags: metadata.tags.split(",") || [],
            }

            return project;
        });

        return { projects };
    } catch (err) {
        error(404, 'Not found');
    }
}