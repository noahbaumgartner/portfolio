import { error } from '@sveltejs/kit';
import { loadPosts } from '$lib/services/postService';

export const load = async () => {
	try {
		const posts = await loadPosts(4);
		return { posts };
	} catch {
		error(404, 'Not found');
	}
};
