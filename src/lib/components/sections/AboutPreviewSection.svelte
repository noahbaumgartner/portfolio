<script lang="ts">
	import Link from "../ui/Link.svelte";
	import Image from "../ui/Image.svelte";
</script>

<section class="about-wrapper page-padding section-gap">
    <div class="about">
        <div class="about-header">
            <h2 class="about-title">Über mich</h2>
            <Link href="/about">Mehr erfahren</Link>
        </div>

        <div class="about-body">
            <div class="about-text">
                <span>
                    Wenn ich nicht gerade an neuen Features für buildagil arbeite oder für mein Studium lerne, beschäftige ich mich mit privaten Projekten. Ich bin Entwickler aus Leidenschaft und immer auf der Suche nach der nächsten technischen Herausforderung.
                </span>
            </div>
            <Image src="/images/me.webp" class="about-image" />
        </div>
    </div>
</section>

<style>
    .about {
        margin-inline: auto;
        max-width: 1280px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 24px;
    }

    .about-header {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        width: 100%;
    }

    .about-header :global(.link) {
        font-size: 14px;
    }

    .about-title {
        font-weight: 500;
        font-size: 22px;
    }

    .about-body {
        display: flex;
        flex-direction: column;
        gap: 40px;
        width: 100%;
    }

    .about-text {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
        padding-block: 5px;
        max-width: 544px;
    }

    :global(.about-image) {
        width: min(100%, 288px);
        aspect-ratio: 1;
        border-radius: 6px;
        flex-shrink: 0;
        align-self: center;
    }

    @media (min-width: 768px) {
        .about-body {
            flex-direction: row;
            align-items: center;
            gap: 72px;
        }

        :global(.about-image) {
            order: -1;
        }

        .about-text {
            padding-block: 0;
        }
    }
</style>
