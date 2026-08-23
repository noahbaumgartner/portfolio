<script lang="ts">
    import { Pause, Play, Github, Globe } from '@lucide/svelte';
    import Button from '$lib/components/ui/Button.svelte';

    let { post } = $props();

    let videoEl: HTMLVideoElement | undefined = $state();
    let gifEl: HTMLImageElement | undefined = $state();
    let canvasEl: HTMLCanvasElement | undefined = $state();
    let playing = $state(true);

    let mediaType = $derived(
        /\.gif$/i.test(post.gif ?? '')
            ? 'gif'
            : /\.(png|jpe?g|webp|avif)$/i.test(post.gif ?? '')
              ? 'image'
              : 'video'
    );

    function toggle() {
        if (mediaType === 'video') {
            if (!videoEl) return;
            if (playing) {
                videoEl.pause();
            } else {
                videoEl.play();
            }
        } else if (mediaType === 'gif') {
            if (playing && gifEl && canvasEl) {
                canvasEl.width = gifEl.naturalWidth;
                canvasEl.height = gifEl.naturalHeight;
                canvasEl.getContext('2d')?.drawImage(gifEl, 0, 0);
            }
        }
        playing = !playing;
    }
</script>

<section class="post-title-wrapper page-padding">
    <div class="post-title-box">
        <span class="post-period">{post.period}</span>
        <h1 class="post-title">{post.title}</h1>
        <p class="post-description">{post.description}</p>

        {#if post.gif}
            <div class="post-gif">
                {#if mediaType === 'image'}
                    <img class="post-gif-video" src={post.gif} alt={post.title} />
                {:else if mediaType === 'video'}
                    <video
                        bind:this={videoEl}
                        class="post-gif-video"
                        src={post.gif}
                        autoplay
                        loop
                        muted
                        playsinline
                    ></video>
                {:else}
                    <img
                        bind:this={gifEl}
                        class="post-gif-video"
                        src={post.gif}
                        alt={post.title}
                        style:display={playing ? 'block' : 'none'}
                    />
                    <canvas
                        bind:this={canvasEl}
                        class="post-gif-video"
                        style:display={playing ? 'none' : 'block'}
                    ></canvas>
                {/if}

                {#if mediaType !== 'image'}
                    <button
                        type="button"
                        class="post-gif-toggle"
                        onclick={toggle}
                        aria-label={playing ? 'Pausieren' : 'Abspielen'}
                    >
                        {#if playing}
                            <Pause class="post-gif-toggle-icon" />
                        {:else}
                            <Play class="post-gif-toggle-icon" />
                        {/if}
                    </button>
                {/if}
            </div>
        {/if}
    </div>

    <div class="post-title-footer">
        <hr class="post-title-divider" />
        {#if post.github || post.url}
            <div class="post-title-actions">
                {#if post.github}
                    <Button variant="ghost" size="md" icon={Github} href={post.github} />
                {/if}
                {#if post.url}
                    <Button variant="ghost" size="md" icon={Globe} href={post.url} />
                {/if}
            </div>
        {/if}
    </div>
</section>

<style>
    .post-title-box {
        margin-inline: auto;
        max-width: 1280px;
        padding: 56px 0 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        user-select: none;
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

    .post-title-footer {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-inline: auto;
        max-width: 660px;
    }

    .post-title-divider {
        flex: 1;
        min-width: 0;
        border: none;
        height: 1px;
        background-color: color-mix(in srgb, var(--base), var(--ink) 6%);
    }

    .post-title-actions {
        display: flex;
        align-items: center;
        gap: 2px;
        flex-shrink: 0;
    }

    .post-gif {
        position: relative;
        width: 100%;
        max-width: 1000px;
        margin-inline: auto;
        aspect-ratio: 15 / 8;
        margin-top: 30px;
        overflow: hidden;
        border: 1px solid var(--color-border);
        border-radius: 10px;
        background-color: var(--color-surface);
    }

    .post-gif-video {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .post-gif-toggle {
        position: absolute;
        top: 12px;
        right: 12px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: 36px;
        height: 36px;
        border: none;
        border-radius: 50%;
        background-color: color-mix(in srgb, var(--color-surface) 70%, transparent);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        color: var(--color-text);
        outline: none;
        cursor: pointer;
        user-select: none;
        transition: background-color 200ms ease, color 200ms ease;
    }

    .post-gif-toggle:hover {
        background-color: color-mix(in srgb, var(--color-surface) 85%, transparent);
    }

    .post-gif-toggle:focus-visible {
        box-shadow: 0 0 0 2px var(--color-bg), 0 0 0 4px var(--color-ink);
    }

    .post-gif-toggle :global(.post-gif-toggle-icon) {
        width: 16px;
        height: 16px;
    }

    @media (min-width: 640px) {
        .post-title-box {
            padding: 72px 0 40px;
        }

        .post-gif {
            margin-top: 40px;
        }

        .post-title-footer {
            /* Mirrors the post content grid (TableOfContents column + gap)
               so the divider tracks the text column's width once the TOC
               sidebar squeezes it below 660px, instead of staying static. */
            max-width: min(660px, 100vw - 352px);
        }
    }

    @media (min-width: 1024px) {
        .post-title-box {
            padding-bottom: 64px;
        }

        .post-gif {
            margin-top: 64px;
        }

        .post-title-footer {
            max-width: min(660px, 100vw - 400px);
        }
    }
</style>
