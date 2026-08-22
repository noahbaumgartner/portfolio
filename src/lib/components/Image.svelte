<script>
    let props = $props();
    let smallSrc = $derived(props.src.replace(/(\.[\w\d_-]+)$/, '-small$1'));
    let loaded = $state(false);

    function handleLoad() {
        loaded = true;
    }
</script>

<div class={["image", props.class]}>
    <div class="image-placeholder" class:image-placeholder--hidden={loaded} style="background-image: url('{smallSrc}')"></div>
    <img src="{props.src}" alt={props.alt} class="image-img" loading="lazy" onload={handleLoad} />
</div>

<style>
    .image {
        position: relative;
        overflow: hidden;
    }

    .image-placeholder {
        position: absolute;
        inset: 0;
        background-size: cover;
        background-position: center;
        filter: blur(12px);
        transition: opacity 150ms ease;
    }

    .image-placeholder--hidden {
        opacity: 0;
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
