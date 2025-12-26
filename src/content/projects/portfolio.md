---
layout: $lib/components/layouts/ProjectLayout.svelte
year: 2026
month: 1
title: 'Portfolio'
description: 'Persönliches Portfolio mit Projektübersicht und Infos zu meiner Person.'
url: 'https://noahbaumgartner.ch/'
tags: 'Webseite,SPA'
---

<script>
    import Link from '$lib/components/text/Link.svelte'
</script>

<h2 class="mb-2">Allgemein</h2>

Für die Arbeit wollte ich mich im privaten Rahmen ein erstes Mal mit Svelte bzw. SvelteKit auseinander setzen anhand eines praxisnahen Beispiels. Ziel dieses Portfolios ist es, meine Person sowie eigene Projekte vorzustellen.

<h2 class="mt-4 mb-2">Technologien</h2>

Das Portfolio wurde mit SvelteKit entwickelt. Für das Styling kam Tailwind CSS zum Einsatz. Die Website ist als Single Page Application (SPA) konzipiert und verwendet Icons von Lucide.

<h2 class="mt-4 mb-2">Funktionen</h2>

Das Portfolio bietet Informationen über mich sowie eine Übersicht meiner persönlichen Projekte. Ein Highlight ist die Definition von Projekten, welche über <Link href="">mdsvex</Link> funktioniert.
