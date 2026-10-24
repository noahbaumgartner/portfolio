<script lang="ts">
	import { PageHeader } from '@noahbaumgartner/svelte-ui';
</script>

<PageHeader
	eyebrow="Über mich"
	description="Fullstack-Entwickler aus der Ostschweiz mit über sechs Jahren Erfahrung, MSc-Student an der ZHAW und in der Freizeit in diversen Vereinen engagiert."
>
	{#snippet title()}
		Software entwickeln,<br />die man gerne benutzt.
	{/snippet}
</PageHeader>
