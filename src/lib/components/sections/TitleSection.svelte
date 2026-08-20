<script>
	import Section from "./Section.svelte";

    let { title } = $props();
</script>

<Section class="pt-15 px-16 min-h-48 bg-grid">
    <div class="flex flex-col space-y-2 w-full text-center sm:text-left">
        <h1>{title}</h1>
    </div>
</Section>