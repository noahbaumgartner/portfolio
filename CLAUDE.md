# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Noah Baumgartner's personal portfolio site: SvelteKit 5 + TypeScript, content-driven blog posts written in Markdown (via mdsvex), deployed to Vercel. German-language content.

## Commands

```bash
pnpm dev            # start dev server (vite)
pnpm build           # production build
pnpm preview         # preview production build
pnpm check           # svelte-kit sync + svelte-check (type checking)
pnpm check:watch     # type checking in watch mode
pnpm format          # prettier --write .
pnpm lint            # prettier --check . && eslint .
```

There is no test suite/runner configured in this project.

Package manager is **pnpm** (see `pnpm-lock.yaml` / `pnpm-workspace.yaml`) — don't use npm/yarn.

## Architecture

### Content pipeline (blog posts)

Posts live as Markdown files in `src/content/posts/*.md` with YAML frontmatter (`title`, `description`, `year`, `month`, `url`, `github`, `gif`, `colors`, `icon`, optional `sources`). mdsvex compiles them to Svelte components, so post bodies can import and use real components (e.g. `Link.svelte`) inline.

- [src/lib/services/postService.ts](src/lib/services/postService.ts) — `loadPosts()` globs all posts via `import.meta.glob`, maps frontmatter into `PostDTO`, and sorts by year/month descending. This is the single source of truth for post listing/ordering logic.
- [src/lib/dtos/PostDTO.ts](src/lib/dtos/PostDTO.ts) — shape posts are normalized into.
- Route loaders (`src/routes/+page.ts`, `src/routes/posts/+page.ts`, `src/routes/posts/[slug]/+page.ts`) call `loadPosts()` and/or dynamically `import()` the individual post's `.md` file. The `[slug]` loader also computes `previous`/`next` post navigation from the full sorted post list.
- `colors` in frontmatter is a comma-separated string, parsed into an array — used for the post's accent/gradient colors.
- Math support: `remark-math@3` (pinned, not latest — mdsvex bundles an older remark/unified internally) + `rehype-katex-svelte` (not plain `rehype-katex` — it must emit `{@html}` output so KaTeX's braces don't get parsed as Svelte template expressions). See comments in [svelte.config.js](svelte.config.js).

### Theming

Single-token CSS color system in [src/routes/layout.css](src/routes/layout.css): every color is `color-mix()` between a `--base` and `--ink` variable. Light/dark mode is just swapping which of `--base`/`--ink` is white vs. near-black — components should always consume the semantic `--color-*` tokens (`--color-bg`, `--color-surface`, `--color-text`, `--color-border`, etc.), never raw hex values.

Theme selection (`light` / `dark` / `system`) is handled client-side in [ThemeToggle.svelte](src/lib/components/ui/ThemeToggle.svelte): explicit choices are written to `document.documentElement.dataset.theme` and persisted in `localStorage('theme')`; `system` removes the override and falls back to `prefers-color-scheme`.

There are also `--color-surface-inverse*` / `--color-on-inverse*` tokens for decorative panels that intentionally invert against the page background (footer, dark `Section` variant) regardless of current theme.

### Component structure

- `src/lib/components/ui/` — generic reusable primitives (`Button`, `Link`, `Image`, `Tag`, `ThemeToggle`, `TableOfContents`, `context-menu/*`). This directory is intended to grow into a standalone UI framework/component library usable in other, non-portfolio web apps — not just this site. Keep components in here free of portfolio-specific business logic (no post/DTO imports, no hardcoded site copy or routes); they should only depend on the `--color-*` design tokens and generic props. Portfolio-specific composition belongs in `sections/` instead.
  - Each component gets its own subfolder (kebab-case, named after the component), following the `context-menu/` example (`context-menu/ContextMenu.svelte` + `context-menu/ContextMenuItem.svelte`). New `ui/` components should be created as `ui/<component-name>/<ComponentName>.svelte`, with any sub-parts alongside it in the same folder, rather than as flat files directly in `ui/`. Existing flat components (`Button.svelte`, `Link.svelte`, etc.) predate this convention — follow it for new components and feel free to migrate old ones opportunistically.
- `src/lib/components/navigation/` — site header components.
- `src/lib/components/sections/` — page-section-level components composed into routes (`HeroSection`, `AboutIntroSection`, `PostsPreviewSection`, `PostTitleSection`, `FooterSection`, etc.). `Section.svelte` is the generic wrapper (padding/max-width/box + `light`/`dark` variant) most sections build on.
- Routes under `src/routes/` are thin: they load data in `+page.ts` and compose section components in `+page.svelte`.

Svelte 5 runes syntax is used throughout (`$props()`, `$state()`, `$derived()`), including snippets (`{#snippet ...}` / `{@render ...}`) for slot-like composition (see `Button.svelte`, `SiteHeader.svelte` usage in `+layout.svelte`).

### Styling conventions

- Tabs for indentation, single quotes, no trailing commas, 100 print width — enforced by Prettier (`.prettierrc`, `prettier-plugin-svelte`).
- Component-scoped `<style>` blocks per `.svelte` file; global overrides use `:global(...)`.
- Responsive breakpoints used consistently across components: `640px` (sm), `1024px` (lg).
