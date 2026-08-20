<script lang="ts">
	import Section from "./Section.svelte";
	import Image from "../Image.svelte";
	import Badge from "../Badge.svelte";

	const facts = [
		{ label: "Wohnort", value: "Kriessern, SG" },
		{ label: "Alter", value: "24 Jahre" },
		{ label: "Sprachen", value: "Deutsch, Englisch" },
		{ label: "Fokus", value: "Fullstack Development" },
		{ label: "Erfahrung", value: "5+ Jahre" }
	];

	const hobbies = ["STV Kriessern", "Feuerwehr", "Kriessner Schollabar", "Wandern", "Skifahren"];

	const interests = ["Software Architektur", "Software Entwicklung", "Computer Vision", "KI / ML", "Cloud Technologien"];
</script>

<Section class="min-h-64">
	<div class="flex flex-col md:flex-row w-full">
		<div class="grow p-10 flex flex-col space-y-4 justify-center">
            <h2>Wer ich bin</h2>
            <p>Ich bin Noah Baumgartner, ein leidenschaftlicher Fullstack-Softwareentwickler mit über fünf Jahren Erfahrung. Ich liebe es, innovative digitale Lösungen zu gestalten und mich fachlich wie persönlich ständig weiterzuentwickeln.</p>
            <p>In meiner Freizeit gehe ich vielfältigen Hobbys und Interessen nach, die mich inspirieren und ausgleichen. Ich engagiere mich bei der freiwilligen Feuerwehr Kriessern, bin aktiv im Turnverein STV Kriessern und setze mich gemeinsam mit Freunden im Verein Kriessner Schollabar ein.</p>
		</div>
		<div class="flex flex-col items-center justify-center p-10 border-t md:border-t-0 md:border-l border-neutral-300">
			<Image src="/images/me.webp" class="size-60" />
		</div>
	</div>
</Section>
