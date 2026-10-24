# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Noah Baumgartner's personal portfolio site: SvelteKit 5 + TypeScript, content-driven blog posts written in Markdown (via mdsvex), deployed to Vercel. German-language content.

## Commands

```bash
npm run dev             # start dev server (vp dev, Vite+)
npm run build           # production build
npm run preview         # preview production build
npm run check           # svelte-kit sync + svelte-check (type checking)
npm run check:watch     # type checking in watch mode
npm run format          # vp fmt (Oxfmt)
npm run lint            # vp fmt --check && vp lint (Oxlint)
```

There is no test suite/runner configured in this project.

Package manager is **npm** (see `package-lock.json`) — don't use pnpm/yarn.

## Architecture

### Content pipeline (blog posts)

Posts live as Markdown files in `src/content/posts/*.md` with YAML frontmatter (`title`, `description`, `year`, `month`, `url`, `github`, `gif`, `colors`, `icon`, optional `sources`). mdsvex compiles them to Svelte components, so post bodies can import and use real components (e.g. `Link.svelte`) inline.

- [src/lib/services/postService.ts](src/lib/services/postService.ts) — `loadPosts()` globs all posts via `import.meta.glob`, maps frontmatter into `PostDTO`, and sorts by year/month descending. This is the single source of truth for post listing/ordering logic.
- [src/lib/dtos/PostDTO.ts](src/lib/dtos/PostDTO.ts) — shape posts are normalized into.
- Route loaders (`src/routes/+page.ts`, `src/routes/posts/+page.ts`, `src/routes/posts/[slug]/+page.ts`) call `loadPosts()` and/or dynamically `import()` the individual post's `.md` file. The `[slug]` loader also computes `previous`/`next` post navigation from the full sorted post list.
- `colors` in frontmatter is a comma-separated string, parsed into an array — used for the post's accent/gradient colors.
- Math support: `remark-math@3` (pinned, not latest — mdsvex bundles an older remark/unified internally) + `rehype-katex-svelte` (not plain `rehype-katex` — it must emit `{@html}` output so KaTeX's braces don't get parsed as Svelte template expressions). See comments in [svelte.config.js](svelte.config.js).

### Theming

Single-token CSS color system: the base tokens come from `@noahbaumgartner/svelte-ui/tokens.css` (imported in `+layout.svelte`), where every color is `color-mix()` between a `--base` and `--ink` variable. [src/routes/layout.css](src/routes/layout.css) only adds the site-specific inverse tokens on top. Light/dark mode is just swapping which of `--base`/`--ink` is white vs. near-black — components should always consume the semantic `--color-*` tokens (`--color-bg`, `--color-surface`, `--color-text`, `--color-border`, etc.), never raw hex values.

Theme selection is handled client-side by the library's `ThemeToggle`: it starts with the system theme (`prefers-color-scheme`), the button toggles between `light` and `dark`, and the choice is written to `document.documentElement.dataset.theme` and persisted in `localStorage('theme')`. Without a stored choice it keeps following the system.

There are also `--color-surface-inverse*` / `--color-on-inverse*` tokens for decorative panels that intentionally invert against the page background (footer, dark `Section` variant) regardless of current theme.

### Component structure

- **UI library**: all generic components (`Button`, `Link`, `Image`, `MeshGradient`, `ContextMenu`, `PreviewCard`, `Footer`, `Section`, `PageHeader`, `Timeline`, `TableOfContents`, `Lightbox`, `MediaPreview`, `ThemeToggle`, etc.; the library ships no icons, those come from `@lucide/svelte`) live in the `@noahbaumgartner/svelte-ui` package (separate repo at `../svelte-ui`). New generic components go there, not into this repo. Only portfolio-specific code stays here.
- `src/lib/sections/` — page-section-level components composed into routes (`HeroSection`, `AboutIntroSection`, `PostsPreviewSection`, `PostTitleSection`, `FooterSection`, etc.), portfolio-specific (DTO-aware) composition. The library's `Section` is the generic wrapper (padding/max-width/box + `light`/`dark` variant) most sections build on.
- Routes under `src/routes/` are thin: they load data in `+page.ts` and compose section components in `+page.svelte`.

Svelte 5 runes syntax is used throughout (`$props()`, `$state()`, `$derived()`), including snippets (`{#snippet ...}` / `{@render ...}`) for slot-like composition (see `Button.svelte`, `SiteHeader.svelte` usage in `+layout.svelte`).

### Styling conventions

- Tabs for indentation, single quotes, no trailing commas, 100 print width — enforced by Oxfmt (`fmt` block in `vite.config.ts`).
- Component-scoped `<style>` blocks per `.svelte` file; global overrides use `:global(...)`.
- Responsive breakpoints used consistently across components: `640px` (sm), `1024px` (lg).
