<script lang="ts">
	import Image from "../Image.svelte";
	import Link from "../ui/Link.svelte";

    let { projects } = $props();

    const previewImages: Record<string, string> = {
        portfolio: '/images/projects/preview-portfolio.png',
        bettenhof: '/images/projects/preview-bettenhof.png',
        compass: '/images/projects/preview-compass.png',
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
                <a href={`/projects/${project.slug}`} data-sveltekit-preload-data class="project-card">
                    <Image src={previewImages[project.slug] ?? project.image} alt={project.title} class="project-image" />
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
        max-width: 80rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1.5rem;
    }

    .projects-header {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        width: 100%;
    }

    .projects-header :global(.link) {
        font-size: 0.875rem;
    }

    .projects-title {
        font-weight: 500;
        font-size: 1.375rem;
    }

    .project-list {
        display: flex;
        gap: 1.5rem;
        width: 100%;
    }

    @media (min-width: 640px) {
        .project-list {
            gap: 2.5rem;
        }
    }

    @media (min-width: 1024px) {
        .project-list {
            gap: 4rem;
        }
    }

    .project-card {
        display: flex;
        flex-direction: column;
        flex: 1 1 0;
        min-width: 0;
        gap: 0.75rem;
        text-decoration: none;
        color: inherit;
    }

    :global(.project-image) {
        width: 100%;
        aspect-ratio: 1;
        border-radius: 6px;
    }

    :global(.project-image)::after {
        content: '';
        position: absolute;
        inset: 0;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        background-size: 160px 160px;
        opacity: 0.35;
        mix-blend-mode: overlay;
        pointer-events: none;
    }

    .project-info {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
    }

    @media (max-width: 899px) {
        .project-list {
            overflow-x: auto;
            padding-bottom: 0.5rem;
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
        font-size: 1rem;
    }

    .project-period {
        font-size: 0.875rem;
        color: #737373;
    }
</style>
