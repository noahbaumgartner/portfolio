<script lang="ts">
	import ComponentName from "./ComponentName.svelte";
	import Link from "../text/Link.svelte";
	import Section from "./Section.svelte";
</script>

<Section sectionNumber="01">
    <ComponentName name="ImprintSection.svelte" position="bottom-left" />
    <div class="p-10">
    	<h2 class="mb-4">Adresse</h2>
        <address class="not-italic">
    		Noah Baumgarnter<br />
    		Distelweg 2<br />
    		9451 Kriessern<br />
    		CH-Schweiz
    	</address>
    
    	<h2 class="mt-6 mb-4">Kontakt</h2>
    	<p>
    		E-Mail: <Link href="mailto:baumgartner.noah@outlook.com">baumgartner.noah@outlook.com</Link><br />
    		Web: <Link href="/">https://noahbaumgartner.ch</Link>
    	</p>
    
    	<h2 class="mt-6 mb-4">Haftungsausschluss</h2>
        <ol>
            <li>
                <h3 class="mt-3 mb-2">Kontakt</h3>
                Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Gewähr für die Aktualität, Vollständigkeit und Richtigkeit der bereitgestellten Informationen. Jegliche Haftungsansprüche gegen uns, die sich auf Schäden materieller oder ideeller Art beziehen – verursacht durch die Nutzung oder Nichtnutzung der dargebotenen Inhalte bzw. durch Nutzung fehlerhafter und unvollständiger Informationen – sind grundsätzlich ausgeschlossen.
            </li>
            <li>
                <h3 class="mt-3 mb-2">Externe Links</h3>
                Unsere Webseite enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb übernehmen wir für diese fremden Inhalte auch keine Gewähr. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </li>
            <li>
                <h3 class="mt-3 mb-2">Urheberrecht</h3>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf dieser Website unterliegen dem schweizerischen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen unserer schriftlichen Zustimmung.
            </li>
            <li>
                <h3 class="mt-3 mb-2">Änderungen und Irrtümer</h3>
                Wir behalten uns ausdrücklich vor, Teile der Seiten oder das gesamte Angebot jederzeit zu ändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen. Sollten einzelne Formulierungen oder Darstellungen dieses Haftungsausschlusses unwirksam sein, bleiben die übrigen Bestimmungen davon unberührt.
            </li>
        </ol>
    </div>
</Section>