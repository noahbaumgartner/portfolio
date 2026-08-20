<script lang="ts">
	import Section from "./Section.svelte";
	import { onMount } from 'svelte';

	interface JourneyItem {
		year: string;
		title: string;
		organization: string;
		description: string;
	}

	const journeyItems: JourneyItem[] = [
		{
			year: "2024",
			title: "Software Entwickler",
			organization: "buildagil",
			description: "Full-Stack Entwicklung moderner Web-Applikationen mit Focus auf User Experience und Performance."
		},
		{
			year: "2023",
			title: "MSc Student",
			organization: "ZHAW",
			description: "Master of Science in Engineering mit Fokus auf Software Engineering und moderne Entwicklungsmethoden."
		}
	];

	let visibleItems = $state<boolean[]>([]);

	onMount(() => {
		// Animate items in sequence
		journeyItems.forEach((_, index) => {
			setTimeout(() => {
				visibleItems[index] = true;
			}, index * 200);
		});
	});

	function animateCounter(node: HTMLElement) {
		const targetYear = node.getAttribute('data-year') || '2024';
		const target = parseInt(targetYear);
		const duration = 1000;
		const start = target - 10;
		const startTime = Date.now();

		function update() {
			const elapsed = Date.now() - startTime;
			const progress = Math.min(elapsed / duration, 1);
			const current = Math.floor(start + (target - start) * progress);
			node.textContent = current.toString();

			if (progress < 1) {
				requestAnimationFrame(update);
			}
		}

		update();
	}
</script>

<Section class="min-h-96">
	<div class="p-10 space-y-8">
		<div class="space-y-2">
			<h2>Meine Reise</h2>
			<p class="text-neutral-600 max-w-2xl">
				Von der Leidenschaft zur Profession. Eine Timeline meiner wichtigsten Stationen.
			</p>
		</div>

		<div class="">
			{#each journeyItems as item, index}
				<div
					class="border-l-2 border-neutral-300 pl-6 py-4 relative transition-all duration-700"
					style="opacity: {visibleItems[index] ? '1' : '0'}; transform: translateY({visibleItems[index] ? '0' : '20px'})"
				>
					<!-- Timeline dot -->
					<div class="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-neutral-950 border-2 border-white"></div>

					<div class="space-y-2">
						<div class="flex items-baseline space-x-3">
							<span
								{@attach animateCounter}
								data-year={item.year}
								class="font-[Source_Code_Pro] font-semibold text-xl text-neutral-950"
							></span>
							<span class="font-[Source_Code_Pro] text-xs text-neutral-400">/{item.organization}/</span>
						</div>
						<h3 class="text-lg font-[Google_Sans] font-semibold">{item.title}</h3>
						<p class="text-neutral-600 max-w-xl">{item.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</Section>
