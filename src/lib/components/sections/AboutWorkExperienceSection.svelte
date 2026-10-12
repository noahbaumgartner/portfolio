<script lang="ts">
    import { Entry, Link, Section } from '@noahbaumgartner/svelte-ui';

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

<Section width="full" class="section-gap">
    <div class="experience">
        <div class="experience-header">
            <h2 class="experience-title">Berufserfahrung</h2>
        </div>

        <div class="experience-list">
            {#each experiences as experience}
                <Entry title={experience.title} meta={experience.period}>
                    {experience.description}
                    {#snippet footer()}
                        <Link href={experience.url}>{experience.company}</Link>
                    {/snippet}
                </Entry>
            {/each}
        </div>
    </div>
</Section>

<style>
    .experience {
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
    }
</style>
