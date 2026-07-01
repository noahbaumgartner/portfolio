<script lang="ts">
    import { annotate } from 'rough-notation';
    import { page } from '$app/state';
    
    let { href, children } = $props();
    let isActive = $derived(page.url.pathname === href || page.url.pathname.startsWith(`${href}/`));
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

        // Keep the marker glued to the item while it moves. rough-notation only
        // repositions on resize/size changes, not when the element merely shifts
        // (e.g. the nav's scroll transition shears the items sideways). While
        // movement is detected we redraw the annotation each frame — a show() in
        // the "showing" state re-renders instantly (no animation, fixed seed).
        let rafId = 0;
        let tracking = false;
        let lastX = 0;
        let lastY = 0;
        let stableFrames = 0;

        const frame = () => {
            const rect = node.getBoundingClientRect();
            const x = Math.round(rect.x);
            const y = Math.round(rect.y);
            if (x !== lastX || y !== lastY) {
                lastX = x;
                lastY = y;
                stableFrames = 0;
                if (annotation.isShowing()) annotation.show();
            } else if (++stableFrames > 5) {
                tracking = false;
                return;
            }
            rafId = requestAnimationFrame(frame);
        };

        const track = () => {
            if (tracking) return;
            tracking = true;
            stableFrames = 0;
            rafId = requestAnimationFrame(frame);
        };

        window.addEventListener('scroll', track, { passive: true });
        window.addEventListener('resize', track, { passive: true });

        return () => {
            node.removeEventListener('mouseenter', show);
            node.removeEventListener('mouseleave', hide);
            window.removeEventListener('scroll', track);
            window.removeEventListener('resize', track);
            cancelAnimationFrame(rafId);
        };
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