import { error } from '@sveltejs/kit'
import { loadPosts } from '$lib/services/postService';

export const load = async () => {
    try {
        const posts = await loadPosts();
        return { posts };
    } catch (err) {
        error(404, 'Not found');
    }
}