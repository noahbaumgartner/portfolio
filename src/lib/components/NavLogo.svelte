<script lang="ts">
    import { gsap } from 'gsap';
    import { ScrambleTextPlugin } from "gsap/dist/ScrambleTextPlugin";

    gsap.registerPlugin(ScrambleTextPlugin);

    function scrambleText(node: HTMLElement) {
        const animation = gsap.to(node, {
            scrambleText: {
                text: node.textContent || '',
                chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
                speed: 1
            },
            duration: 1,
            ease: 'power1.inOut'
        });

        node.addEventListener('mouseenter', () => {
            animation.restart();
        });
    }
</script>

<a href="/">
    <span {@attach scrambleText} class="font-bold text-xl font-[Google_Sans] cursor-pointer" data-sveltekit-preload-data>
        noahbaumgartner
    </span>
</a>