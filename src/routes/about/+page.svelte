<script lang="ts">
	import TitleSection from "$lib/components/sections/TitleSection.svelte";
	import AboutIntroSection from "$lib/components/sections/AboutIntroSection.svelte";
	import AboutPhilosophySection from "$lib/components/sections/AboutPhilosophySection.svelte";
	import AboutWorkExperienceSection from "$lib/components/sections/AboutWorkExperienceSection.svelte";
	import AboutEducationSection from "$lib/components/sections/AboutEducationSection.svelte";
</script>

<svelte:head>
    <title>Noah Baumgartner | Über mich</title>
	<meta name="og:title" content="Über mich" />
    <meta name="description" content="Erfahre mehr über mich, meine Erfahrungen und meine Leidenschaften." />
	<meta name="og:description" content="Erfahre mehr über mich, meine Erfahrungen und meine Leidenschaften." />
</svelte:head>

<TitleSection title="Über mich" />
<AboutIntroSection />
<AboutWorkExperienceSection />
<AboutPhilosophySection />
<AboutEducationSection />
