<script lang="ts">
	import { Link, Section } from '@noahbaumgartner/svelte-ui';

	const disclaimers = [
		{
			title: 'Kontakt',
			text: 'Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Gewähr für die Aktualität, Vollständigkeit und Richtigkeit der bereitgestellten Informationen. Jegliche Haftungsansprüche gegen uns, die sich auf Schäden materieller oder ideeller Art beziehen, verursacht durch die Nutzung oder Nichtnutzung der dargebotenen Inhalte bzw. durch Nutzung fehlerhafter und unvollständiger Informationen, sind grundsätzlich ausgeschlossen.'
		},
		{
			title: 'Externe Links',
			text: 'Unsere Webseite enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb übernehmen wir für diese fremden Inhalte auch keine Gewähr. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.'
		},
		{
			title: 'Urheberrecht',
			text: 'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf dieser Website unterliegen dem schweizerischen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung ausserhalb der Grenzen des Urheberrechts bedürfen unserer schriftlichen Zustimmung.'
		},
		{
			title: 'Änderungen und Irrtümer',
			text: 'Wir behalten uns ausdrücklich vor, Teile der Seiten oder das gesamte Angebot jederzeit zu ändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen. Sollten einzelne Formulierungen oder Darstellungen dieses Haftungsausschlusses unwirksam sein, bleiben die übrigen Bestimmungen davon unberührt.'
		}
	];
</script>

<Section width="full" padded={false} class="section-gap">
	<div class="block">
		<h2 class="section-title">Kontakt</h2>
		<dl class="rows">
			<div class="row contact-row">
				<dt class="label">E-Mail</dt>
				<dd><Link href="mailto:noahbaumg@outlook.com">noahbaumg@outlook.com</Link></dd>
			</div>
			<div class="row contact-row">
				<dt class="label">Web</dt>
				<dd><Link href="/">https://noahbaumgartner.ch</Link></dd>
			</div>
		</dl>
	</div>
</Section>

<Section width="full" padded={false} class="section-gap">
	<div class="block">
		<h2 class="section-title">Haftungsausschluss</h2>
		<ol class="rows">
			{#each disclaimers as disclaimer (disclaimer.title)}
				<li class="row">
					<h3 class="disclaimer-title">{disclaimer.title}</h3>
					<p class="disclaimer-text">{disclaimer.text}</p>
				</li>
			{/each}
		</ol>
	</div>
</Section>

<style>
	.block {
		margin-inline: auto;
		max-width: 1280px;
		display: grid;
		gap: 32px;
	}

	.rows {
		border-bottom: 1px solid var(--color-border);
	}

	.row {
		display: grid;
		gap: 4px;
		padding-block: 24px;
		border-top: 1px solid var(--color-border);
	}

	.label {
		font-size: 14px;
		color: var(--color-text-muted);
	}

	.contact-row {
		padding-block: 20px;
	}

	.contact-row dd {
		margin: 0;
	}

	.disclaimer-title {
		font-size: 20px;
		font-weight: 500;
	}

	.disclaimer-text {
		margin-top: 4px;
		max-width: 640px;
		color: var(--color-text-secondary);
	}

	@media (min-width: 768px) {
		.block {
			grid-template-columns: 1fr 2fr;
			gap: 64px;
		}

		.row {
			padding-block: 32px;
		}

		.contact-row {
			padding-block: 24px;
			grid-template-columns: 180px 1fr;
			gap: 32px;
		}

		.label {
			padding-top: 2px;
		}
	}
</style>
