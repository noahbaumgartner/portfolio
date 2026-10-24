<script lang="ts">
	import { Section, Timeline } from '@noahbaumgartner/svelte-ui';

	const educations = [
		{
			period: '2025 - Heute',
			title: 'Master of Science in Engineering',
			subtitle: 'Zürcher Hochschule für Angewandte Wissenschaften',
			href: 'https://www.zhaw.ch',
			description:
				'Masterstudium mit Vertiefung im Bereich Künstliche Intelligenz und maschinelles Lernen.'
		},
		{
			period: '2021 - 2025',
			title: 'Bachelor of Science in Informatik',
			subtitle: 'Zürcher Hochschule für Angewandte Wissenschaften',
			href: 'https://www.zhaw.ch',
			description: 'Bachelorstudium in Informatik mit Schwerpunkt auf Software Engineering.'
		},
		{
			period: '2016 - 2020',
			title: 'Berufsmatura',
			subtitle: 'Gewerbliches Berufs- und Weiterbildungszentrum St.Gallen',
			href: 'https://www.gbssg.ch',
			description:
				'Vorbereitung auf das Studium mit Fokus auf technische und naturwissenschaftliche Fächer.'
		},
		{
			period: '2016 - 2020',
			title: 'Informatiker EFZ',
			subtitle: 'Gewerbliches Berufs- und Weiterbildungszentrum St.Gallen',
			href: 'https://www.gbssg.ch',
			description: 'Lehre als Informatiker EFZ mit Fachrichtung Applikationsentwicklung.'
		}
	];
</script>

<Section width="full" padded={false} class="section-gap">
	<div class="timeline-wrapper">
		<Timeline title="Ausbildung" items={educations} />
	</div>
</Section>

<style>
	.timeline-wrapper {
		margin-inline: auto;
		max-width: 1280px;
	}
</style>
