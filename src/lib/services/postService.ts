import type { PostDTO } from '$lib/dtos/PostDTO';

type PostMetadata = Omit<PostDTO, 'slug' | 'period' | 'colors'> & {
	year: number;
	month: number;
	colors: string;
};

export async function loadPosts(limit?: number): Promise<PostDTO[]> {
	const files = import.meta.glob('../../content/posts/*', { eager: true });
	const posts = Object.entries(files)
		.map(([path, module]) => {
			const { metadata } = module as { metadata: PostMetadata };

			const slug = path.split('/').pop()?.split('.')[0] || '';
			const post: PostDTO = {
				slug,
				title: metadata.title,
				description: metadata.description,
				icon: metadata.icon,
				category: metadata.category,
				period: `${new Date(metadata.year, metadata.month - 1).toLocaleString('de-DE', { month: 'long' })} ${metadata.year}`,
				url: metadata.url,
				github: metadata.github,
				gif: metadata.gif,
				colors: metadata.colors.split(',').map((c: string) => c.trim())
			};

			return { post, year: metadata.year, month: metadata.month };
		})
		.sort((a, b) => {
			if (a.year !== b.year) {
				return b.year - a.year;
			}
			return b.month - a.month;
		})
		.map(({ post }) => post);

	return limit ? posts.slice(0, limit) : posts;
}
