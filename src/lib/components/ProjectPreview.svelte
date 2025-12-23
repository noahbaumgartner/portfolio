<script lang="ts">
    import type { ProjectDTO } from '$lib/dtos/ProjectDTO';
	import { ArrowUpRight, CalendarIcon, LinkIcon } from '@lucide/svelte';
	import Heading2 from './text/Heading2.svelte';
	import Badge from './Badge.svelte';

    let { project }: { project: ProjectDTO }= $props();
</script>

<a href={`/projects/${project.slug}`} data-sveltekit-preload-data>
    <div class="group border-b border-gray-500 flex flex-col md:flex-row cursor-pointer">
        <div class="p-3 flex items-center justify-center">
            <img src={project.image} alt={project.title} class="aspect-[1.531/1] w-full md:min-w-74 md:w-74 object-contain grayscale group-hover:grayscale-0 transition-[filter] duration-300" />
        </div>
        <div class="flex flex-col space-y-2 justify-center px-10 pb-10 pt-2 md:py-0 md:pl-5 md:pr-10">
            <div class="flex space-x-2">
                <Heading2>{project.title}</Heading2>
                <ArrowUpRight class="size-6 group-hover:-translate-y-1 group-hover:translate-x-1 duration-150"/>
            </div>
            <span>{project.description}</span>
            <div class="flex flex-wrap gap-1">
                <Badge>
                    <CalendarIcon />
                    {project.period}
                </Badge>
                {#each project.tags as tag}
                    <Badge>{tag}</Badge>
                {/each}
            </div>
        </div>
    </div>
</a>