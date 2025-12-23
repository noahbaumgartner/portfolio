<script lang="ts">
    import type { ProjectDTO } from '$lib/dtos/ProjectDTO';
	import { ArrowUpRight } from '@lucide/svelte';
	import Heading2 from './text/Heading2.svelte';

    let { project }: { project: ProjectDTO }= $props();
</script>

<a href={`/projects/${project.slug}`} data-sveltekit-preload-data>
    <div class="group border-b border-gray-500 flex flex-col md:flex-row cursor-pointer">
        <div class="p-3 flex items-center justify-center">
            <img src={project.image} alt={project.title} class="w-full md:min-w-66 md:w-66 object-contain grayscale group-hover:grayscale-0 duration-200" />
        </div>
        <div class="flex flex-col space-y-1 justify-center px-10 pb-10 pt-3 md:py-0 md:pl-5 md:pr-10">
            <div class="flex space-x-2">
                <Heading2>{project.title}</Heading2>
                <ArrowUpRight class="size-6 group-hover:-translate-y-1 group-hover:translate-x-1 duration-150"/>
            </div>
            <span>{project.description}</span>
        </div>
    </div>
</a>