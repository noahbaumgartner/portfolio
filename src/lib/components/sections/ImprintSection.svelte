<script lang="ts">
    import Link from "../ui/Link.svelte";
</script>

<section class="contact-wrapper">
    <div class="contact-inner page-padding">
        <div class="contact">
            <h2 class="contact-title">Kontakt</h2>
            <p>
                E-Mail: <Link href="mailto:noahbaumg@outlook.com">noahbaumg@outlook.com</Link><br />
                Web: <Link href="/">https://noahbaumgartner.ch</Link>
            </p>
        </div>
    </div>
</section>

<section class="disclaimer-wrapper page-padding">
    <div class="disclaimer">
        <h2 class="disclaimer-title">Haftungsausschluss</h2>
        <ol class="disclaimer-list">
            <li class="disclaimer-card">
                <h3>Kontakt</h3>
                <p>Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Gewähr für die Aktualität, Vollständigkeit und Richtigkeit der bereitgestellten Informationen. Jegliche Haftungsansprüche gegen uns, die sich auf Schäden materieller oder ideeller Art beziehen – verursacht durch die Nutzung oder Nichtnutzung der dargebotenen Inhalte bzw. durch Nutzung fehlerhafter und unvollständiger Informationen – sind grundsätzlich ausgeschlossen.</p>
            </li>
            <li class="disclaimer-card">
                <h3>Externe Links</h3>
                <p>Unsere Webseite enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb übernehmen wir für diese fremden Inhalte auch keine Gewähr. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.</p>
            </li>
            <li class="disclaimer-card">
                <h3>Urheberrecht</h3>
                <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf dieser Website unterliegen dem schweizerischen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen unserer schriftlichen Zustimmung.</p>
            </li>
            <li class="disclaimer-card">
                <h3>Änderungen und Irrtümer</h3>
                <p>Wir behalten uns ausdrücklich vor, Teile der Seiten oder das gesamte Angebot jederzeit zu ändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen. Sollten einzelne Formulierungen oder Darstellungen dieses Haftungsausschlusses unwirksam sein, bleiben die übrigen Bestimmungen davon unberührt.</p>
            </li>
        </ol>
    </div>
</section>

<style>
    .contact-wrapper {
        background-color: #f5f5f5;
        margin-bottom: 24px;
    }

    .contact-inner {
        padding-block: 40px;
    }

    .contact {
        margin-inline: auto;
        max-width: 1280px;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .contact-title {
        margin-top: 0;
    }

    .disclaimer-wrapper {
        margin-bottom: 24px;
    }

    .disclaimer {
        margin-inline: auto;
        max-width: 1280px;
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .disclaimer-title {
        margin-top: 0;
    }

    .disclaimer-list {
        display: grid;
        grid-template-columns: 1fr;
        gap: 16px;
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .disclaimer-card {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 24px;
        border: 1px solid #e5e5e5;
        border-radius: 6px;
    }

    .disclaimer-card h3 {
        margin: 0;
        font-size: 18px;
    }

    .disclaimer-card p {
        color: #404040;
        line-height: 1.6;
    }

    @media (min-width: 640px) {
        .contact-wrapper {
            margin-bottom: 40px;
        }

        .disclaimer-wrapper {
            margin-bottom: 40px;
        }
    }

    @media (min-width: 768px) {
        .contact-inner {
            padding-block: 64px;
        }

        .disclaimer-list {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
        }

        .disclaimer-card {
            padding: 32px;
        }
    }

    @media (min-width: 1024px) {
        .contact-wrapper {
            margin-bottom: 64px;
        }

        .disclaimer-wrapper {
            margin-bottom: 64px;
        }
    }
</style>
