<script lang="ts">
    let { post } = $props();
</script>

<section class="post-title-wrapper page-padding">
    <div class="post-title-box">
        <span class="post-period">{post.period}</span>
        <h1 class="post-title">{post.title}</h1>
        <p class="post-description">{post.description}</p>
    </div>

    <hr class="post-title-divider" />
</section>

<style>
    .post-title-box {
        margin-inline: auto;
        max-width: 1280px;
        padding: 56px 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .post-period {
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 4px;
    }

    .post-title {
        text-align: center;
    }

    .post-description {
        margin-top: 8px;
        max-width: 440px;
        text-align: center;
        color: var(--color-text-secondary);
    }

    .post-title-divider {
        margin-inline: auto;
        max-width: 660px;
        border: none;
        height: 1px;
        background-color: color-mix(in srgb, var(--base), var(--ink) 6%);
    }

    @media (min-width: 640px) {
        .post-title-box {
            padding: 72px 24px;
        }

        .post-title-divider {
            /* Mirrors the post content grid (TableOfContents column + gap)
               so the divider tracks the text column's width once the TOC
               sidebar squeezes it below 660px, instead of staying static. */
            max-width: min(660px, 100vw - 352px);
        }
    }

    @media (min-width: 1024px) {
        .post-title-divider {
            max-width: min(660px, 100vw - 400px);
        }
    }
</style>
