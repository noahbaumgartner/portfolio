---
year: 2026
month: 8
title: 'Portfolio'
description: 'Persönliches Portfolio mit Projektübersicht und Infos zu meiner Person.'
url: 'https://noahbaumgartner.ch/'
github: https://github.com/noahbaumgartner/portfolio
gif: '/videos/posts/portfolio.gif'
colors: '#d9d9d9,#c2c2c2,#141414'
icon: person-standing
---

<script>
    import Link from '$lib/components/ui/link/Link.svelte'
</script>

Diese Webseite ist mein persönliches Portfolio und gleichzeitig das Projekt, das du dir gerade ansiehst. Ich habe sie gebaut, um einen digitalen Lebenslauf zu haben, der jederzeit aktuell ist, und um mich vertieft mit Svelte auseinanderzusetzen.

<h1>Motivation</h1>

Ich wollte eine Webseite haben, auf der sich Besucher selbst ein Bild von mir und meinen Projekten machen können, quasi als digitaler Lebenslauf. Gleichzeitig war das Projekt für mich eine gute Gelegenheit, Svelte und SvelteKit ausserhalb meines Jobs in einem eigenen Kontext einzusetzen und dadurch besser kennen zu lernen.

<h1>Technischer Aufbau</h1>

Die Seite basiert auf <Link href="https://svelte.dev/docs/kit/introduction">SvelteKit</Link> und ist vollständig mit TypeScript geschrieben. Sämtliche Komponenten wie Buttons, Links oder das Kontextmenü habe ich selbst entwickelt, für die Icons greife ich auf die Bibliothek <Link href="https://lucide.dev/">Lucide</Link> zurück. Die Projektbeiträge, wie diesen hier, schreibe ich in Markdown und binde sie über <Link href="https://mdsvex.pngwn.io/">mdsvex</Link> ein, wodurch ich innerhalb der Texte auch eigene Svelte-Komponenten wie diesen Link verwenden kann. Gehostet wird die Seite auf <Link href="https://vercel.com/">Vercel</Link>.

<h1>Funktionen</h1>

Neben einer kurzen Übersicht zu mir auf der Startseite gibt es einen Bereich über mich mit Ausbildung und Berufserfahrung sowie eine Übersicht über Projekte wie dieses hier, jeweils mit Inhaltsverzeichnis für längere Beiträge. Zusätzlich gibt es einen Hell- und Dunkelmodus sowie ein Impressum.