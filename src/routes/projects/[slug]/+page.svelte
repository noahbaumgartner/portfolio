<script>
	import ProjectTitleSection from '$lib/components/sections/ProjectTitleSection.svelte';
	import SectionNumber from '$lib/components/sections/SectionNumber.svelte';
	import TitleSection from '$lib/components/sections/TitleSection.svelte';

	let { data } = $props();
    let { Content, project } = $derived(data);
</script>

<ProjectTitleSection project={project} />
<div class="border-b border-neutral-500 px-4 sm:px-10 lg:px-16">
    <div class="mx-auto lg:max-w-7xl border-l border-r border-neutral-500 min-h-64 relative p-10">
        <SectionNumber number="01" />
        <Content class="border-b border-gray-500" />
    </div>
</div>