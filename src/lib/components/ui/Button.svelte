<script lang="ts">
    import { ArrowUpRight } from '@lucide/svelte';

    let { href, variant = 'primary', icon: Icon = ArrowUpRight, onclick, children } = $props();
    let iconOnly = $derived(!children);
</script>

{#if href}
    <a {href} class="button button--{variant}" class:button--icon-only={iconOnly}>
        {#if children}{@render children()}{/if}
        <Icon class="button-icon" />
    </a>
{:else}
    <button type="button" {onclick} class="button button--{variant}" class:button--icon-only={iconOnly}>
        {#if children}{@render children()}{/if}
        <Icon class="button-icon" />
    </button>
{/if}

<style>
    .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.375rem;
        box-sizing: border-box;
        height: 2.25rem;
        border: none;
        border-radius: 10px;
        padding: 0 1rem 0 1.25rem;
        font-family: 'Google Sans', sans-serif;
        font-size: 0.75rem;
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
        padding: 0 0.625rem;
    }

    .button :global(.button-icon) {
        width: 0.875rem;
        height: 0.875rem;
        transition: transform 200ms ease;
    }

    .button--icon-only :global(.button-icon) {
        width: 1rem;
        height: 1rem;
    }

    .button:not(.button--icon-only):hover :global(.button-icon) {
        transform: translate(0.125rem, -0.125rem);
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
