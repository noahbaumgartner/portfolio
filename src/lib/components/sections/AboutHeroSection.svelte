<script lang="ts">
	import { PageHeader } from '@noahbaumgartner/svelte-ui';
</script>

<PageHeader
	eyebrow="Über mich"
	description="Fullstack-Entwickler aus der Ostschweiz, mit über sechs Jahren Erfahrung, Student der Künstlichen Intelligenz und Feuerwehrmann in der Freizeit."
>
	{#snippet title()}
		Software entwickeln,<br />die man gerne benutzt.
	{/snippet}
</PageHeader>
