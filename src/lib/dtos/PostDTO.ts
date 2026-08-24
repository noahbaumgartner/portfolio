export interface PostSourceDTO {
    title: string;
    url: string;
}

export interface PostDTO {
    slug: string;
    period: string;
    title: string;
    description: string;
    icon: string;
    url: string;
    github?: string;
    gif?: string;
    colors: string[];
    sources?: PostSourceDTO[];
}