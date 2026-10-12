<script lang="ts">
	import { Pause, Play } from '@lucide/svelte';
	import OverlayButton from '../../primitives/overlay-button/OverlayButton.svelte';

	let { src, alt = '', aspectRatio = '15 / 8' } = $props();

	let videoEl: HTMLVideoElement | undefined = $state();
	let gifEl: HTMLImageElement | undefined = $state();
	let canvasEl: HTMLCanvasElement | undefined = $state();
	let playing = $state(true);

	let mediaType = $derived(
		/\.gif$/i.test(src ?? '')
			? 'gif'
			: /\.(png|jpe?g|webp|avif)$/i.test(src ?? '')
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

<div class="media-preview" style:--media-preview-aspect-ratio={aspectRatio}>
	{#if mediaType === 'image'}
		<img class="media-preview-content" {src} {alt} />
	{:else if mediaType === 'video'}
		<video bind:this={videoEl} class="media-preview-content" {src} autoplay loop muted playsinline
		></video>
	{:else}
		<img
			bind:this={gifEl}
			class="media-preview-content"
			{src}
			{alt}
			style:display={playing ? 'block' : 'none'}
		/>
		<canvas
			bind:this={canvasEl}
			class="media-preview-content"
			style:display={playing ? 'none' : 'block'}
		></canvas>
	{/if}

	{#if mediaType !== 'image'}
		<OverlayButton
			icon={playing ? Pause : Play}
			label={playing ? 'Pausieren' : 'Abspielen'}
			onclick={toggle}
			class="media-preview-toggle"
		/>
	{/if}
</div>

<style>
	.media-preview {
		position: relative;
		width: 100%;
		aspect-ratio: var(--media-preview-aspect-ratio);
		overflow: hidden;
		border: 1px solid var(--color-border);
		border-radius: 10px;
		background-color: var(--color-surface);
		box-shadow: 0 12px 32px -12px rgba(0, 0, 0, 0.25);
	}

	.media-preview-content {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	:global(.media-preview-toggle) {
		position: absolute;
		top: 12px;
		right: 12px;
	}
</style>
