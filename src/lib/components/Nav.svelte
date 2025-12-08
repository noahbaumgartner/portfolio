<script lang="ts">
    import { MediaQuery } from 'svelte/reactivity';

    let { children } = $props();
    let mobileNavActive = $state(false);

    const isSmallScreen = new MediaQuery('(max-width: 1024px)');
</script>

<div class="border-b border-neutral-300 px-4 sm:px-10 lg:px-16">
    <div class="py-4 mx-auto max-w-7xl border-l border-r px-6 border-neutral-300 flex justify-between">
        <span class="font-bold text-xl font-[Google_Sans] cursor-pointer">
            noahbaumgartner
        </span>
        {#if isSmallScreen.current}
            <span class="cursor-pointer text-sm leading-7" onclick={() => mobileNavActive = !mobileNavActive}>/næv/</span>
        {:else}
            <nav class="space-x-6 text-sm flex flex-row">
                {@render children()}
            </nav>
        {/if}
    </div>

    {#if mobileNavActive}
        <div class="flex flex-col fixed inset-0 bg-white z-50">
            <div class="border-neutral-300 border-b px-4 text-right sm:px-10 lg:px-16">
                <div class="border-l border-r border-neutral-300 py-4 px-6">
                    <span class="text-sm cursor-pointer leading-7" onclick={() => mobileNavActive = false}>/kloʊz/</span>
                </div>
            </div>
            <div class="border-neutral-300 px-4 text-lg text-right grow sm:px-10 lg:px-16">
                <div class="border-l border-r border-neutral-300 py-6 px-6 flex flex-col space-y-4 h-full" onclick={() => mobileNavActive = false}>
                    {@render children()}
                </div>
            </div>
        </div>
    {/if}
</div>