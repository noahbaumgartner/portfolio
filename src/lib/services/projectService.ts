import type { ProjectDTO } from '$lib/dtos/ProjectDTO';

export async function loadProjects(limit?: number): Promise<ProjectDTO[]> {
    const files = import.meta.glob('../../content/projects/*', { eager: true });
    const projects = Object.entries(files).map(([path, module]) => {
        const { metadata } = module as { metadata: any };

        const slug = path.split('/').pop()?.split('.')[0] || '';
        const project: ProjectDTO = {
            slug,
            title: metadata.title,
            description: metadata.description,
            image: `/images/projects/${slug}.webp`,
            period: `${new Date(metadata.year, metadata.month - 1).toLocaleString('default', { month: 'long' })} ${metadata.year}`,
            url: metadata.url,
            tags: metadata.tags.split(",") || [],
        }

        return { ...project, year: metadata.year, month: metadata.month };
    }).sort((a, b) => {
        if (a.year !== b.year) {
            return b.year - a.year;
        }
        return b.month - a.month;
    }).map(({ year, month, ...project }) => project);

    return limit ? projects.slice(0, limit) : projects;
}
