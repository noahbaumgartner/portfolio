<script lang="ts">
	import ComponentName from "./ComponentName.svelte";
	import Section from "./Section.svelte";
	import { onMount } from 'svelte';

	interface SkillCategory {
		category: string;
		skills: string[];
	}

	const skillCategories: SkillCategory[] = [
		{
			category: "Frontend",
			skills: ["Svelte", "React", "TypeScript", "Tailwind CSS", "HTML/CSS"]
		},
		{
			category: "Backend",
			skills: ["Node.js", "Python", "Java", "REST APIs", "GraphQL"]
		},
		{
			category: "Tools & Workflow",
			skills: ["Git", "Docker", "CI/CD", "Vercel", "VS Code"]
		},
		{
			category: "Concepts",
			skills: ["Responsive Design", "Performance", "Testing", "Accessibility", "Agile"]
		}
	];

	let hoveredSkill = $state<string | null>(null);
	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});
</script>

<Section class="min-h-96" sectionNumber="02">
	<ComponentName name="AboutSkillsSection.svelte" position="bottom-left" />
	<div class="p-10 space-y-8">
		<div class="space-y-2">
			<h2>Skills & Technologien</h2>
			<p class="text-neutral-600 max-w-2xl">
				Mein Tech-Stack. Ständig im Wandel, immer am Lernen.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			{#each skillCategories as { category, skills }, catIndex}
				<div
					class="border border-neutral-300 p-6 space-y-4 transition-all duration-500"
					style="opacity: {mounted ? '1' : '0'}; transform: translateY({mounted ? '0' : '20px'}); transition-delay: {catIndex * 100}ms"
				>
					<div class="flex items-center space-x-2">
						<span class="font-[Source_Code_Pro] text-xs text-neutral-400">0{catIndex + 1}</span>
						<h3 class="text-lg font-[Google_Sans] font-semibold">{category}</h3>
					</div>

					<div class="flex flex-wrap gap-2">
						{#each skills as skill}
							<button
								class="px-3 py-1.5 border border-neutral-300 rounded text-sm transition-all duration-300 hover:bg-neutral-950 hover:text-white hover:border-neutral-950 hover:-translate-y-0.5"
								onmouseenter={() => hoveredSkill = skill}
								onmouseleave={() => hoveredSkill = null}
							>
								{skill}
							</button>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		{#if hoveredSkill}
			<div class="text-center text-neutral-400 text-sm font-[Source_Code_Pro] transition-opacity duration-300">
				<span class="opacity-100">Aktuell: {hoveredSkill}</span>
			</div>
		{:else}
			<div class="text-center text-neutral-400 text-sm font-[Source_Code_Pro]">
				<span class="opacity-0">-</span>
			</div>
		{/if}
	</div>
</Section>
