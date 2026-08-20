<script lang="ts">
    import type { ProjectDTO } from '$lib/dtos/ProjectDTO';
    import { Compass, Wheat, PersonStanding, PartyPopper } from '@lucide/svelte';
    import Image from './Image.svelte';

    let { project }: { project: ProjectDTO } = $props();

    const previewImages: Record<string, string> = {
        portfolio: '/images/projects/preview-portfolio.png',
        bettenhof: '/images/projects/preview-bettenhof.png',
        compass: '/images/projects/preview-compass.png',
        stvk100: '/images/projects/preview-stvk100.png',
    };

    const icons: Record<string, any> = {
        compass: Compass,
        wheat: Wheat,
        'person-standing': PersonStanding,
        'party-popper': PartyPopper,
    };

    const Icon = $derived(icons[project.icon]);
</script>

<a href={`/projects/${project.slug}`} data-sveltekit-preload-data class="preview">
    <div class="preview-image-wrap">
        <Image src={previewImages[project.slug] ?? project.image} alt={project.title} class="preview-image" />
        {#if Icon}
            <div class="preview-icon-badge">
                <Icon size={20} />
            </div>
        {/if}
    </div>
    <div class="preview-info">
        <p class="preview-headline"><span class="preview-title">{project.title}:</span> {project.description}</p>
        <span class="preview-period">{project.period}</span>
    </div>
</a>

<style>
    .preview {
        display: flex;
        align-items: center;
        gap: 20px;
        text-decoration: none;
        color: inherit;
    }

    .preview-image-wrap {
        position: relative;
        width: 140px;
        flex-shrink: 0;
    }

    .preview-image-wrap::before {
        content: '';
        display: block;
        padding-top: 100%;
    }

    .preview-icon-badge {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        background-color: #000;
        border-radius: 6px 0 0 0;
    }

    .preview-icon-badge :global(svg) {
        width: 16px;
        height: 16px;
        color: #fff;
    }

    :global(.preview-image) {
        position: absolute !important;
        inset: 0;
        width: 100%;
        height: 100%;
        border-radius: 6px;
    }

    :global(.preview-image) :global(img) {
        filter: brightness(0.85);
        transition: transform 300ms ease;
    }

    .preview:hover :global(.preview-image) :global(img) {
        transform: scale(1.2);
    }

    :global(.preview-image)::after {
        content: '';
        position: absolute;
        inset: 0;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        background-size: 160px 160px;
        opacity: 0.55;
        mix-blend-mode: overlay;
        pointer-events: none;
    }

    .preview-info {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .preview-headline {
        font-size: 16px;
    }

    .preview-title {
        font-family: 'Google Sans', sans-serif;
        font-weight: 500;
    }

    .preview-period {
        font-size: 14px;
        color: #737373;
    }

    @media (min-width: 640px) {
        .preview-image-wrap {
            width: 168px;
        }
    }
</style>
