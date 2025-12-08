<script>
	import ComponentName from "../ComponentName.svelte";
import Link from "../Link.svelte";
</script>

<div class="border-b border-neutral-300 px-4 sm:px-10 lg:px-16">
    <div class="py-4 mx-auto max-w-7xl border-l border-r px-6 border-neutral-300 min-h-96 flex items-center justify-center grid-background relative">
        <ComponentName name="HeroSection.svelte" position="bottom-left" />
        <div class="flex flex-col space-y-2 items-center">
            <span class="text-2xl font-semibold font-[Google_Sans] text-center">Software Entwickler</span>
            <span class="text-center text-lg max-w-xl">
                Ich entwickle Software bei <Link href="https://buildagil.com" color="#006666">buildagil</Link> und für <Link href="https://adminity.ch" color="#f13608">adminity</Link>. Zudem arbeite ich auch an privaten <Link href="/projects">Projekten</Link>.
            </span>
        </div>
    </div>
</div>