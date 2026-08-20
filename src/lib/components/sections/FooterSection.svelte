<script lang="ts">
	import Link from "../ui/Link.svelte";
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

    <span class="footer-copyright">© 2025 Noah Baumgartner</span>
</div>

<style>
    .footer-wrapper {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
    }

    .footer {
        margin-inline: auto;
        width: 100%;
        max-width: 80rem;
        min-height: 16rem;
        border-radius: 6px;
        background-color: #0a0a0a;
        background-image: linear-gradient(150deg, #0a0a0a 50%, #262626 70%, #0a0a0a 90%);
        display: flex;
        flex-direction: column;
        gap: 2.5rem;
        padding: 2.5rem;
    }

    .footer-title {
        color: #f5f5f5;
    }

    .footer-copyright {
        margin-inline: auto;
        width: 100%;
        max-width: 80rem;
        text-align: center;
        font-size: 0.875rem;
        color: #737373;
    }

    .footer-columns {
        display: flex;
        flex-direction: column;
        gap: 2.5rem;
        flex-grow: 1;
    }

    .footer-column {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        flex-grow: 1;
        color: #a3a3a3;
    }

    .footer-heading {
        font-weight: 700;
        color: #f5f5f5;
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
