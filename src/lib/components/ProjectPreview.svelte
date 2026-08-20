<script lang="ts">
    import type { ProjectDTO } from '$lib/dtos/ProjectDTO';
    import { ArrowUpRight } from '@lucide/svelte';
    import Tag from './ui/Tag.svelte';
    import Image from './Image.svelte';

    let { project, featured = false }: { project: ProjectDTO; featured?: boolean } = $props();
</script>

<a href={`/projects/${project.slug}`} data-sveltekit-preload-data class="preview" class:preview--featured={featured}>
    <div class="preview-image-wrap">
        <Image src={project.image} alt={project.title} class="preview-image" />
    </div>
    <div class="preview-info">
        <Tag>{project.period}</Tag>
        <div class="preview-heading">
            <h2 class="preview-title">{project.title}</h2>
            <ArrowUpRight class="preview-arrow" />
        </div>
        <p class="preview-description">{project.description}</p>
    </div>
</a>

<style>
    .preview {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 24px;
        text-decoration: none;
        color: inherit;
    }

    .preview:not(:last-child) {
        border-bottom: 1px solid #e5e5e5;
    }

    .preview-image-wrap {
        position: relative;
        width: 100%;
    }

    .preview-image-wrap::before {
        content: '';
        display: block;
        padding-top: 100%;
    }

    :global(.preview-image) {
        position: absolute !important;
        inset: 0;
        width: 100%;
        height: 100%;
        border-radius: 6px;
    }

    :global(.preview-image) :global(img) {
        filter: grayscale(1);
        transition: filter 300ms ease;
    }

    .preview:hover :global(.preview-image) :global(img) {
        filter: grayscale(0);
    }

    .preview-info {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .preview-heading {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .preview-title {
        font-weight: 600;
    }

    .preview :global(.preview-arrow) {
        width: 20px;
        height: 20px;
        transition: transform 200ms ease;
    }

    .preview:hover :global(.preview-arrow) {
        transform: translate(2px, -2px);
    }

    .preview-description {
        max-width: 560px;
        color: #404040;
    }

    @media (min-width: 768px) {
        .preview {
            flex-direction: row;
            align-items: center;
            gap: 40px;
            padding: 32px;
        }

        .preview-image-wrap {
            flex-shrink: 0;
            width: 320px;
        }

        .preview--featured .preview-image-wrap {
            width: 400px;
        }
    }
</style>
