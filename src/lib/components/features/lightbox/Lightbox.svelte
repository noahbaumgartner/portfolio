<script lang="ts">
	import { fade } from 'svelte/transition';
	import { X } from '@lucide/svelte';
	import OverlayButton from '../../primitives/overlay-button/OverlayButton.svelte';

	let {
		src,
		alt = '',
		onclose
	}: {
		src?: string;
		alt?: string;
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
			<img {src} {alt} class="lightbox-img" />
			<OverlayButton
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
		padding-block: 32px;
		padding-inline: 16px;
		background-color: color-mix(in srgb, var(--base) 60%, transparent);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border: none;
		cursor: zoom-out;
	}

	@media (min-width: 640px) {
		.lightbox-overlay {
			padding-block: 64px;
			padding-inline: 48px;
		}
	}

	@media (min-width: 1024px) {
		.lightbox-overlay {
			padding: 96px;
		}
	}

	.lightbox-frame {
		position: relative;
		display: inline-flex;
		max-width: 100%;
		max-height: 100%;
	}

	.lightbox-img {
		display: block;
		max-width: 100%;
		max-height: 100%;
		border: 1px solid var(--color-border);
		border-radius: 16px;
		box-shadow: 0 12px 32px -12px rgba(0, 0, 0, 0.25);
	}

	:global(.lightbox-close) {
		position: absolute;
		right: 12px;
		bottom: 12px;
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
