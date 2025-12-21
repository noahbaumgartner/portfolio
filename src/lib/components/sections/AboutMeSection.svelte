<script lang="ts">
	import ComponentName from "./ComponentName.svelte";
	import Heading2 from "../text/Heading2.svelte";
    import { ArrowUpRight } from "@lucide/svelte";
	import Section from "./Section.svelte";
</script>

<Section class="min-h-64" sectionNumber="01">
    <ComponentName name="AboutMeSection.svelte" position="bottom-right" />
    <div class="flex flex-col md:flex-row justify-between">
        <div class="flex flex-col">
            <div class="grow flex flex-col justify-center space-y-2 p-10 border-b border-neutral-500">
                <Heading2>Über mich</Heading2>
                <span>
                    Wenn ich nicht gerade an neuen Features für buildagil arbeite oder für mein Studium lerne, beschäftige ich mich mit privaten Projekten. Ich bin Entwickler aus Leidenschaft und immer auf der Suche nach der nächsten technischen Herausforderung.
                </span>
            </div>
            <div class="w-full p-2">
                <a href="/about" data-sveltekit-preload-data>
                    <button class="group w-full p-4 bg-linear-150 from-neutral-950 from-50% via-neutral-900 via-70% to-neutral-950 to-90% cursor-pointer text-white text-md font-[Google_Sans] flex space-x-2 justify-center">
                        <span>Mehr erfahren</span>
                        <ArrowUpRight class="size-6 group-hover:-translate-y-1 group-hover:translate-x-1 duration-150"/>
                    </button>
                </a>
            </div>
        </div>
        <div class="flex flex-col items-center p-10 border-t md:border-t-0 md:border-l border-neutral-500">
            <img src="/images/me.webp" alt="Noah Baumgartner" class="object-cover max-w-60" height="240" width="240" />
        </div>
    </div>
</Section>