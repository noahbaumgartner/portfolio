---
year: 2026
month: 10
title: 'svelte-ui'
description: 'Minimalistische Komponentenbibliothek für Svelte 5, die ich in meinem Portfolio, in Dinoo und in weiteren Projekten einsetze.'
url: 'https://noahbaumgartner.github.io/svelte-ui/'
github: https://github.com/noahbaumgartner/svelte-ui
gif: '/videos/posts/svelte-ui.png'
colors: '#f2f2f2,#d9d9d9,#141414'
icon: component
category: project
---

<script>
    import { Link } from '@noahbaumgartner/svelte-ui';
</script>

svelte-ui ist eine minimalistische, einfarbige Komponentenbibliothek für Svelte 5. Sie ist aus meinem Portfolio herausgewachsen: Dort hatte ich Buttons, Links und ein Kontextmenü zuerst direkt im Projekt gebaut, und sobald ich dieselben Bausteine in einem zweiten Projekt brauchte, wurde daraus ein eigenes Paket. Heute stecken rund 60 Komponenten drin, von Formularfeldern über Dialoge bis zu Tabellen und Diagrammen. Sie wird auf <Link href="https://www.npmjs.com/package/@noahbaumgartner/svelte-ui">npm</Link> veröffentlicht, und alle Komponenten lassen sich in der <Link href="https://noahbaumgartner.github.io/svelte-ui/">Storybook-Dokumentation</Link> ausprobieren.

<h1>Motivation</h1>

Ich wollte eine Bibliothek, die ohne Konfiguration gut aussieht, sich mit wenigen Variablen an ein Projekt anpassen lässt und sich in allen meinen Projekten gleich verhält, statt dieselben Bausteine pro Projekt neu zu kopieren und auseinanderlaufen zu lassen. Dazu kam der Wunsch, die Plattform so weit wie möglich selbst arbeiten zu lassen, statt sie mit JavaScript nachzubauen. Und es hat mich interessiert, wie viel Aufwand hinter Komponenten steckt, die man sonst als selbstverständlich hinnimmt, etwa ein Dropdown, das per Tastatur bedienbar ist und sich am Bildschirmrand richtig platziert.

<h1>Theming</h1>

Das Design besteht aus zwei Farben, einer Grundfarbe für die Seite und einer Tintenfarbe für den Text. Alle anderen Töne wie Rahmen, Flächen, Hover-Zustände und gedämpfter Text entstehen daraus mit `color-mix()`. Der Dunkelmodus vertauscht einfach, welche der beiden Farben hell und welche dunkel ist. Er folgt standardmässig `prefers-color-scheme` und lässt sich mit einem `data-theme`-Attribut auf dem `html`-Element erzwingen, so wie es auch mein Portfolio macht.

Für die Anpassung genügen CSS-Variablen auf `:root`. Die wichtigsten sind `--ui-base`, `--ui-ink`, `--ui-accent` und die beiden Schriften, jeweils mit einer Variante für den Dunkelmodus. Der Akzent färbt aktivierte Elemente, primäre Buttons und Fokusringe, und die passende Textfarbe darauf wird automatisch nach Kontrast gewählt. Die Komponenten lesen nur die daraus abgeleiteten `--color-*`-Tokens, sodass sich eine eigene Palette nicht in jede Komponente einzeln eintragen lässt, sondern an einer Stelle gesetzt wird.

<figure>
<img src="/images/posts/svelte-ui/theming.webp" width="2200" height="897" alt="Vier Ausschnitte mit Buttons und Karten: oben Standarddesign in Hell und Dunkel mit schwarzem beziehungsweise weissem Akzent, unten dieselben Komponenten mit terracottafarbenem Akzent." />
<figcaption>Dieselben Komponenten im Standarddesign und mit Terracotta als Akzent, jeweils hell und dunkel.</figcaption>
</figure>

Das Design ist bewusst zurückhaltend: Ausser der Farbe für Fehler ist alles grau, und Farbe kommt erst durch den Akzent der Anwendung dazu. So passt die Bibliothek zum nüchternen Portfolio genauso wie zum beigen Dinoo.

<h1>Komponenten</h1>

Die Bibliothek deckt das ab, was eine typische Anwendung braucht:

- **Aktionen und Formulare:** Button, Link, Input, Textarea, Select, Checkbox, Switch, NumberStepper, FileInput und die Field-Familie für Labels, Beschreibungen und Fehlermeldungen.
- **Auswahl:** Kalender, Zeit- und Farbwähler.
- **Overlays:** Dialog, AlertDialog, Drawer, Popover, Tooltip, Kontextmenü und Toasts.
- **Navigation:** Navbar, Sidebar, Breadcrumb und Tabs.
- **Anzeige:** Cards, Tabellen mit Sortierung und Auswahl, Accordion, Avatar, Badge, Progress und Skeleton.
- **Daten:** Stat, LineChart, BarChart, Steps und Numpad.

Jede Komponente hat Props, die sich mit Svelte-5-Runes (`$props()`, `$bindable()`) und Snippets für Inhalte beschreiben lassen, und ist durchgehend mit TypeScript typisiert. Icons liefert die Bibliothek bewusst nicht mit: Jede `icon`-Prop nimmt eine beliebige Svelte-Komponente an, ich verwende <Link href="https://lucide.dev/">Lucide</Link>. Lucide ist auch die einzige Laufzeitabhängigkeit des Pakets, es liefert die internen Symbole wie den Ziehgriff. Alles andere ist selbst geschrieben.

<figure>
<img src="/images/posts/svelte-ui/daten.webp" width="2200" height="843" alt="Zwei Spalten mit denselben Komponenten, links hell und rechts dunkel: drei Kennzahlen zu Umsatz und verkauften Artikeln, eine Fortschrittsanzeige mit vier Schritten, ein Liniendiagramm des Umsatzverlaufs und ein Balkendiagramm mit Verkäufen pro Artikel." />
<figcaption>Kennzahlen, Schritte und Diagramme in Hell und Dunkel, ganz ohne Diagrammbibliothek.</figcaption>
</figure>

<h2>Nah an der Plattform</h2>

Wo der Browser etwas selbst kann, nutze ich das. Dialog und Drawer basieren auf dem nativen `<dialog>`-Element mit `showModal()`, Popover, Tooltip und Select auf der Popover-API des Browsers. Dadurch kommen Dinge wie die Fokusfalle, der Top-Layer und das Schliessen mit Escape ohne eigenen Code aus. Darauf setze ich die Details, die sie erst angenehm machen: Der Tooltip weicht auf die gegenüberliegende Seite aus, wenn es nicht genug Platz hat, Select unterstützt die Suche per Tipp auf eine Taste, und Animationen berücksichtigen `prefers-reduced-motion`. Auch die Diagramme sind schlichtes SVG, ohne dass eine Diagrammbibliothek eingebunden wird.

<h1>Dokumentation und Tests</h1>

Jede Komponente hat in <Link href="https://storybook.js.org/">Storybook</Link> eine Story pro Prop und Zustand, und die Seite ist gleichzeitig die Dokumentation der Bibliothek. In der Werkzeugleiste lassen sich Hell- und Dunkelmodus sowie verschiedene Akzentfarben umschalten, so sieht man sofort, wie sich eine Komponente in einem anderen Design verhält.

Neben den Ansichten gibt es Interaktionstests, die als Stories geschrieben sind und mit Vitest und Playwright in einem echten Browser laufen. Sie prüfen zum Beispiel, dass ein Dialog den Fokus zurückgibt, Escape ihn schliesst oder ein Select per Tastatur bedienbar ist. Das ergibt über 120 Tests, die zusammen mit Linting und Typprüfung bei jedem Push in GitHub Actions laufen. Die Storybook-Seite wird bei jeder Änderung auf `main` automatisch auf GitHub Pages veröffentlicht.

<h1>Veröffentlichung</h1>

Eine neue Version entsteht über ein GitHub-Release: Der Workflow setzt die Version aus dem Tag, prüft die Typen und stellt das Paket mit Provenance auf npm bereit, wo ich es danach mit 2FA freigebe. Die Anwendungen binden die Bibliothek wie jedes andere Paket ein, importieren einmal `tokens.css` und optional `base.css` mit einem kleinen Reset sowie den Layout-Variablen und können danach die Komponenten verwenden.

<h1>Einsatz in meinen Projekten</h1>

Was ich in einem Projekt vermisse, baue ich in svelte-ui ein, und alle anderen Projekte profitieren davon.

- **Dieses Portfolio** baut auf den Komponenten auf, die Navigation, Footer, Seitenabschnitte, Vorschaukarten, Lightbox, Inhaltsverzeichnis, Hell-/Dunkel-Umschalter und die Links in den Beiträgen stammen alle aus der Bibliothek. Im Portfolio bleibt nur die Komposition, die meine Inhalte kennt.
- **<Link href="/posts/dinoo">Dinoo</Link>** ist die bisher grösste Anwendung auf svelte-ui: Dialoge, Drawer, Tabellen, Selects und Tabs bilden die Bedienung, und das Dashboard verwendet `Stat`, `LineChart` und `BarChart`. Dazu kommen die sortierbare Liste mit Ziehgriff für die Reihenfolge von Angebot und Druckvorlage, der `NumberStepper` für die Mengen und die `ActionBar` für die Aktionsleiste bei der Bestellung.

<h1>Stand des Projekts</h1>

Die Bibliothek ist in Version 0.2 veröffentlicht und im Alltag in zwei Projekten im Einsatz. Solange sie unter 1.0 ist, können sich Props noch ändern, und die Eckradien sind aktuell fest und noch nicht konfigurierbar. Als Nächstes möchte ich die Komponenten in weiteren Projekten einsetzen, damit sich zeigt, was noch fehlt, und die Dokumentation um Beispiele für ganze Seiten ergänzen.
