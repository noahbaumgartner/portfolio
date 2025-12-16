<script lang="ts">
	import ImprintAddressSection from "$lib/components/sections/ImprintAddressSection.svelte";
	import ImprintContactSection from "$lib/components/sections/ImprintContactSection.svelte";
	import ImprintDisclaimerSection from "$lib/components/sections/ImprintDisclaimerSection.svelte";
	import TitleSection from "$lib/components/sections/TitleSection.svelte";
</script>

<svelte:head>
    <title>Noah Baumgartner | Impressum</title>
</svelte:head>

<TitleSection title="Impressum" />

<ImprintAddressSection />
<ImprintContactSection />
<ImprintDisclaimerSection />