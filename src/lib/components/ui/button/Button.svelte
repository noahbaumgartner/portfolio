<script lang="ts">
    import { ArrowUpRight } from '@lucide/svelte';

    let { href, variant = 'primary', size = 'md', icon: Icon = ArrowUpRight, onclick, children } = $props();
    let iconOnly = $derived(!children);
    let target = $derived(href?.startsWith('http') ? '_blank' : undefined);
</script>

{#if href}
    <a {href} {target} rel={target ? 'noopener' : undefined} data-sveltekit-preload-data class="button button--{variant} button--{size}" class:button--icon-only={iconOnly} class:button--no-icon={!Icon}>
        {#if Icon}<Icon class="button-icon" />{/if}
        {#if children}{@render children()}{/if}
    </a>
{:else}
    <button type="button" {onclick} class="button button--{variant} button--{size}" class:button--icon-only={iconOnly} class:button--no-icon={!Icon}>
        {#if Icon}<Icon class="button-icon" />{/if}
        {#if children}{@render children()}{/if}
    </button>
{/if}

<style>
    .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        box-sizing: border-box;
        border: none;
        border-radius: 10px;
        font-family: 'Outfit', sans-serif;
        font-size: 13px;
        text-decoration: none;
        outline: none;
        cursor: pointer;
        user-select: none;
        transition: background-color 200ms ease, color 200ms ease;
    }

    .button:focus-visible {
        box-shadow: 0 0 0 2px var(--color-bg), 0 0 0 4px var(--color-ink);
    }

    .button--lg {
        height: 36px;
        padding: 0 20px 0 16px;
    }

    .button--md {
        height: 32px;
        padding: 0 15px 0 11px;
    }

    .button--icon-only.button--lg {
        /* Square: (36px height - 16px icon) / 2 */
        padding: 0 10px;
    }

    .button--icon-only.button--md {
        /* Square: (32px height - 16px icon) / 2 */
        padding: 0 8px;
    }

    .button--no-icon.button--lg {
        padding: 0 20px;
    }

    .button--no-icon.button--md {
        padding: 0 16px;
    }

    .button :global(.button-icon) {
        width: 16px;
        height: 16px;
    }

    .button--primary {
        background-color: var(--color-ink);
        color: var(--color-base);
    }

    .button--primary:hover {
        background-color: var(--color-emphasis);
    }

    .button--secondary {
        background-color: var(--color-surface);
        color: var(--color-text);
    }

    .button--secondary:hover {
        background-color: var(--color-border);
    }

    .button--ghost {
        background-color: transparent;
        color: var(--color-text);
    }

    .button--ghost:hover {
        background-color: var(--color-surface);
    }
</style>
