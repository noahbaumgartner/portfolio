import { error } from '@sveltejs/kit'

interface ProjectMetadata {
    slug: string;
    title: string;
    description: string;
    image: string;
}

export const load = async () => {
    try {
        const files = await import.meta.glob('../../lib/projects/*', { eager: true });
        const projects = Object.entries(files).map(([path, module]) => {
            const { metadata: projectMetadata } = module as { metadata: ProjectMetadata };
            projectMetadata.slug = path.split('/')[4].split('.')[0];
            projectMetadata.image = `/images/projects/${projectMetadata.slug}.webp`;
            return projectMetadata;
        });

        return { projects };
    } catch (err) {
        error(404, 'Not found');
    }
}