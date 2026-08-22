<script lang="ts">
	import AboutPreviewSection from "$lib/components/sections/AboutPreviewSection.svelte";
	import HeroSection from "$lib/components/sections/HeroSection.svelte";
	import PostsPreviewSection from "$lib/components/sections/PostsPreviewSection.svelte";

	let { data } = $props();
	let { posts } = $derived(data);
</script>

<svelte:head>
	<title>Noah Baumgartner | Portfolio</title>
	<meta name="og:title" content="Noah Baumgartner | Portfolio" />
	<meta name="description" content="Ich bin Software-Entwickler, Student und komme aus dem St. Galler Rheintal. Mehr zu meiner Person und meinen Projekten findest du hier." />
	<meta name="description" content="Ich bin Software-Entwickler, Student und komme aus dem St. Galler Rheintal. Mehr zu meiner Person und meinen Projekten findest du hier." />
</svelte:head>

<HeroSection />
<AboutPreviewSection />
<PostsPreviewSection posts={posts} />