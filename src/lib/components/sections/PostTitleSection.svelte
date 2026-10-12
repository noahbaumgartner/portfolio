<script lang="ts">
	import { Github, Globe } from '@lucide/svelte';
	import Button from '$lib/components/primitives/button/Button.svelte';
	import MediaPreview from '$lib/components/features/media-preview/MediaPreview.svelte';

	let { post } = $props();
</script>

<section class="post-title-wrapper page-padding">
	<div class="post-title-box">
		<span class="post-period">{post.period}</span>
		<h1 class="post-title">{post.title}</h1>
		<p class="post-description">{post.description}</p>

		{#if post.gif}
			<div class="post-gif">
				<MediaPreview src={post.gif} alt={post.title} />
			</div>
		{/if}
	</div>

	<div class="post-title-footer">
		<hr class="post-title-divider" />
		{#if post.github || post.url}
			<div class="post-title-actions">
				{#if post.github}
					<Button variant="ghost" size="md" icon={Github} href={post.github} />
				{/if}
				{#if post.url}
					<Button variant="ghost" size="md" icon={Globe} href={post.url} />
				{/if}
			</div>
		{/if}
	</div>
</section>

<style>
	.post-title-box {
		margin-inline: auto;
		max-width: 1280px;
		padding: 56px 0 30px;
		display: flex;
		flex-direction: column;
		align-items: center;
		user-select: none;
	}

	.post-period {
		font-size: 14px;
		font-weight: 500;
		margin-bottom: 4px;
	}

	.post-title {
		text-align: center;
	}

	.post-description {
		margin-top: 8px;
		max-width: 440px;
		text-align: center;
		color: var(--color-text-secondary);
	}

	.post-title-footer {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-inline: auto;
		max-width: 660px;
	}

	.post-title-divider {
		flex: 1;
		min-width: 0;
		border: none;
		height: 1px;
		background-color: color-mix(in srgb, var(--base), var(--ink) 6%);
	}

	.post-title-actions {
		display: flex;
		align-items: center;
		gap: 2px;
		flex-shrink: 0;
	}

	.post-gif {
		width: 100%;
		max-width: 1000px;
		margin-inline: auto;
		margin-top: 30px;
	}

	@media (min-width: 640px) {
		.post-title-box {
			padding: 72px 0 40px;
		}

		.post-gif {
			margin-top: 40px;
		}

		.post-title-footer {
			/* Mirrors the post content grid (TableOfContents column + gap)
               so the divider tracks the text column's width once the TOC
               sidebar squeezes it below 660px, instead of staying static. */
			max-width: min(660px, 100vw - 352px);
		}
	}

	@media (min-width: 1024px) {
		.post-title-box {
			padding-bottom: 64px;
		}

		.post-gif {
			margin-top: 64px;
		}

		.post-title-footer {
			max-width: min(660px, 100vw - 400px);
		}
	}
</style>
