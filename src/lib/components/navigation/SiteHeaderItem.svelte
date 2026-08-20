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
        line-height: 1.75rem;
        color: #000;
        text-decoration: none;
        transition: color 200ms ease;
    }

    :global(.nav-items):hover .item {
        color: #a3a3a3;
    }

    .item:hover {
        color: #000 !important;
    }
</style>
