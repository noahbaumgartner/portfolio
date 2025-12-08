<script lang="ts">
    import { MediaQuery } from 'svelte/reactivity';
    import { gsap } from 'gsap';
    import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

    let { children } = $props();

    gsap.registerPlugin(ScrambleTextPlugin);

    function scrambleText(element: HTMLElement) {
        const scrambleEvent = {
            duration: 0.5,
            scrambleText: {
                text: element.textContent || "",
                chars: "0123456789abcdefghijklmnopqrstuvwxyz",
                speed: 0.3
            },
            ease: "power1.inOut"
        };

        gsap.to(element, scrambleEvent);
        element.addEventListener('mouseleave', () => gsap.to(element, scrambleEvent));
    }

    const isLargeScreen = new MediaQuery('(min-width: 1024px)');
</script>

<div class="border-b border-neutral-300 px-4 sm:px-10 lg:px-16">
    <div class="py-4 mx-auto max-w-7xl border-l border-r px-6 border-neutral-300 flex justify-between">
        <span {@attach scrambleText} class="font-bold text-xl font-[Google_Sans] cursor-pointer">
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