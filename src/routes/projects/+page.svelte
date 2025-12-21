<script lang="ts">
	import ProjectsSection from "$lib/components/sections/ProjectsSection.svelte";
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
<ProjectsSection projects={projects} />