<script lang="ts">
    import { annotate } from 'rough-notation';
    
    let { href, color = "#000", textClass = "text-neutral-500", children } = $props();
    let annotation: any;
    let isActive = false;

    function underlineHover(node: HTMLElement) {
        annotation = annotate(node, {
            type: 'underline',
            color,
            multiline: false,
            animationDuration: 300,
            padding: 1
        });

        const show = () => annotation.show();
        const hide = () => {
            if (!isActive) annotation.hide();
        };

        node.addEventListener('mouseenter', show);
        node.addEventListener('mouseleave', hide);
    }

    const target = $derived(href.startsWith('http') ? '_blank' : '');
</script>

<span>
    <a {@attach underlineHover} href={href} target={target} class={`${textClass} cursor-pointer`} data-sveltekit-preload-data>
        {@render children()}
    </a>
</span>