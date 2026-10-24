<script lang="ts">
	import { Section, Timeline } from '@noahbaumgartner/svelte-ui';

	const experiences = [
		{
			period: 'Juli 2023 - Heute',
			title: 'Fullstack Software Entwickler',
			subtitle: 'B3 Digital',
			href: 'https://www.b-3.ch/',
			description:
				'Bei B3 Digital bin ich als Fullstack Software Entwickler tätig, wo ich vor allem an der Web-Applikation buildagil arbeite.'
		},
		{
			period: 'Mai 2023 - Juli 2023',
			title: 'SAP PI Consultant',
			subtitle: 'Swisscom',
			href: 'https://www.swisscom.ch',
			description:
				'Als SAP PI Consultant bei Swisscom sammelte ich wertvolle Erfahrungen in der Integration von SAP-Systemen, bevor ich mich für eine neue berufliche Herausforderung entschied.'
		},
		{
			period: 'August 2016 - April 2023',
			title: 'Software Entwickler',
			subtitle: 'SFS Group',
			href: 'https://www.sfs.com',
			description:
				'Während meiner Lehre bei der SFS Group konzentrierte ich mich auf Java- und Webentwicklung. Nach erfolgreichem Abschluss spezialisierte ich mich auf SAP-Entwicklung mit ABAP und SAP Fiori.'
		}
	];
</script>

<Section width="full" padded={false} class="section-gap">
	<div class="timeline-wrapper">
		<Timeline title="Berufserfahrung" items={experiences} />
	</div>
</Section>

<style>
	.timeline-wrapper {
		margin-inline: auto;
		max-width: 1280px;
	}
</style>
