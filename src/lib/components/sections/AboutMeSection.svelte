<script lang="ts">
	import ComponentName from "../ComponentName.svelte";
import Link from "../Link.svelte";
	import ParagraphNumber from "../ParagraphNumber.svelte";
</script>

<div class="border-b border-neutral-300 px-4 sm:px-10 lg:px-16">
    <div class="mx-auto lg:max-w-7xl border-l border-r border-neutral-300 min-h-64 flex items-center justify-center relative">
        <ParagraphNumber number="01" />
        <ComponentName name="AboutMeSection.svelte" position="bottom-right" />
        <div class="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-16 justify-between p-10">
            <div class="flex flex-col justify-center space-y-2">
                <span class="text-lg font-semibold font-[Google_Sans]">Über mich</span>
                <span>
                    Wenn ich nicht gerade an neuen Features für buildagil arbeite oder für mein Studium lerne, beschäftige ich mich mit privaten Projekten. Ich bin Entwickler aus Leidenschaft und immer auf der Suche nach der nächsten technischen Herausforderung.
                </span>
            </div>
            <div class="flex flex-col items-center">
                <img src="/images/me.jpg" alt="Noah Baumgartner" class="object-cover max-w-60" height="240" width="240" />
            </div>
        </div>
    </div>
</div>