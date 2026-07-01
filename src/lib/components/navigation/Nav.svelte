<script lang="ts">
    import { MediaQuery } from 'svelte/reactivity';
    import NavLogo from './NavLogo.svelte';
	import Footer from '../sections/FooterSection.svelte';
	import Copyright from '../sections/CopyrightSection.svelte';

    let { children } = $props();
    let mobileNavActive = $state(false);
    let scrollY = $state(0);
    const scrolled = $derived(scrollY > 8);

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

<svelte:window bind:scrollY />

<nav class={["px-4 sm:px-10 lg:px-16 fixed top-0 left-0 right-0 z-50 topbar", scrolled ? 'pt-4 scrolled' : 'pt-0']}>
    <div class={["mx-auto max-w-7xl transition-all duration-300 ease-out", scrolled ? 'px-3 sm:px-4' : 'px-0']}>
        <div class={["py-4 px-6 border-l border-r border-neutral-300 flex justify-between items-center transition-all duration-300 ease-out", scrolled ? 'rounded-xl border-t border-b shadow-sm' : 'rounded-none', mobileNavActive ? 'bg-white' : 'bg-white/50 backdrop-blur-sm']}>
            <NavLogo />
        {#if isSmallScreen.current}
            <button type="button" class="text-sm leading-7 bg-transparent border-none cursor-pointer p-0" onclick={() => mobileNavActive = !mobileNavActive}>/næv/</button>
        {:else}
            <div class="space-x-6 text-sm flex flex-row items-center">
                {@render children()}
            </div>
        {/if}
        </div>
    </div>

    {#if mobileNavActive}
        <div class="flex flex-col fixed inset-0 bg-white z-50">
            <div class="border-neutral-300 border-b px-4 text-right sm:px-10 lg:px-16">
                <div class="border-l border-r border-neutral-300 py-4 px-6">
                    <button type="button" class="text-sm cursor-pointer leading-7 bg-transparent border-none p-0" onclick={() => mobileNavActive = false}>/kloʊz/</button>
                </div>
            </div>
            <div class="border-neutral-300 px-4 text-lg text-right grow sm:px-10 lg:px-16 border-b">
                <div {@attach toggleMobileNav} class="border-l border-r border-neutral-300 py-6 px-6 flex flex-col space-y-4 h-full bg-grid">
                    {@render children()}
                </div>
            </div>
            <Copyright />
        </div>
    {/if}
</nav>

<style>
    /* Full-width bottom border at the top of the page. When scrolling down it
       disappears instantly (start of transition); when scrolling back up it
       reappears only after the padding animation finishes (end of transition). */
    .topbar {
        border-bottom: 1px solid var(--color-neutral-300);
        transition: padding 300ms ease-out, border-color 250ms ease-out 300ms;
    }
    .topbar.scrolled {
        border-bottom-color: transparent;
        transition: padding 300ms ease-out, border-color 0s linear 0s;
    }
</style>