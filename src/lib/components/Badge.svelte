<script lang="ts">
    let { 
        children,
        href
    }: { children?: () => any; href?: string } = $props();
</script>

<svelte:element
    this={href ? 'a' : 'span'}
    class="px-2 py-0.5 text-xs bg-neutral-100 border border-neutral-200 rounded-full inline-flex gap-1 items-center [&>svg]:size-3"
>
    {@render children?.()}
</svelte:element>