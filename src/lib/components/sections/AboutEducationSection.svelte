<script>
	import Section from "./Section.svelte";

	const educations = [
		{
			period: "2025 - Heute",
			title: "Master of Science in Engineering",
			institution: "ZHAW",
			description: "Masterstudium mit Vertiefung im Bereich Künstliche Intelligenz und maschinelles Lernen."
		},
		{
			period: "2021 - 2025",
			title: "Bachelor of Science in Informatik",
			institution: "ZHAW",
			description: "Bachelorstudium in Informatik mit Schwerpunkt auf Software Engineering."
		},
		{
			period: "2016 - 2020",
			title: "Berufsmatura",
			institution: "GBSSG",
			description: "Vorbereitung auf das Studium mit Fokus auf technische und naturwissenschaftliche Fächer."
		},
		{
			period: "2016 - 2020",
			title: "Informatiker EFZ",
			institution: "GBSSG",
			description: "Lehre als Informatiker EFZ mit Fachrichtung Applikationsentwicklung."
		}
	];
</script>

<Section>
	<div class="flex w-full h-full flex-col-reverse lg:flex-row">
		<div class="grow flex flex-col">
			{#each educations as education}
				<div class="p-10 flex flex-col space-y-2 border-b border-neutral-300">
					<div>
						<span class="text-xs font-[Source_Code_Pro] bg-black text-white px-2 py-0.5">
							{education.period}
						</span>
					</div>
					<div class="flex space-x-2">
						<h2 class="text-2xl font-semibold mb-2">{education.title}</h2>
						<span class="text-neutral-500 text-sm leading-8">/{education.institution}/</span>
					</div>
					<p class="max-w-2xl">{education.description}</p>
				</div>
			{/each}
		</div>
		<div class="bg-grid px-10 py-10 border-b lg:border-b-0 lg:border-l border-neutral-300 flex items-center justify-center">
			<h2 class="lg:[writing-mode:sideways-lr]">Ausbildung</h2>
		</div>
	</div>
</Section>
