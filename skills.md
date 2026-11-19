# Project conventions

Guidelines for anyone (human or AI assistant) working on this codebase.

## Stack
- React 19 + Vite, JavaScript (JSX), no TypeScript
- Tailwind CSS v4 (`@import 'tailwindcss'` in `src/App.css`, tokens in `@theme`)
- React Router 7 (`createBrowserRouter` in `src/router/router.jsx`)
- Axios via `src/services/apiClient.js`; icons from `lucide-react`

## Rules
- Feature code lives in `src/features/<feature>/{api,components,constants,pages,utils}`.
  Only move code to `src/components`, `src/hooks` or `src/utils` once a second feature needs it.
- Import with aliases: `@/` = `src/`, `@lib/` = `lib/`. Avoid long `../../` chains across folders.
- Style only with Tailwind utility classes. Merge conditional classes with `cn()` from `@lib/cn`.
- Use the brand palette (`brand-50` ... `brand-800`) for primary actions instead of hard-coded colours.
- Reuse UI primitives from `@/components/ui` (Button, Input, Card, Badge, Modal, DataTable, ...).
- Every API module must work with `VITE_USE_MOCK=true`; use `createCrudApi(endpoint, mockData)` for REST resources.
- Pages are default exports named `<Name>Page.jsx`; components are PascalCase `.jsx`; helpers are camelCase `.js`.
- New route = constant in `constants/routes.js` + sidebar item in `constants/navigation.js` + entry in `router/router.jsx`.
