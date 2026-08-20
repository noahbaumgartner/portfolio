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
        background-color: #f5f5f5;
    }

    .section-box--dark {
        background-color: #0a0a0a;
        background-image: linear-gradient(150deg, #0a0a0a 50%, #262626 70%, #0a0a0a 90%);
        color: #fff;
    }
</style>
