<script lang="ts">
    import { Menu } from '@lucide/svelte';
    import SiteHeaderLogo from './SiteHeaderLogo.svelte';
    import Copyright from '../sections/CopyrightSection.svelte';
    import Button from '../ui/Button.svelte';

    let { left, right } = $props();
    let mobileNavActive = $state(false);

    function closeOnLinkClick(node: HTMLElement) {
        const links = node.querySelectorAll('a');
        const close = () => (mobileNavActive = false);
        links.forEach(link => link.addEventListener('click', close));
        return () => links.forEach(link => link.removeEventListener('click', close));
    }
</script>

<nav class="header page-padding">
    <div class="bar">
        <div class="left-cluster">
            <SiteHeaderLogo />

            <div class="nav-items nav-items--desktop">
                {@render left()}
            </div>
        </div>

        <div class="right-cluster">
            {@render right()}
        </div>

        <div class="mobile-toggle">
            <Button variant="secondary" icon={Menu} onclick={() => (mobileNavActive = !mobileNavActive)} />
        </div>
    </div>
</nav>

{#if mobileNavActive}
    <div class="mobile-menu">
        <div class="mobile-menu-bar page-padding">
            <SiteHeaderLogo />
            <button type="button" class="toggle-btn" onclick={() => (mobileNavActive = false)}>
                /kloʊz/
            </button>
        </div>
        <div {@attach closeOnLinkClick} class="nav-items nav-items--mobile page-padding">
            {@render left()}
        </div>
        <Copyright />
    </div>
{/if}

<style>
    .header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 50;
        background-color: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(4px);
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

    .toggle-btn {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        font-family: 'Google Sans', sans-serif;
        font-size: 0.75rem;
        color: #737373;
        transition: color 150ms ease;
    }

    .toggle-btn:hover {
        color: #000;
    }

    .right-cluster {
        display: none;
    }

    .mobile-menu {
        position: fixed;
        inset: 0;
        z-index: 50;
        display: flex;
        flex-direction: column;
        background-color: #fff;
    }

    .mobile-menu-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-block: 0.875rem;
        border-bottom: 1px solid #d4d4d4;
    }

    .nav-items--mobile {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        justify-content: center;
        gap: 1.5rem;
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

        .right-cluster {
            display: flex;
        }

        .mobile-toggle {
            display: none;
        }

        .mobile-menu {
            display: none;
        }
    }
</style>
