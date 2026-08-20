<script>
	import Image from '$lib/components/Image.svelte';
	import ProjectTitleSection from '$lib/components/sections/ProjectTitleSection.svelte';

	let { data } = $props();
    let { Content, project } = $derived(data);
</script>

<ProjectTitleSection project={project} />
<div class="border-b border-neutral-300 px-4 sm:px-10 lg:px-16">
    <div class="mx-auto lg:max-w-7xl border-l border-r border-neutral-300 min-h-64 relative flex flex-col lg:flex-row">
        <div class="grow p-10">
            <Content class="border-b border-neutral-300" />
        </div>
        <div class="p-5 border-t lg:border-t-0 lg:border-l border-neutral-300 items-center justify-center flex">
            <Image src={project.image} alt={project.title} class="border aspect-30/17 w-full md:min-w-md md:w-md" />
        </div>
    </div>
</div>