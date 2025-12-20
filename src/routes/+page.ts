import { error } from '@sveltejs/kit'

interface ProjectMetadata {
    title: string;
    description: string;
}

interface ProjectModule {
    metadata: ProjectMetadata;
}

export const load = async () => {
    try {
        const files = await import.meta.glob('../lib/projects/*', { eager: true });

        const projects = Object.entries(files).map(([path, module]) => {
            const projectModule = module as ProjectModule;
            return {
                slug: path.split('/')[3].split('.')[0],
                metadata: projectModule.metadata
            };
        });

        return { projects, files };
    } catch (err) {
        error(404, 'Not found');
    }
}