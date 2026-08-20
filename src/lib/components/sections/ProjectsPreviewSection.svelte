<script lang="ts">
	import { Compass, Wheat, PersonStanding, PartyPopper } from '@lucide/svelte';
	import Image from "../Image.svelte";
	import Link from "../ui/Link.svelte";

    let { projects } = $props();

    const previewImages: Record<string, string> = {
        portfolio: '/images/projects/preview-portfolio.png',
        bettenhof: '/images/projects/preview-bettenhof.png',
        compass: '/images/projects/preview-compass.png',
    };

    const icons: Record<string, any> = {
        compass: Compass,
        wheat: Wheat,
        'person-standing': PersonStanding,
        'party-popper': PartyPopper,
    };
</script>

<section class="projects-wrapper page-padding section-gap">
    <div class="projects">
        <div class="projects-header">
            <h2 class="projects-title">Projekte</h2>
            <Link href="/projects">Alle Projekte</Link>
        </div>

        <div class="project-list">
            {#each projects.slice(0, 4) as project}
                {@const Icon = icons[project.icon]}
                <a href={`/projects/${project.slug}`} data-sveltekit-preload-data class="project-card">
                    <div class="project-image-wrap">
                        <Image src={previewImages[project.slug] ?? project.image} alt={project.title} class="project-image" />
                        {#if Icon}
                            <div class="project-icon-badge">
                                <Icon size={20} />
                            </div>
                        {/if}
                    </div>
                    <div class="project-info">
                        <span class="project-title">{project.title}</span>
                        <span class="project-period">{project.period}</span>
                    </div>
                </a>
            {/each}
        </div>
    </div>
</section>

<style>
    .projects {
        margin-inline: auto;
        max-width: 1280px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 24px;
    }

    .projects-header {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        width: 100%;
    }

    .projects-header :global(.link) {
        font-size: 14px;
    }

    .projects-title {
        font-weight: 500;
        font-size: 22px;
    }

    .project-list {
        display: flex;
        gap: 24px;
        width: 100%;
    }

    @media (min-width: 640px) {
        .project-list {
            gap: 40px;
        }
    }

    @media (min-width: 1024px) {
        .project-list {
            gap: 64px;
        }
    }

    .project-card {
        display: flex;
        flex-direction: column;
        flex: 1 1 0;
        min-width: 0;
        gap: 12px;
        text-decoration: none;
        color: inherit;
    }

    .project-image-wrap {
        position: relative;
    }

    .project-icon-badge {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background-color: #000;
        border-radius: 6px 0 0 0;
    }

    .project-icon-badge :global(svg) {
        width: 20px;
        height: 20px;
        color: #fff;
    }

    :global(.project-image) {
        width: 100%;
        aspect-ratio: 1;
        border-radius: 6px;
    }

    :global(.project-image) :global(img) {
        filter: brightness(0.85);
        transition: transform 300ms ease;
    }

    .project-card:hover :global(.project-image) :global(img) {
        transform: scale(1.2);
    }

    :global(.project-image)::after {
        content: '';
        position: absolute;
        inset: 0;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        background-size: 160px 160px;
        opacity: 0.55;
        mix-blend-mode: overlay;
        pointer-events: none;
    }

    .project-info {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    @media (max-width: 899px) {
        .project-list {
            overflow-x: auto;
            padding-bottom: 8px;
            scrollbar-width: none;
        }

        .project-list::-webkit-scrollbar {
            display: none;
        }

        .project-card {
            flex: 0 0 auto;
            width: 250px;
        }

        :global(.project-image) {
            width: 250px;
            height: 250px;
            aspect-ratio: auto;
        }
    }

    .project-title {
        font-family: 'Google Sans', sans-serif;
        font-weight: 500;
        font-size: 16px;
    }

    .project-period {
        font-size: 14px;
        color: #737373;
    }
</style>
