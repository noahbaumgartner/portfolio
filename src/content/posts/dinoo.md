---
year: 2026
month: 11
title: 'Dinoo'
description: 'Offline-Bestellsystem für Vereinsanlässe: Bestellung am Handy, Küchenzettel vom Bondrucker und Abrechnung bar oder per TWINT.'
github: https://github.com/noahbaumgartner/dinoo
gif: '/images/posts/dinoo/hero.webp'
colors: '#f6f1e7,#e4d7bd,#6b5535'
icon: utensils
category: project
---

<script>
    import { Link } from '@noahbaumgartner/svelte-ui';
</script>

An Festen, Turnieren und Beizli müssen in kurzer Zeit viele Bestellungen vom Tisch in die Küche gelangen, und bezahlt wird am Ende bar oder per TWINT. Dinoo ist ein Bestellsystem, das genau diesen Ablauf abdeckt: Das Servicepersonal nimmt Bestellungen auf dem eigenen Smartphone auf, in der Küche kommen die Zettel direkt aus einem Bondrucker, und die Verantwortlichen behalten den Überblick über Angebot, Drucker und Umsatz. Die Screenshots in diesem Beitrag zeigen Demodaten eines erfundenen Anlasses.

<h1>Betriebsszenario</h1>

Dinoo läuft komplett offline. Ein Laptop vor Ort ist der Server: Er hat eine feste IP-Adresse, die Epson-Bondrucker hängen im selben Netz, und das Servicepersonal öffnet die Oberfläche im lokalen WLAN im Browser. Es gibt weder eine App noch einen Cloud-Dienst oder einen Internetzugang, den der Anlass voraussetzen würde. Das macht die Lösung unabhängig vom Mobilfunknetz auf dem Festgelände und von externen Diensten, die mitten im Betrieb ausfallen könnten.

Es gibt zwei Rollen. Der Service nimmt Bestellungen auf und kassiert, der Admin pflegt zusätzlich Angebot, Drucker, Tische und Benutzer und sieht alle Bestellungen. Gäste haben keinen eigenen Zugang, sie bestellen über das Servicepersonal.

<h1>Bestellung aufnehmen</h1>

Die Bestellung läuft in vier Schritten ab: Tisch wählen, Artikel auswählen, abschicken und bezahlen. Weil sie hauptsächlich am Smartphone, oft im Stehen und in Eile, erfasst wird, ist die Oberfläche mobile-first mit grossen Bedienelementen aufgebaut.

<figure>
<img src="/images/posts/dinoo/bestellablauf.webp" width="1800" height="1238" alt="Drei Smartphone-Ansichten: Tischauswahl nach Reihen, Artikelliste mit Mengen pro Artikel und die Zusammenfassung 'Bestellung prüfen' mit Total und Schaltfläche zum Abschicken." />
<figcaption>Tisch wählen, Artikel antippen und die Bestellung vor dem Abschicken noch einmal prüfen.</figcaption>
</figure>

Der Tisch wird als Liste oder als Plan gewählt, wobei Tische in Bereichen wie Saal und Festzelt organisiert sind. Bei den Artikeln genügt ein Tipp auf das Plus, die Menge lässt sich direkt anpassen. Artikel können Optionen mit Aufpreis haben, und pro Position lässt sich eine Notiz für die Küche erfassen, etwa «ohne Senf». Beides landet später auf dem Küchenzettel. Erst nach der Kontrolle in der Zusammenfassung wird die Bestellung abgeschickt. Danach lässt sie sich nicht mehr ändern, damit Küche und Abrechnung immer vom selben Stand ausgehen.

<h1>Bezahlen</h1>

Abgerechnet wird direkt auf der Bestellung, entweder bar oder per TWINT. Bei Barzahlung gibt es Schnellwahltasten für passend und gängige Noten, die Rückgeldhilfe rechnet den Betrag sofort aus. Für TWINT scannen die Verantwortlichen den QR-Code des Vereins einmal im Admin-Bereich ein, danach zeigt Dinoo ihn bei jeder Zahlung zusammen mit dem offenen Betrag an. Ein dynamischer Code mit vorausgefülltem Betrag ist bewusst nicht Teil des Systems, denn das würde eine Anbindung an einen externen Dienst voraussetzen.

<figure>
<img src="/images/posts/dinoo/bezahlung.webp" width="1800" height="1238" alt="Drei Smartphone-Ansichten: Liste der eigenen Bestellungen mit dem Status Offen, Barzahlung mit Rückgeldberechnung bei 50 Franken erhalten und der TWINT-QR-Code mit dem Betrag." />
<figcaption>Eigene Bestellungen, Barzahlung mit Rückgeld und TWINT-QR-Code.</figcaption>
</figure>

Eine Bestellung kann auch in mehreren Teilzahlungen beglichen werden, zum Beispiel wenn ein Tisch getrennt zahlt. Unter «Meine Bestellungen» findet das Servicepersonal alle eigenen Bestellungen wieder und kann offene Beträge später weiterkassieren.

<h1>Küchenzettel drucken</h1>

Sobald eine Bestellung abgeschickt ist, wird für jeden zuständigen Drucker ein Zettel erzeugt, der genau die Positionen enthält, die dort zubereitet werden. Welcher Drucker zuständig ist, legt die Kategorie fest, und pro Artikel lässt sich das übersteuern. So kann das Essen in die Küche gehen, während Positionen ohne zugeordneten Drucker, etwa Getränke, gar nicht gedruckt werden.

Die Drucker sind Epson-Bondrucker vom Typ TM-T20IV und TM-T20III. Die Zettel baue ich als ESC/POS-Befehle und schicke sie über den ePOS-Print-Webdienst, den die Drucker eingebaut haben. Das hat sich gegenüber dem direkten Senden an Port 9100 als zuverlässiger erwiesen: Beim ersten Ansatz nahm der Drucker im Testnetz die Daten an, druckte aber nichts, und Dinoo hielt den Zettel trotzdem für gedruckt. Mit ePOS-Print antwortet der Drucker erst nach dem Druck, und ein Zettel gilt nur dann als gedruckt, wenn er das bestätigt. Meldungen wie «Deckel offen» oder «Papier leer» werden als Fehler übernommen.

Damit bei einem Druckerausfall keine Bestellung verloren geht, läuft alles über eine persistente Druckwarteschlange in der Datenbank:

- **Nichts geht verloren:** Ist ein Drucker nicht erreichbar, bleiben seine Zettel in der Warteschlange und werden automatisch in der richtigen Reihenfolge nachgedruckt, sobald er wieder antwortet. Der Worker versucht es mit wachsendem Abstand immer wieder, auch nach einem Neustart der Anwendung.
- **Nicht blockierend:** Die Bestellung wird sofort bestätigt, das Drucken passiert im Hintergrund.
- **Eingreifen:** Der Admin sieht pro Drucker die wartenden Zettel und den letzten Fehler, kann Zettel abbrechen oder erneut drucken und, wenn ein Drucker länger ausfällt, dessen Zettel auf einen anderen Drucker umleiten. Auf dem Zettel steht dann, für welche Station er gedacht ist.

<figure>
<img src="/images/posts/dinoo/druckwarteschlange.webp" width="2200" height="1200" alt="Admin-Ansicht der Druckwarteschlange mit dem Drucker Küche als erreichbar, null wartenden Zetteln und einer Tabelle der gedruckten Zettel mit Zeit, Bestellnummer, Tisch und Status." />
<figcaption>Die Druckwarteschlange zeigt den Zustand der Drucker und jeden einzelnen Zettel.</figcaption>
</figure>

<h2>Druckvorlage</h2>

Wie ein Zettel aussieht, legt der Admin selbst fest, ohne dass dafür Code angepasst werden muss. Die Vorlage besteht aus einer Liste von Blöcken wie Text, Linie, Abstand und der Positionsliste. In den Texten stehen Platzhalter wie `{tisch}`, `{bestellnummer}` oder `{service}`, die beim Drucken ersetzt werden. Rechts daneben zeigt eine Vorschau mit Beispieldaten sofort, wie der Zettel am Drucker aussieht, und ein Testdruck prüft ihn auch auf dem echten Gerät.

<figure>
<img src="/images/posts/dinoo/druckvorlage.webp" width="2200" height="965" alt="Editor für die Druckvorlage mit einer Liste von Blöcken wie Anlass, Tisch, Datum, Positionen und Service und daneben der Vorschau eines Küchenzettels für Tisch B07." />
<figcaption>Die Druckvorlage besteht aus Blöcken, die Vorschau zeigt den fertigen Zettel.</figcaption>
</figure>

Der Zettel wird beim Einreihen fertig gerendert gespeichert. Spätere Änderungen an der Vorlage betreffen so nur neue Bestellungen, bereits eingereihte Zettel bleiben unverändert.

<h1>Verwaltung</h1>

Der Admin-Bereich bündelt alles, was für einen Anlass eingerichtet werden muss: Das Angebot mit Kategorien, Artikeln, Preisen und Druckzuordnung, die Tische als Raster pro Bereich, die Drucker mit Testdruck, die Benutzer sowie die Einstellungen mit dem TWINT-Code. Alle Bestellungen lassen sich nach Tisch, Personal oder Bestellnummer durchsuchen.

Das Dashboard zeigt, wie der Anlass läuft: Umsatz und verkaufte Artikel für einen wählbaren Zeitraum (standardmässig die letzten sechs Stunden), den Verlauf der Einnahmen in Schritten von 15 Minuten bis zu einer Stunde sowie die Verkäufe pro Artikel. Es aktualisiert sich alle 30 Sekunden von selbst, sodass man im Lauf des Abends sieht, wann die Stosszeiten sind.

<figure>
<img src="/images/posts/dinoo/dashboard.webp" width="2200" height="1494" alt="Dashboard mit Umsatz und Anzahl verkaufter Artikel, einem Liniendiagramm des Einnahmenverlaufs mit zwei Spitzen über den Abend und dem Beginn der Verkäufe pro Artikel." />
<figcaption>Das Dashboard zeigt Umsatz, Einnahmenverlauf und Artikelverkäufe.</figcaption>
</figure>

<h2>Ein Anlass, eine Datenbank</h2>

Jeder Anlass hat seine eigene Datenbankdatei. Im Admin-Bereich lässt sich eine neue Datenbank anlegen (wahlweise mit Benutzern, Tischen, Druckern und Angebot aus dem vorherigen Anlass), zwischen den vorhandenen wechseln und eine Datenbank als Datei herunterladen und wieder hochladen. Ein Backup ist damit nach dem Anlass eine einzelne Datei, und die Zahlen früherer Anlässe bleiben jederzeit abrufbar.

<h1>Technik</h1>

Dinoo ist ein <Link href="https://svelte.dev/docs/kit">SvelteKit</Link>-Monolith, ein einziger Prozess auf dem Server-Laptop liefert Oberfläche, Fachlogik und Druckanbindung. Gespeichert wird in <Link href="https://www.sqlite.org/">SQLite</Link> über <Link href="https://orm.drizzle.team/">Drizzle ORM</Link>, was ohne Datenbankserver auskommt, und die Anmeldung übernimmt <Link href="https://www.better-auth.com/">Better Auth</Link>. Die Oberfläche baut auf meiner eigenen Komponentenbibliothek <Link href="https://github.com/noahbaumgartner/svelte-ui">svelte-ui</Link> auf, die ich auch für dieses Portfolio verwende.

Der Server-Code ist in zwei Schichten geteilt. Repositories kapseln jeden Zugriff auf die Aussenwelt, also Datenbank, Drucker und Anmeldung, und Services enthalten die Fachlogik wie «Bestellung aufgeben» (speichern und Zettel einreihen). Dadurch lassen sich die Services gegen eine echte SQLite-Datei und einen simulierten Drucker testen, der die Zettel als Text ausgibt, ohne dass Hardware nötig ist. Dasselbe nutze ich in der Entwicklung, und auch die Screenshots in diesem Beitrag stammen aus einer lokalen Instanz mit simulierten Druckern.

<h1>Stand des Projekts</h1>

Der gesamte Ablauf von der Bestellung über die Warteschlange bis zur Abrechnung ist umgesetzt und mit Tests für die Services abgedeckt. Die Spezifikation mit Rollen, Domänenmodell, Funktionen und den Architekturentscheiden liegt als Dokumentation im <Link href="https://github.com/noahbaumgartner/dinoo">Repository</Link>. Offen sind unter anderem Ende-zu-Ende-Tests und der Einsatz an einem echten Anlass.
