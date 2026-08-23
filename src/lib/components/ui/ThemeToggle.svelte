<script lang="ts">
    import { onMount } from 'svelte';
    import { Sun, Moon, Monitor } from '@lucide/svelte';
    import Button from './Button.svelte';
    import ContextMenu from './context-menu/ContextMenu.svelte';
    import ContextMenuItem from './context-menu/ContextMenuItem.svelte';

    type ThemeChoice = 'light' | 'dark' | 'system';

    let choice: ThemeChoice = $state('system');

    const icons = { light: Sun, dark: Moon, system: Monitor };

    onMount(() => {
        const stored = localStorage.getItem('theme');
        choice = stored === 'light' || stored === 'dark' ? stored : 'system';
    });

    function select(next: ThemeChoice) {
        choice = next;
        if (next === 'system') {
            delete document.documentElement.dataset.theme;
            localStorage.removeItem('theme');
        } else {
            document.documentElement.dataset.theme = next;
            localStorage.setItem('theme', next);
        }
    }
</script>

<ContextMenu align="end">
    {#snippet trigger(toggle)}
        <Button variant="ghost" size="lg" icon={icons[choice]} onclick={toggle} />
    {/snippet}
    <ContextMenuItem icon={Sun} selected={choice === 'light'} onclick={() => select('light')}>Hell</ContextMenuItem>
    <ContextMenuItem icon={Moon} selected={choice === 'dark'} onclick={() => select('dark')}>Dunkel</ContextMenuItem>
    <ContextMenuItem icon={Monitor} selected={choice === 'system'} onclick={() => select('system')}>System</ContextMenuItem>
</ContextMenu>
