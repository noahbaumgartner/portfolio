<script lang="ts">
	import { Link, Section } from '@noahbaumgartner/svelte-ui';
	import PostPreview from '$lib/components/features/post-preview/PostPreview.svelte';

	let { posts } = $props();
</script>

<Section width="full" padded={false} class="posts-wrapper section-gap">
	<div class="posts">
		<div class="posts-header">
			<h2 class="section-title">Beiträge</h2>
			<Link href="/posts">Alle Beiträge</Link>
		</div>

		<div class="post-list-clip">
			<div class="post-list">
				{#each posts.slice(0, 4) as post (post.slug)}
					<PostPreview {post} orientation="vertical" />
				{/each}
			</div>
		</div>
	</div>
</Section>

<style>
	.posts {
		margin-inline: auto;
		max-width: 1280px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 24px;
	}

	.posts-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}

	.posts-header :global(.link) {
		font-size: 14px;
	}

	/* Always a single, horizontally scrollable row of fixed-width cards, which
	   must never show a scrollbar. Hiding it with scrollbar-width is not honoured
	   everywhere, so the list is also pushed 30px past the bottom edge of an
	   overflow-hidden clip: whatever scrollbar a browser draws sits in the
	   clipped part.
	   The 6px of padding give the focus outline of the cards (2px + 2px offset)
	   room inside the scroller; the negative margin keeps the layout in place and
	   the right edge stays on the content edge, like the other sections. */
	.post-list-clip {
		width: calc(100% + 6px);
		margin: -6px 0 -6px -6px;
		overflow: hidden;
	}

	.post-list {
		display: flex;
		gap: 24px;
		margin-bottom: -30px;
		padding: 6px 6px 36px;
		overflow-x: auto;
		scrollbar-width: none;
	}

	.post-list::-webkit-scrollbar {
		display: none;
	}

	.post-list :global(.preview-card) {
		flex: 0 0 auto;
		width: 330px;
		user-select: none;
	}

	@media (min-width: 640px) {
		.post-list {
			gap: 40px;
		}
	}

	@media (min-width: 1024px) {
		.post-list {
			gap: 64px;
		}
	}
</style>
