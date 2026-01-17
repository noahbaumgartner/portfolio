<script lang="ts">
	import ComponentName from "./ComponentName.svelte";
	import Section from "./Section.svelte";
</script>

<Section class="min-h-96" sectionNumber="03" variant="dark">
	<ComponentName name="AboutPhilosophySection.svelte" position="bottom-right" variant="dark" />
	<div class="p-10 md:p-16 space-y-12">
		<div class="space-y-4 max-w-2xl">
			<h2 class="text-white">Meine Philosophie</h2>
			<div class="space-y-4 text-neutral-300 max-w-3xl">
				<p>Code ist mehr als nur Syntax und Funktionen. Es ist ein Werkzeug, um Probleme zu lösen, Prozesse zu optimieren und Menschen das Leben zu erleichtern.</p>
				<p>Ich glaube an <b class="text-white">Clean Code</b>, <b class="text-white">kontinuierliches Lernen</b> und <b class="text-white">pragmatische Lösungen</b>. Perfektion ist nicht das Ziel – stetige Verbesserung ist es.</p>
				<p>Meine Leidenschaft liegt darin, komplexe technische Herausforderungen in intuitive, performante Anwendungen zu verwandeln, die echten Mehrwert schaffen.</p>
			</div>
		</div>
	</div>
</Section>
