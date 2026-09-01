<script lang="ts">
    import Link from "../ui/link/Link.svelte";
</script>

<section class="hobbies-wrapper section-gap">
    <div class="hobbies-inner page-padding">
        <div class="hobbies">
            <h2 class="hobbies-title">Freizeit</h2>
            <div class="hobbies-text">
                <p>In meiner Freizeit gehe ich vielfältigen Hobbys und Interessen nach, die mich inspirieren und ausgleichen. Ich engagiere mich bei der freiwilligen <Link href="https://feuerwehr-oberriet.ch/">Feuerwehr Oberriet</Link>, bin aktiv im Turnverein <Link href="https://www.stvkriessern.ch/">STV Kriessern</Link> und setze mich gemeinsam mit Freunden im Verein <Link href="https://schollabar.ch/">Kriessner Schollabar</Link> ein.</p>
            </div>
        </div>
    </div>
</section>

<style>
    .hobbies-wrapper {
        background-color: var(--color-bg);
    }

    .hobbies-inner {
        padding-block: 40px;
    }

    .hobbies {
        margin-inline: auto;
        max-width: 1280px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        text-align: center;
    }

    .hobbies-title {
        font-weight: 500;
        font-size: 22px;
        color: var(--color-text);
    }

    .hobbies-text {
        display: flex;
        flex-direction: column;
        gap: 16px;
        max-width: 640px;
        color: var(--color-text);
    }

    .hobbies-text b {
        color: var(--color-text);
    }

    @media (min-width: 768px) {
        .hobbies-inner {
            padding-block: 64px;
        }
    }
</style>
