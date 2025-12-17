<script>
	import ComponentName from "../ComponentName.svelte";
	import Heading1 from "../Heading1.svelte";
    import Link from "../Link.svelte";
</script>

<div class="border-b border-neutral-300 px-4 sm:px-10 lg:px-16">
    <div class="py-4 mx-auto max-w-7xl border-l border-r px-6 border-neutral-300 min-h-96 flex items-center justify-center grid-background relative">
        <ComponentName name="HeroSection.svelte" position="bottom-left" />
        <div class="flex flex-col space-y-2 items-center">
            <Heading1>Fullstack Developer & Student</Heading1>
            <span class="text-center text-lg max-w-xl">
                Ich entwickle Software bei <Link href="https://buildagil.com" color="#006666">buildagil</Link> und Open Source für <Link href="https://stack.swiss" color="#f13608">STACK</Link>.  Zudem absolviere ich meinen MSc an der <Link href="https://zhaw.ch" color="#0064a6">ZHAW</Link>.
            </span>
        </div>
    </div>
</div>