<script lang="ts">
	import ComponentName from "./ComponentName.svelte";
    import Link from "../text/Link.svelte";
	import Section from "./Section.svelte";

    function animateGreeting(node: HTMLElement) {
        const texts = ["Hallo, ich bin Noah", "Software Entwickler", "Student"];
        const typeSpeed = 30;

        let i = 0;
        let k = 0;
        let isDeleting = false;
        let currentText = texts[0];

        function type() {
            if (!isDeleting) {
                node.innerText = currentText.substring(0, k);
                k++;
                if (k > currentText.length) {
                    isDeleting = true;
                    setTimeout(type, 1500);
                    return;
                }
            } else {
                node.innerText = currentText.substring(0, k);
                k--;
                if (k < 0) {
                    isDeleting = false;
                    i++;
                    currentText = texts[i % texts.length];
                    k = 0;
                    setTimeout(type, typeSpeed);
                    return;
                }
            }
            setTimeout(type, typeSpeed);
        }

        type();
    }

    function animateBlinking(node: HTMLElement) {
        let visible = true;
        setInterval(() => {
            node.style.opacity = visible ? '1' : '0';
            visible = !visible;
        }, 300);
    }
</script> 

<Section class="pt-15 min-h-100 bg-grid px-10">
    <ComponentName name="HeroSection.svelte" position="bottom-left" />
    <div class="flex flex-col space-y-2 items-center">
        <span class="text-center text-2xl font-[Google_Sans] p-2 rounded-sm flex space-x-1 -mr-2">
            <span {@attach animateGreeting} class="font-semibold"></span>
            <span {@attach animateBlinking} class="font-extralight">|</span>
        </span>
        <span class="text-center text-lg max-w-xl">
            Ich entwickle Software bei <Link href="https://buildagil.com">buildagil</Link> und Open Source für <Link href="https://stack.swiss">STACK</Link>.  Zudem absolviere ich meinen MSc an der <Link href="https://zhaw.ch">ZHAW</Link>.
        </span>
    </div>
</Section>