---
year: 2026
month: 9
title: 'Feuerwehr Oberriet'
description: 'Neue Webseite für die Feuerwehr Oberriet mit eigenem WordPress-Theme und Einsatzverwaltung.'
url: 'https://feuerwehr-oberriet.ch/'
gif: '/videos/posts/feuerwehr-oberriet.mp4'
colors: '#fbeaea,#f0b4b4,#960707'
icon: flame
category: project
---

<script>
    import { Link } from '@noahbaumgartner/svelte-ui';
</script>

Die Feuerwehr Oberriet ist für rund 90 Frauen und Männer in fünf Dörfern im Einsatz, und ihre Webseite war in die Jahre gekommen. Im September 2026 habe ich sie komplett neu gebaut, mit einem eigenen WordPress-Theme, das genau das abbildet, was die Feuerwehr täglich braucht, und sich von den Verantwortlichen ohne Programmierkenntnisse pflegen lässt.

<h1>Ausgangslage</h1>

Die bisherige Seite basierte auf <Link href="https://wordpress.org/">WordPress</Link> mit dem Theme OceanWP und dem Seitenbaukasten <Link href="https://elementor.com/">Elementor</Link>. Für Einsätze, Übungen und das Kader musste vieles von Hand in Seiten gepflegt werden, was aufwändig und fehleranfällig war. Mein Ziel war eine Seite, bei der die Inhalte als strukturierte Daten vorliegen, die Feuerwehr sie selbstständig aktuell halten kann und das Design dabei konsistent bleibt.

<h1>Umsetzung</h1>

Ich habe mich bewusst gegen ein fertiges Theme samt Plugin-Sammlung entschieden und stattdessen ein eigenes Block-Theme entwickelt, das im Look der Feuerwehr gehalten ist: weiss, schwarz und Feuerwehrrot, mit den Schriften Inter und Outfit. Sämtliche Funktionen stecken im Theme selbst, die Seite läuft ohne zusätzliche Plugins. Das hält sie schlank und verhindert, dass ein Plugin-Update die Seite plötzlich zerschiesst.

<h1>Inhalte</h1>

Für die wiederkehrenden Inhalte gibt es im WordPress-Admin ein eigenes Menü «Feuerwehr», in dem alles an einem Ort gepflegt wird:

- **Einsätze:** Ein Einsatz besteht bewusst nur aus Stichwort, Datum, Zeit und Alarmstufe, ohne Fliesstext. Auf der Startseite erscheinen die letzten Einsätze, dahinter liegt ein Monatskalender mit allen Einträgen. Dafür gibt es eine eigene Benutzerrolle für Einsatzerfasser, die nur Einsätze erfassen dürfen und sonst nichts sehen.
- **Übungen:** Ebenfalls als Monatskalender, zusätzlich mit Kategorien wie den einzelnen Zügen, über die sich die Ansicht filtern lässt.
- **Kader und Organigramm:** Das Kader ist die einzige Datenquelle für die Kaderliste und das Organigramm. Im Organigramm lassen sich Ebenen und Boxen frei anordnen, die Verbindungslinien berechnet die Seite selbst.
- **Fahrzeuge:** Pro Fahrzeug können Fotos und Kenndaten hinterlegt werden, ein Klick auf die Karte öffnet alle Angaben in einem Overlay.
- **Alarmstufenplan:** Die Stufen mit Einsatzarten und Aufgebot sind im Admin pflegbar. Dieselben Daten füllen die Auswahl im Einsatzformular und die Darstellung auf der Seite «Alarmstufen-Plan».
- **Startseiten-Slider und Instagram-Feed:** Die Slider-Bilder werden im Admin zusammengestellt. Der Instagram-Feed bindet die Beiträge des Vereinskontos live über die offizielle Instagram-API ein.

Daneben gibt es eigene Blöcke für den Editor, etwa für Seitenköpfe, Linkkarten und die nummerierten Verhaltensschritte der Seite «Es brennt – was tun?». Texte, Reihenfolge und Notfallnummern lassen sich dort direkt im Standard-Editor anpassen.

<h1>Stand des Projekts</h1>

Die neue Seite ist live unter <Link href="https://feuerwehr-oberriet.ch/">feuerwehr-oberriet.ch</Link> und wird laufend ergänzt. Die alte Seite habe ich als Archiv gesichert, öffentlich erreichbar ist sie nicht mehr.
