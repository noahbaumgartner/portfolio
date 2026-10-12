<script lang="ts">
	import { fade } from 'svelte/transition';
	import { X } from '@lucide/svelte';
	import { Button } from '@noahbaumgartner/svelte-ui';

	let {
		src,
		alt = '',
		aspect,
		onclose
	}: {
		src?: string;
		alt?: string;
		/** width / height of the image; needed for SVGs without intrinsic size */
		aspect?: number;
		onclose: () => void;
	} = $props();
</script>

<svelte:window
	onkeydown={(event) => {
		if (event.key === 'Escape') onclose();
	}}
	onscroll={() => {
		if (src) onclose();
	}}
/>

{#if src}
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div
		class="lightbox-overlay"
		role="dialog"
		aria-modal="true"
		aria-label="Bild"
		onclick={onclose}
		in:fade={{ duration: 200 }}
		out:fade={{ duration: 100 }}
	>
		<div class="lightbox-frame">
			<img {src} {alt} class="lightbox-img" style:--aspect={aspect} />
			<Button
				variant="overlay"
				size="lg"
				icon={X}
				label="Schliessen"
				class="lightbox-close"
				onclick={(event) => {
					event.stopPropagation();
					onclose();
				}}
			/>
		</div>
	</div>
{/if}

<style>
	.lightbox-overlay {
		position: fixed;
		inset: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-block: var(--lightbox-pad-block);
		padding-inline: var(--lightbox-pad-inline);
		background-color: color-mix(in srgb, var(--color-bg) 60%, transparent);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border: none;
		cursor: zoom-out;
	}

	@media (min-width: 640px) {
		.lightbox-overlay {
			--lightbox-pad-block: 64px;
			--lightbox-pad-inline: 48px;
		}
	}

	@media (min-width: 1024px) {
		.lightbox-overlay {
			--lightbox-pad-block: 96px;
			--lightbox-pad-inline: 96px;
		}
	}

	.lightbox-frame {
		position: relative;
		display: block;
		width: 100%;
		max-width: 100%;
		text-align: center;
	}

	.lightbox-img {
		display: block;
		margin-inline: auto;
		max-width: 100%;
		max-height: calc(100dvh - 2 * var(--lightbox-pad-block));
		width: auto;
		height: auto;
		aspect-ratio: var(--aspect, auto);
		/* images without intrinsic size (SVG with only a viewBox) need an explicit width */
		min-width: min(100%, calc((100dvh - 2 * var(--lightbox-pad-block)) * var(--aspect, 0)));
		border: 1px solid var(--color-border);
		border-radius: 16px;
		box-shadow: 0 12px 32px -12px rgba(0, 0, 0, 0.25);
	}

	:global(.lightbox-close) {
		position: absolute;
		top: 12px;
		right: 12px;
		opacity: 0;
	}

	:global(.lightbox-close:focus-visible) {
		opacity: 1;
	}

	@media (hover: hover) {
		.lightbox-frame:hover :global(.lightbox-close) {
			opacity: 1;
		}
	}
</style>
