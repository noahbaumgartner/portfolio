import { error } from '@sveltejs/kit'

export const load = async ({ params }) => {
    try {
        const project = await import(`../../../lib/projects/${params.slug}.svx`)

        return {
            Content: project.default,
            metadata: { ...project.metadata, slug: params.slug }
        }
    } catch (err) {
        error(404, 'Not found');
    }
}