<script>
	import ComponentName from "./ComponentName.svelte";
	import Heading1 from "../text/Heading1.svelte";
	import Section from "./Section.svelte";

    let { title } = $props();
</script>

<Section class="pt-15 px-16 min-h-48 bg-grid">
    <ComponentName name="TitleSection.svelte" position="bottom-right" />
    <div class="flex flex-col space-y-2 w-full text-center sm:text-left">
        <Heading1>{title}</Heading1>
    </div>
</Section>