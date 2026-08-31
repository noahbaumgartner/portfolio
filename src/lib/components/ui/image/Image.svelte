<script>
    let props = $props();
</script>

<div class={["image", props.class]}>
    <img src="{props.src}" alt={props.alt} class="image-img" loading="lazy" />
</div>

<style>
    .image {
        position: relative;
        overflow: hidden;
        background-color: var(--color-surface);
    }

    .image-img {
        position: relative;
        z-index: 0;
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>
