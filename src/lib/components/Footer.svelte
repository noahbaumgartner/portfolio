<script>
	import ComponentName from "./ComponentName.svelte";
	import Link from "./Link.svelte";
	import ParagraphNumber from "./ParagraphNumber.svelte";
</script>

<div class="border-b border-neutral-300 px-4 sm:px-10 lg:px-16">
    <div class="mx-auto lg:max-w-7xl border-l border-r border-neutral-300 min-h-64 flex items-center justify-center relative bg-linear-150 from-neutral-950 from-50% via-neutral-900 via-70% to-neutral-950 to-90%">
        <ParagraphNumber number="<>"  />
        <ComponentName name="Footer.svelte" position="bottom-left" />
        <div class="flex flex-col sm:flex-row w-full space-y-6 sm:space-y-0 p-10">
            <div class="grow">
                <span class="text-xl font-semibold font-[Google_Sans] text-neutral-100">Danke fürs<br>Vorbeischauen.</span>
            </div>
            <div class="grow flex space-x-4 flex-col sm:flex-row space-y-6 sm:space-y-0">
                <div class="grow flex flex-col space-y-2 text-neutral-300 text-md">
                    <span class="font-bold text-neutral-100">Weiteres</span>
                    <div>
                        <Link href="/imprint" color="#bef264" textClass="text-neutral-300">Impressum</Link>
                    </div>
                </div>
                <div class="grow flex flex-col space-y-2 text-neutral-300 text-md">
                    <span class="font-bold text-neutral-100">Social Media</span>
                    <span>Instagram</span>
                    <span>GitHub</span>
                    <span>LinkedIn</span>
                </div>
            </div>
        </div>
    </div>
</div>