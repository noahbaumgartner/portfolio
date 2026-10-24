<script lang="ts">
	import { Image, Link, Section } from '@noahbaumgartner/svelte-ui';
</script>

<Section width="full" padded={false} class="section-gap">
	<div class="intro">
		<div class="intro-text">
			<h2 class="section-title">Wer ich bin</h2>
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
