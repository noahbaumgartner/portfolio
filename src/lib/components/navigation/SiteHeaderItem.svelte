<script lang="ts">
    let { href, children } = $props();
</script>

<a {href} data-sveltekit-preload-data class="item">
    {@render children()}
</a>

<style>
    .item {
        font-family: 'Outfit', sans-serif;
        font-weight: 400;
        line-height: 28px;
        color: var(--color-text);
        text-decoration: none;
        border-radius: 4px;
        outline: none;
        transition: opacity 200ms;
    }

    .item:hover {
        opacity: 0.6;
    }

    .item:focus-visible {
        outline: 2px solid var(--color-ink);
        outline-offset: 2px;
    }
</style>
