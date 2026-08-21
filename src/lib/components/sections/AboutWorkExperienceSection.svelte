<script lang="ts">
    import Link from "../ui/Link.svelte";

    const experiences = [
        {
            period: "Juli 2023 - Heute",
            title: "Fullstack Software Entwickler",
            company: "B3 Digital",
            url: "https://www.b-3.ch/",
            description: "Bei B3 Digital bin ich als Fullstack Software Entwickler tätig, wo ich vor allem an der Web-Applikation buildagil arbeite."
        },
        {
            period: "Mai 2023 - Juli 2023",
            title: "SAP PI Consultant",
            company: "Swisscom",
            url: "https://www.swisscom.ch",
            description: "Als SAP PI Consultant bei Swisscom sammelte ich wertvolle Erfahrungen in der Integration von SAP-Systemen, bevor ich mich für eine neue berufliche Herausforderung entschied."
        },
        {
            period: "August 2016 - April 2023",
            title: "Software Entwickler",
            company: "SFS Group",
            url: "https://www.sfs.com",
            description: "Während meiner Lehre bei der SFS Group konzentrierte ich mich auf Java- und Webentwicklung. Nach erfolgreichem Abschluss spezialisierte ich mich auf SAP-Entwicklung mit ABAP und SAP Fiori."
        }
    ];
</script>

<section class="experience-wrapper section-gap">
    <div class="experience-inner page-padding">
        <div class="experience">
            <div class="experience-header">
                <h2 class="experience-title">Berufserfahrung</h2>
            </div>

            <div class="experience-list">
                {#each experiences as experience}
                    <div class="experience-card">
                        <div class="experience-heading">
                            <h3 class="experience-role">{experience.title}</h3>
                            <span class="experience-period">{experience.period}</span>
                        </div>
                        <p class="experience-description">{experience.description}</p>
                        <Link href={experience.url}>{experience.company}</Link>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</section>

<style>
    .experience-wrapper {
        background-color: var(--color-surface);
    }

    .experience-inner {
        padding-block: 24px;
    }

    .experience {
        margin-inline: auto;
        max-width: 1280px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 24px;
    }

    .experience-header {
        display: flex;
        align-items: baseline;
        justify-content: center;
        width: 100%;
    }

    .experience-title {
        font-weight: 500;
        font-size: 22px;
    }

    .experience-list {
        display: grid;
        grid-template-columns: 1fr;
        gap: 16px;
        width: 100%;
    }

    .experience-card {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 10px;
        padding: 24px;
        border: 1px solid var(--color-border-strong);
        border-radius: 6px;
    }

    .experience-heading {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        gap: 8px;
    }

    .experience-role {
        font-size: 20px;
        font-weight: 500;
    }

    .experience-period {
        font-size: 14px;
        color: var(--color-text-muted);
        white-space: nowrap;
    }

    .experience-description {
        max-width: 640px;
    }

    @media (min-width: 640px) {
        .experience-inner {
            padding-block: 40px;
        }
    }

    @media (min-width: 768px) {
        .experience-list {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
        }

        .experience-list > :last-child:nth-child(odd) {
            grid-column: 1 / -1;
            width: calc(50% - 12px);
            margin-inline: auto;
        }

        .experience-card {
            padding: 32px;
        }
    }

    @media (min-width: 1024px) {
        .experience-inner {
            padding-block: 64px;
        }
    }
</style>
