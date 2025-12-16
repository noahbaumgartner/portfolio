<script>
	import ComponentName from "../ComponentName.svelte";
	import Heading2 from "../Heading2.svelte";
	import Heading3 from "../Heading3.svelte";
	import Link from "../Link.svelte";
	import ParagraphNumber from "../ParagraphNumber.svelte";
</script>

<div class="border-b border-neutral-300 px-4 sm:px-10 lg:px-16">
    <div class="mx-auto lg:max-w-7xl border-l border-r border-neutral-300 flex items-center justify-center relative">
        <ParagraphNumber number="02" />
        <ComponentName name="ImprintContactSection.svelte" position="bottom-right" />
        <div class="w-full p-10">
        	<Heading2 class="mb-4">Kontakt</Heading2>
        	<p>
        		E-Mail: <Link href="mailto:baumgartner.noah@outlook.com">baumgartner.noah@outlook.com</Link><br />
        		Web: <Link href="/">https://noahbaumgartner.ch</Link>
        	</p>
        </div>
    </div>
</div>