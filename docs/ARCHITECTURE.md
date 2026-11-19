# Frontend architecture and expansion

## Current boundaries

The React/Vite/JavaScript starter now contains three domains: `home`, `products`, and `workspace`. Routes choose pages; feature components own domain composition; shared UI owns primitives. The existing `lib/turtle-ui` requires packages absent from the starter, so dependency-free primitives under `src/components/ui` serve this app while preserving that library.

`products.js` is the catalog source of truth for identifiers, copy, categories, icons, proposed features, and illustrative prices. Header, product pages, cards, related products, and suite selection consume it.

`workspace.js` holds pure validation and business transitions. `useWorkspace` adapts browser persistence. `WorkspacePage` derives totals from the same records rather than storing duplicate metrics. Invalid stored data is rejected. Product/workspace routes and the suite dialog load lazily. Tailwind tokens live in `App.css`.

## Routes

| Route | Responsibility |
| --- | --- |
| / | Marketing discovery |
| /#products, /#suite, /#solutions, /#pricing, /#faq | Homepage sections |
| /products/:slug | Six data-driven detail pages |
| /workspace?app=overview | Shared business summary |
| /workspace?app=crm | Deals, search, stage changes |
| /workspace?app=books | Invoices and sample payment status |
| /workspace?app=projects | Tasks and completion |
| Unknown route/product | 404 recovery |

## Recommended structure as modules grow

```text
src/
  app/                          Providers and app configuration
  components/ui/                Shared design system
  layout/                       Marketing and workspace shells
  features/
    crm/{api,components,pages,hooks,utils}/
    finance/{api,components,pages,hooks,utils}/
    projects/{api,components,pages,hooks,utils}/
    people/{api,components,pages,hooks,utils}/
    support/{api,components,pages,hooks,utils}/
    campaigns/{api,components,pages,hooks,utils}/
    catalog/{constants,components,pages}/
    auth/{api,components,pages,hooks}/
    billing/{api,components,pages,hooks}/
  services/                     API, telemetry, storage adapters
  hooks/                        Hooks shared across domains
  constants/                    Routes and stable identifiers
  router/                       Lazy routes and access boundaries
```

These future directories are a roadmap, not empty scaffolding. Split the combined demo workspace when modules acquire real complexity. Keep state local to its owner; add server-state caching when APIs exist. TypeScript can be introduced at API/catalog contracts without redesigning the UI.

## Adding a product

1. Add a unique entry to `features/products/constants/products.js`.
2. Add its icon/tone to `ProductIcon.jsx` if needed. Keep complete Tailwind utility names in source.
3. Verify detail page, navigation, filters, related products, and suite pricing.
4. Add a business module only when actual behavior is implemented. A marketing detail page is not a complete SaaS module.

## Production API roadmap — not implemented

| Domain | Example endpoint | Server responsibility |
| --- | --- | --- |
| Identity | /api/session, /api/organizations | Authentication, tenants, membership, roles |
| CRM | /api/deals/:id/stage | Authorized validation, version conflicts |
| Finance | /api/invoices/:id/payments | Ledger integrity, currency, reconciliation |
| Projects | /api/tasks/:id | Assignment, permissions, status history |
| Billing | /api/subscriptions, /api/entitlements | Real pricing, access, payment webhooks |
| Workflows | Event/outbox consumers | Idempotency, retries, auditing |

Use stable organization/customer IDs across modules. Tenant isolation must be enforced on the server. Production money should use integer minor units or decimals, not display-oriented JS arithmetic. The demo's Won → invoice/task transition becomes a server-owned event flow with idempotency, transactions/outbox, audit history, and appropriate review states. Recording a payment must remain distinct from capturing one.

Use secure sessions, authorization, appropriate CSRF defenses, validation, rate limiting, and audit logs. Never put secrets into public `VITE_*` environment variables. Replace localStorage business persistence with authenticated APIs. The starter `.env` was not changed and is not used by this demo.

## Delivery phases

1. Validate brand, audience, real products, localization, and prices.
2. Complete visual/accessibility/performance QA and prerender or SSR public routes for SEO/share metadata.
3. Implement identity/organizations/roles plus the first production module, with asynchronous loading/error patterns.
4. Connect finance/projects through durable shared IDs and server workflows; add scoped integrations.
5. Deliver People, Desk, Campaigns, subscription billing, support operations, and compliance controls as independently validated modules.

## Verification

`tests/workspace.test.js` covers record creation, immutability, duplicate prevention, invalid transitions, input constraints, and stored-schema rejection. `scripts/verify-render.mjs` compiles and renders all products, workspace views, and 404 states. The production build validates bundling.

Render tests do not prove browser effects, modal focus, localStorage reload, scroll behavior, responsive layout, or screen-reader support. Use the UI/UX document's manual checklist. This deliverable is frontend-only and has not been published.
