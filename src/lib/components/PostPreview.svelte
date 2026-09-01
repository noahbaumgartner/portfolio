<script lang="ts">
    import type { PostDTO } from '$lib/dtos/PostDTO';
    import { Compass, Wheat, PersonStanding, PartyPopper, Scale, Search, Car, Image } from '@lucide/svelte';
    import MeshGradient from './MeshGradient.svelte';

    let { post }: { post: PostDTO } = $props();

    const icons: Record<string, any> = {
        compass: Compass,
        wheat: Wheat,
        'person-standing': PersonStanding,
        'party-popper': PartyPopper,
        scale: Scale,
        search: Search,
        car: Car,
        image: Image,
    };

    const Icon = $derived(icons[post.icon]);
</script>

<a href={`/posts/${post.slug}`} data-sveltekit-preload-data class="preview">
    <div class="preview-inner">
        <div class="preview-image-wrap">
            <MeshGradient colors={post.colors} seed={post.title} class="preview-image" />
            {#if Icon}
                <div class="preview-icon-badge">
                    <Icon size={20} />
                </div>
            {/if}
        </div>
        <div class="preview-info">
            <p class="preview-headline"><span class="preview-title">{post.title}:</span> {post.description}</p>
            <span class="preview-period">{post.period}</span>
        </div>
    </div>
</a>

<style>
    .preview {
        display: block;
        text-decoration: none;
        color: inherit;
        user-select: none;
        border-radius: 6px;
        outline: none;
    }

    .preview:focus-visible {
        outline: 2px solid var(--color-ink);
        outline-offset: 2px;
    }

    .preview-inner {
        display: flex;
        align-items: center;
        gap: 20px;
    }

    .preview-image-wrap {
        position: relative;
        width: 140px;
        flex-shrink: 0;
        overflow: hidden;
        border-radius: 6px;
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
        background-color: var(--color-ink);
        border-radius: 6px 0 0 0;
    }

    .preview-icon-badge :global(svg) {
        width: 16px;
        height: 16px;
        color: var(--color-base);
    }

    :global(.preview-image) {
        position: absolute !important;
        inset: 0;
        width: 100%;
        height: 100%;
        border-radius: 6px;
        transition: transform 0.3s ease;
    }

    .preview:hover :global(.preview-image) {
        transform: scale(1.05);
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
        font-family: 'Outfit', sans-serif;
        font-weight: 500;
    }

    .preview-period {
        font-size: 14px;
        color: var(--color-text-muted);
    }

    @media (min-width: 640px) {
        .preview-image-wrap {
            width: 168px;
        }
    }
</style>
