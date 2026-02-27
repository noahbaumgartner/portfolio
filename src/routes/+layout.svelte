<script lang="ts">
	import './layout.css';
	import Nav from '$lib/components/navigation/Nav.svelte';
	import NavItem from '$lib/components/navigation/NavItem.svelte';
	import Footer from '$lib/components/sections/FooterSection.svelte';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import Copyright from '$lib/components/sections/CopyrightSection.svelte';
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

<Nav>
	<NavItem href="/">Home</NavItem>
	<NavItem href="/about">Über mich</NavItem>
	<NavItem href="/projects">Projekte</NavItem>
</Nav>
<main>
	{@render children()}
</main>
<footer>
	<Footer	/>
	<Copyright />
</footer>