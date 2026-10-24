<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity';
	import { MeshGradient, PageHeader, PreviewCard, Section } from '@noahbaumgartner/svelte-ui';
	import { postIcons } from '$lib/postIcons';

	let { data } = $props();
	let { posts } = $derived(data);

	// Compact horizontal cards on phones, where a full-width image per post fills a screen.
	const wide = new MediaQuery('min-width: 640px');
</script>

<svelte:head>
	<title>Noah Baumgartner | Beiträge</title>
	<meta name="og:title" content="Beiträge" />
	<meta
		name="description"
		content="Auf dieser Seite findest du eine Übersicht meiner Projekte und weiterer Beiträge."
	/>
	<meta
		name="og:description"
		content="Auf dieser Seite findest du eine Übersicht meiner Projekte und weiterer Beiträge."
	/>
</svelte:head>

<PageHeader eyebrow="Beiträge" description="Eine Übersicht meiner Projekte und weiterer Beiträge.">
	{#snippet title()}
		Was ich gebaut<br />und aufgeschrieben habe.
	{/snippet}
</PageHeader>
<Section width="full" padded={false} class="posts-wrapper">
	<div class="posts-grid">
		{#each posts as post (post.slug)}
			<PreviewCard
				href={`/posts/${post.slug}`}
				title={post.title}
				description={post.description}
				meta={post.period}
				icon={postIcons[post.icon]}
				orientation={wide.current ? 'vertical' : 'horizontal'}
			>
				{#snippet media()}
					<MeshGradient colors={post.colors} seed={post.title} />
				{/snippet}
			</PreviewCard>
		{/each}
	</div>
</Section>

<style>
	:global(.posts-wrapper) {
		margin-block: 30px 24px;
	}

	/* The library caps vertical cards at 380px; let them fill their grid column instead. */
	.posts-grid :global(.preview-card--vertical) {
		max-width: none;
	}

	.posts-grid :global(.preview-card--horizontal .preview-card-headline) {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 4;
		line-clamp: 4;
		overflow: hidden;
		overflow-wrap: anywhere;
	}

	.posts-grid {
		margin-inline: auto;
		max-width: 1280px;
		display: grid;
		grid-template-columns: 1fr;
		gap: 24px;
	}

	@media (min-width: 640px) {
		:global(.posts-wrapper) {
			margin-block: 40px;
		}

		.posts-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 48px 40px;
		}
	}

	@media (min-width: 1024px) {
		:global(.posts-wrapper) {
			margin-block: 64px;
		}

		.posts-grid {
			grid-template-columns: repeat(3, 1fr);
			gap: 64px;
		}
	}
</style>
