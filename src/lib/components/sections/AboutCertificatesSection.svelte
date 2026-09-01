<script lang="ts">
    import Link from "../ui/link/Link.svelte";

    const certificates = [
        {
            period: "Dez. 2024",
            title: "Foundation Level Certified Professional for Software Architecture",
            issuer: "iSQI Group",
            url: "https://www.isqi.org"
        },
        {
            period: "Nov. 2024",
            title: "Foundation Level Certified Professional for Requirements Engineering",
            issuer: "iSQI Group",
            url: "https://www.isqi.org"
        }
    ];
</script>

<section class="certificates-wrapper">
    <div class="certificates-inner page-padding">
        <div class="certificates">
            <div class="certificates-header">
                <h2 class="certificates-title">Zertifikate</h2>
            </div>

            <div class="certificates-list">
                {#each certificates as certificate}
                    <div class="certificates-card">
                        <h3 class="certificates-role">{certificate.title}<span class="certificates-period">{certificate.period}</span></h3>
                        <Link href={certificate.url}>{certificate.issuer}</Link>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</section>

<style>
    .certificates-wrapper {
        background-color: var(--color-bg);
        margin-top: -30px;
        margin-bottom: 30px;
    }

    .certificates-inner {
        padding-block: 24px;
    }

    .certificates {
        margin-inline: auto;
        max-width: 1280px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 24px;
    }

    .certificates-header {
        display: flex;
        align-items: baseline;
        justify-content: center;
        width: 100%;
    }

    .certificates-title {
        font-weight: 500;
        font-size: 22px;
    }

    .certificates-list {
        display: grid;
        grid-template-columns: 1fr;
        gap: 16px;
        width: 100%;
    }

    .certificates-card {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 10px;
        padding: 24px;
        border: 1px solid var(--color-border-strong);
        border-radius: 6px;
    }

    .certificates-role {
        font-size: 20px;
        font-weight: 500;
    }

    .certificates-period {
        margin-left: 8px;
        font-size: 14px;
        font-weight: 400;
        color: var(--color-text-muted);
        white-space: nowrap;
    }

    @media (min-width: 640px) {
        .certificates-wrapper {
            margin-top: -40px;
            margin-bottom: 40px;
        }

        .certificates-inner {
            padding-block: 40px;
        }
    }

    @media (min-width: 768px) {
        .certificates-list {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
        }

        .certificates-card {
            padding: 32px;
        }
    }

    @media (min-width: 1024px) {
        .certificates-wrapper {
            margin-top: -64px;
            margin-bottom: 64px;
        }

        .certificates-inner {
            padding-block: 64px;
        }
    }
</style>
