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
                    Neben meiner Tätigkeit als Software Entwickler studiere ich aktuell Informatik (Master) am "Center for Artificial Intelligence" der <Link href="https://www.zhaw.ch" color="#0064a6">ZHAW</Link>. Meine Forschungsinteressen liegen in Maschinellem Lernen und Künstlicher Intelligenz, insbesondere im Bereich Computer Vision. Mehr zu meiner Person: <Link href="/about">Über mich</Link>.
                </span>
            </div>
            <div class="flex flex-col items-center">
                <img src="/images/me.jpg" alt="Noah Baumgartner" class="object-cover max-w-60" />
            </div>
        </div>
    </div>
</div>