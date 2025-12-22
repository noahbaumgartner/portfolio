<script lang="ts">
	import AboutMePreviewSection from "$lib/components/sections/AboutMePreviewSection.svelte";
	import HeroSection from "$lib/components/sections/HeroSection.svelte";
	import ProjectsPreviewSection from "$lib/components/sections/ProjectsPreviewSection.svelte";

	let { data } = $props();
	let { projects } = $derived(data);
</script>

<svelte:head>
	<title>Noah Baumgartner | Portfolio</title>
	<meta name="og:title" content="Noah Baumgartner | Portfolio" />
	<meta name="description" content="Ich bin Software-Entwickler, Student und komme aus dem St. Galler Rheintal. Mehr zu meiner Person und meinen Projekten findest du hier." />
	<meta name="description" content="Ich bin Software-Entwickler, Student und komme aus dem St. Galler Rheintal. Mehr zu meiner Person und meinen Projekten findest du hier." />
</svelte:head>

<HeroSection />
<AboutMePreviewSection />
<ProjectsPreviewSection projects={projects} />