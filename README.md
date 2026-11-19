# Dobis Admin

Admin dashboard built with **React 19**, **Vite**, **Tailwind CSS v4** and **React Router 7**.

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build -> dist/
npm run preview   # serve the production build
npm run lint
```

With `VITE_USE_MOCK=true` in `.env`, the app runs fully on mock data. Log in with:

- **Email:** `admin@dobis.com`
- **Password:** `admin123`

Set `VITE_USE_MOCK=false` and `VITE_API_BASE_URL` to connect a real backend.

## Folder structure

```
.github/            CI workflow (lint + build)
.vscode/            Editor settings and recommended extensions
lib/                Framework-agnostic helpers (cn = clsx + tailwind-merge)  -> import from '@lib/...'
public/             Static files copied as-is (favicon, .htaccess)
src/
  assets/           Images, icons, fonts
  components/       Shared components
    ui/             Button, Input, Card, Badge, Modal, DataTable, StatCard, ...
    CrudPage.jsx    Generic list / add / edit / delete screen
    ProtectedRoute.jsx
  config/           Environment config (env.js)
  constants/        App-wide constants: routes, sidebar navigation, storage keys
  features/         One folder per business feature
    <feature>/
      api/          API calls for this feature
      components/   Components used only by this feature
      constants/    Mock data, form fields, options
      pages/        Route-level pages
      utils/        Feature-specific helpers
  hooks/            Shared hooks (useFetch, useDebounce, useDisclosure)
  layout/           DashboardLayout (sidebar + header)
  pages/            Pages outside any feature (404)
  router/           Route definitions (router.jsx)
  services/         Axios client, CRUD API factory, localStorage wrapper
  utils/            Formatters and generic helpers
  App.css           Tailwind import + theme tokens (brand colours)
  App.jsx
  main.jsx
```

## Adding a new feature

1. Copy `src/features/sample-feature (copy me)` and rename it (e.g. `src/features/vendors`).
2. Rename `Sample` / `Samples` identifiers inside, and update the endpoint in `api/`.
3. Add a route in `src/constants/routes.js`, a sidebar entry in `src/constants/navigation.js`,
   and register the page in `src/router/router.jsx`.

## Styling

Tailwind v4 is configured through `@tailwindcss/vite`; there is no `tailwind.config.js`.
Theme tokens live in the `@theme` block in `src/App.css`. Change `--color-brand-*` there to re-brand the whole app.

## Deployment (Apache / cPanel)

`npm run build`, then upload the contents of `dist/`. The `.htaccess` in `public/` is copied into `dist/`
and rewrites every route to `index.html` so client-side routing works on refresh.
