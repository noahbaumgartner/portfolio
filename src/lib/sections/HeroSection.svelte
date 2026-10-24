<script lang="ts">
	import { Link, PageHeader } from '@noahbaumgartner/svelte-ui';

	function animateGreeting(node: HTMLElement) {
		const texts = ['Hallo, ich bin Noah', 'Software Entwickler', 'Student'];
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

	function trackPointer(event: PointerEvent) {
		if (event.pointerType === 'touch') return;
		const el = event.currentTarget as HTMLElement;
		const rect = el.getBoundingClientRect();
		el.style.setProperty('--grid-x', `${event.clientX - rect.left}px`);
		el.style.setProperty('--grid-y', `${event.clientY - rect.top}px`);
		el.style.setProperty('--grid-opacity', '1');
	}

	function hidePointer(event: PointerEvent) {
		(event.currentTarget as HTMLElement).style.setProperty('--grid-opacity', '0');
	}
</script>

<div class="hero" onpointermove={trackPointer} onpointerleave={hidePointer} role="presentation">
	<div class="hero-grid hero-grid--oval" aria-hidden="true"></div>
	<div class="hero-grid hero-grid--hover" aria-hidden="true"></div>
	<PageHeader eyebrow="Portfolio">
		{#snippet title()}
			<span class="hero-greeting">
				<span {@attach animateGreeting} class="hero-greeting-text"></span>
				<span {@attach animateBlinking} class="hero-cursor">|</span>
			</span>
		{/snippet}
		{#snippet description()}
			Ich entwickle Software bei der <Link href="https://b-3.ch">B3 Digital</Link> und absolviere meinen
			MSc an der <Link href="https://zhaw.ch">ZHAW</Link>.
		{/snippet}
	</PageHeader>
</div>

<style>
	.hero {
		position: relative;
		padding-block: 32px;
	}

	@media (min-width: 640px) {
		.hero {
			padding-block: 48px;
		}
	}

	@media (min-width: 1024px) {
		.hero {
			padding-block: 64px;
		}
	}

	.hero-grid {
		--grid-line: color-mix(in srgb, var(--color-text) 12%, transparent);
		position: absolute;
		inset: 0;
		clip-path: inset(2px round 8px);
		pointer-events: none;
		background-image:
			linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
			linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px);
		background-size: 20px 20px;
	}

	/* Always visible: grid lines behind the header text. Both grid layers span the whole
	   hero, so their lines coincide; only the mask shapes this one. It always fades out
	   softly at the top and bottom, and on wide screens also towards the sides with a fixed
	   radius, so it stays an oval instead of stretching across the page. On phones it fades
	   out at the sides as well. */
	.hero-grid--oval {
		--grid-fade-y: linear-gradient(to bottom, transparent, #000 30%, #000 70%, transparent);
		mask-image:
			var(--grid-fade-y), radial-gradient(ellipse 480px 100% at 50% 50%, #000 0%, transparent 100%);
		mask-composite: intersect;
	}

	@media (max-width: 640px) {
		.hero-grid--oval {
			mask-image:
				var(--grid-fade-y), linear-gradient(to right, transparent, #000 20%, #000 80%, transparent);
		}
	}

	/* Spotlight that follows the pointer. */
	.hero-grid--hover {
		--grid-line: color-mix(in srgb, var(--color-text) 32%, transparent);
		opacity: var(--grid-opacity, 0);
		transition: opacity 0.3s ease;
		mask-image: radial-gradient(
			circle 160px at var(--grid-x, 50%) var(--grid-y, 50%),
			#000 0%,
			transparent 100%
		);
	}

	/* Fixed height, so the title keeps its size while the typing animation has not
	   written a letter yet and the description below does not jump. */
	.hero-greeting {
		display: flex;
		justify-content: center;
		gap: 4px;
		height: 1.15em;
	}

	.hero-cursor {
		font-weight: 200;
	}
</style>
