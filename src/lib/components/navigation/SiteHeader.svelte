<script lang="ts">
    import { slide } from 'svelte/transition';
    import { Menu, X } from '@lucide/svelte';
    import SiteHeaderLogo from './SiteHeaderLogo.svelte';
    import Button from '../ui/Button.svelte';

    let { left, right } = $props();
    let mobileNavActive = $state(false);

    $effect(() => {
        document.body.style.overflow = mobileNavActive ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    });

    function closeOnLinkClick(node: HTMLElement) {
        const links = node.querySelectorAll('a');
        const close = () => (mobileNavActive = false);
        links.forEach(link => link.addEventListener('click', close));
        return () => links.forEach(link => link.removeEventListener('click', close));
    }
</script>

<nav class="header">
    <div class="bar-padding page-padding">
        <div class="bar">
            <div class="left-cluster">
                <SiteHeaderLogo />

                <div class="nav-items nav-items--desktop">
                    {@render left()}
                </div>
            </div>

            <div class="right-group">
                <div class="right-cluster">
                    {@render right()}
                </div>

                <div class="mobile-toggle">
                    <Button variant="secondary" icon={mobileNavActive ? X : Menu} onclick={() => (mobileNavActive = !mobileNavActive)} />
                </div>
            </div>
        </div>
    </div>

    {#if mobileNavActive}
        <div class="mobile-panel" transition:slide={{ duration: 300 }}>
            <div class="mobile-panel-inner">
                <div {@attach closeOnLinkClick} class="nav-items nav-items--mobile">
                    {@render left()}
                </div>
            </div>
        </div>
    {/if}
</nav>

<style>
    .header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 50;
        background-color: #fff;
        user-select: none;
    }

    .bar {
        margin-inline: auto;
        max-width: 80rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-block: 0.875rem;
    }

    .left-cluster {
        display: flex;
        align-items: center;
    }

    .nav-items {
        display: none;
    }

    .right-group {
        display: flex;
        align-items: center;
        gap: 0.375rem;
    }

    .right-cluster {
        display: flex;
    }

    .mobile-panel {
        background-color: #fff;
        overflow: hidden;
    }

    .mobile-panel-inner {
        display: flex;
        flex-direction: column;
        min-height: calc(100dvh - 64px);
        padding: 2rem;
    }

    .nav-items--mobile {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1.25rem;
        font-size: 1.875rem;
        font-weight: 600;
    }

    @media (min-width: 640px) {
        .left-cluster {
            gap: 2.5rem;
        }

        .nav-items--desktop {
            display: flex;
            align-items: center;
            gap: 1.5rem;
            font-size: 0.75rem;
        }

        .mobile-toggle {
            display: none;
        }

        .mobile-panel {
            display: none;
        }
    }
</style>
