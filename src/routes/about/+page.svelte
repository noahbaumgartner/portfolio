<script lang="ts">
	import TitleSection from "$lib/components/sections/TitleSection.svelte";
	import AboutJourneySection from "$lib/components/sections/AboutJourneySection.svelte";
	import AboutSkillsSection from "$lib/components/sections/AboutSkillsSection.svelte";
	import AboutPhilosophySection from "$lib/components/sections/AboutPhilosophySection.svelte";
	import AboutImageSection from "$lib/components/sections/AboutImageSection.svelte";
</script>

<svelte:head>
    <title>Noah Baumgartner | Über mich</title>
	<meta name="og:title" content="Über mich" />
    <meta name="description" content="Erfahre mehr über mich, meine Erfahrungen und meine Leidenschaften." />
	<meta name="og:description" content="Erfahre mehr über mich, meine Erfahrungen und meine Leidenschaften." />
</svelte:head>

<TitleSection title="Über mich" />
<AboutImageSection />
<AboutJourneySection />
<AboutPhilosophySection />
<AboutSkillsSection />