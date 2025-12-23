<script>
	import ComponentName from "./ComponentName.svelte";
	import Heading1 from "../text/Heading1.svelte";
	import Section from "./Section.svelte";
	import Badge from "../Badge.svelte";
	import { CalendarIcon, LinkIcon, TagIcon } from "@lucide/svelte";

    let { project } = $props();
</script>

<Section class="pt-15 px-16 min-h-76 bg-grid">
    <ComponentName name="TitleSection.svelte" position="bottom-right" />
    <div class="flex flex-col space-y-2 w-full text-center sm:text-left">
        <Heading1>{project.title}</Heading1>
        <p>{project.description}</p>
        <div class="flex flex-wrap gap-1 justify-center sm:justify-start mt-2 sm:mt-0">
            <Badge>
                <CalendarIcon />
                {project.period}
            </Badge>
            <Badge href={project.url}>
                <LinkIcon />
                {project.url}
            </Badge>
            {#each project.tags as tag}
                <Badge>
                    {tag}</Badge>
            {/each}
        </div>
    </div>
</Section>