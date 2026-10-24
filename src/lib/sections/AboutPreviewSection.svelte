<script lang="ts">
	import { Image, Link, Section } from '@noahbaumgartner/svelte-ui';
</script>

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
					mitentwickle und interne Prozesse verbessere. Daneben lerne ich für mein Studium und setze
					private Projekte um. Ich bin Entwickler aus Leidenschaft und immer auf der Suche nach der
					nächsten technischen Herausforderung.
				</span>
			</div>
			<Image
				src="/images/me.webp"
				alt="Porträt von Noah Baumgartner"
				ratio={1}
				class="about-image"
			/>
		</div>
	</div>
</Section>

<style>
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

	:global(.about-image) {
		width: min(100%, 288px);
		flex-shrink: 0;
		align-self: center;
	}

	@media (min-width: 768px) {
		.about-body {
			flex-direction: row;
			align-items: center;
			gap: 72px;
		}

		:global(.about-image) {
			order: -1;
		}

		.about-text {
			padding-block: 0;
		}
	}
</style>
