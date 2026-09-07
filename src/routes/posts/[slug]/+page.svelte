<script>
	import { fade } from 'svelte/transition';
	import { ArrowLeft, ArrowRight } from '@lucide/svelte';
	import PostTitleSection from '$lib/components/sections/PostTitleSection.svelte';
	import Section from '$lib/components/sections/Section.svelte';
	import Button from '$lib/components/ui/button/Button.svelte';
	import Link from '$lib/components/ui/link/Link.svelte';
	import TableOfContents from '$lib/components/ui/table-of-contents/TableOfContents.svelte';

	let { data } = $props();
	let { Content, post, previous, next } = $derived(data);

	let bodyEl = $state();
	let lightboxSrc = $state();
	let lightboxAlt = $state('');

	const EXPAND_ICON =
		'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="post-img-expand-icon"><path d="M15 3h6v6" /><path d="m21 3-7 7" /><path d="m3 21 7-7" /><path d="M9 21H3v-6" /></svg>';

	$effect(() => {
		if (!bodyEl) return;

		const images = Array.from(bodyEl.querySelectorAll('img'));

		images.forEach((image) => {
			image.classList.add('post-img-reveal');

			if (image.parentElement?.classList.contains('post-img-wrap')) return;

			const wrapper = document.createElement('div');
			wrapper.className = 'post-img-wrap';
			image.replaceWith(wrapper);
			wrapper.appendChild(image);

			const expandButton = document.createElement('button');
			expandButton.type = 'button';
			expandButton.className = 'post-img-expand';
			expandButton.setAttribute('aria-label', 'Bild vergrössern');
			expandButton.innerHTML = EXPAND_ICON;
			expandButton.addEventListener('click', (event) => {
				event.stopPropagation();
				openLightbox(image.src, image.alt);
			});
			wrapper.appendChild(expandButton);
		});

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						entry.target.classList.add('post-img-reveal--visible');
						observer.unobserve(entry.target);
					}
				}
			},
			{ rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
		);

		images.forEach((image) => observer.observe(image));

		return () => observer.disconnect();
	});

	function openLightbox(src, alt) {
		lightboxSrc = src;
		lightboxAlt = alt;
	}

	function handleBodyClick(event) {
		if (event.target instanceof HTMLImageElement) {
			openLightbox(event.target.src, event.target.alt);
		}
	}

	function closeLightbox() {
		lightboxSrc = undefined;
	}

	function handleWindowKeydown(event) {
		if (event.key === 'Escape') closeLightbox();
	}

	function handleWindowScroll() {
		if (lightboxSrc) closeLightbox();
	}
</script>

<svelte:window onkeydown={handleWindowKeydown} onscroll={handleWindowScroll} />

<div class="mobile-toc-sticky">
	{#key post.slug}
		<TableOfContents container={bodyEl} variant="mobile" />
	{/key}
</div>
<PostTitleSection {post} />
<div class="post-content-spacer">
	<Section class="post-content">
		<div class="post-layout">
			<aside class="post-toc">
				<div class="post-toc-sticky">
					{#key post.slug}
						<TableOfContents container={bodyEl} />
					{/key}
				</div>
			</aside>
			<div class="post-body" bind:this={bodyEl} onclick={handleBodyClick}>
				<Content />
			</div>
		</div>
	</Section>

	{#if post.sources?.length}
		<Section class="post-sources">
			<h2 class="post-sources-title">Quellen</h2>
			<ol class="post-sources-list">
				{#each post.sources as source, i}
					<li id={`source-${i + 1}`}>
						<span class="post-sources-index">[{i + 1}]</span>
						<Link href={source.url}>{source.title}</Link>
					</li>
				{/each}
			</ol>
		</Section>
	{/if}

	{#if previous || next}
		<div class="post-nav-wrapper page-padding">
			<nav class="post-nav" aria-label="Beitragsnavigation">
				{#if previous}
					<Button variant="secondary" size="lg" icon={ArrowLeft} href={`/posts/${previous.slug}`}>{previous.title}</Button>
				{/if}
				{#if next}
					<div class="post-nav-next">
						<Button variant="secondary" size="lg" icon={ArrowRight} href={`/posts/${next.slug}`}>{next.title}</Button>
					</div>
				{/if}
			</nav>
		</div>
	{/if}
</div>

{#if lightboxSrc}
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div
		class="lightbox-overlay"
		role="dialog"
		aria-modal="true"
		aria-label="Bild"
		onclick={closeLightbox}
		in:fade={{ duration: 200 }}
		out:fade={{ duration: 100 }}
	>
		<div class="lightbox-frame">
			<img src={lightboxSrc} alt={lightboxAlt} class="lightbox-img" />
			<button
				type="button"
				class="lightbox-close"
				onclick={(event) => {
					event.stopPropagation();
					closeLightbox();
				}}
				aria-label="Schliessen"
			>
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lightbox-close-icon"
				>
					<path d="m14 10 7-7" />
					<path d="M20 10h-6V4" />
					<path d="m3 21 7-7" />
					<path d="M4 14h6v6" />
				</svg>
			</button>
		</div>
	</div>
{/if}

<style>
	.mobile-toc-sticky {
		position: sticky;
		top: 64px;
		z-index: 40;
	}

	@media (min-width: 640px) {
		.mobile-toc-sticky {
			display: none;
		}
	}

	.post-content-spacer {
		padding-bottom: 30px;
	}

	@media (min-width: 640px) {
		.post-content-spacer {
			padding-bottom: 40px;
		}
	}

	@media (min-width: 1024px) {
		.post-content-spacer {
			padding-bottom: 64px;
		}
	}

	:global(.post-content) {
		display: block;
		padding: 0;
	}

	:global(.post-content.section-box) {
		background-color: transparent;
	}

	.post-layout {
		width: 100%;
	}

	.post-toc {
		display: none;
	}

	.post-body {
		width: 100%;
		max-width: 1000px;
		margin-inline: auto;
	}

	@media (min-width: 640px) {
		:global(.post-content) {
			max-width: none;
		}

		.post-layout {
			display: grid;
			grid-template-columns: minmax(120px, 1fr) minmax(0, 1000px) minmax(120px, 1fr);
			column-gap: 32px;
		}

		.post-toc {
			display: block;
			grid-column: 1;
			justify-self: end;
			width: 100%;
			max-width: 160px;
		}

		.post-toc-sticky {
			position: sticky;
			top: 120px;
		}

		.post-body {
			grid-column: 2;
			margin-inline: 0;
		}
	}

	.post-body :global(h1) {
		max-width: 660px;
		margin-inline: auto;
		font-family: 'Inter', sans-serif;
		font-size: 1.25rem;
		font-weight: 600;
		margin-bottom: 16px;
	}

	.post-body :global(h1:not(:first-child)) {
		margin-top: 32px;
	}

	.post-body :global(h2) {
		max-width: 660px;
		margin-inline: auto;
		font-family: 'Inter', sans-serif;
		font-size: 1rem;
		font-weight: 600;
		margin-bottom: 16px;
	}

	.post-body :global(h2:not(:first-child)) {
		margin-top: 24px;
	}

	.post-body :global(p) {
		max-width: 660px;
		margin-inline: auto;
		line-height: 1.8;
	}

	.post-body :global(p:not(:last-child)) {
		margin-bottom: 16px;
	}

	.post-body :global(.katex-display) {
		max-width: 660px;
		margin-inline: auto;
		margin-block: 24px;
		overflow-x: auto;
		overflow-y: hidden;
		padding-block: 4px;
	}

	.post-body :global(img) {
		display: block;
		width: 100%;
		max-width: 1000px;
		margin-block: 48px;
		margin-inline: auto;
		border-radius: 6px;
	}

	.post-body :global(.post-img-wrap) {
		position: relative;
		display: block;
		width: 100%;
		max-width: 1000px;
		margin-block: 48px;
		margin-inline: auto;
		border-radius: 6px;
		overflow: hidden;
	}

	.post-body :global(.post-img-wrap img) {
		display: block;
		width: 100%;
		max-width: none;
		margin: 0;
		border-radius: 0;
		cursor: zoom-in;
	}

	.post-body :global(.post-img-expand) {
		position: absolute;
		right: 12px;
		bottom: 12px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		width: 36px;
		height: 36px;
		border: none;
		border-radius: 50%;
		background-color: color-mix(in srgb, var(--color-surface) 70%, transparent);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		color: var(--color-text);
		outline: none;
		cursor: pointer;
		opacity: 0;
		transition:
			opacity 200ms ease,
			background-color 200ms ease;
	}

	.post-body :global(.post-img-expand:focus-visible) {
		opacity: 1;
		outline: 2px solid var(--color-ink);
		outline-offset: 2px;
	}

	.post-body :global(.post-img-expand-icon) {
		width: 16px;
		height: 16px;
	}

	@media (hover: hover) {
		.post-body :global(.post-img-wrap:hover .post-img-expand) {
			opacity: 1;
		}

		.post-body :global(.post-img-expand:hover) {
			background-color: color-mix(in srgb, var(--color-surface) 85%, transparent);
		}
	}

	.post-body :global(img.post-img-reveal) {
		opacity: 0;
		transition: opacity 500ms ease-out;
	}

	.post-body :global(img.post-img-reveal--visible) {
		opacity: 1;
	}

	@media (prefers-reduced-motion: reduce) {
		.post-body :global(img.post-img-reveal) {
			opacity: 1;
			transition: none;
		}
	}

	.post-body :global(figcaption) {
		max-width: 660px;
		margin-inline: auto;
		margin-top: -32px;
		margin-bottom: 16px;
		font-size: 13px;
		text-align: center;
		color: var(--color-text-muted);
	}

	.post-body :global(sup) {
		font-size: 0.7em;
	}

	.post-body :global(sup a) {
		color: var(--color-text-secondary);
		text-decoration: none;
		border-radius: 3px;
		outline: none;
	}

	.post-body :global(sup a:hover) {
		text-decoration: underline;
	}

	.post-body :global(sup a:focus-visible) {
		outline: 2px solid var(--color-ink);
		outline-offset: 1px;
	}

	:global(.post-sources) {
		padding: 32px 24px;
	}

	@media (min-width: 640px) {
		:global(.post-sources) {
			padding: 40px 40px;
		}
	}

	@media (min-width: 1024px) {
		:global(.post-sources) {
			padding: 48px 64px;
		}
	}

	.post-sources-title {
		max-width: 660px;
		margin-inline: auto;
		font-family: 'Inter', sans-serif;
		font-size: 1rem;
		font-weight: 600;
		margin-bottom: 16px;
	}

	.post-sources-list {
		max-width: 660px;
		margin-inline: auto;
		display: flex;
		flex-direction: column;
		gap: 10px;
		counter-reset: source;
	}

	.post-sources-list li {
		display: flex;
		gap: 8px;
		font-size: 14px;
		line-height: 1.6;
		scroll-margin-top: 120px;
	}

	.post-sources-index {
		flex-shrink: 0;
		color: var(--color-text-muted);
		font-variant-numeric: tabular-nums;
	}

	.post-nav-wrapper {
		/* Matches .section-gap's top spacing so this reads as the same
		   rhythm as the gap between any two sections on the site. */
		margin-top: 30px;
	}

	.post-nav {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-inline: auto;
		max-width: 660px;
	}

	.post-nav-next {
		margin-left: auto;
	}

	@media (min-width: 640px) {
		.post-nav-wrapper {
			margin-top: 40px;
		}

		.post-nav {
			/* Mirrors the post content grid (TableOfContents column + gap)
			   so the nav tracks the text column's width once the TOC
			   sidebar squeezes it below 660px, instead of staying static. */
			max-width: min(660px, 100vw - 352px);
		}
	}

	@media (min-width: 1024px) {
		.post-nav-wrapper {
			margin-top: 64px;
		}

		.post-nav {
			max-width: min(660px, 100vw - 400px);
		}
	}

	.lightbox-overlay {
		position: fixed;
		inset: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-block: 32px;
		padding-inline: 16px;
		background-color: color-mix(in srgb, var(--base) 60%, transparent);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border: none;
		cursor: zoom-out;
	}

	@media (min-width: 640px) {
		.lightbox-overlay {
			padding-block: 64px;
			padding-inline: 48px;
		}
	}

	@media (min-width: 1024px) {
		.lightbox-overlay {
			padding: 96px;
		}
	}

	.lightbox-frame {
		position: relative;
		display: inline-flex;
		max-width: 100%;
		max-height: 100%;
	}

	.lightbox-img {
		display: block;
		max-width: 100%;
		max-height: 100%;
		border: 1px solid var(--color-border);
		border-radius: 16px;
		box-shadow: 0 12px 32px -12px rgba(0, 0, 0, 0.25);
	}

	.lightbox-close {
		position: absolute;
		right: 12px;
		bottom: 12px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		width: 36px;
		height: 36px;
		border: none;
		border-radius: 50%;
		background-color: color-mix(in srgb, var(--color-surface) 70%, transparent);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		color: var(--color-text);
		outline: none;
		cursor: pointer;
		opacity: 0;
		transition:
			opacity 200ms ease,
			background-color 200ms ease;
	}

	.lightbox-close:focus-visible {
		opacity: 1;
		outline: 2px solid var(--color-ink);
		outline-offset: 2px;
	}

	.lightbox-close-icon {
		width: 16px;
		height: 16px;
	}

	@media (hover: hover) {
		.lightbox-frame:hover .lightbox-close {
			opacity: 1;
		}

		.lightbox-close:hover {
			background-color: color-mix(in srgb, var(--color-surface) 85%, transparent);
		}
	}
</style>
