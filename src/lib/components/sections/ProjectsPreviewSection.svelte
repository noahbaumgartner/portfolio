<script lang="ts">
	import { ArrowUpRight } from "@lucide/svelte";
	import ComponentName from "./ComponentName.svelte";
	import Heading2 from "../text/Heading2.svelte";
	import Section from "./Section.svelte";
	import ProjectPreview from "../ProjectPreview.svelte";
	import PanelCtaButton from "../PanelCtaButton.svelte";

    let { projects } = $props();
</script>

<Section sectionNumber="02">
    <ComponentName name="PreviewProjectsSection.svelte" position="bottom-left" />
    <div class="flex w-full h-full flex-col lg:flex-row">
        <div class="bg-grid px-10 py-10 border-b lg:border-b-0 lg:border-r border-neutral-500 flex items-center justify-center">
            <Heading2 class="lg:[writing-mode:sideways-lr]">Projekte</Heading2>
        </div>
        <div class="grow flex flex-col">
            {#each projects as project}
                <ProjectPreview {project} />
            {/each}
            <div class="w-full p-2">
                <PanelCtaButton href="/projects">Alle Projekte</PanelCtaButton>
            </div>
        </div>
    </div>
</Section>