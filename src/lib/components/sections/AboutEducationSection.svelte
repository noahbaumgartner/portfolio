<script lang="ts">
    const educations = [
        {
            period: "2025 - Heute",
            title: "Master of Science in Engineering",
            institution: "ZHAW",
            description: "Masterstudium mit Vertiefung im Bereich Künstliche Intelligenz und maschinelles Lernen."
        },
        {
            period: "2021 - 2025",
            title: "Bachelor of Science in Informatik",
            institution: "ZHAW",
            description: "Bachelorstudium in Informatik mit Schwerpunkt auf Software Engineering."
        },
        {
            period: "2016 - 2020",
            title: "Berufsmatura",
            institution: "GBSSG",
            description: "Vorbereitung auf das Studium mit Fokus auf technische und naturwissenschaftliche Fächer."
        },
        {
            period: "2016 - 2020",
            title: "Informatiker EFZ",
            institution: "GBSSG",
            description: "Lehre als Informatiker EFZ mit Fachrichtung Applikationsentwicklung."
        }
    ];
</script>

<section class="education-wrapper section-gap">
    <div class="education-inner page-padding">
        <div class="education">
            <div class="education-header">
                <h2 class="education-title">Ausbildung</h2>
            </div>

            <div class="education-list">
                {#each educations as education}
                    <div class="education-card">
                        <span class="education-period">{education.period}</span>
                        <div class="education-heading">
                            <h3 class="education-role">{education.title}</h3>
                            <span class="education-institution">/{education.institution}/</span>
                        </div>
                        <p class="education-description">{education.description}</p>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</section>

<style>
    .education-wrapper {
        background-color: #f5f5f5;
    }

    .education-inner {
        padding-block: 24px;
    }

    .education {
        margin-inline: auto;
        max-width: 1280px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 24px;
    }

    .education-header {
        display: flex;
        align-items: baseline;
        justify-content: center;
        width: 100%;
    }

    .education-title {
        font-weight: 500;
        font-size: 22px;
    }

    .education-list {
        display: grid;
        grid-template-columns: 1fr;
        gap: 16px;
        width: 100%;
    }

    .education-card {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        padding: 24px;
        border: 1px solid #e5e5e5;
        border-radius: 6px;
    }

    .education-period {
        font-size: 14px;
        color: #737373;
    }

    .education-heading {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        gap: 8px;
    }

    .education-role {
        font-size: 20px;
        font-weight: 500;
    }

    .education-institution {
        font-size: 14px;
        color: #737373;
    }

    .education-description {
        max-width: 640px;
    }

    @media (min-width: 640px) {
        .education-inner {
            padding-block: 40px;
        }
    }

    @media (min-width: 768px) {
        .education-list {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
        }

        .education-list > :last-child:nth-child(odd) {
            grid-column: 1 / -1;
            width: calc(50% - 12px);
            margin-inline: auto;
        }

        .education-card {
            padding: 32px;
        }
    }

    @media (min-width: 1024px) {
        .education-inner {
            padding-block: 64px;
        }
    }
</style>
