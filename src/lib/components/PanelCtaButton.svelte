<script lang="ts">
	import { ArrowUpRight } from "@lucide/svelte";

    let { children, href } = $props();
</script>

<a href={href} data-sveltekit-preload-data>
    <button class="group w-full p-4 bg-linear-150 from-neutral-950 from-50% via-neutral-900 via-70% to-neutral-950 to-90% cursor-pointer text-white text-md font-[Google_Sans] flex space-x-2 justify-center">
        <span>{@render children()}</span>
        <ArrowUpRight class="size-6 group-hover:-translate-y-1 group-hover:translate-x-1 duration-150"/>
    </button>
</a>