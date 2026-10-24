<script lang="ts">
	import { Globe } from '@lucide/svelte';
	import { Button, MediaPreview, PageHeader } from '@noahbaumgartner/svelte-ui';
	import GithubIcon from '$lib/components/icons/GithubIcon.svelte';

	let { post } = $props();
</script>

<PageHeader eyebrow={post.period} title={post.title} description={post.description}>
	{#if post.gif}
		<div class="post-gif">
			<MediaPreview src={post.gif} alt={post.title} playLabel="Abspielen" pauseLabel="Pausieren" />
		</div>
	{/if}
	{#snippet footer()}
		<div class="post-title-footer">
			<hr class="post-title-divider" />
			{#if post.github || post.url}
				<div class="post-title-actions">
					{#if post.github}
						<Button variant="ghost" size="md" icon={GithubIcon} href={post.github} label="GitHub" />
					{/if}
					{#if post.url}
						<Button variant="ghost" size="md" icon={Globe} href={post.url} label="Webseite" />
					{/if}
				</div>
			{/if}
		</div>
	{/snippet}
</PageHeader>

<style>
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
		background-color: var(--color-surface);
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
		.post-gif {
			margin-top: 64px;
		}

		.post-title-footer {
			max-width: min(660px, 100vw - 400px);
		}
	}
</style>
