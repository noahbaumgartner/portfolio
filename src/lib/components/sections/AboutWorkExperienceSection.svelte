<script lang="ts">
    const experiences = [
        {
            period: "Juli 2023 - Heute",
            title: "Fullstack Software Entwickler",
            company: "B3 Digital AG",
            description: "Bei B3 Digital AG bin ich als Fullstack Software Entwickler tätig, wo ich vor allem an der Web-Applikation buildagil arbeite."
        },
        {
            period: "Mai 2023 - Juli 2023",
            title: "SAP PI Consultant",
            company: "Swisscom",
            description: "Als SAP PI Consultant bei Swisscom sammelte ich wertvolle Erfahrungen in der Integration von SAP-Systemen, bevor ich mich für eine neue berufliche Herausforderung entschied."
        },
        {
            period: "August 2016 - April 2023",
            title: "Software Entwickler",
            company: "SFS Group",
            description: "Während meiner Lehre bei der SFS Group konzentrierte ich mich auf Java- und Webentwicklung. Nach erfolgreichem Abschluss spezialisierte ich mich auf SAP-Entwicklung mit ABAP und SAP Fiori."
        }
    ];
</script>

<section class="experience-wrapper page-padding section-gap">
    <div class="experience">
        <div class="experience-header">
            <h2 class="experience-title">Berufserfahrung</h2>
        </div>

        <div class="experience-list">
            {#each experiences as experience}
                <div class="experience-card">
                    <span class="experience-period">{experience.period}</span>
                    <div class="experience-heading">
                        <h3 class="experience-role">{experience.title}</h3>
                        <span class="experience-company">/{experience.company}/</span>
                    </div>
                    <p class="experience-description">{experience.description}</p>
                </div>
            {/each}
        </div>
    </div>
</section>

<style>
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
        gap: 10px;
        padding: 24px;
        border: 1px solid #e5e5e5;
        border-radius: 6px;
    }

    .experience-period {
        font-size: 14px;
        color: #737373;
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

    .experience-company {
        font-size: 14px;
        color: #737373;
    }

    .experience-description {
        max-width: 640px;
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
</style>
