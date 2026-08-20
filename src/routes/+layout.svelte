<script lang="ts">
	import './layout.css';
	import SiteHeader from '$lib/components/navigation/SiteHeader.svelte';
	import SiteHeaderItem from '$lib/components/navigation/SiteHeaderItem.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Footer from '$lib/components/sections/FooterSection.svelte';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { onMount } from 'svelte';

	let { children } = $props();
	injectAnalytics();

	let fontsLoaded = $state(false);
	let showScreen = $state(true);

	onMount(() => {
		document.fonts.ready.then(() => {
			fontsLoaded = true;
			setTimeout(() => {
				showScreen = false;
			}, 300);
		});
	});
</script>

<svelte:head>
	<link rel="icon" type="image/svg+xml" href="/images/favicon.svg" />
	<link rel="icon" type="image/png" sizes="48x48" href="/images/favicon-48x48.png" />
	<link rel="icon" type="image/png" sizes="96x96" href="/images/favicon-96x96.png" />
	<link rel="icon" type="image/png" sizes="144x144" href="/images/favicon-144x144.png" />

	<title>Noah Baumgartner | Portfolio</title>
	<meta name="og:url" content="https://noahbaumgartner.ch" />
	<meta name="og:image" content="https://noahbaumgartner.ch/images/og.jpg" />

	<link rel="preload" href="/fonts/GoogleSans.woff2" as="font" type="font/woff2" crossorigin="anonymous">
	<link rel="preload" href="/fonts/Inter.woff2" as="font" type="font/woff2" crossorigin="anonymous">
	<link rel="preload" href="/fonts/SourceCodePro.woff2" as="font" type="font/woff2" crossorigin="anonymous">
</svelte:head>

{#if showScreen}
	<div class="fixed inset-0 z-9999 bg-white transition-opacity duration-300" class:opacity-0={fontsLoaded}></div>
{/if}

<SiteHeader>
	{#snippet left()}
		<SiteHeaderItem href="/">Start</SiteHeaderItem>
		<SiteHeaderItem href="/about">Über mich</SiteHeaderItem>
		<SiteHeaderItem href="/projects">Projekte</SiteHeaderItem>
	{/snippet}
	{#snippet right()}
		<Button href="mailto:noahbaumg@outlook.com">Kontakt</Button>
	{/snippet}
</SiteHeader>
<main class="pt-[64px]">
	{@render children()}
</main>
<footer>
	<Footer	/>
</footer>