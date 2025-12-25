# Casino Mobile (Vite + Vue 3 + TSX)

Mobile-first Vue 3 shell using TSX (JSX) components, designed to scale into a casino website.

## Setup (npm)

```sh
npm install
npm run dev
```

Dev server: http://localhost:5173

## TSX support

This project enables TSX via:

- `@vitejs/plugin-vue-jsx`
- TypeScript options in `tsconfig.app.json`: `jsx: preserve` and `jsxImportSource: vue`

## Recommended structure (scalable)

```text
src/
	assets/
		images/
		icons/
	components/
		ui/        # shared primitives (buttons, cards, modals)
		casino/    # domain components (game tiles, bet controls)
	layouts/
		MobileLayout.tsx
	pages/
		Home.tsx
		Games.tsx
		Wallet.tsx
	router/
		index.ts
	services/    # API clients (future)
	stores/      # state (future)
	styles/
		base.css
		mobile.css
	types/       # shared TS types (future)
	utils/       # helpers (future)
	App.tsx
	main.ts
```

## Best practices for a mobile casino UI

- Mobile-first: design for ~360–430px widths first.
- Performance: keep animations light; lazy-load pages (router uses dynamic imports).
- Separation of concerns: API in `services/`, state in `stores/`, UI in `components/`.
- Routing: keep page-level code in `pages/` and reuse layouts.

## Emerald reference port

The React-based reference design in `reference/emerald/` has been ported into Vue TSX components under:

- `src/components/casino/` (Navbar, Hero, grids, CTA, support, footer)
- `src/pages/Home.tsx` (composes all sections in one file)

Styling uses Tailwind (see `tailwind.config.js`, `postcss.config.js`, and `src/styles/tailwind.css`).
