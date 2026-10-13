<script lang="ts">
	import './layout.css';
	import '@noahbaumgartner/svelte-ui/tokens.css';
	import 'katex/dist/katex.min.css';
	import { page } from '$app/state';
	import { Button, Navbar, NavigationMenuItem } from '@noahbaumgartner/svelte-ui';
	import { Menu, X } from '@lucide/svelte';
	import SiteHeaderLogo from '$lib/components/navigation/SiteHeaderLogo.svelte';
	import ThemeToggle from '$lib/components/features/theme-toggle/ThemeToggle.svelte';
	import Footer from '$lib/components/sections/FooterSection.svelte';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { onMount } from 'svelte';

	let { children } = $props();

	const navigation = [
		{ href: '/', label: 'Start' },
		{ href: '/about', label: 'Über mich' },
		{ href: '/posts', label: 'Beiträge' }
	];

	function isActive(href: string) {
		return href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href);
	}
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

	<link
		rel="preload"
		href="/fonts/Outfit.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href="/fonts/Inter.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href="/fonts/SourceCodePro.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
</svelte:head>

{#if showScreen}
	<div class="loading-screen" class:loading-screen--hidden={fontsLoaded}></div>
{/if}

{#snippet navItems()}
	{#each navigation as item (item.href)}
		<NavigationMenuItem href={item.href} active={isActive(item.href)}
			>{item.label}</NavigationMenuItem
		>
	{/each}
{/snippet}

<Navbar class="site-navbar" label="Hauptnavigation">
	{#snippet logo()}
		<SiteHeaderLogo />
	{/snippet}
	{#snippet actions()}
		<ThemeToggle />
	{/snippet}
	{#snippet trigger(props, open)}
		<Button
			{...props}
			variant="secondary"
			size="lg"
			icon={open ? X : Menu}
			label={open ? 'Menü schliessen' : 'Menü öffnen'}
		/>
	{/snippet}
	{@render navItems()}
</Navbar>
<main class="main">
	{@render children()}
</main>
<Footer />

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
		flex: 1 0 auto;
	}

	/* Same page gutters and max width as the sections below the bar. The Navbar
	   uses the gutter for the bar and the mobile menu alike. */
	:global(.site-navbar) {
		--navbar-gutter: 24px;
	}

	:global(.site-navbar .navbar-bar) {
		box-sizing: content-box;
		max-width: 1280px;
		margin-inline: auto;
	}

	/* The logo is set in Outfit; the mobile menu follows it instead of the body font */
	:global(.site-navbar .navbar-panel) {
		font-family: 'Outfit', sans-serif;
	}

	@media (min-width: 640px) {
		:global(.site-navbar) {
			--navbar-gutter: 40px;
		}
	}

	@media (min-width: 1024px) {
		:global(.site-navbar) {
			--navbar-gutter: 64px;
		}
	}
</style>
