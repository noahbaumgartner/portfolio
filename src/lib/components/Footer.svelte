<script>
	import ComponentName from "./ComponentName.svelte";
	import ParagraphNumber from "./ParagraphNumber.svelte";
</script>

<div class="border-b border-neutral-300 px-4 sm:px-10 lg:px-16">
    <div class="mx-auto lg:max-w-7xl border-l border-r border-neutral-300 min-h-92 flex items-center justify-center relative bg-linear-150 from-neutral-950 from-50% via-neutral-900 via-70% to-neutral-950 to-90%">
        <ParagraphNumber number="<>"  />
        <ComponentName name="Footer.svelte" position="bottom-left" />
        <div class="flex flex-col sm:flex-row w-full">
            <div class="w-2/3 px-10">
                <span class="text-xl font-semibold font-[Google_Sans] text-neutral-100">Bis bald.</span>
            </div>
            <div class="w-1/3 px-10">
                <span class="text-neutral-400">© 2024 Noah Baumgartner</span>
            </div>
        </div>
    </div>
</div>