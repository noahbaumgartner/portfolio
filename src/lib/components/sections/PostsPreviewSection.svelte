<script lang="ts">
	import { Compass, Wheat, PersonStanding, PartyPopper, Scale } from '@lucide/svelte';
	import MeshGradient from "../MeshGradient.svelte";
	import Link from "../ui/Link.svelte";

    let { posts } = $props();

    const icons: Record<string, any> = {
        compass: Compass,
        wheat: Wheat,
        'person-standing': PersonStanding,
        'party-popper': PartyPopper,
        scale: Scale,
    };
</script>

<section class="posts-wrapper page-padding section-gap">
    <div class="posts">
        <div class="posts-header">
            <h2 class="posts-title">Beiträge</h2>
            <Link href="/posts">Alle Beiträge</Link>
        </div>

        <div class="post-list">
            {#each posts.slice(0, 4) as post}
                {@const Icon = icons[post.icon]}
                <a href={`/posts/${post.slug}`} data-sveltekit-preload-data class="post-card">
                    <div class="post-image-wrap">
                        <MeshGradient colors={post.colors} seed={post.title} class="post-image" />
                        {#if Icon}
                            <div class="post-icon-badge">
                                <Icon size={20} />
                            </div>
                        {/if}
                    </div>
                    <div class="post-info">
                        <p class="post-headline"><span class="post-title">{post.title}:</span> {post.description}</p>
                        <span class="post-period">{post.period}</span>
                    </div>
                </a>
            {/each}
        </div>
    </div>
</section>

<style>
    .posts {
        margin-inline: auto;
        max-width: 1280px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 24px;
    }

    .posts-header {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        width: 100%;
    }

    .posts-header :global(.link) {
        font-size: 14px;
    }

    .posts-title {
        font-weight: 500;
        font-size: 22px;
    }

    .post-list {
        display: flex;
        gap: 24px;
        width: 100%;
    }

    @media (min-width: 640px) {
        .post-list {
            gap: 40px;
        }
    }

    @media (min-width: 1024px) {
        .post-list {
            gap: 64px;
        }
    }

    .post-card {
        display: flex;
        flex-direction: column;
        flex: 1 1 0;
        min-width: 0;
        gap: 20px;
        text-decoration: none;
        color: inherit;
    }

    .post-image-wrap {
        position: relative;
        width: 100%;
    }

    .post-image-wrap::before {
        content: '';
        display: block;
        padding-top: 100%;
    }

    .post-icon-badge {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background-color: var(--color-ink);
        border-radius: 6px 0 0 0;
    }

    .post-icon-badge :global(svg) {
        width: 20px;
        height: 20px;
        color: var(--color-base);
    }

    :global(.post-image) {
        position: absolute !important;
        inset: 0;
        width: 100%;
        height: 100%;
        border-radius: 6px;
    }

    :global(.post-image)::after {
        content: '';
        position: absolute;
        inset: 0;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        background-size: 160px 160px;
        opacity: 0.55;
        mix-blend-mode: overlay;
        pointer-events: none;
    }

    .post-info {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    @media (max-width: 899px) {
        .post-list {
            overflow-x: auto;
            padding-bottom: 8px;
            scrollbar-width: none;
        }

        .post-list::-webkit-scrollbar {
            display: none;
        }

        .post-card {
            flex: 0 0 auto;
            width: 250px;
        }
    }

    .post-headline {
        font-size: 16px;
    }

    .post-title {
        font-family: 'Outfit', sans-serif;
        font-weight: 500;
    }

    .post-period {
        font-size: 14px;
        color: var(--color-text-muted);
    }
</style>
