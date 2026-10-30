<script lang="ts">
	import { PageHeader } from '@noahbaumgartner/svelte-ui';

	const STAR_COUNT = 200;

	type Star = {
		angle: number;
		/** Distance from the centre in px. */
		dist: number;
		speed: number;
		brightness: number;
	};

	const smoothstep = (edge0: number, edge1: number, x: number) => {
		const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
		return t * t * (3 - 2 * t);
	};

	// Light streaks that fly outwards from an ellipse around the title, like a jump to
	// hyperspace. They start just outside the title's text, so the text itself stays clear.
	function hyperspace(canvas: HTMLCanvasElement) {
		const host = canvas.parentElement as HTMLElement;
		const textBlocks = host.querySelectorAll('h1, p');
		const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

		let width = 0;
		let height = 0;
		let centerX = 0;
		let centerY = 0;
		let radiusX = 0;
		let radiusY = 0;
		let maxDist = 0;
		// Text block that streaks are dimmed inside (only matters when the ellipse is smaller).
		let clear = { left: 0, right: 0, top: 0, bottom: 0 };
		let color = 'rgb(0 0 0)';
		let stars: Star[] = [];
		let frame = 0;
		let frames = 0;
		let last = 0;

		// Distance from the centre to the ellipse around the title at a given angle.
		const startDist = (angle: number) =>
			1 / Math.hypot(Math.cos(angle) / radiusX, Math.sin(angle) / radiusY);

		const spawn = (scatter: boolean): Star => {
			const angle = Math.random() * Math.PI * 2;
			const start = startDist(angle) * (1 + Math.random() * 0.25);
			return {
				angle,
				dist: scatter ? start + Math.random() * (maxDist - start) * 0.7 : start,
				speed: 0.6 + Math.random() * 0.8,
				brightness: 0.3 + Math.random() * 0.7
			};
		};

		const measure = () => {
			const dpr = window.devicePixelRatio || 1;
			const box = canvas.getBoundingClientRect();
			width = box.width;
			height = box.height;
			canvas.width = Math.round(width * dpr);
			canvas.height = Math.round(height * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

			// Bounding boxes of the title alone and of title plus description, relative to the canvas.
			const origin = canvas.getBoundingClientRect();
			const bounds = (blocks: Element[]) => {
				const result = { left: Infinity, right: -Infinity, top: Infinity, bottom: -Infinity };
				for (const block of blocks) {
					const range = document.createRange();
					range.selectNodeContents(block);
					const box = range.getBoundingClientRect();
					result.left = Math.min(result.left, box.left - origin.left);
					result.right = Math.max(result.right, box.right - origin.left);
					result.top = Math.min(result.top, box.top - origin.top);
					result.bottom = Math.max(result.bottom, box.bottom - origin.top);
				}
				return result;
			};
			const all = bounds([...textBlocks]);
			// The text fills a phone's whole width, so an ellipse around all of it would start
			// outside the screen. There it only surrounds the title and the streaks are dimmed
			// where they cross the description instead.
			const around = width < 640 ? bounds([textBlocks[0]]) : all;
			clear = all;
			centerX = width / 2;
			centerY = (around.top + around.bottom) / 2;
			// Slightly larger than the box, so the ellipse also clears its corners.
			radiusX = ((around.right - around.left) / 2) * 1.15 + 36;
			radiusY = ((around.bottom - around.top) / 2) * 1.15 + 24;
			maxDist = Math.hypot(width, height);
			color = getComputedStyle(canvas).color;
			stars = Array.from({ length: STAR_COUNT }, () => spawn(true));
		};

		const step = (dt: number) => {
			for (let i = 0; i < stars.length; i++) {
				const star = stars[i];
				star.dist += dt * star.speed * (40 + star.dist * 0.5);
				if (star.dist > maxDist) stars[i] = spawn(false);
			}
		};

		const draw = () => {
			ctx.clearRect(0, 0, width, height);
			ctx.strokeStyle = color;
			ctx.lineCap = 'round';

			for (const star of stars) {
				const start = startDist(star.angle);
				const travelled = star.dist - start;
				const speed = star.speed * (40 + star.dist * 0.5);
				const tail = Math.max(star.dist - speed * 0.18, start);
				const alpha =
					smoothstep(0, 60, travelled) *
					(1 - smoothstep(maxDist * 0.3, maxDist * 0.6, star.dist)) *
					star.brightness;
				if (alpha <= 0.01) continue;

				const cos = Math.cos(star.angle);
				const sin = Math.sin(star.angle);
				const midX = centerX + (cos * (tail + star.dist)) / 2;
				const midY = centerY + (sin * (tail + star.dist)) / 2;
				const behindText =
					midX > clear.left - 8 &&
					midX < clear.right + 8 &&
					midY > clear.top - 8 &&
					midY < clear.bottom + 8;
				ctx.globalAlpha = behindText ? alpha * 0.1 : alpha;
				ctx.lineWidth = 0.8 + star.brightness * 0.8;
				ctx.beginPath();
				ctx.moveTo(centerX + cos * tail, centerY + sin * tail);
				ctx.lineTo(centerX + cos * star.dist, centerY + sin * star.dist);
				ctx.stroke();
			}
		};

		const tick = (now: number) => {
			const dt = Math.min((now - last) / 1000, 0.05);
			last = now;
			step(dt);
			// The theme can change at any time; re-read the colour now and then.
			if (++frames % 60 === 0) color = getComputedStyle(canvas).color;
			draw();
			frame = requestAnimationFrame(tick);
		};

		const start = () => {
			if (frame || reducedMotion.matches) return;
			last = performance.now();
			frame = requestAnimationFrame(tick);
		};

		const stop = () => {
			cancelAnimationFrame(frame);
			frame = 0;
		};

		const render = () => {
			measure();
			if (reducedMotion.matches) {
				// A single still frame instead of an animation.
				for (let i = 0; i < 60; i++) step(1 / 30);
				draw();
			} else {
				draw();
			}
		};

		const resizeObserver = new ResizeObserver(render);
		resizeObserver.observe(host);

		const intersectionObserver = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) start();
			else stop();
		});
		intersectionObserver.observe(host);

		const onMotionChange = () => {
			stop();
			render();
			if (!reducedMotion.matches) start();
		};
		reducedMotion.addEventListener('change', onMotionChange);

		return () => {
			stop();
			resizeObserver.disconnect();
			intersectionObserver.disconnect();
			reducedMotion.removeEventListener('change', onMotionChange);
		};
	}
</script>

<div class="posts-hero">
	<canvas class="posts-hero-streaks" aria-hidden="true" {@attach hyperspace}></canvas>
	<PageHeader
		eyebrow="Beiträge"
		description="Eine Übersicht meiner Projekte und weiterer Beiträge, von Webseiten und Apps bis hin zu Übungsarbeiten aus dem Studium."
	>
		{#snippet title()}
			Projekte<br />und Gedanken.
		{/snippet}
	</PageHeader>
</div>

<style>
	.posts-hero {
		position: relative;
		isolation: isolate;
	}

	/* As wide as the page content (max 1280px), so the streaks never reach past the container
	   edges on wide screens. Extends a little below the header and fades out towards all
	   edges, so the streaks never end in a hard line. */
	.posts-hero-streaks {
		position: absolute;
		z-index: -1;
		top: 0;
		left: 50%;
		translate: -50% 0;
		width: min(100%, 1280px);
		height: calc(100% + 60px);
		color: var(--color-text);
		opacity: 0.55;
		pointer-events: none;
		mask-image: radial-gradient(ellipse closest-side at 50% 45%, #000 55%, transparent 100%);
	}

	/* On phones the streaks have little room around the text, so they get stronger and fade
	   out later. */
	@media (max-width: 639px) {
		.posts-hero-streaks {
			opacity: 0.9;
			mask-image: radial-gradient(ellipse closest-side at 50% 45%, #000 75%, transparent 100%);
		}
	}
</style>
