<script lang="ts">
	import { Link, Section } from '@noahbaumgartner/svelte-ui';

	const email = 'noah@nb.digital';

	const sections = [
		{
			title: 'Verantwortlicher',
			text: 'Verantwortlich für die Bearbeitung von Personendaten auf dieser Website ist Noah Baumgartner. Anfragen zum Datenschutz kannst du jederzeit per E-Mail an {email} richten.'
		},
		{
			title: 'Hosting und Server-Logfiles',
			text: 'Diese Website wird bei Vercel Inc. (USA) gehostet. Beim Aufruf der Website werden technisch bedingt Daten wie die IP-Adresse, Datum und Uhrzeit, die aufgerufene Seite, der Browsertyp und das Betriebssystem verarbeitet. Dies ist notwendig, um die Website auszuliefern und ihre Sicherheit und Stabilität zu gewährleisten. Die Daten werden nicht mit anderen Daten zusammengeführt und nur so lange gespeichert, wie es dafür erforderlich ist.'
		},
		{
			title: 'Webanalyse',
			text: 'Ich verwende Vercel Web Analytics, um zu verstehen, wie die Website genutzt wird, zum Beispiel welche Seiten aufgerufen werden. Dabei werden keine Cookies gesetzt und die Besucher werden nicht über mehrere Websites hinweg verfolgt. Die Auswertung erfolgt in aggregierter Form. Es werden keine Daten für Werbezwecke genutzt.'
		},
		{
			title: 'Cookies und lokaler Speicher',
			text: 'Diese Website setzt keine Cookies. Wenn du das Design (hell oder dunkel) wechselst, wird deine Auswahl im lokalen Speicher deines Browsers (localStorage) abgelegt, damit sie beim nächsten Besuch erhalten bleibt. Dieser Eintrag verlässt deinen Browser nicht und kann jederzeit über die Browsereinstellungen gelöscht werden.'
		},
		{
			title: 'Datenbekanntgabe ins Ausland',
			text: 'Da Vercel seine Dienste weltweit erbringt, können Daten auch ausserhalb der Schweiz und des EWR, insbesondere in den USA, bearbeitet werden. Dies geschieht auf Grundlage der von Vercel bereitgestellten Datenschutzgarantien, etwa Standardvertragsklauseln.'
		},
		{
			title: 'Kontaktaufnahme',
			text: 'Wenn du mir eine E-Mail schreibst, verarbeite ich deine Angaben, um deine Anfrage zu beantworten. Die Daten werden nicht an Dritte weitergegeben und gelöscht, sobald sie nicht mehr benötigt werden.'
		},
		{
			title: 'Externe Links',
			text: 'Diese Website enthält Links zu externen Websites, etwa zu LinkedIn, Instagram oder GitHub. Beim Anklicken gelten die Datenschutzbestimmungen der jeweiligen Anbieter, auf die ich keinen Einfluss habe.'
		},
		{
			title: 'Deine Rechte',
			text: 'Du hast das Recht auf Auskunft über deine bearbeiteten Personendaten sowie auf Berichtigung, Löschung und Einschränkung der Bearbeitung. Bei Fragen zu diesen Rechten genügt eine E-Mail an {email}. Zudem kannst du dich bei der zuständigen Datenschutzbehörde beschweren, in der Schweiz beim Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB).'
		},
		{
			title: 'Änderungen',
			text: 'Ich kann diese Datenschutzerklärung jederzeit anpassen, zum Beispiel wenn sich die Website oder die rechtlichen Vorgaben ändern. Es gilt die jeweils auf dieser Seite veröffentlichte Fassung. Stand: November 2026.'
		}
	];
</script>

<Section width="full" padded={false} class="section-gap">
	<div class="block">
		<h2 class="section-title">Datenschutzerklärung</h2>
		<ol class="rows">
			{#each sections as section (section.title)}
				<li class="row">
					<h3 class="privacy-title">{section.title}</h3>
					<p class="privacy-text">
						{#each section.text.split('{email}') as part, i}{#if i > 0}<Link href="mailto:{email}"
									>{email}</Link
								>{/if}{part}{/each}
					</p>
				</li>
			{/each}
		</ol>
	</div>
</Section>

<style>
	.block {
		margin-inline: auto;
		max-width: var(--content-max-width);
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

	.privacy-title {
		font-size: 20px;
		font-weight: 500;
	}

	.privacy-text {
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
	}
</style>
