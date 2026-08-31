<script lang="ts">
    let { children, href }: { children: any; href?: string } = $props();

    const target = $derived(href?.startsWith('http') ? '_blank' : undefined);
</script>

<svelte:element this={href ? 'a' : 'span'} href={href} {target} data-sveltekit-preload-data class="tag" class:tag--link={!!href}>
    {@render children()}
</svelte:element>

<style>
    .tag {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        width: fit-content;
        padding: 2px 8px;
        background-color: var(--color-ink);
        color: var(--color-base);
        font-family: 'Source Code Pro', monospace;
        font-size: 12px;
        border-radius: 4px;
        text-decoration: none;
        user-select: none;
    }

    .tag :global(svg) {
        width: 12px;
        height: 12px;
    }

    .tag--link {
        cursor: pointer;
        transition: background-color 200ms ease;
    }

    .tag--link:hover {
        background-color: var(--color-emphasis);
    }
</style>
