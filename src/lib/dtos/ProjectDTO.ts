export interface ProjectDTO {
    slug: string;
    period: string;
    title: string;
    description: string;
    image: string;
    icon: string;
    url: string;
    github?: string;
    tags: string[];
}