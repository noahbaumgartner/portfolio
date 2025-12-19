<script lang="ts">
	import ComponentName from "../ComponentName.svelte";
    import Link from "../Link.svelte";

    function animateGreeting(node: HTMLElement) {
        const texts = ["Software Entwickler", "Student"];
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
</script>

<div class="border-b border-neutral-300 px-4 sm:px-10 lg:px-16">
    <div class="py-4 mx-auto max-w-7xl border-l border-r px-6 border-neutral-300 min-h-96 flex items-center justify-center grid-background relative">
        <ComponentName name="HeroSection.svelte" position="bottom-left" />
        <div class="flex flex-col space-y-4 items-center">
            <span class="text-left bg-neutral-200 text-2xl font-semibold font-[Google_Sans] p-2 rounded-sm flex">
                <span>[</span>
                <h1 {@attach animateGreeting} class="text-neutral-800">...</h1>
                <span>]</span>
            </span>
            <span class="text-center text-lg max-w-xl">
                Ich entwickle Software bei <Link href="https://buildagil.com" color="#006666">buildagil</Link> und Open Source für <Link href="https://stack.swiss" color="#f13608">STACK</Link>.  Zudem absolviere ich meinen MSc an der <Link href="https://zhaw.ch" color="#0064a6">ZHAW</Link>.
            </span>
        </div>
    </div>
</div>