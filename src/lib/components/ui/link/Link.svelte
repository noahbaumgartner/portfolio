<script lang="ts">
    let { href, variant = 'light', children }: { href: string; variant?: 'light' | 'dark'; children: any } = $props();

    const target = $derived(href.startsWith('http') ? '_blank' : undefined);
</script>

<a {href} {target} data-sveltekit-preload-data class="link link--{variant}">
    {@render children()}
</a>

<style>
    .link {
        cursor: pointer;
        text-decoration: underline;
        text-underline-offset: 4px;
        transition: opacity 200ms;
    }

    .link:hover {
        opacity: 0.6;
    }

    .link--light {
        color: inherit;
    }

    .link--dark {
        color: var(--color-on-inverse-secondary);
    }
</style>
