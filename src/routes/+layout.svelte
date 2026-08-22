<script lang="ts">
	import './layout.css';
	import SiteHeader from '$lib/components/navigation/SiteHeader.svelte';
	import SiteHeaderItem from '$lib/components/navigation/SiteHeaderItem.svelte';
	import ThemeToggle from '$lib/components/ui/ThemeToggle.svelte';
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

	<link rel="preload" href="/fonts/Outfit.woff2" as="font" type="font/woff2" crossorigin="anonymous">
	<link rel="preload" href="/fonts/Inter.woff2" as="font" type="font/woff2" crossorigin="anonymous">
	<link rel="preload" href="/fonts/SourceCodePro.woff2" as="font" type="font/woff2" crossorigin="anonymous">
</svelte:head>

{#if showScreen}
	<div class="loading-screen" class:loading-screen--hidden={fontsLoaded}></div>
{/if}

<SiteHeader>
	{#snippet left()}
		<SiteHeaderItem href="/">Start</SiteHeaderItem>
		<SiteHeaderItem href="/about">Über mich</SiteHeaderItem>
		<SiteHeaderItem href="/posts">Beiträge</SiteHeaderItem>
	{/snippet}
	{#snippet right()}
		<ThemeToggle />
	{/snippet}
</SiteHeader>
<main class="main">
	{@render children()}
</main>
<footer>
	<Footer	/>
</footer>

<style>
	.loading-screen {
		position: fixed;
		inset: 0;
		z-index: 9999;
		background-color: var(--color-bg);
		transition: opacity 300ms ease;
	}

	.loading-screen--hidden {
		opacity: 0;
	}

	.main {
		padding-top: 64px;
	}
</style>