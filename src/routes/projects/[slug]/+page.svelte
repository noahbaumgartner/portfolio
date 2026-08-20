<script>
	import Image from '$lib/components/Image.svelte';
	import ProjectTitleSection from '$lib/components/sections/ProjectTitleSection.svelte';
	import Section from '$lib/components/sections/Section.svelte';

	let { data } = $props();
	let { Content, project } = $derived(data);
</script>

<ProjectTitleSection {project} />
<Section class="project-content">
	<div class="project-body">
		<Content />
	</div>
	<Image src={project.image} alt={project.title} class="project-hero-image" />
</Section>

<style>
	:global(.project-content) {
		display: flex;
		flex-direction: column;
		padding: 24px;
		gap: 32px;
	}

	.project-body {
		flex-grow: 1;
	}

	:global(.project-hero-image) {
		width: 100%;
		border-radius: 6px;
		aspect-ratio: 30 / 17;
	}

	@media (min-width: 1024px) {
		:global(.project-content) {
			flex-direction: row;
			padding: 40px;
		}

		:global(.project-hero-image) {
			width: 360px;
			flex-shrink: 0;
		}
	}
</style>
