<script lang="ts">
	import Button from "../ui/Button.svelte";
	import Image from "../Image.svelte";
</script>

<section class="about-wrapper page-padding section-gap">
    <div class="about">
        <div class="about-text">
            <h2 class="about-title">Über mich</h2>
            <span>
                Wenn ich nicht gerade an neuen Features für buildagil arbeite oder für mein Studium lerne, beschäftige ich mich mit privaten Projekten. Ich bin Entwickler aus Leidenschaft und immer auf der Suche nach der nächsten technischen Herausforderung.
            </span>
            <Button href="/about" icon={null}>Mehr erfahren</Button>
        </div>
        <Image src="/images/me.webp" class="about-image" />
    </div>
</section>

<style>
    .about {
        margin-inline: auto;
        max-width: 80rem;
        display: flex;
        flex-direction: column;
        gap: 2.5rem;
    }

    .about-text {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
        padding-block: 30px;
    }

    .about-title {
        font-weight: 500;
        font-size: 1.375rem;
    }

    :global(.about-image) {
        width: 100%;
        aspect-ratio: 1;
        border-radius: 10px;
    }

    @media (min-width: 768px) {
        .about {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }

        .about-text {
            padding-block: 0;
        }

        :global(.about-image) {
            width: 18rem;
            height: 18rem;
            aspect-ratio: auto;
            flex-shrink: 0;
        }
    }
</style>
