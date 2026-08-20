<script lang="ts">
    import { ArrowUpRight } from '@lucide/svelte';

    let { href, variant = 'primary', icon: Icon = ArrowUpRight, onclick, children } = $props();
    let iconOnly = $derived(!children);
</script>

{#if href}
    <a {href} class="button button--{variant}" class:button--icon-only={iconOnly} class:button--no-icon={!Icon}>
        {#if children}{@render children()}{/if}
        {#if Icon}<Icon class="button-icon" />{/if}
    </a>
{:else}
    <button type="button" {onclick} class="button button--{variant}" class:button--icon-only={iconOnly} class:button--no-icon={!Icon}>
        {#if children}{@render children()}{/if}
        {#if Icon}<Icon class="button-icon" />{/if}
    </button>
{/if}

<style>
    .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        box-sizing: border-box;
        height: 36px;
        border: none;
        border-radius: 10px;
        padding: 0 16px 0 20px;
        font-family: 'Google Sans', sans-serif;
        font-size: 12px;
        text-decoration: none;
        outline: none;
        cursor: pointer;
        user-select: none;
        transition: background-color 200ms ease, color 200ms ease;
    }

    .button:focus-visible {
        box-shadow: 0 0 0 2px #fff, 0 0 0 4px #000;
    }

    .button--icon-only {
        padding: 0 10px;
    }

    .button--no-icon {
        padding: 0 20px;
    }

    .button :global(.button-icon) {
        width: 14px;
        height: 14px;
        transition: transform 200ms ease;
    }

    .button--icon-only :global(.button-icon) {
        width: 16px;
        height: 16px;
    }

    .button:not(.button--icon-only):hover :global(.button-icon) {
        transform: translate(2px, -2px);
    }

    .button--primary {
        background-color: #000;
        color: #fff;
    }

    .button--primary:hover {
        background-color: #262626;
    }

    .button--secondary {
        background-color: #f5f5f5;
        color: #000;
    }

    .button--secondary:hover {
        background-color: #e5e5e5;
    }

    .button--ghost {
        background-color: transparent;
        color: #000;
    }

    .button--ghost:hover {
        background-color: #f5f5f5;
    }
</style>
