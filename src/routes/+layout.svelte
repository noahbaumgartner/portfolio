<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Nav from '$lib/components/navigation/Nav.svelte';
	import NavItem from '$lib/components/navigation/NavItem.svelte';
	import Footer from '$lib/components/sections/FooterSection.svelte';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import Copyright from '$lib/components/sections/CopyrightSection.svelte';

	let { children } = $props();
	injectAnalytics();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Noah Baumgartner | Portfolio</title>
	<meta name="og:url" content="https://noahbaumgartner.ch" />
	<meta name="og:image" content="https://noahbaumgartner.ch/images/og.jpg" />
</svelte:head>

<Nav>
	<NavItem href="/">Home</NavItem>
	<NavItem href="/about">Über mich</NavItem>
	<NavItem href="/projects">Projekte</NavItem>
</Nav>
{@render children()}
<Footer	/>
<Copyright />