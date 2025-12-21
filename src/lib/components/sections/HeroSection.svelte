<script lang="ts">
	import ComponentName from "../ComponentName.svelte";
    import Link from "../Link.svelte";

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

<div class="border-b border-neutral-500 px-4 sm:px-10 lg:px-16">
    <div class="pt-15 mx-auto max-w-7xl border-l border-r px-6 border-neutral-500 min-h-100 flex items-center justify-center grid-background relative">
        <ComponentName name="HeroSection.svelte" position="bottom-left" />
        <div class="flex flex-col space-y-2 items-center">
            <span class="text-center text-2xl font-[Google_Sans] p-2 rounded-sm flex space-x-1 -mr-2">
                <span {@attach animateGreeting} class="font-semibold"></span>
                <span {@attach animateBlinking} class="font-extralight">|</span>
            </span>
            <span class="text-center text-lg max-w-xl">
                Ich entwickle Software bei <Link href="https://buildagil.com" color="#006666">buildagil</Link> und Open Source für <Link href="https://stack.swiss" color="#f13608">STACK</Link>.  Zudem absolviere ich meinen MSc an der <Link href="https://zhaw.ch" color="#0064a6">ZHAW</Link>.
            </span>
        </div>
    </div>
</div>