<script lang="ts">
	import AboutHeroSection from '$lib/sections/AboutHeroSection.svelte';
	import AboutIntroSection from '$lib/sections/AboutIntroSection.svelte';
	import AboutHobbiesSection from '$lib/sections/AboutHobbiesSection.svelte';
	import AboutWorkExperienceSection from '$lib/sections/AboutWorkExperienceSection.svelte';
	import AboutEducationSection from '$lib/sections/AboutEducationSection.svelte';
</script>

<svelte:head>
	<title>Noah Baumgartner | Über mich</title>
	<meta name="og:title" content="Über mich" />
	<meta
		name="description"
		content="Erfahre mehr über mich, meine Erfahrungen und meine Leidenschaften."
	/>
	<meta
		name="og:description"
		content="Erfahre mehr über mich, meine Erfahrungen und meine Leidenschaften."
	/>
</svelte:head>

<AboutHeroSection />
<AboutIntroSection />
<AboutWorkExperienceSection />
<AboutHobbiesSection />
<AboutEducationSection />
