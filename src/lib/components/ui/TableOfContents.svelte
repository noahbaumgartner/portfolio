<script lang="ts">
    import { onMount } from 'svelte';

    let { container }: { container: HTMLElement | undefined } = $props();

    type TocItem = { id: string; text: string; level: number };

    let items: TocItem[] = $state([]);
    let activeId: string | null = $state(null);

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

    const SCROLL_OFFSET = 64;

    function handleClick(event: MouseEvent, id: string) {
        event.preventDefault();
        const target = document.getElementById(id);
        if (!target) return;
        const top = target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
        window.scrollTo({ top, behavior: 'smooth' });
        history.replaceState(null, '', `#${id}`);
    }
</script>

{#if items.length > 0}
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

<style>
    .toc {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .toc-item {
        font-size: 13px;
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
</style>
