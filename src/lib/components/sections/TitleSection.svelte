<script>
	import ComponentName from "../ComponentName.svelte";
	import Heading1 from "../Heading1.svelte";

    let { title } = $props();
</script>

<div class="border-b border-neutral-500 px-4 sm:px-10 lg:px-16">
    <div class="pt-15 mx-auto max-w-7xl border-l border-r px-16 border-neutral-500 min-h-48 flex items-center grid-background relative">
        <ComponentName name="TitleSection.svelte" position="bottom-right" />
        <div class="flex flex-col space-y-2 w-full text-center sm:text-left">
            <Heading1>{title}</Heading1>
        </div>
    </div>
</div>