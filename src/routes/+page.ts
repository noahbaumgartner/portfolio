import type { ProjectDTO } from '$lib/dtos/ProjectDTO';
import { error } from '@sveltejs/kit'

export const load = async () => {
    try {
        const files = await import.meta.glob('../lib/projects/*', { eager: true });
        const projects = Object.entries(files).map(([path, module]) => {
            const { metadata: project } = module as { metadata: ProjectDTO };
            project.slug = path.split('/')[3].split('.')[0];
            project.image = `/images/projects/${project.slug}.webp`;
            return project;
        });

        return { projects };
    } catch (err) {
        error(404, 'Not found');
    }
}