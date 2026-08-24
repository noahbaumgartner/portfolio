<script>
	import { ArrowLeft, ArrowRight } from '@lucide/svelte';
	import PostTitleSection from '$lib/components/sections/PostTitleSection.svelte';
	import Section from '$lib/components/sections/Section.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Link from '$lib/components/ui/Link.svelte';
	import TableOfContents from '$lib/components/ui/TableOfContents.svelte';

	let { data } = $props();
	let { Content, post, previous, next } = $derived(data);

	let bodyEl = $state();
</script>

<div class="mobile-toc-sticky">
	{#key post.slug}
		<TableOfContents container={bodyEl} variant="mobile" />
	{/key}
</div>
<PostTitleSection {post} />
<div class="post-content-spacer">
	<Section class="post-content">
		<div class="post-layout">
			<aside class="post-toc">
				<div class="post-toc-sticky">
					{#key post.slug}
						<TableOfContents container={bodyEl} />
					{/key}
				</div>
			</aside>
			<div class="post-body" bind:this={bodyEl}>
				<Content />
			</div>
		</div>
	</Section>

	{#if post.sources?.length}
		<Section class="post-sources">
			<h2 class="post-sources-title">Quellen</h2>
			<ol class="post-sources-list">
				{#each post.sources as source, i}
					<li id={`quelle-${i + 1}`}>
						<span class="post-sources-index">[{i + 1}]</span>
						<Link href={source.url}>{source.title}</Link>
					</li>
				{/each}
			</ol>
		</Section>
	{/if}

	{#if previous || next}
		<div class="post-nav-wrapper page-padding">
			<nav class="post-nav" aria-label="Beitragsnavigation">
				{#if previous}
					<Button variant="secondary" size="lg" icon={ArrowLeft} href={`/posts/${previous.slug}`}>{previous.title}</Button>
				{/if}
				{#if next}
					<div class="post-nav-next">
						<Button variant="secondary" size="lg" icon={ArrowRight} href={`/posts/${next.slug}`}>{next.title}</Button>
					</div>
				{/if}
			</nav>
		</div>
	{/if}
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

	.post-body :global(p:not(:last-child)) {
		margin-bottom: 16px;
	}

	.post-body :global(.katex-display) {
		max-width: 660px;
		margin-inline: auto;
		margin-block: 24px;
		overflow-x: auto;
		overflow-y: hidden;
		padding-block: 4px;
	}

	.post-body :global(img) {
		display: block;
		width: 100%;
		max-width: 1000px;
		margin-block: 48px;
		margin-inline: auto;
		border-radius: 6px;
	}

	.post-body :global(figcaption) {
		max-width: 660px;
		margin-inline: auto;
		margin-top: -32px;
		margin-bottom: 16px;
		font-size: 13px;
		text-align: center;
		color: var(--color-text-muted);
	}

	.post-body :global(sup) {
		font-size: 0.7em;
	}

	.post-body :global(sup a) {
		color: var(--color-text-secondary);
		text-decoration: none;
	}

	.post-body :global(sup a:hover) {
		text-decoration: underline;
	}

	:global(.post-sources) {
		padding: 32px 24px;
	}

	@media (min-width: 640px) {
		:global(.post-sources) {
			padding: 40px 40px;
		}
	}

	@media (min-width: 1024px) {
		:global(.post-sources) {
			padding: 48px 64px;
		}
	}

	.post-sources-title {
		max-width: 660px;
		margin-inline: auto;
		font-family: 'Inter', sans-serif;
		font-size: 1rem;
		font-weight: 600;
		margin-bottom: 16px;
	}

	.post-sources-list {
		max-width: 660px;
		margin-inline: auto;
		display: flex;
		flex-direction: column;
		gap: 10px;
		counter-reset: source;
	}

	.post-sources-list li {
		display: flex;
		gap: 8px;
		font-size: 14px;
		line-height: 1.6;
		scroll-margin-top: 120px;
	}

	.post-sources-index {
		flex-shrink: 0;
		color: var(--color-text-muted);
		font-variant-numeric: tabular-nums;
	}

	.post-nav-wrapper {
		/* Matches .section-gap's top spacing so this reads as the same
		   rhythm as the gap between any two sections on the site. */
		margin-top: 30px;
	}

	.post-nav {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-inline: auto;
		max-width: 660px;
	}

	.post-nav-next {
		margin-left: auto;
	}

	@media (min-width: 640px) {
		.post-nav-wrapper {
			margin-top: 40px;
		}

		.post-nav {
			/* Mirrors the post content grid (TableOfContents column + gap)
			   so the nav tracks the text column's width once the TOC
			   sidebar squeezes it below 660px, instead of staying static. */
			max-width: min(660px, 100vw - 352px);
		}
	}

	@media (min-width: 1024px) {
		.post-nav-wrapper {
			margin-top: 64px;
		}

		.post-nav {
			max-width: min(660px, 100vw - 400px);
		}
	}
</style>
