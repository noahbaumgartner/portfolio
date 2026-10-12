# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Noah Baumgartner's personal portfolio site: SvelteKit 5 + TypeScript, content-driven blog posts written in Markdown (via mdsvex), deployed to Vercel. German-language content.

## Commands

```bash
npm run dev             # start dev server (vite)
npm run build           # production build
npm run preview         # preview production build
npm run check           # svelte-kit sync + svelte-check (type checking)
npm run check:watch     # type checking in watch mode
npm run format          # prettier --write .
npm run lint            # prettier --check . && eslint .
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

Theme selection (`light` / `dark` / `system`) is handled client-side in [ThemeToggle.svelte](src/lib/components/primitives/theme-toggle/ThemeToggle.svelte): explicit choices are written to `document.documentElement.dataset.theme` and persisted in `localStorage('theme')`; `system` removes the override and falls back to `prefers-color-scheme`.

There are also `--color-surface-inverse*` / `--color-on-inverse*` tokens for decorative panels that intentionally invert against the page background (footer, dark `Section` variant) regardless of current theme.

### Component structure

- **UI library**: generic components (`Button`, `Link`, `Image`, `MeshGradient`, `ContextMenu`/`ContextMenuItem`, `PreviewCard`, `Entry`, `Footer`/`FooterColumn`; the library ships no icons, those come from `@lucide/svelte`) come from the `@noahbaumgartner/svelte-ui` package — use it wherever it covers a need instead of writing a local component. Only add something to `primitives/` when the package has no equivalent.
- `src/lib/components/primitives/` — local base components the package doesn't provide (`Tag`, `TableOfContents`, `Section`). Keep components in here free of portfolio-specific business logic (no post/DTO imports, no hardcoded site copy or routes); they should only depend on the `--color-*` design tokens and generic props. Portfolio-specific composition belongs in `sections/` instead.
  - Each component gets its own subfolder (kebab-case, named after the component), e.g. `section/Section.svelte`. New `primitives/` components should be created as `primitives/<component-name>/<ComponentName>.svelte`, with any sub-parts alongside it in the same folder, rather than as flat files directly in `primitives/`.
- `src/lib/components/features/` — self-contained, stateful widgets composed from `primitives/` that aren't generic enough to live there (they own specific interaction behavior) but also aren't a page-section or portfolio-content composition, e.g. `theme-toggle/ThemeToggle` (light/dark/system switching), `lightbox/Lightbox` (image overlay), `media-preview/MediaPreview` (video/gif/image with play-pause toggle), `post-preview/PostPreview` (post card, DTO-aware, wraps the library's `PreviewCard`). Same one-subfolder-per-component convention as `primitives/`.
- `src/lib/components/navigation/` — site-specific navigation pieces (`SiteHeaderLogo`); the header bar itself is the library's `Navbar`, composed in `src/routes/+layout.svelte`.
- `src/lib/components/sections/` — page-section-level components composed into routes (`HeroSection`, `AboutIntroSection`, `PostsPreviewSection`, `PostTitleSection`, `FooterSection`, etc.), portfolio-specific (DTO-aware) composition. `Section` (in `primitives/`) is the generic wrapper (padding/max-width/box + `light`/`dark` variant) most sections build on.
- Routes under `src/routes/` are thin: they load data in `+page.ts` and compose section components in `+page.svelte`.

Svelte 5 runes syntax is used throughout (`$props()`, `$state()`, `$derived()`), including snippets (`{#snippet ...}` / `{@render ...}`) for slot-like composition (see `Button.svelte`, `SiteHeader.svelte` usage in `+layout.svelte`).

### Styling conventions

- Tabs for indentation, single quotes, no trailing commas, 100 print width — enforced by Prettier (`.prettierrc`, `prettier-plugin-svelte`).
- Component-scoped `<style>` blocks per `.svelte` file; global overrides use `:global(...)`.
- Responsive breakpoints used consistently across components: `640px` (sm), `1024px` (lg).
