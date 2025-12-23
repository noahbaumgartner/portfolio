<script>
	import ProjectTitleSection from '$lib/components/sections/ProjectTitleSection.svelte';
	import SectionNumber from '$lib/components/sections/SectionNumber.svelte';

	let { data } = $props();
    let { Content, project } = $derived(data);
</script>

<ProjectTitleSection project={project} />
<div class="border-b border-neutral-500 px-4 sm:px-10 lg:px-16">
    <div class="mx-auto lg:max-w-7xl border-l border-r border-neutral-500 min-h-64 relative flex flex-col lg:flex-row">
        <SectionNumber number="01" />
        <div class="grow p-10">
            <Content class="border-b border-gray-500" />
        </div>
        <div class="p-3 border-t lg:border-t-0 lg:border-l border-neutral-500 items-center justify-center flex">
            <img src={project.image} alt={project.title} class="aspect-[1.531/1] w-full md:min-w-md md:w-md" />
        </div>
    </div>
</div>