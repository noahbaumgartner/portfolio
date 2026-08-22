<script>
	import PostTitleSection from '$lib/components/sections/PostTitleSection.svelte';
	import Section from '$lib/components/sections/Section.svelte';
	import TableOfContents from '$lib/components/ui/TableOfContents.svelte';

	let { data } = $props();
	let { Content, post } = $derived(data);

	let bodyEl = $state();
</script>

<div class="mobile-toc-sticky">
	<TableOfContents container={bodyEl} variant="mobile" />
</div>
<PostTitleSection {post} />
<div class="post-content-spacer">
	<Section class="post-content">
		<div class="post-layout">
			<aside class="post-toc">
				<div class="post-toc-sticky">
					<TableOfContents container={bodyEl} />
				</div>
			</aside>
			<div class="post-body" bind:this={bodyEl}>
				<Content />
			</div>
		</div>
	</Section>
</div>

<style>
	.mobile-toc-sticky {
		position: sticky;
		top: 64px;
		z-index: 40;
	}

	@media (min-width: 640px) {
		.mobile-toc-sticky {
			display: none;
		}
	}

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
		display: block;
		padding: 0;
	}

	:global(.post-content.section-box) {
		background-color: transparent;
	}

	.post-layout {
		width: 100%;
	}

	.post-toc {
		display: none;
	}

	.post-body {
		width: 100%;
		max-width: 1000px;
		margin-inline: auto;
	}

	@media (min-width: 640px) {
		:global(.post-content) {
			max-width: none;
		}

		.post-layout {
			display: grid;
			grid-template-columns: minmax(120px, 1fr) minmax(0, 1000px) minmax(120px, 1fr);
			column-gap: 16px;
		}

		.post-toc {
			display: block;
			grid-column: 1;
			justify-self: end;
			width: 100%;
			max-width: 160px;
		}

		.post-toc-sticky {
			position: sticky;
			top: 120px;
		}

		.post-body {
			grid-column: 2;
			margin-inline: 0;
		}
	}

	.post-body :global(h1) {
		max-width: 660px;
		margin-inline: auto;
		font-family: 'Inter', sans-serif;
		font-size: 1.25rem;
		font-weight: 600;
		margin-bottom: 16px;
	}

	.post-body :global(h1:not(:first-child)) {
		margin-top: 32px;
	}

	.post-body :global(h2) {
		max-width: 660px;
		margin-inline: auto;
		font-family: 'Inter', sans-serif;
		font-size: 1rem;
		font-weight: 600;
		margin-bottom: 16px;
	}

	.post-body :global(h2:not(:first-child)) {
		margin-top: 24px;
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
