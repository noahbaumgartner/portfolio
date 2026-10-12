import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		// The linked ../svelte-ui has its own node_modules; without this its
		// components would run on a second Svelte runtime.
		dedupe: ['svelte']
	},
	server: {
		// Allow serving the linked ../svelte-ui from outside the project root.
		fs: { allow: ['..'] }
	}
});
