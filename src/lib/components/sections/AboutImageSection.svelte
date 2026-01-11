<script lang="ts">
	import ComponentName from "./ComponentName.svelte";
	import Section from "./Section.svelte";
	import { onMount } from 'svelte';

	let imageLoaded = $state(false);
	let factsVisible = $state<boolean[]>([]);

	const quickFacts = [
		{ label: "Standort", value: "Schweiz" },
		{ label: "Sprachen", value: "DE / EN" },
		{ label: "Verfügbar für", value: "Freelance Projekte" },
		{ label: "Interessen", value: "Open Source, Web3, AI" }
	];

	onMount(() => {
		setTimeout(() => imageLoaded = true, 100);
		quickFacts.forEach((_, index) => {
			setTimeout(() => {
				factsVisible[index] = true;
			}, 400 + index * 150);
		});
	});
</script>

<Section class="min-h-96" sectionNumber="04">
	<ComponentName name="AboutImageSection.svelte" position="bottom-left" />
	<div class="flex flex-col lg:flex-row">
		<!-- Image Panel -->
		<div class="flex-1 p-10 md:p-16 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-neutral-300">
			<div
				class="relative group transition-all duration-700"
				style="opacity: {imageLoaded ? '1' : '0'}; transform: scale({imageLoaded ? '1' : '0.95'})"
			>
				<img
					src="/images/me.webp"
					alt="Noah Baumgartner"
					class="object-cover w-full max-w-sm rounded-sm grayscale group-hover:grayscale-0 transition-all duration-300"
					height="400"
					width="400"
				/>
				<div class="absolute bottom-4 left-4 bg-neutral-950/80 backdrop-blur-sm px-3 py-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
					<span class="text-white text-sm font-[Source_Code_Pro]">Noah Baumgartner</span>
				</div>
			</div>
		</div>

		<!-- Quick Facts Panel -->
		<div class="flex-1 p-10 md:p-16 flex flex-col justify-center space-y-8">
			<div class="space-y-2">
				<h2>Quick Facts</h2>
				<p class="text-neutral-600">
					Ein paar Dinge über mich auf einen Blick.
				</p>
			</div>

			<div class="space-y-4">
				{#each quickFacts as fact, index}
					<div
						class="flex items-baseline space-x-4 pb-4 border-b border-neutral-300 transition-all duration-500"
						style="opacity: {factsVisible[index] ? '1' : '0'}; transform: translateX({factsVisible[index] ? '0' : '20px'})"
					>
						<span class="font-[Source_Code_Pro] text-xs text-neutral-400 min-w-32">
							{fact.label.toUpperCase()}
						</span>
						<span class="font-[Google_Sans] text-lg font-semibold flex-1">
							{fact.value}
						</span>
					</div>
				{/each}
			</div>

			<div class="pt-4">
				<a
					href="mailto:hello@noahbaumgartner.ch"
					class="inline-flex items-center space-x-2 px-6 py-3 bg-neutral-950 text-white rounded-sm hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 group"
				>
					<span class="font-[Google_Sans] font-semibold">Schreib mir</span>
					<svg
						class="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M17 7H7M17 7V17" />
					</svg>
				</a>
			</div>
		</div>
	</div>
</Section>
