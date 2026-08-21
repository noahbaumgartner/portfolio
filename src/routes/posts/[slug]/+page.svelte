<script>
	import MeshGradient from '$lib/components/MeshGradient.svelte';
	import PostTitleSection from '$lib/components/sections/PostTitleSection.svelte';
	import Section from '$lib/components/sections/Section.svelte';

	let { data } = $props();
	let { Content, post } = $derived(data);
</script>

<PostTitleSection {post} />
<Section class="post-content">
	<div class="post-body">
		<Content />
	</div>
	<MeshGradient colors={post.colors} seed={post.title} class="post-hero-image" />
</Section>

<style>
	:global(.post-content) {
		display: flex;
		flex-direction: column;
		padding: 24px;
		gap: 32px;
	}

	.post-body {
		flex-grow: 1;
	}

	.post-body :global(h2) {
		margin-bottom: 8px;
	}

	.post-body :global(h2:not(:first-child)) {
		margin-top: 16px;
	}

	.post-body :global(p) {
		line-height: 1.6;
	}

	:global(.post-hero-image) {
		width: 100%;
		border-radius: 6px;
		aspect-ratio: 30 / 17;
	}

	@media (min-width: 1024px) {
		:global(.post-content) {
			flex-direction: row;
			padding: 40px;
		}

		:global(.post-hero-image) {
			width: 360px;
			flex-shrink: 0;
		}
	}
</style>
