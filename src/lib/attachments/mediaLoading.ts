import type { Attachment } from 'svelte/attachments';

/**
 * Marks `node` with `data-media="loading"` while any image or video inside it is still loading
 * and switches it to `"loaded"` afterwards (a failed load counts as done). The shimmer
 * placeholder and the fade-in are plain CSS on that attribute, see `layout.css`. Nodes whose
 * media is already loaded get no attribute, so cached images appear without any animation.
 */
export function trackMediaLoading(node: HTMLElement): () => void {
	const pending = Array.from(
		node.querySelectorAll<HTMLImageElement | HTMLVideoElement>('img, video')
	).filter((media) => (media instanceof HTMLImageElement ? !media.complete : media.readyState < 2));

	if (pending.length === 0) return () => {};

	let remaining = pending.length;
	node.dataset.media = 'loading';

	const settle = () => {
		if (--remaining === 0) node.dataset.media = 'loaded';
	};

	const controller = new AbortController();
	for (const media of pending) {
		const loadEvent = media instanceof HTMLImageElement ? 'load' : 'loadeddata';
		media.addEventListener(loadEvent, settle, { once: true, signal: controller.signal });
		media.addEventListener('error', settle, { once: true, signal: controller.signal });
	}

	return () => controller.abort();
}

export const mediaLoading: Attachment<HTMLElement> = (node) => trackMediaLoading(node);
