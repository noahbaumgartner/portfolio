<script lang="ts">
	import { Image, Link, Section } from '@noahbaumgartner/svelte-ui';
</script>

<Section width="full" surface={false} padded={false} class="intro-wrapper">
	<div class="intro">
		<div class="intro-text-card">
			<p>
				Ich bin Noah Baumgartner, ein leidenschaftlicher Fullstack-Softwareentwickler mit über sechs
				Jahren Erfahrung. Ich liebe es, innovative digitale Lösungen zu gestalten und mich fachlich
				wie persönlich ständig weiterzuentwickeln.
			</p>
			<p>
				Aktuell arbeite ich bei <Link href="https://www.b-3.ch/">B3 Digital</Link> und vertiefe mein Wissen
				berufsbegleitend im Master of Science in Engineering mit Schwerpunkt Künstliche Intelligenz und
				maschinelles Lernen an der <Link href="https://www.zhaw.ch">ZHAW</Link>.
			</p>
		</div>
		<Image
			src="/images/me-climbing.webp"
			alt="Noah Baumgartner beim Klettern"
			ratio={1}
			class="intro-image"
		/>
	</div>
</Section>

<style>
	:global(.intro-wrapper) {
		margin-bottom: 24px;
	}

	.intro {
		margin-inline: auto;
		max-width: 1280px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 32px;
	}

	.intro-text-card {
		display: flex;
		flex-direction: column;
		gap: 16px;
		max-width: 900px;
	}

	:global(.intro-image) {
		width: min(100%, 288px);
		flex-shrink: 0;
	}

	@media (min-width: 640px) {
		:global(.intro-wrapper) {
			margin-bottom: 40px;
		}
	}

	@media (min-width: 768px) {
		.intro {
			flex-direction: row;
			align-items: center;
			gap: 48px;
		}

		.intro-text-card {
			flex: 1 1 0;
		}

		:global(.intro-image) {
			margin-left: auto;
		}
	}

	@media (min-width: 1024px) {
		:global(.intro-wrapper) {
			margin-bottom: 64px;
		}
	}
</style>
