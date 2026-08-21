<script lang="ts">
	import Link from "../ui/Link.svelte";
	import ThemeToggle from "../ui/ThemeToggle.svelte";
</script>

<div class="footer-wrapper page-padding section-gap">
    <div class="footer">
        <div class="footer-message">
            <h2 class="footer-title">Danke fürs<br>Vorbeischauen.</h2>
        </div>
        <div class="footer-columns">
            <div class="footer-column">
                <span class="footer-heading">Weiteres</span>
                <Link href="/imprint" variant="dark">Impressum</Link>
            </div>
            <div class="footer-column">
                <span class="footer-heading">Social Media</span>
                <Link href="https://www.instagram.com/noahbaumgartner/" variant="dark">Instagram</Link>
                <Link href="https://www.linkedin.com/in/noahbaumgartner/" variant="dark">LinkedIn</Link>
            </div>
        </div>
    </div>

    <div class="footer-bottom">
        <span class="footer-copyright">© 2025 Noah Baumgartner</span>
        <ThemeToggle />
    </div>
</div>

<style>
    .footer-wrapper {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-bottom: 0;
    }

    .footer {
        margin-inline: auto;
        width: 100%;
        max-width: 1280px;
        min-height: 256px;
        border-radius: 6px;
        background-color: var(--color-surface-inverse);
        display: flex;
        flex-direction: column;
        gap: 40px;
        padding: 40px;
    }

    .footer-title {
        color: var(--color-on-inverse);
    }

    .footer-bottom {
        margin-inline: auto;
        width: 100%;
        max-width: 1280px;
        padding-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .footer-copyright {
        font-size: 14px;
        color: var(--color-text-muted);
    }

    .footer-bottom :global(.theme-toggle) {
        position: absolute;
        right: 0;
    }

    .footer-columns {
        display: flex;
        flex-direction: column;
        gap: 40px;
        flex-grow: 1;
    }

    .footer-column {
        display: flex;
        flex-direction: column;
        gap: 8px;
        flex-grow: 1;
        color: var(--color-on-inverse-muted);
    }

    .footer-heading {
        font-weight: 700;
        color: var(--color-on-inverse);
    }

    @media (min-width: 640px) {
        .footer {
            flex-direction: row;
        }

        .footer-message {
            flex-grow: 1;
        }

        .footer-columns {
            flex-direction: row;
        }
    }
</style>
