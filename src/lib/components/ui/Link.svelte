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
        transition: text-decoration-thickness 300ms;
    }

    .link:hover {
        text-decoration-thickness: 2px;
    }

    .link--light {
        color: inherit;
    }

    .link--dark {
        color: #d4d4d4;
    }
</style>
