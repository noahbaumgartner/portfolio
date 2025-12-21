<script lang="ts">
	import ComponentName from "./ComponentName.svelte";
	import Heading2 from "../text/Heading2.svelte";
	import Link from "../text/Link.svelte";
	import Section from "./Section.svelte";
</script>

<Section class="min-h-64" sectionNumber="<>" variant="dark">
    <ComponentName name="Footer.svelte" variant="dark" position="bottom-left" />
    <div class="flex flex-col sm:flex-row w-full space-y-10 sm:space-y-0 p-10">
        <div class="grow">
            <Heading2 class="text-neutral-100">Danke fürs<br>Vorbeischauen.</Heading2>
        </div>
        <div class="grow flex space-x-4 flex-col sm:flex-row space-y-10 sm:space-y-0">
            <div class="grow flex flex-col space-y-2 text-neutral-400 text-md">
                <span class="font-bold text-neutral-100">Weiteres</span>
                <Link href="/imprint" color="#fff" variant="dark">Impressum</Link>
            </div>
            <div class="grow flex flex-col space-y-2 text-neutral-400 text-md">
                <span class="font-bold text-neutral-100">Social Media</span>
                <Link href="https://www.instagram.com/noahbaumgartner/" color="#dd2a7b" variant="dark">Instagram</Link>
                <Link href="https://www.linkedin.com/in/noahbaumgartner/" color="#0072b1" variant="dark">LinkedIn</Link>
                <Link href="https://www.strava.com/athletes/noahbaumgartner" color="#fc4c02" variant="dark">Strava</Link>
            </div>
        </div>
    </div>
</Section>