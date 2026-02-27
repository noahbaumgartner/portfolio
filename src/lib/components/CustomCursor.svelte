<script lang="ts">
	import { onMount } from 'svelte';

	let x = $state(0);
	let y = $state(0);
	let hovering = $state(false);
	let visible = $state(false);

	onMount(() => {
		const handleMouseMove = (e: MouseEvent) => {
			x = e.clientX;
			y = e.clientY;
			if (!visible) visible = true;
		};

		const handleMouseOver = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			hovering = !!target.closest('a, button, [role="button"], input, select, textarea, label');
		};

		const handleMouseLeave = () => {
			visible = false;
		};

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseover', handleMouseOver);
		document.addEventListener('mouseleave', handleMouseLeave);

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseover', handleMouseOver);
			document.removeEventListener('mouseleave', handleMouseLeave);
		};
	});
</script>

{#if visible}
	<div class="cursor" class:hovering style="transform: translate({x}px, {y}px)"></div>
{/if}

<style>
	.cursor {
		position: fixed;
		top: -5px;
		left: -5px;
		width: 10px;
		height: 10px;
		background-color: #9dc83a;
		pointer-events: none;
		z-index: 9999;
		transition: box-shadow 0.15s ease;
		will-change: transform;
	}

	.cursor.hovering {
		box-shadow: 0 0 0 5px rgba(157, 200, 58, 0.5);
	}
</style>
