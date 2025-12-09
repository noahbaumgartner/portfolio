<script lang="ts">
	import './global.css';
	import favicon from '$lib/assets/favicon.svg';
	import Nav from '$lib/components/Nav.svelte';
	import NavItem from '$lib/components/NavItem.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';

	let { children } = $props();
	injectAnalytics();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>noahbaumgartner</title>
</svelte:head>

<Nav>
	<NavItem href="/">Home</NavItem>
	<NavItem href="/about">Über mich</NavItem>
	<NavItem href="/projects">Projekte</NavItem>
</Nav>
{@render children()}
<Footer	/>