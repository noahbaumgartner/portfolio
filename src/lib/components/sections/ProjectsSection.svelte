<script>
	import { ArrowUpRight } from "@lucide/svelte";
	import ComponentName from "../ComponentName.svelte";
	import Heading2 from "../Heading2.svelte";
	import ParagraphNumber from "../ParagraphNumber.svelte";

    let { projects } = $props();
</script>

<div class="border-b border-neutral-500 px-4 sm:px-10 lg:px-16">
    <div class="mx-auto lg:max-w-7xl border-l border-r border-neutral-500 flex items-center justify-center relative">
        <ParagraphNumber number="02" />
        <ComponentName name="ProjectsSection.svelte" position="bottom-left" />
        <div class="flex w-full h-full">
            <div class="grid-background px-10 py-10 border-r border-neutral-500 flex items-center justify-center">
                <Heading2 class="[writing-mode:sideways-lr]">Projekte</Heading2>
            </div>
            <div class="grow flex flex-col">
                {#each projects as project}
                <div class="border-b border-gray-500 flex">
                    <div class="p-5">
                        <img src={project.image} alt={project.title} class="aspect-video h-40 border-2 border-black object-cover" />
                    </div>
                    <div class="flex flex-col space-y-1 justify-center pl-5 pr-10">
                        <Heading2>{project.title}</Heading2>
                        <span>{project.description}</span>
                    </div>
                </div>
                {/each}
                <div class="w-full p-2">
                    <a href="/projects" data-sveltekit-preload-data>
                        <button class="group w-full p-4 bg-linear-150 from-neutral-950 from-50% via-neutral-900 via-70% to-neutral-950 to-90% cursor-pointer text-white text-md font-[Google_Sans] flex space-x-2 justify-center">
                            <span>Alle Projekte</span>
                            <ArrowUpRight class="size-6 group-hover:-translate-y-1 group-hover:translate-x-1 duration-150"/>
                        </button>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>