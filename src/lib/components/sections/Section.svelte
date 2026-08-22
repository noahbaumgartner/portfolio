<script lang="ts">
    let { class: className, variant = "light", children }: { class?: string; variant?: "light" | "dark"; children: any } = $props();
</script>

<section class="section-wrapper page-padding section-gap">
    <div class={["section-box", `section-box--${variant}`, className]}>
        {@render children()}
    </div>
</section>

<style>
    .section-box {
        margin-inline: auto;
        max-width: 1280px;
        border-radius: 6px;
        background-color: var(--color-surface);
    }

    .section-box--dark {
        background-color: var(--color-surface-inverse);
        color: var(--color-on-inverse);
    }
</style>
