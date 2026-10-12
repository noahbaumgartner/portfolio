<script lang="ts">
	import { Entry, Link, Section } from '@noahbaumgartner/svelte-ui';

	const educations = [
		{
			period: '2025 - Heute',
			title: 'Master of Science in Engineering',
			institution: 'Zürcher Hochschule für Angewandte Wissenschaften',
			url: 'https://www.zhaw.ch',
			description:
				'Masterstudium mit Vertiefung im Bereich Künstliche Intelligenz und maschinelles Lernen.'
		},
		{
			period: '2021 - 2025',
			title: 'Bachelor of Science in Informatik',
			institution: 'Zürcher Hochschule für Angewandte Wissenschaften',
			url: 'https://www.zhaw.ch',
			description: 'Bachelorstudium in Informatik mit Schwerpunkt auf Software Engineering.'
		},
		{
			period: '2016 - 2020',
			title: 'Berufsmatura',
			institution: 'Gewerbliches Berufs- und Weiterbildungszentrum St.Gallen',
			url: 'https://www.gbssg.ch',
			description:
				'Vorbereitung auf das Studium mit Fokus auf technische und naturwissenschaftliche Fächer.'
		},
		{
			period: '2016 - 2020',
			title: 'Informatiker EFZ',
			institution: 'Gewerbliches Berufs- und Weiterbildungszentrum St.Gallen',
			url: 'https://www.gbssg.ch',
			description: 'Lehre als Informatiker EFZ mit Fachrichtung Applikationsentwicklung.'
		}
	];
</script>

<Section width="full" class="section-gap">
	<div class="education">
		<div class="education-header">
			<h2 class="education-title">Ausbildung</h2>
		</div>

		<div class="education-list">
			{#each educations as education (education.title)}
				<Entry title={education.title} meta={education.period}>
					{education.description}
					{#snippet footer()}
						<Link href={education.url}>{education.institution}</Link>
					{/snippet}
				</Entry>
			{/each}
		</div>
	</div>
</Section>

<style>
	.education {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 24px;
	}

	.education-header {
		display: flex;
		align-items: baseline;
		justify-content: center;
		width: 100%;
	}

	.education-title {
		font-weight: 500;
		font-size: 22px;
	}

	.education-list {
		display: grid;
		grid-template-columns: 1fr;
		gap: 16px;
		width: 100%;
	}

	@media (min-width: 768px) {
		.education-list {
			grid-template-columns: repeat(2, 1fr);
			gap: 24px;
		}

		.education-list > :last-child:nth-child(odd) {
			grid-column: 1 / -1;
			width: calc(50% - 12px);
			margin-inline: auto;
		}
	}
</style>
