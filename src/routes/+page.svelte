<script lang="ts">
	import AboutMeSection from "$lib/components/sections/AboutMeSection.svelte";
	import HeroSection from "$lib/components/sections/HeroSection.svelte";
	import ProjectsSection from "$lib/components/sections/ProjectsSection.svelte";
</script>

<svelte:head>
	<title>Noah Baumgartner | Portfolio</title>
	<meta name="og:title" content="Noah Baumgartner | Portfolio" />
	<meta name="description" content="Hallo, ich bin Noah Baumgartner, Software-Entwickler aus der Schweiz. Mehr zu meiner Person und meinen Projekten findest du hier." />
	<meta name="og:description" content="Hallo, ich bin Noah Baumgartner, Software-Entwickler aus der Schweiz. Mehr zu meiner Person und meinen Projekten findest du hier." />
</svelte:head>

<HeroSection />
<AboutMeSection />
<ProjectsSection />