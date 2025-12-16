<script lang="ts">
    let props = $props();
</script>

<h1 class={["text-2xl", "font-semibold", "font-[Google_Sans]", props.class]}>
    {@render props.children?.()}
</h1>