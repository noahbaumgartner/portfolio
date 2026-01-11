<script lang="ts">
	import ComponentName from "./ComponentName.svelte";
	import Section from "./Section.svelte";
	import Link from "../text/Link.svelte";
	import { onMount } from 'svelte';

	let textVisible = $state(false);
	let quoteVisible = $state(false);

	onMount(() => {
		setTimeout(() => textVisible = true, 200);
		setTimeout(() => quoteVisible = true, 600);
	});

	function animateTyping(node: HTMLElement) {
		const text = node.textContent || "";
		node.textContent = "";
		let index = 0;

		function type() {
			if (index < text.length) {
				node.textContent += text[index];
				index++;
				setTimeout(type, 20);
			}
		}

		setTimeout(type, 300);
	}
</script>

<Section class="min-h-96" sectionNumber="03" variant="dark">
	<ComponentName name="AboutPhilosophySection.svelte" position="bottom-right" variant="dark" />
	<div class="p-10 md:p-16 space-y-12">
		<div
			class="space-y-4 transition-all duration-1000"
			style="opacity: {textVisible ? '1' : '0'}; transform: translateY({textVisible ? '0' : '20px'})"
		>
			<h2 class="text-white">Meine Philosophie</h2>
			<div class="space-y-4 text-neutral-300 max-w-3xl text-lg leading-relaxed">
				<p>
					Code ist mehr als nur Syntax und Funktionen. Es ist ein Werkzeug, um Probleme zu lösen,
					Prozesse zu optimieren und Menschen das Leben zu erleichtern.
				</p>
				<p>
					Ich glaube an <span class="text-white font-semibold">Clean Code</span>,
					<span class="text-white font-semibold">kontinuierliches Lernen</span> und
					<span class="text-white font-semibold">pragmatische Lösungen</span>.
					Perfektion ist nicht das Ziel – stetige Verbesserung ist es.
				</p>
				<p>
					Meine Leidenschaft liegt darin, komplexe technische Herausforderungen in
					intuitive, performante Anwendungen zu verwandeln, die echten Mehrwert schaffen.
				</p>
			</div>
		</div>

		<div
			class="border-l-4 border-white pl-6 py-2 transition-all duration-1000 delay-300"
			style="opacity: {quoteVisible ? '1' : '0'}; transform: translateX({quoteVisible ? '0' : '-30px'})"
		>
			<blockquote class="text-white text-xl font-[Google_Sans] italic">
				<span {@attach animateTyping}>
					"Make it work, make it right, make it fast."
				</span>
			</blockquote>
			<cite class="text-neutral-400 text-sm font-[Source_Code_Pro] block mt-2">— Kent Beck</cite>
		</div>

		<div
			class="flex flex-wrap gap-4 transition-all duration-1000 delay-500"
			style="opacity: {quoteVisible ? '1' : '0'}"
		>
			<Link href="https://github.com/noahbaumgartner" variant="dark">GitHub</Link>
			<Link href="https://linkedin.com/in/noahbaumgartner" variant="dark">LinkedIn</Link>
			<Link href="mailto:hello@noahbaumgartner.ch" variant="dark">Kontakt</Link>
		</div>
	</div>
</Section>
