<script lang="ts">
	import { Image, Link, Section } from '@noahbaumgartner/svelte-ui';
</script>

<div class="intro-wrap">
	<Section width="full" padded={false} class="section-gap">
		<div class="intro">
			<div class="intro-text">
				<h2 class="section-title">Wer ich bin</h2>
				<p>
					Ich bin Noah Baumgartner, ein leidenschaftlicher Fullstack-Softwareentwickler mit über
					sechs Jahren Erfahrung. Ich liebe es, innovative digitale Lösungen zu gestalten und mich
					fachlich wie persönlich ständig weiterzuentwickeln.
				</p>
				<p>
					Aktuell arbeite ich bei <Link href="https://www.b-3.ch/">B3 Digital</Link> und vertiefe mein
					Wissen berufsbegleitend im Master of Science in Engineering mit Schwerpunkt Künstliche Intelligenz
					und maschinelles Lernen an der <Link href="https://www.zhaw.ch">ZHAW</Link>.
				</p>
			</div>
			<div class="intro-media">
				<div class="intro-glow" aria-hidden="true"></div>
				<Image
					src="/images/me-climbing.webp"
					alt="Noah Baumgartner beim Klettern"
					ratio={1}
					class="intro-image"
				/>
			</div>
		</div>
	</Section>
</div>

<style>
	/* Clips the glow at the sides only, so it can bleed past the viewport edge without
	   causing a horizontal scrollbar, while its soft top and bottom are never cut off. */
	.intro-wrap {
		position: relative;
		isolation: isolate;
		overflow-x: clip;
	}

	.intro {
		margin-inline: auto;
		max-width: 1280px;
		display: flex;
		flex-direction: column;
		gap: 40px;
	}

	.intro-text {
		display: flex;
		flex-direction: column;
		gap: 16px;
		max-width: 520px;
	}

	.intro-media {
		position: relative;
	}

	/* Soft circle in the light blue-grey of the rock in the photo, nudged slightly towards
	   the top left of the image and fading out fully towards its edge. It is sized and placed
	   relative to the image, so it follows the image when the layout stacks on small screens. */
	.intro-glow {
		--glow-color: #93a4c0;
		position: absolute;
		z-index: -1;
		top: 42%;
		left: 42%;
		width: 200%;
		aspect-ratio: 1;
		translate: -50% -50%;
		border-radius: 50%;
		background: radial-gradient(
			circle closest-side,
			color-mix(in srgb, var(--glow-color) 60%, transparent) 0%,
			transparent 100%
		);
		pointer-events: none;
	}

	@media (prefers-color-scheme: dark) {
		:root:not([data-theme='light']) .intro-glow {
			opacity: 0.5;
		}
	}

	:root[data-theme='dark'] .intro-glow {
		opacity: 0.5;
	}

	:global(.intro-image) {
		width: 100%;
	}

	@media (min-width: 768px) {
		.intro {
			display: grid;
			grid-template-columns: 1fr 1fr;
			align-items: center;
			gap: 64px;
		}
	}
</style>
