---
year: 2023
month: 6
title: 'Compass'
description: 'Stimmungs- und Arbeitszeiterfassung für die Stadtmuur Winterthur.'
github: https://github.com/ZHAW-PM4-Compass/compass
gif: '/videos/posts/compass.png'
colors: '#c9d6e1,#e2e8e0,#a3b4c5'
icon: compass
---

<script>
    import Link from '$lib/components/ui/link/Link.svelte'
</script>

Compass ist im Rahmen eines Projektmoduls während meines Bachelorstudiums an der ZHAW entstanden. In einer vierköpfigen Gruppe haben wir für die <Link href="https://stadtmuur.ch/">Stadtmuur</Link> in Winterthur eine Anwendung entwickelt, mit der Sozialarbeitende Arbeitszeit, Stimmung und Vorfälle der Teilnehmenden in der Arbeitsintegration erfassen und auswerten können.

<h1>Meine Rolle</h1>

Innerhalb der Gruppe war ich für die Umsetzung des Frontends zuständig, das ich mit <Link href="https://nextjs.org/">Next.js</Link> realisiert habe. Auf eine bestehende UI-Bibliothek haben wir dabei verzichtet, ich habe sämtliche UI-Komponenten eigenständig entwickelt, für das Styling kam <Link href="https://tailwindcss.com/">Tailwind CSS</Link> zum Einsatz. Zusätzlich habe ich die Authentifizierung über <Link href="https://auth0.com/">Auth0</Link> integriert, sowohl im Frontend als auch im Backend, das auf <Link href="https://spring.io/projects/spring-boot">Spring Boot</Link> aufbaut.

<h1>Qualitätssicherung</h1>

Damit die Anwendung auch bei vier Personen im Team konsistent blieb, hatten wir automatisierte Tests im Einsatz, Unit-Tests mit <Link href="https://jestjs.io/">Jest</Link> und End-to-End-Tests mit <Link href="https://playwright.dev/">Playwright</Link>. Über eine <Link href="https://github.com/features/actions">GitHub-Actions</Link>-Pipeline wurden diese bei jedem Commit ausgeführt und Codequalität sowie Testabdeckung zusätzlich mit <Link href="https://www.sonarsource.com/products/sonarqube/">SonarQube</Link> und <Link href="https://about.codecov.io/">Codecov</Link> überwacht. Für den Betrieb war die Anwendung containerisiert und liess sich mit <Link href="https://www.docker.com/">Docker</Link> und <Link href="https://kubernetes.io/">Kubernetes</Link> ausrollen.

<h1>Stand des Projekts</h1>

Da es sich um ein Schulprojekt handelte, lief die Anwendung am Ende nur lokal und war nicht produktionsreif. Ob das Projekt von jemandem aus der Gruppe weitergeführt wird, ist mir nicht bekannt.