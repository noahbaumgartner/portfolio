<script lang="ts">
    let { 
        children,
        href
    }: { children?: () => any; href?: string } = $props();
</script>

<svelte:element
    this={href ? 'a' : 'span'}
    class={["px-2 py-0.5 text-xs bg-neutral-100 border border-neutral-200 rounded-full inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden [&>svg]:pointer-events-none [&>svg]:size-3", href ? "cursor-pointer": ""]}
    {...(href ? { href, target: "_blank" } : {})}
>
    {@render children?.()}
</svelte:element>