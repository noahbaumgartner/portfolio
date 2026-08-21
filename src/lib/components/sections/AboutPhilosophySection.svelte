<section class="philosophy-wrapper section-gap">
    <div class="philosophy-inner page-padding">
        <div class="philosophy">
            <h2 class="philosophy-title">Meine Philosophie</h2>
            <div class="philosophy-text">
                <p>Wenn ich an etwas arbeite, will ich es richtig machen – nicht nur schnell fertig, sondern durchdacht und sauber umgesetzt.</p>
                <p>Ich versuche, bei allem immer <b>mein Bestes zu geben</b> und dabei den <b>Fokus auf das Detail</b> nicht zu verlieren. Oft sind es die kleinen Dinge, die den Unterschied machen.</p>
                <p>Gleichzeitig achte ich darauf, mich darin nicht zu verlieren – den Blick fürs Ganze zu behalten, statt im Perfektionismus stecken zu bleiben.</p>
            </div>
        </div>
    </div>
</section>

<style>
    .philosophy-wrapper {
        background-color: var(--color-bg);
    }

    .philosophy-inner {
        padding-block: 40px;
    }

    .philosophy {
        margin-inline: auto;
        max-width: 1280px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        text-align: center;
    }

    .philosophy-title {
        color: var(--color-text);
    }

    .philosophy-text {
        display: flex;
        flex-direction: column;
        gap: 16px;
        max-width: 640px;
        color: var(--color-text);
    }

    .philosophy-text b {
        color: var(--color-text);
    }

    @media (min-width: 768px) {
        .philosophy-inner {
            padding-block: 64px;
        }
    }
</style>
