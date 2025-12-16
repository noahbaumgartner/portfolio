<script lang="ts">
    let props = $props();
</script>

<h2 class={["text-lg", "font-semibold", "font-[Google_Sans]", props?.class]}>
    {@render props.children?.()}
</h2>