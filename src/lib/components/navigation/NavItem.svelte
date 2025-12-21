<script lang="ts">
    import { annotate } from 'rough-notation';
    import { page } from '$app/state';
    
    let { href, children } = $props();
    let isActive = $derived(page.url.pathname === href);
    let annotation: any;

    function highlightHover(node: HTMLElement) {
        annotation = annotate(node, {
            type: 'highlight',
            color: '#bef264',
            multiline: false,
            animationDuration: 300
        });

        const show = () => annotation.show();
        const hide = () => {
            if (!isActive) annotation.hide();
        };

        node.addEventListener('mouseenter', show);
        node.addEventListener('mouseleave', hide);
    }

    $effect(() => {
        if (!annotation) return;

        if (isActive) {
            annotation.show();
        } else {
            annotation.hide();
        }
    });
</script>

<div>
    <a {@attach highlightHover} href={href} class="leading-7" data-sveltekit-preload-data>
        {@render children()}
    </a>
</div>