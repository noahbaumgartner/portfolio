<script lang="ts">
    import Image from "../Image.svelte";
</script>

<section class="intro-wrapper page-padding">
    <div class="intro">
        <div class="intro-body">
            <div class="intro-text">
                <p>Ich bin Noah Baumgartner, ein leidenschaftlicher Fullstack-Softwareentwickler mit über fünf Jahren Erfahrung. Ich liebe es, innovative digitale Lösungen zu gestalten und mich fachlich wie persönlich ständig weiterzuentwickeln.</p>
                <p>In meiner Freizeit gehe ich vielfältigen Hobbys und Interessen nach, die mich inspirieren und ausgleichen. Ich engagiere mich bei der freiwilligen Feuerwehr Kriessern, bin aktiv im Turnverein STV Kriessern und setze mich gemeinsam mit Freunden im Verein Kriessner Schollabar ein.</p>
            </div>
            <Image src="/images/me.webp" class="intro-image" />
        </div>
    </div>
</section>

<style>
    .intro-wrapper {
        margin-bottom: 24px;
    }

    .intro {
        margin-inline: auto;
        max-width: 1280px;
        background-color: #f5f5f5;
        border-radius: 6px;
        padding: 40px 24px;
    }

    .intro-body {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 24px;
    }

    .intro-text {
        display: flex;
        flex-direction: column;
        gap: 16px;
        max-width: 680px;
    }

    :global(.intro-image) {
        width: min(100%, 288px);
        aspect-ratio: 1;
        border-radius: 6px;
        flex-shrink: 0;
    }

    @media (min-width: 640px) {
        .intro-wrapper {
            margin-bottom: 40px;
        }

        .intro-body {
            gap: 40px;
        }
    }

    @media (min-width: 768px) {
        .intro {
            padding: 64px;
        }

        .intro-body {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }
    }

    @media (min-width: 1024px) {
        .intro-wrapper {
            margin-bottom: 64px;
        }

        .intro-body {
            gap: 64px;
        }
    }
</style>
