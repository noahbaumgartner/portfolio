import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import remarkMath from 'remark-math';
import rehypeKatexSvelte from 'rehype-katex-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess(), mdsvex({
		extensions: ['.md'],
		// mdsvex bundles an older remark/unified internally, so this needs
		// remark-math@3 specifically (not latest) to hook in correctly.
		// rehype-katex-svelte (not the plain rehype-katex) is required too:
		// it emits KaTeX output via {@html "..."} instead of raw markup, so
		// the "{" / "}" in rendered LaTeX don't get parsed as Svelte
		// template expressions.
		remarkPlugins: [remarkMath],
		rehypePlugins: [rehypeKatexSvelte],
	})],
	kit: { adapter: adapter() },
	extensions: ['.svelte', '.md']
};

export default config;
