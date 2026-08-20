<script lang="ts">
	import Link from "../text/Link.svelte";
	import Section from "./Section.svelte";
</script>

<Section class="min-h-64" variant="dark">
    <div class="flex flex-col sm:flex-row w-full space-y-10 sm:space-y-0 p-10">
        <div class="grow">
            <h2 class="text-neutral-100">Danke fürs<br>Vorbeischauen.</h2>
        </div>
        <div class="grow flex space-x-4 flex-col sm:flex-row space-y-10 sm:space-y-0">
            <div class="grow flex flex-col space-y-2 text-neutral-400 text-md">
                <span class="font-bold text-neutral-100">Weiteres</span>
                <Link href="/imprint" variant="dark">Impressum</Link>
            </div>
            <div class="grow flex flex-col space-y-2 text-neutral-400 text-md">
                <span class="font-bold text-neutral-100">Social Media</span>
                <Link href="https://www.instagram.com/noahbaumgartner/" variant="dark">Instagram</Link>
                <Link href="https://www.linkedin.com/in/noahbaumgartner/" variant="dark">LinkedIn</Link>
            </div>
        </div>
    </div>
</Section>