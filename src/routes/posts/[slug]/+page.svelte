<script>
	import PostTitleSection from '$lib/components/sections/PostTitleSection.svelte';
	import Section from '$lib/components/sections/Section.svelte';

	let { data } = $props();
	let { Content, post } = $derived(data);
</script>

<PostTitleSection {post} />
<div class="post-content-spacer">
	<Section class="post-content">
		<div class="post-body">
			<Content />
		</div>
	</Section>
</div>

<style>
	.post-content-spacer {
		padding-bottom: 30px;
	}

	@media (min-width: 640px) {
		.post-content-spacer {
			padding-bottom: 40px;
		}
	}

	@media (min-width: 1024px) {
		.post-content-spacer {
			padding-bottom: 64px;
		}
	}

	:global(.post-content) {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0;
		gap: 32px;
	}

	:global(.post-content.section-box) {
		background-color: transparent;
	}

	.post-body {
		width: 100%;
		max-width: 1000px;
	}

	.post-body :global(h2) {
		max-width: 660px;
		margin-inline: auto;
		font-family: 'Inter', sans-serif;
		margin-bottom: 16px;
	}

	.post-body :global(h2:not(:first-child)) {
		margin-top: 32px;
	}

	.post-body :global(p) {
		max-width: 660px;
		margin-inline: auto;
		line-height: 1.8;
	}

	.post-body :global(img) {
		display: block;
		width: 100%;
		max-width: 1000px;
		margin-block: 48px;
		margin-inline: auto;
		border-radius: 6px;
	}
</style>
