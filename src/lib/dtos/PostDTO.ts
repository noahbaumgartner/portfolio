export interface PostSourceDTO {
	title: string;
	url: string;
}

export type PostCategory = 'project' | 'study';

export interface PostDTO {
	slug: string;
	period: string;
	title: string;
	description: string;
	icon: string;
	category: PostCategory;
	url: string;
	github?: string;
	gif?: string;
	colors: string[];
	sources?: PostSourceDTO[];
}
