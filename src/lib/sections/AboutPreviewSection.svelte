<script lang="ts">
	import { Image, Link, Section } from '@noahbaumgartner/svelte-ui';
</script>

<div class="about-wrap">
	<Section width="full" padded={false} class="section-gap">
		<div class="about">
			<div class="about-header">
				<h2 class="section-title">Über mich</h2>
				<Link href="/about">Mehr erfahren</Link>
			</div>

			<div class="about-body">
				<div class="about-text">
					<span>
						Ich arbeite als Entwickler bei B3 Digital, wo ich an buildagil, unserem eigenen Produkt,
						mitentwickle und interne Prozesse verbessere. Daneben lerne ich für mein Studium und
						setze private Projekte um. Ich bin Entwickler aus Leidenschaft und immer auf der Suche
						nach der nächsten technischen Herausforderung.
					</span>
				</div>
				<div class="about-media">
					<div class="about-glow" aria-hidden="true"></div>
					<Image
						src="/images/me.webp"
						alt="Porträt von Noah Baumgartner"
						ratio={1}
						class="about-image"
					/>
				</div>
			</div>
		</div>
	</Section>
</div>

<style>
	/* Clips the glow at the sides only, so it can bleed past the viewport edge without
	   causing a horizontal scrollbar, while its soft top and bottom are never cut off. */
	.about-wrap {
		position: relative;
		isolation: isolate;
		overflow-x: clip;
	}

	.about {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 24px;
	}

	.about-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}

	.about-header :global(.link) {
		font-size: 14px;
	}

	.about-body {
		display: flex;
		flex-direction: column;
		gap: 40px;
		width: 100%;
	}

	.about-text {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 16px;
		padding-block: 5px;
		max-width: 544px;
	}

	.about-media {
		position: relative;
		width: min(100%, 288px);
		flex-shrink: 0;
		align-self: center;
	}

	/* Soft neutral grey circle matching the black and white portrait, shifted towards the top
	   right of the portrait and fading out fully towards its edge. It is sized and placed
	   relative to the image, so it follows the image when the layout stacks on small screens. */
	.about-glow {
		--glow-color: #9a9a9a;
		position: absolute;
		z-index: -1;
		top: 42%;
		left: 70%;
		width: 300%;
		aspect-ratio: 1;
		translate: -50% -50%;
		border-radius: 50%;
		background: radial-gradient(
			circle closest-side,
			color-mix(in srgb, var(--glow-color) 40%, transparent) 0%,
			transparent 100%
		);
		pointer-events: none;
	}

	@media (prefers-color-scheme: dark) {
		:root:not([data-theme='light']) .about-glow {
			opacity: 0.75;
		}
	}

	:root[data-theme='dark'] .about-glow {
		opacity: 0.75;
	}

	:global(.about-image) {
		width: 100%;
	}

	@media (min-width: 768px) {
		.about-body {
			flex-direction: row;
			align-items: center;
			gap: 72px;
		}

		.about-media {
			order: -1;
		}

		.about-text {
			padding-block: 0;
		}
	}
</style>
