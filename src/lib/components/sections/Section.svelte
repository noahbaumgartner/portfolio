<script lang="ts">
	import SectionNumber from "./SectionNumber.svelte";

    let props: { sectionNumber?: string; class?: string; children?: any, variant?: "light" | "dark" } = $props();
</script>

<section class="border-b border-neutral-500 px-4 sm:px-10 lg:px-16">
    <div class={["mx-auto lg:max-w-7xl border-l border-r border-neutral-500 flex items-center justify-center relative", props.class, props.variant === "dark" ? "bg-linear-150 from-neutral-950 from-50% via-neutral-900 via-70% to-neutral-950 to-90%" : ""]}>
        {#if props?.sectionNumber}
            <SectionNumber number={props.sectionNumber} />
        {/if}
        {@render props.children()}
    </div>
</section>