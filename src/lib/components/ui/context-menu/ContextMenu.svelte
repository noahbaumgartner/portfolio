<script lang="ts">
    import { setContext, tick, type Snippet } from 'svelte';
    import { scale } from 'svelte/transition';

    let {
        align = 'start',
        trigger,
        children
    }: {
        align?: 'start' | 'center' | 'end';
        trigger: Snippet<[() => void]>;
        children: Snippet;
    } = $props();

    let open = $state(false);
    let side: 'top' | 'bottom' = $state('bottom');
    let wrapperEl: HTMLDivElement;
    let contentEl: HTMLDivElement;

    function toggle() {
        open = !open;
    }

    function close() {
        open = false;
    }

    setContext('context-menu', { close });

    $effect(() => {
        if (!open) return;

        tick().then(() => {
            if (!wrapperEl || !contentEl) return;
            const triggerRect = wrapperEl.getBoundingClientRect();
            const contentHeight = contentEl.offsetHeight;
            const spaceBelow = window.innerHeight - triggerRect.bottom;
            side = spaceBelow < contentHeight + 8 && triggerRect.top > contentHeight + 8 ? 'top' : 'bottom';
        });

        function handlePointerDown(event: PointerEvent) {
            if (wrapperEl && !wrapperEl.contains(event.target as Node)) {
                close();
            }
        }

        function handleKeydown(event: KeyboardEvent) {
            if (event.key === 'Escape') close();
        }

        function handleScroll() {
            close();
        }

        window.addEventListener('pointerdown', handlePointerDown);
        window.addEventListener('keydown', handleKeydown);
        window.addEventListener('scroll', handleScroll, true);

        return () => {
            window.removeEventListener('pointerdown', handlePointerDown);
            window.removeEventListener('keydown', handleKeydown);
            window.removeEventListener('scroll', handleScroll, true);
        };
    });
</script>

<div class="context-menu" bind:this={wrapperEl}>
    {@render trigger(toggle)}

    {#if open}
        <div
            class="context-menu-content"
            class:context-menu-content--top={side === 'top'}
            class:context-menu-content--bottom={side === 'bottom'}
            class:context-menu-content--start={align === 'start'}
            class:context-menu-content--center={align === 'center'}
            class:context-menu-content--end={align === 'end'}
            bind:this={contentEl}
            role="menu"
            transition:scale={{ duration: 140, start: 0.95 }}
        >
            {@render children()}
        </div>
    {/if}
</div>

<style>
    .context-menu {
        position: relative;
        display: inline-flex;
    }

    .context-menu-content {
        position: absolute;
        z-index: 60;
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 160px;
        padding: 4px;
        background-color: var(--color-bg);
        border: 1px solid var(--color-border);
        border-radius: 10px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }

    .context-menu-content--bottom {
        top: calc(100% + 8px);
    }

    .context-menu-content--top {
        bottom: calc(100% + 8px);
    }

    .context-menu-content--start {
        left: 0;
    }

    .context-menu-content--center {
        left: 50%;
        transform: translateX(-50%);
    }

    .context-menu-content--end {
        right: 0;
    }

    .context-menu-content--bottom.context-menu-content--start {
        transform-origin: top left;
    }

    .context-menu-content--bottom.context-menu-content--center {
        transform-origin: top center;
    }

    .context-menu-content--bottom.context-menu-content--end {
        transform-origin: top right;
    }

    .context-menu-content--top.context-menu-content--start {
        transform-origin: bottom left;
    }

    .context-menu-content--top.context-menu-content--center {
        transform-origin: bottom center;
    }

    .context-menu-content--top.context-menu-content--end {
        transform-origin: bottom right;
    }
</style>
