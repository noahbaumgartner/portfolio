<script lang="ts">
    import Link from "../ui/Link.svelte";

    function animateGreeting(node: HTMLElement) {
        const texts = ["Hallo, ich bin Noah", "Software Entwickler", "Student"];
        const typeSpeed = 30;

        let i = 0;
        let k = 0;
        let isDeleting = false;
        let currentText = texts[0];

        function type() {
            if (!isDeleting) {
                node.innerText = currentText.substring(0, k);
                k++;
                if (k > currentText.length) {
                    isDeleting = true;
                    setTimeout(type, 1500);
                    return;
                }
            } else {
                node.innerText = currentText.substring(0, k);
                k--;
                if (k < 0) {
                    isDeleting = false;
                    i++;
                    currentText = texts[i % texts.length];
                    k = 0;
                    setTimeout(type, typeSpeed);
                    return;
                }
            }
            setTimeout(type, typeSpeed);
        }

        type();
    }

    function animateBlinking(node: HTMLElement) {
        let visible = true;
        setInterval(() => {
            node.style.opacity = visible ? '1' : '0';
            visible = !visible;
        }, 300);
    }
</script>

<section class="hero-wrapper page-padding">
    <div class="hero">
        <div class="hero-content">
            <span class="hero-greeting">
                <span {@attach animateGreeting} class="hero-greeting-text"></span>
                <span {@attach animateBlinking} class="hero-cursor">|</span>
            </span>
            <span class="hero-subtitle">
                Ich entwickle Software bei <Link href="https://buildagil.com">buildagil</Link> und absolviere meinen MSc an der <Link href="https://zhaw.ch">ZHAW</Link>.
            </span>
        </div>
    </div>
</section>

<style>
    .hero {
        position: relative;
        margin-inline: auto;
        max-width: 1280px;
        min-height: 400px;
        padding: 60px 24px;
        background-color: var(--color-surface);
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        user-select: none;
    }

    .hero-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
    }

    .hero-greeting {
        display: flex;
        gap: 4px;
        font-family: 'Google Sans', sans-serif;
        font-size: 24px;
        text-align: center;
    }

    .hero-greeting-text {
        font-weight: 600;
    }

    .hero-cursor {
        font-weight: 200;
    }

    .hero-subtitle {
        max-width: 448px;
        font-size: 18px;
        text-align: center;
    }
</style>
