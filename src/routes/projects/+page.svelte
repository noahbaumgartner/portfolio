<script lang="ts">
	import ProjectPreview from "$lib/components/ProjectPreview.svelte";
	import TitleSection from "$lib/components/sections/TitleSection.svelte";

	let { data } = $props();
	let { projects } = $derived(data);
</script>

<svelte:head>
    <title>Noah Baumgartner | Projekte</title>
	<meta name="og:title" content="Projekte" />
    <meta name="description" content="Auf dieser Seite findest du eine Übersicht meiner bisherigen Projekte." />
    <meta name="og:description" content="Auf dieser Seite findest du eine Übersicht meiner bisherigen Projekte." />
</svelte:head>

<TitleSection title="Projekte" />
<section class="projects-wrapper page-padding">
	<div class="projects-grid">
		{#each projects as project}
			<ProjectPreview {project} />
		{/each}
	</div>
</section>

<style>
	.projects-wrapper {
		margin-bottom: 24px;
	}

	.projects-grid {
		margin-inline: auto;
		max-width: 1280px;
		display: grid;
		grid-template-columns: 1fr;
		gap: 24px;
	}

	@media (min-width: 640px) {
		.projects-wrapper {
			margin-bottom: 40px;
		}

		.projects-grid {
			gap: 40px;
		}
	}

	@media (min-width: 768px) {
		.projects-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 30px;
		}
	}

	@media (min-width: 1024px) {
		.projects-wrapper {
			margin-bottom: 64px;
		}
	}
</style>
