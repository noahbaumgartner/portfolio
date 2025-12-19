<script lang="ts">
    import { MediaQuery } from 'svelte/reactivity';
    import NavLogo from './NavLogo.svelte';
	import Footer from './Footer.svelte';
	import Copyright from './Copyright.svelte';

    let { children } = $props();
    let mobileNavActive = $state(false);

    const isSmallScreen = new MediaQuery('(max-width: 1024px)');

    function toggleMobileNav(node: HTMLElement) {
        const links = node.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                mobileNavActive = false;
            });
        });
    }
</script>

<div class={["border-b border-neutral-500 px-4 sm:px-10 lg:px-16 fixed top-0 left-0 right-0 z-50", mobileNavActive ? 'bg-white' : 'bg-white/30 backdrop-blur-sm']}>
    <div class="py-4 mx-auto max-w-7xl border-l border-r px-6 border-neutral-500 flex justify-between">
        <NavLogo />
        {#if isSmallScreen.current}
            <button type="button" class="text-sm leading-7 bg-transparent border-none cursor-pointer p-0" onclick={() => mobileNavActive = !mobileNavActive}>/næv/</button>
        {:else}
            <nav class="space-x-6 text-sm flex flex-row">
                {@render children()}
            </nav>
        {/if}
    </div>

    {#if mobileNavActive}
        <div class="flex flex-col fixed inset-0 bg-white z-50">
            <div class="border-neutral-500 border-b px-4 text-right sm:px-10 lg:px-16">
                <div class="border-l border-r border-neutral-500 py-4 px-6">
                    <button type="button" class="text-sm cursor-pointer leading-7 bg-transparent border-none p-0" onclick={() => mobileNavActive = false}>/kloʊz/</button>
                </div>
            </div>
            <div class="border-neutral-500 px-4 text-lg text-right grow sm:px-10 lg:px-16 border-b">
                <div {@attach toggleMobileNav} class="border-l border-r border-neutral-500 py-6 px-6 flex flex-col space-y-4 h-full grid-background">
                    {@render children()}
                </div>
            </div>
            <Footer {@attach toggleMobileNav} />
            <Copyright />
        </div>
    {/if}
</div>