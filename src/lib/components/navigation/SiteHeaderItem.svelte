<script lang="ts">
    let { href, children } = $props();
</script>

<a {href} data-sveltekit-preload-data class="item">
    {@render children()}
</a>

<style>
    .item {
        font-family: 'Google Sans', sans-serif;
        font-weight: 400;
        line-height: 28px;
        color: var(--color-text);
        text-decoration: none;
        transition: color 200ms ease;
    }

    :global(.nav-items--desktop:has(.item:hover) .item:not(:hover)) {
        color: var(--color-text-faint);
    }

    :global(.nav-items--mobile) .item:hover {
        color: var(--color-text-faint);
    }
</style>
