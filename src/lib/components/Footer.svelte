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
                    <Link href="/imprint" color="#fff" textClass="text-neutral-300">Impressum</Link>
                </div>
                <div class="grow flex flex-col space-y-2 text-neutral-300 text-md">
                    <span class="font-bold text-neutral-100">Social Media</span>
                    <Link href="https://www.instagram.com/noahbaumgartner/" color="#dd2a7b" textClass="text-neutral-300">Instagram</Link>
                    <Link href="https://www.linkedin.com/in/noahbaumgartner/" color="#0072b1" textClass="text-neutral-300">LinkedIn</Link>
                    <Link href="https://www.strava.com/athletes/noahbaumgartner" color="#fc4c02" textClass="text-neutral-300">Strava</Link>
                </div>
            </div>
        </div>
    </div>
</div>