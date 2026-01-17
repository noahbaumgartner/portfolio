<script lang="ts">
    import type { ProjectDTO } from '$lib/dtos/ProjectDTO';
	import { ArrowUpRight } from '@lucide/svelte';
	import Badge from './Badge.svelte';
	import Image from './Image.svelte';

    let { project, featured = false }: { project: ProjectDTO, featured?: boolean } = $props();
</script>

{#if featured}
<a href={`/projects/${project.slug}`} data-sveltekit-preload-data class="block group border-b border-neutral-300 cursor-pointer">
    <div class="flex flex-col-reverse md:flex-row justify-between">
        <div class="flex flex-col space-y-2 justify-center px-10 pb-10 pt-5 md:p-10 lg:px-20">
            <Badge>{project.period}</Badge>
            <div class="flex space-x-2">
                <h2>{project.title}</h2>
                <ArrowUpRight class="size-6 group-hover:-translate-y-1 group-hover:translate-x-1 duration-150"/>
            </div>
            <span class="max-w-lg">{project.description}</span>
        </div>
        <div class="flex items-center p-5">
            <Image src={project.image} alt={project.title} class="aspect-[30/17] w-full md:w-sm grayscale group-hover:grayscale-0 transition-[filter] duration-300 border" />
        </div>
    </div>
</a>
{:else}
<a href={`/projects/${project.slug}`} data-sveltekit-preload-data class="block group [&:not(:last-child)>div]:border-b [&:not(:last-child)>div]:border-neutral-300 cursor-pointer">
    <div class="flex flex-col md:flex-row">
        <div class="p-5 flex items-center justify-center">
            <Image src={project.image} alt={project.title} class="aspect-[30/17] w-full md:min-w-74 md:w-74 grayscale group-hover:grayscale-0 transition-[filter] duration-300 border" />
        </div>
        <div class="flex flex-col space-y-2 justify-center p-10 pt-5 md:pt-10 md:pl-5">
            <Badge>{project.period}</Badge>
            <div class="flex space-x-2">
                <h2>{project.title}</h2>
                <ArrowUpRight class="size-6 group-hover:-translate-y-1 group-hover:translate-x-1 duration-150"/>
            </div>
            <span class="max-w-lg">{project.description}</span>
        </div>
    </div>
</a>
{/if}