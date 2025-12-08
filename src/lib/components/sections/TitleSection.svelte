<script>
	import ComponentName from "../ComponentName.svelte";

    let { title } = $props();
</script>

<div class="border-b border-neutral-300 px-4 sm:px-10 lg:px-16">
    <div class="py-4 mx-auto max-w-7xl border-l border-r px-10 border-neutral-300 min-h-40 flex items-center grid-background relative">
        <ComponentName name="TitleSection.svelte" position="bottom-right" />
        <div class="flex flex-col space-y-2">
            <span class="text-2xl font-semibold font-[Google_Sans]">{title}</span>
        </div>
    </div>
</div>