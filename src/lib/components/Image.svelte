<script>
    let props = $props();
    let smallSrc = $derived(props.src.replace(/(\.[\w\d_-]+)$/, '-small$1'));
    let loaded = $state(false);

    function handleLoad() {
        loaded = true;
    }
</script>

<div class={["relative overflow-hidden", props.class]}>
    <div class="absolute inset-0 bg-cover bg-center blur-md transition-opacity" class:opacity-0={loaded} style="background-image: url('{smallSrc}')"></div>
    <img src="{props.src}" alt={props.alt} class="relative z-0 object-cover w-full h-full" loading="lazy" onload={handleLoad} />
</div>