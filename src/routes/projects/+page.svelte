<script lang="ts">
	import ProjectPreview from "$lib/components/ProjectPreview.svelte";
	import Section from "$lib/components/sections/Section.svelte";
	import TitleSection from "$lib/components/sections/TitleSection.svelte";

	let { data } = $props();
	let { projects } = $derived(data);

	let featuredProject = $derived(projects[0]);
	let otherProjects = $derived(projects.slice(1));
</script>

<svelte:head>
    <title>Noah Baumgartner | Projekte</title>
	<meta name="og:title" content="Projekte" />
    <meta name="description" content="Auf dieser Seite findest du eine Übersicht meiner bisherigen Projekte." />
    <meta name="og:description" content="Auf dieser Seite findest du eine Übersicht meiner bisherigen Projekte." />
</svelte:head>

<TitleSection title="Projekte" />
<Section sectionNumber="01">
	<div class="flex flex-col w-full">
		{#if featuredProject}
			<ProjectPreview project={featuredProject} featured />
		{/if}
		{#each otherProjects as project}
			<ProjectPreview {project} />
		{/each}
	</div>
</Section>