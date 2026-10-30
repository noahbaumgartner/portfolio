<script lang="ts">
	import { Globe } from '@lucide/svelte';
	import { Button, GithubIcon, MediaPreview, PageHeader } from '@noahbaumgartner/svelte-ui';

	let { post } = $props();
</script>

<div
	class="post-title"
	style:--glow-color={post.colors[1] ?? post.colors[0]}
	style:--glow-deep={post.colors[2] ?? post.colors[1] ?? post.colors[0]}
>
	{#if !post.gif}
		<div class="post-title-glow post-title-glow--page" aria-hidden="true"></div>
	{/if}
	<PageHeader eyebrow={post.period} title={post.title} description={post.description}>
		{#if post.gif}
			<div class="post-gif">
				<div class="post-title-glow post-title-glow--media" aria-hidden="true"></div>
				<MediaPreview
					src={post.gif}
					alt={post.title}
					playLabel="Abspielen"
					pauseLabel="Pausieren"
				/>
			</div>
		{/if}
		{#snippet footer()}
			<div class="post-title-footer">
				<hr class="post-title-divider" />
				{#if post.github || post.url}
					<div class="post-title-actions">
						{#if post.github}
							<Button
								variant="ghost"
								size="md"
								icon={GithubIcon}
								href={post.github}
								label="GitHub"
							/>
						{/if}
						{#if post.url}
							<Button variant="ghost" size="md" icon={Globe} href={post.url} label="Webseite" />
						{/if}
					</div>
				{/if}
			</div>
		{/snippet}
	</PageHeader>
</div>

<style>
	/* Clips the glow at the sides only, so it can bleed past the viewport edge without
	   causing a horizontal scrollbar, while its soft top and bottom are never cut off. */
	.post-title {
		position: relative;
		isolation: isolate;
		overflow-x: clip;
	}

	/* Soft circle in the post's own accent colour (second of its three colours, with a bit of
	   the third so pale palettes still show), fading out fully towards its edge. */
	.post-title-glow {
		position: absolute;
		z-index: -1;
		left: 50%;
		aspect-ratio: 1;
		translate: -50% -50%;
		border-radius: 50%;
		background: radial-gradient(
			circle closest-side,
			color-mix(
					in srgb,
					color-mix(in srgb, var(--glow-color) 80%, var(--glow-deep)) 45%,
					transparent
				)
				0%,
			transparent 100%
		);
		pointer-events: none;
	}

	/* With a header image most of the circle sits behind the image, with its centre a bit
	   below the image's top edge, so its top never reaches past the start of the header. */
	.post-title-glow--media {
		top: 0;
		width: 90%;
		translate: -50% -35%;
	}

	/* Without one it sits behind the title, with its top edge at the start of the header so
	   nothing of it vanishes under the navbar. */
	.post-title-glow--page {
		--glow-size: clamp(480px, 55vw, 800px);
		top: calc(var(--glow-size) / 2);
		width: var(--glow-size);
	}

	@media (prefers-color-scheme: dark) {
		:root:not([data-theme='light']) .post-title-glow {
			opacity: 0.7;
		}
	}

	:root[data-theme='dark'] .post-title-glow {
		opacity: 0.7;
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
		background-color: var(--color-surface);
	}

	.post-title-actions {
		display: flex;
		align-items: center;
		gap: 2px;
		flex-shrink: 0;
	}

	.post-gif {
		position: relative;
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
