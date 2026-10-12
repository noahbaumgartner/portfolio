<script lang="ts">
	let { icon: Icon, label, onclick, class: className } = $props();
</script>

<button type="button" class={['overlay-button', className]} {onclick} aria-label={label}>
	<Icon class="overlay-button-icon" />
</button>

<style>
	.overlay-button {
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
		transition:
			background-color 200ms ease,
			opacity 200ms ease;
	}

	.overlay-button:hover {
		background-color: color-mix(in srgb, var(--color-surface) 85%, transparent);
	}

	.overlay-button:focus-visible {
		outline: 2px solid var(--color-ink);
		outline-offset: 2px;
	}

	.overlay-button :global(.overlay-button-icon) {
		width: 16px;
		height: 16px;
	}
</style>
