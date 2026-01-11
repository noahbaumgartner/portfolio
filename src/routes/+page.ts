import { error } from '@sveltejs/kit'
import { loadProjects } from '$lib/services/projectService';

export const load = async () => {
    try {
        const projects = await loadProjects(3);
        return { projects };
    } catch (err) {
        error(404, 'Not found');
    }
}