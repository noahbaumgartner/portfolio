<script lang="ts">
    import { MediaQuery } from 'svelte/reactivity';

    let { children } = $props();

    const isLargeScreen = new MediaQuery('(min-width: 1024px)');
</script>

<div class="border-b border-neutral-300 px-4 sm:px-10 lg:px-16">
    <div class="py-4 mx-auto max-w-7xl border-l border-r px-6 border-neutral-300 flex justify-between">
        <span class="font-bold text-xl font-[Google_Sans] cursor-pointer">
            noahbaumgartner
        </span>
        {#if isLargeScreen.current}
            <nav class="space-x-6">
                {@render children()}
            </nav>
        {:else}
            <span class="cursor-pointer text-sm leading-7">/næv/</span>
        {/if}
    </div>
</div>