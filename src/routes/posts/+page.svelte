<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity';
	import { tick } from 'svelte';
	import { Search, X } from '@lucide/svelte';
	import {
		Button,
		EmptyState,
		Input,
		InputGroup,
		InputGroupAddon,
		MeshGradient,
		PreviewCard,
		Section,
		Tabs
	} from '@noahbaumgartner/svelte-ui';
	import { postIcons } from '$lib/postIcons';
	import PostsHeroSection from '$lib/sections/PostsHeroSection.svelte';
	import type { PostCategory } from '$lib/dtos/PostDTO';

	let { data } = $props();
	let { posts } = $derived(data);

	const filters: { value: 'all' | PostCategory; label: string }[] = [
		{ value: 'all', label: 'Alle' },
		{ value: 'project', label: 'Projekte' },
		{ value: 'study', label: 'Studium' }
	];
	let filter = $state<'all' | PostCategory>('all');
	let searching = $state(false);
	let query = $state('');
	let searchInput = $state<HTMLInputElement | null>(null);
	let filtered = $derived.by(() => {
		const q = query.trim().toLowerCase();
		return posts.filter(
			(p) =>
				(filter === 'all' || p.category === filter) &&
				(!q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
		);
	});

	async function openSearch() {
		searching = true;
		await tick();
		searchInput?.focus();
	}

	function closeSearch() {
		searching = false;
		query = '';
	}

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

<PostsHeroSection />
<Section width="full" padded={false} class="posts-wrapper">
	<div class="posts">
		<div class="posts-toolbar">
			<Tabs bind:value={filter} options={filters} variant="text" label="Beiträge filtern" />
			{#if searching}
				<InputGroup
					class="posts-search"
					onkeydown={(event: KeyboardEvent) => event.key === 'Escape' && closeSearch()}
				>
					<InputGroupAddon><Search /></InputGroupAddon>
					<Input
						bind:ref={searchInput}
						bind:value={query}
						placeholder="Beiträge durchsuchen"
						aria-label="Beiträge durchsuchen"
					/>
					<InputGroupAddon align="inline-end">
						<Button
							variant="ghost"
							size="sm"
							icon={X}
							label="Suche schliessen"
							onclick={closeSearch}
						/>
					</InputGroupAddon>
				</InputGroup>
			{:else}
				<Button variant="ghost" icon={Search} label="Beiträge durchsuchen" onclick={openSearch} />
			{/if}
		</div>
		{#if filtered.length === 0}
			<EmptyState
				icon={Search}
				title="Keine Beiträge gefunden"
				description="Passe den Filter oder den Suchbegriff an."
			/>
		{/if}
		<div class="posts-grid">
			{#each filtered as post (post.slug)}
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

	.posts {
		margin-inline: auto;
		max-width: 1280px;
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.posts-toolbar {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 12px 16px;
	}

	.posts-toolbar :global(.posts-search) {
		width: 100%;
	}

	.posts-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 24px;
	}

	@media (min-width: 640px) {
		:global(.posts-wrapper) {
			margin-block: 40px;
		}

		.posts-toolbar :global(.posts-search) {
			width: 280px;
			margin-left: auto;
		}

		.posts-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 32px 24px;
		}
	}

	@media (min-width: 1024px) {
		:global(.posts-wrapper) {
			margin-block: 64px;
		}

		.posts-grid {
			grid-template-columns: repeat(3, 1fr);
			gap: 40px;
		}
	}

	@media (min-width: 1280px) {
		.posts-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>
