<script lang="ts">
    import { onMount } from 'svelte';
    import { Sun, Moon } from '@lucide/svelte';
    import Button from './Button.svelte';

    let theme: 'light' | 'dark' = $state('light');

    onMount(() => {
        const stored = document.documentElement.dataset.theme;
        theme = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
    });

    function toggle() {
        theme = theme === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = theme;
        localStorage.setItem('theme', theme);
    }
</script>

<div class="theme-toggle">
    <Button variant="ghost" icon={theme === 'dark' ? Sun : Moon} onclick={toggle} />
</div>
