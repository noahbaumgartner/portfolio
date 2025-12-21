<script lang="ts">
    let { href, variant = "light", children }: { href: string; variant?: "light" | "dark"; children: any } = $props();

    const target = $derived(href.startsWith('http') ? '_blank' : '');
</script>

<span>
    <a href={href} target={target} class={["cursor-pointer underline underline-offset-4 duration-300 hover:decoration-2", variant === "light" ? "text-neutral-black" : "text-neutral-300"]} data-sveltekit-preload-data>
        {@render children()}
    </a>
</span>