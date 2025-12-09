<script lang="ts">
    import { gsap } from 'gsap';
    import ScrambleTextPackage from "gsap/ScrambleTextPlugin";

    const { ScrambleTextPlugin } = ScrambleTextPackage;
    gsap.registerPlugin(ScrambleTextPlugin);

    function scrambleText(node: HTMLElement) {
        const animation = gsap.to(node, {
            scrambleText: {
                text: node.textContent || '',
                chars: '0123456789abcdefghijklmnopqrstuvwxyz',
                speed: 0.3
            },
            duration: 0.3,
            ease: 'power1.inOut'
        });

        node.addEventListener('mouseenter', () => {
            animation.restart();
        });
    }
</script>

<span {@attach scrambleText} class="font-bold text-xl font-[Google_Sans] cursor-pointer">
    noahbaumgartner
</span>