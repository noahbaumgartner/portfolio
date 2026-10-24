<script lang="ts">
	import { Link, Section } from '@noahbaumgartner/svelte-ui';
</script>

<Section width="full" padded={false} class="section-gap">
	<div class="hobbies">
		<span class="eyebrow">Freizeit</span>
		<p class="statement">
			Ich engagiere mich bei der freiwilligen <Link href="https://feuerwehr-oberriet.ch/"
				>Feuerwehr Oberriet</Link
			>, bin aktiv im Turnverein <Link href="https://www.stvkriessern.ch/">STV Kriessern</Link> und setze
			mich gemeinsam mit Freunden im Verein
			<Link href="https://schollabar.ch/">Kriessner Schollabar</Link> ein.
		</p>
	</div>
</Section>

<style>
	.hobbies {
		margin-inline: auto;
		max-width: 1280px;
		padding-block: 40px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		text-align: center;
	}

	.eyebrow {
		font-size: 14px;
		color: var(--color-text-muted);
	}

	.statement {
		max-width: 800px;
		font-family: 'Outfit', sans-serif;
		font-size: clamp(22px, 2vw + 14px, 32px);
		font-weight: 500;
		line-height: 1.3;
		letter-spacing: -0.01em;
	}

	.statement :global(.link) {
		font-size: inherit;
	}

	@media (min-width: 1024px) {
		.hobbies {
			padding-block: 80px;
		}
	}
</style>
