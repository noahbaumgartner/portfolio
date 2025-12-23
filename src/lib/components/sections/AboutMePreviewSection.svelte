<script lang="ts">
	import ComponentName from "./ComponentName.svelte";
	import Section from "./Section.svelte";
	import PanelCtaButton from "../PanelCtaButton.svelte";
</script>

<Section class="min-h-64" sectionNumber="01">
    <ComponentName name="AboutMeSection.svelte" position="bottom-right" />
    <div class="flex flex-col md:flex-row justify-between">
        <div class="flex flex-col">
            <div class="grow flex flex-col justify-center space-y-2 p-10 border-b border-neutral-500">
                <h2>Über mich</h2>
                <span>
                    Wenn ich nicht gerade an neuen Features für buildagil arbeite oder für mein Studium lerne, beschäftige ich mich mit privaten Projekten. Ich bin Entwickler aus Leidenschaft und immer auf der Suche nach der nächsten technischen Herausforderung.
                </span>
            </div>
            <div class="w-full p-2">
                <PanelCtaButton href="/about">Mehr erfahren</PanelCtaButton>
            </div>
        </div>
        <div class="flex flex-col items-center p-10 border-t md:border-t-0 md:border-l border-neutral-500">
            <img src="/images/me.webp" alt="Noah Baumgartner" class="object-cover max-w-60" height="240" width="240" />
        </div>
    </div>
</Section>