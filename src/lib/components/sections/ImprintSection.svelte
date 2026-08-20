<script lang="ts">
    import Link from "../ui/Link.svelte";
    import Section from "./Section.svelte";
</script>

<Section class="imprint">
    <h2>Adresse</h2>
    <address>
        Noah Baumgartner<br />
        CH-Schweiz
    </address>

    <h2>Kontakt</h2>
    <p>
        E-Mail: <Link href="mailto:noahbaumg@outlook.com">noahbaumg@outlook.com</Link><br />
        Web: <Link href="/">https://noahbaumgartner.ch</Link>
    </p>

    <h2>Haftungsausschluss</h2>
    <ol>
        <li>
            <h3>Kontakt</h3>
            <p>Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Gewähr für die Aktualität, Vollständigkeit und Richtigkeit der bereitgestellten Informationen. Jegliche Haftungsansprüche gegen uns, die sich auf Schäden materieller oder ideeller Art beziehen – verursacht durch die Nutzung oder Nichtnutzung der dargebotenen Inhalte bzw. durch Nutzung fehlerhafter und unvollständiger Informationen – sind grundsätzlich ausgeschlossen.</p>
        </li>
        <li>
            <h3>Externe Links</h3>
            <p>Unsere Webseite enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb übernehmen wir für diese fremden Inhalte auch keine Gewähr. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.</p>
        </li>
        <li>
            <h3>Urheberrecht</h3>
            <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf dieser Website unterliegen dem schweizerischen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen unserer schriftlichen Zustimmung.</p>
        </li>
        <li>
            <h3>Änderungen und Irrtümer</h3>
            <p>Wir behalten uns ausdrücklich vor, Teile der Seiten oder das gesamte Angebot jederzeit zu ändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen. Sollten einzelne Formulierungen oder Darstellungen dieses Haftungsausschlusses unwirksam sein, bleiben die übrigen Bestimmungen davon unberührt.</p>
        </li>
    </ol>
</Section>

<style>
    :global(.imprint) {
        padding: 40px 24px;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    :global(.imprint) address {
        font-style: normal;
    }

    :global(.imprint) h2 {
        margin-top: 16px;
    }

    :global(.imprint) h3 {
        margin-top: 12px;
        margin-bottom: 4px;
    }

    :global(.imprint) ol {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding-left: 20px;
    }

    @media (min-width: 768px) {
        :global(.imprint) {
            padding: 60px 72px;
        }
    }
</style>
