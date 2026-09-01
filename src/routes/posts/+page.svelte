<script lang="ts">
	import PostPreview from "$lib/components/PostPreview.svelte";
	import TitleSection from "$lib/components/sections/TitleSection.svelte";

	let { data } = $props();
	let { posts } = $derived(data);
</script>

<svelte:head>
    <title>Noah Baumgartner | Beiträge</title>
	<meta name="og:title" content="Beiträge" />
    <meta name="description" content="Auf dieser Seite findest du eine Übersicht meiner Projekte und weiterer Beiträge." />
    <meta name="og:description" content="Auf dieser Seite findest du eine Übersicht meiner Projekte und weiterer Beiträge." />
</svelte:head>

<TitleSection title="Beiträge" />
<section class="posts-wrapper page-padding">
	<div class="posts-grid">
		{#each posts as post}
			<PostPreview {post} />
		{/each}
	</div>
</section>

<style>
	.posts-wrapper {
		margin-bottom: 24px;
	}

	.posts-grid {
		margin-inline: auto;
		max-width: 1280px;
		display: grid;
		grid-template-columns: 1fr;
		justify-items: start;
		gap: 24px;
	}

	.posts-grid :global(.preview) {
		width: 100%;
		max-width: 650px;
	}

	@media (min-width: 640px) {
		.posts-wrapper {
			margin-bottom: 40px;
		}

		.posts-grid {
			gap: 40px;
		}
	}

	@media (min-width: 1024px) {
		.posts-wrapper {
			margin-bottom: 64px;
		}

		.posts-grid {
			grid-template-columns: repeat(2, 1fr);
			justify-items: stretch;
			gap: 30px;
		}

		.posts-grid :global(.preview) {
			max-width: none;
		}
	}
</style>
