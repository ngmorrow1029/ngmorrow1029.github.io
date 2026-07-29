# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Astro 5 personal portfolio site for Nick Morrow, deployed to GitHub Pages at `https://ngmorrow1029.github.io`. No framework integrations (no React/Vue/Svelte) — pure Astro components with vanilla JS for client-side interactivity. Styling is SCSS, organized 7-1-style but loaded via the Sass `@use` module system with `_index.scss` barrels (see **Styles** below).

## Commands

All commands run from the repo root using npm:

- `npm run dev` — start the dev server at `localhost:4321`
- `npm run build` — production build to `./dist/`
- `npm run preview` — preview the production build locally
- `npm run check` — `astro check` (type-check Astro components)
- `npm run format` — run Prettier (configured for Astro + LF, no semicolons, double quotes, 2-space tabs, 120 cols)
- `npm run astro -- ...` — pass-through to the Astro CLI

There is no test suite — `astro check` is the only static verification.

## Architecture

### Routing (file-based)
- `src/pages/index.astro` — landing page (About Me + Experience + Education + Certifications)
- `src/pages/projects.astro` — embeds the `<ProjectTabs />` component
- `src/pages/contact.astro` — contact form. Wraps content in the same `<div class="bg-dark container">` shell the index/projects/skills pages use (with an additional `contact-page` class for padding). Form currently POSTs to a Google Apps Script endpoint — see **Contact form receiving options** below for the security/maintenance concerns and alternatives.
- `src/pages/skills/engineering.astro` — engineering skill portfolio (hero + 3-col card grid + anchor-linked examples)
- `src/pages/skills/videography.astro` — videography skill portfolio, same layout as engineering

### Layout
- `src/layouts/BaseLayout.astro` — the only layout. Accepts a `title` prop, imports `main.scss`, includes the global header (logo + nav-toggle button + `<nav class="primary-navigation">`), the `<slot />`, and a footer. Also contains the mobile nav-toggle script (DOMContentLoaded → toggles `.nav-open` on the nav and `aria-expanded` on the button).
- The nav holds six items: About Me, Resume (PDF, opens in new tab), **Engineering**, **Videography**, Projects, Contact Me. The mobile hamburger still works regardless of item count.

### Components
- `src/components/ProjectTabs.astro` — the only reusable component. Renders a tabbed panel of four projects with the second tab active by default. Contains the only nontrivial client-side JS: tab-switching (`data-tab-target` selectors) and a mobile hamburger toggle (`.nav-tabs-toggle` → `.nav-tabs-nav-tabs-open`). Class-name contract: `.tab-content`, `.nav-tabs`, `.tab__item`, `.tab-pane`, `.active`.

### Styles
- `src/styles/main.scss` uses **Sass modules**: `@use "abstracts"; @use "base"; @use "components"; @use "layout"; @use "pages";`. Each directory has a `_index.scss` barrel that `@forward`s its partials (`abstracts/_index.scss` → `variables`, `utility`; `base/_index.scss` → `reset`, `base`, `typography`; `components/_index.scss` → `container`, `navigation`, `tabs`; `layout/_index.scss` → `header`, `footer`, `grid`; `pages/_index.scss` → `home`, `projects`, `contact`, `skills`). To add a new partial, drop the file in its folder and add a `@forward "<name>";` line to the matching `_index.scss`.
- `src/styles/abstracts/_variables.scss` defines CSS custom properties on `:root` (colors `--clr-*`, font weights, font families — `Roboto`/`Source Code Pro`, font sizes, box-shadow).
- `BaseLayout.astro` imports `main.scss` once globally; do **not** re-import it in pages or components.
- External CDN stylesheets loaded from `BaseLayout.astro`: `normalize@7.0.0` and `font-awesome@5.11.2` (with SRI hash).

### Skill pages layout pattern
Both `src/pages/skills/*.astro` pages share a strict structure:

1. **`<div class="bg-dark container" id="top">`** — anchor target for the Back-to-Top link.
2. **`<section class="skills-hero">`** — full-width tinted band (no card border), centered title + subtitle + intro blurb. Padding `3rem 1.5rem 3rem` (equal top/bottom) with `margin-top: 1.5rem` so it breathes evenly below the page header. Distinct background (`--clr-dark-02`) to separate it visually from the cards row.
3. **`<div class="skills-cards">`** — CSS grid `repeat(3, 1fr)`, dropping to `repeat(2, 1fr)` at ≤60em and `1fr` at ≤961px. Holds category `<section class="skill-card grid-container">` cards, each with `<h2>` and `<ul class="skill-tags">` of `<a class="skill-tag">` anchors.
4. **`<section class="skills-examples">`** — one `<article class="example-block" id="example-<slug>">` per skill tag, each wrapping `.content-right` (image/embed left, description right at ≥60em; stacked below that). CSS `:target` and a JS `.is-targeted` class (added by the inline `<script>` at the bottom of each page for ~1.8s) highlight the matched example.
5. **`<div class="back-to-top">`** — fixed-position pill link to `#top` in the bottom-right corner. Hidden by default (`opacity: 0; pointer-events: none;`); only revealed once the user scrolls near the bottom of the page (see "Back-to-Top reveal" below).

**Wiring rule**: every `<a class="skill-tag" href="#example-<slug>">` MUST have a matching `id="example-<slug>"` on an `<article class="example-block">` in the same file. Slugs are stable — don't rename them without updating all anchors. When adding/removing skill tags, keep the href/id pairs in sync. Page-level styling lives in `src/styles/pages/_skills.scss`.

The inline `<script>` at the bottom of each skill page handles two things:
- **`preventDefault` + `scrollIntoView({behavior:'smooth'})` + transient `.is-targeted` class** on click of any `.skill-tag`. Pure CSS `:target` only flashes while the hash matches; the script extends the highlight so users can see it after the scroll completes.
- **Back-to-Top reveal via `IntersectionObserver`**. The script observes `<footer>` (the global site footer in `BaseLayout.astro`) with `rootMargin: "0px 0px 100% 0px"`. The positive bottom rootMargin extends the observer's effective root one viewport below the viewport itself, so the button only reveals once the footer enters that band — i.e. once the user is near the bottom of the page. There's no per-page sentinel; the footer IS the sentinel. If you need to move this logic elsewhere, change `document.body.classList.toggle("has-scrolled", entry.isIntersecting)` — that's the single source of truth that flips the button on/off.

### Static assets
- `public/` — root-level static assets served as-is. Project subdirs: `assets/images/`, `assets/docs/` (resume PDF), `assets/js/` (form-submission-handler.js used by the contact page).
- Favicons at `public/`: `favicon.ico`, `favicon.svg`, and a leftover `Astro-favicon.ico` from the starter template.

### Deployment
- `.github/workflows/deploy.yml` builds on push to `Master` using `withastro/action@v2` (Node 20, npm), then deploys via `actions/deploy-pages@v4` to GitHub Pages. Triggering the workflow manually is supported via `workflow_dispatch`.
- `site: https://ngmorrow1029.github.io` is set in `astro.config.mjs` (no `base` configured, so it deploys from the root path).

### TypeScript
- `jsconfig.json` extends the auto-generated `./.astro/tsconfig.json` and includes all files of the project. Inferred types via the Astro CLI.
- **Note**: `.astro` side-effect imports (e.g. `import "../styles/main.scss"` in `BaseLayout.astro`) and `../layouts/BaseLayout.astro` from page files produce harmless `Cannot find module` TS diagnostics in some IDE setups. They're false positives — the build works because Vite/Astro resolves them at build time. Don't try to "fix" them by adding `.d.ts` shims unless a real compile error appears.

### Layout primitives
- **Sticky footer**: `body` is a flex column with `min-height: 100vh`, and `main { flex: 1 0 auto; }` lets `<main>` fill any leftover viewport height. Footer therefore always sits at the bottom of the screen on short pages, with no gap below it. Rules live in `src/styles/base/_base.scss`.
- **`.bg-dark.container`** — the canonical content shell. Used by `index.astro`, `projects.astro` (via `<ProjectTabs />`), and both `skills/*.astro` pages; the `contact.astro` page also uses it with an additional `.contact-page` class for extra padding. Every page that wants the dark card treatment should use this shell — don't invent a new wrapper.

### Contact form receiving options
Current setup: `contact.astro` POSTs to a public Google Apps Script web-app URL that appends to a Google Sheet. Trade-offs and alternatives:

- **Current (Google Apps Script)**: free, no server, but the URL is a bearer token — anyone with it can POST spam, and email notifications require installing a separate trigger. The Apps Script URL also shows up in the page source. Rotate it if it leaks. Most portfolio-scale form traffic fits in the free quota, but Google may rate-limit at any time.
- **FormSubmit (https://formsubmit.co)**: drop-in replacement. Change the form's `action` to `https://formsubmit.co/your@email.com`. Zero accounts, free, forwards submissions to your email with spam filtering and a honeypot field. Fastest path if you want to keep the form but remove the Apps Script.
- **Formspree / Getform / Basin**: same idea, but with a dashboard, webhooks, and a free tier (Formspree 50/mo, Basin 100/mo). Reasonable if you want to see submissions without checking email.
- **Cloudflare Pages Function + Turnstile**: more setup, but free, fully owned, no third party. A small `functions/submit.ts` accepts the POST, validates Turnstile, and forwards to Resend/Mailgun. Reuses the same GitHub Pages → Cloudflare Pages pipeline. Best long-term option if you expect more than occasional traffic or want a branded "thank you" page.
- **Plain `mailto:`**: replace the form with an `<a href="mailto:…">`. Zero infrastructure, zero spam surface, but doesn't work for users without a configured mail client and breaks the "type your message in the form" UX.

**Recommendation for a personal portfolio**: FormSubmit for now (5-minute migration, no account), then Cloudflare Pages Function + Turnstile if/when traffic justifies it. The current Apps Script URL in the file should be rotated because the deployment URL is public.

### Editor settings
- `.vscode/settings.json` disables CSS validation (since the project uses SCSS), enables bracket pair colorization, and turns on format-on-save. No language-server lint configs are present.
