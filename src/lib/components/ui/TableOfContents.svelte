<script lang="ts">
    import { tick } from 'svelte';
    import { ChevronDown } from '@lucide/svelte';

    let {
        container,
        variant = 'sidebar'
    }: {
        container: HTMLElement | undefined;
        variant?: 'sidebar' | 'mobile';
    } = $props();

    type TocItem = { id: string; text: string; level: number };

    let items: TocItem[] = $state([]);
    let activeId: string | null = $state(null);
    let expanded = $state(false);

    let activeItem = $derived(items.find((item) => item.id === activeId) ?? items[0]);

    function slugify(text: string) {
        return text
            .toLowerCase()
            .trim()
            .replace(/[äáàâ]/g, 'a')
            .replace(/[öóòô]/g, 'o')
            .replace(/[üúùû]/g, 'u')
            .replace(/ß/g, 'ss')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    $effect(() => {
        if (!container) return;

        const headings = Array.from(container.querySelectorAll('h1, h2')) as HTMLElement[];
        const usedIds = new Set<string>();

        items = headings.map((heading) => {
            if (!heading.id) {
                let id = slugify(heading.textContent ?? '');
                let unique = id;
                let i = 2;
                while (usedIds.has(unique)) {
                    unique = `${id}-${i}`;
                    i++;
                }
                heading.id = unique;
            }
            usedIds.add(heading.id);
            return { id: heading.id, text: heading.textContent ?? '', level: heading.tagName === 'H1' ? 1 : 2 };
        });

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        activeId = (entry.target as HTMLElement).id;
                        break;
                    }
                }
            },
            { rootMargin: '0px 0px -70% 0px', threshold: 0 }
        );

        headings.forEach((heading) => observer.observe(heading));

        return () => observer.disconnect();
    });

    const SCROLL_OFFSET = variant === 'mobile' ? 130 : 64;

    async function handleClick(event: MouseEvent, id: string) {
        event.preventDefault();
        expanded = false;
        // Wait for the mobile panel's collapse to actually reach the DOM before
        // measuring the heading position, otherwise the still-expanded panel's
        // extra height gets baked into the scroll target and it overshoots.
        await tick();
        const target = document.getElementById(id);
        if (!target) return;
        const top = target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;

        // Mobile Safari can silently drop a new smooth scroll if one is still
        // animating, so snap to the current position first to clear it before
        // requesting the next smooth scroll on the following frame.
        window.scrollTo({ top: window.scrollY, behavior: 'instant' });
        requestAnimationFrame(() => {
            window.scrollTo({ top, behavior: 'smooth' });
        });

        history.replaceState(null, '', `#${id}`);
    }
</script>

{#if items.length > 0}
    {#if variant === 'mobile'}
        <div class="toc-mobile">
            {#if expanded}
                <div class="toc-mobile-trigger">
                    <a
                        href="#{items[0].id}"
                        class="toc-item toc-mobile-title"
                        class:toc-item--sub={items[0].level === 2}
                        class:toc-item--active={activeId === items[0].id}
                        onclick={(event) => handleClick(event, items[0].id)}
                    >
                        {items[0].text}
                    </a>
                    <button
                        type="button"
                        class="toc-mobile-chevron-btn"
                        onclick={() => (expanded = !expanded)}
                        aria-expanded={expanded}
                        aria-label="Inhaltsverzeichnis einklappen"
                    >
                        <ChevronDown class="toc-mobile-chevron" style="transform: rotate(180deg)" />
                    </button>
                </div>
            {:else}
                <button type="button" class="toc-mobile-trigger" onclick={() => (expanded = !expanded)} aria-expanded={expanded} aria-label="Inhaltsverzeichnis ausklappen">
                    <span class="toc-mobile-title">{activeItem?.text}</span>
                    <ChevronDown class="toc-mobile-chevron" />
                </button>
            {/if}

            {#if expanded}
                <nav class="toc-mobile-panel" aria-label="Inhaltsverzeichnis">
                    {#each items.slice(1) as item (item.id)}
                        <a
                            href="#{item.id}"
                            class="toc-item"
                            class:toc-item--sub={item.level === 2}
                            class:toc-item--active={activeId === item.id}
                            onclick={(event) => handleClick(event, item.id)}
                        >
                            {item.text}
                        </a>
                    {/each}
                </nav>
            {/if}
        </div>
    {:else}
        <nav class="toc" aria-label="Inhaltsverzeichnis">
            {#each items as item (item.id)}
                <a
                    href="#{item.id}"
                    class="toc-item"
                    class:toc-item--sub={item.level === 2}
                    class:toc-item--active={activeId === item.id}
                    onclick={(event) => handleClick(event, item.id)}
                >
                    {item.text}
                </a>
            {/each}
        </nav>
    {/if}
{/if}

<style>
    .toc {
        display: flex;
        flex-direction: column;
        gap: 10px;
        user-select: none;
    }

    .toc-item {
        font-size: 12px;
        color: var(--color-text-muted);
        text-decoration: none;
        line-height: 1.4;
        transition: color 150ms ease;
    }

    .toc-item:hover {
        color: var(--color-text);
    }

    .toc-item--sub {
        padding-left: 16px;
    }

    .toc-item--active {
        color: var(--color-text);
        font-weight: 600;
    }

    .toc-mobile {
        background-color: var(--color-bg);
        border-bottom: 1px solid var(--color-border);
        user-select: none;
    }

    .toc-mobile-trigger {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        width: 100%;
        padding: 14px 24px;
        font-size: 14px;
    }

    button.toc-mobile-trigger {
        background-color: transparent;
        border: none;
        font: inherit;
        font-size: 14px;
        color: var(--color-text);
        text-align: left;
        cursor: pointer;
    }

    .toc-mobile-title {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    a.toc-mobile-title {
        font-size: 14px;
    }

    span.toc-mobile-title {
        color: var(--color-text);
    }

    .toc-mobile-chevron-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        padding: 0;
        background-color: transparent;
        border: none;
        color: var(--color-text);
        cursor: pointer;
    }

    .toc-mobile-trigger :global(.toc-mobile-chevron) {
        width: 16px;
        height: 16px;
        flex-shrink: 0;
        transition: transform 200ms ease;
    }

    .toc-mobile-panel {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 4px 24px 20px;
    }

    .toc-mobile-panel .toc-item {
        font-size: 14px;
    }

    @media (min-width: 640px) {
        .toc-mobile {
            display: none;
        }
    }
</style>
