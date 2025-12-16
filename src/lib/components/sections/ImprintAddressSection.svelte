<script>
	import ComponentName from "../ComponentName.svelte";
	import Heading2 from "../Heading2.svelte";
	import Heading3 from "../Heading3.svelte";
	import Link from "../Link.svelte";
	import ParagraphNumber from "../ParagraphNumber.svelte";
</script>

<div class="border-b border-neutral-300 px-4 sm:px-10 lg:px-16">
    <div class="mx-auto lg:max-w-7xl border-l border-r border-neutral-300 flex items-center justify-center relative">
        <ParagraphNumber number="01" />
        <ComponentName name="ImprintAddressSection.svelte" position="bottom-left" />
        <div class="w-full p-10">
        	<Heading2 class="mb-4">Adresse</Heading2>
            <address class="not-italic">
        		Noah Baumgarnter<br />
        		Distelweg 2<br />
        		9451 Kriessern<br />
        		CH-Schweiz
        	</address>
        </div>
    </div>
</div>