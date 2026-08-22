<script lang="ts">
    import { getContext, type Snippet } from 'svelte';
    import { Check } from '@lucide/svelte';

    let {
        icon: Icon,
        selected = false,
        onclick,
        children
    }: {
        icon?: any;
        selected?: boolean;
        onclick?: () => void;
        children: Snippet;
    } = $props();

    const menu = getContext<{ close: () => void }>('context-menu');

    function handleClick() {
        onclick?.();
        menu?.close();
    }
</script>

<button
    type="button"
    class="context-menu-item"
    class:context-menu-item--selected={selected}
    onclick={handleClick}
    role="menuitemradio"
    aria-checked={selected}
>
    <span class="context-menu-item-icon">
        {#if Icon}<Icon />{/if}
    </span>
    <span class="context-menu-item-label">{@render children()}</span>
    <span class="context-menu-item-check">
        {#if selected}<Check />{/if}
    </span>
</button>

<style>
    .context-menu-item {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        padding: 8px 10px;
        background-color: transparent;
        border: none;
        border-radius: 6px;
        font: inherit;
        font-size: 13px;
        color: var(--color-text);
        text-align: left;
        cursor: pointer;
        transition: background-color 150ms ease;
    }

    .context-menu-item:hover {
        background-color: var(--color-surface);
    }

    .context-menu-item--selected {
        background-color: var(--color-surface);
        font-weight: 600;
    }

    .context-menu-item-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 16px;
        height: 16px;
        flex-shrink: 0;
    }

    .context-menu-item-icon :global(svg) {
        width: 16px;
        height: 16px;
    }

    .context-menu-item-label {
        flex-grow: 1;
    }

    .context-menu-item-check {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 14px;
        height: 14px;
        flex-shrink: 0;
    }

    .context-menu-item-check :global(svg) {
        width: 14px;
        height: 14px;
    }
</style>
