# Dobis UI/UX concept

## Positioning: less juggling, more growing

Dobis is a connected home for the work of running a business. Its audience is an owner, operator, or team lead evaluating tools across sales, finance, operations, and people. The website explains the platform while making a single product easy to find.

The primary journey is **understand → discover a product → explore the workspace → assemble a suite**. It ends with a local demo selection. Actual product inventory and commercial terms need company validation before launch.

## Reference synthesis

- [Odoo](https://www.odoo.com/): the user's requested multi-app ecosystem informs the architecture. The live site timed out, so its current layout was not verified.
- [Zoho](https://www.zoho.com/): the retrieved site presents individual applications alongside a unified business suite. Dobis uses progressive product discovery and a Dobis One proposition.
- [Auxia](https://www.auxia.io/): the retrieved content pairs its proposition with workflows and a connected platform story. Dobis translates that narrative into a lead-to-invoice-to-project journey.

Browser capture was blocked. This is an original design inspired by the brief, not a pixel-matched recreation or a verified reproduction of Auxia's animation choreography. No reference logos, customer testimonials, or performance claims were copied.

## Information architecture

| Surface | Visitor question | Content and action |
| --- | --- | --- |
| Home hero | What is Dobis for? | Benefit, interactive preview, products/demo CTAs |
| Products | Which tool fits my need? | Categories, search, six product cards |
| Dobis One | Why combine the tools? | Shared foundation and suite builder |
| Solutions | How does work connect? | Lead → invoice → onboarding story |
| Pricing | What buying model could fit? | Three illustrative plans, billing toggle |
| FAQs | What is real in this demo? | Product and prototype boundaries |
| Product detail | What does this app do? | Outcome, capabilities, related products, demo |
| Workspace | How would daily work feel? | Interactive local business records |

Main navigation: Products, Solutions, Why Dobis, Pricing. The desktop product disclosure exposes app names and categories. Mobile navigation is a click-controlled panel. Footer links resolve to implemented pages or sections.

## Homepage composition

1. Ink announcement strip introduces Dobis One.
2. Asymmetric hero: large benefit-led typography on the left; a functioning React preview on the right. One italic serif accent softens the business tone.
3. A domain rail communicates breadth without invented client logos.
4. A three-column desktop catalog makes product discovery concrete; category and keyword filters combine.
5. The suite section pairs the six apps with shared-context benefits and a selection dialog.
6. A dark workflow section changes visual rhythm and explains a three-step business journey through scrolling.
7. Pricing presents three proposed packages and explicit monthly/yearly costs.
8. Native FAQ disclosures answer questions without navigation overhead.
9. A violet closing block returns to one clear action: build a suite.

## Visual system

| Token | Value | Purpose |
| --- | --- | --- |
| Ink | #24232D | Main text, dark workflow, secondary CTA |
| Paper | #F8F7FA | Quiet backgrounds |
| White | #FFFFFF | Cards, dialogs, workspace surfaces |
| Brand 600 | #7245B6 | Primary actions |
| Brand 50 | #F4F0FF | Selection and soft emphasis |
| Muted | #6C6A77 | Supporting copy |
| Line | #E8E6ED | Borders |
| Lime | #D6F58A | Small accents on ink |

Typography: Inter when available, then Segoe UI/system fallbacks; Georgia for the editorial accent. No external font request is needed. Hero type is fluid at roughly 53–80px; section headings 36–48px; body 14–18px. Tight heading tracking contrasts with relaxed body leading.

Layout: 1280px outer maximum, 20px mobile and 40px desktop gutters, mostly 80–112px section spacing. Pill buttons, 12–24px surface radii, fine borders, and restrained shadows. Lucide icons identify actions and products; labels accompany colors. The working interface supplies the hero visual rather than decorative stock imagery.

## Responsive rules

- Small: one-column hero, compact preview, stacked product/pricing cards, horizontal workspace navigation.
- Medium: two-column product grid, three-step workflow, readable tasks and controls.
- Desktop: two-column hero/suite, three-column catalog, full product menu, workspace sidebar.
- Invoice tables scroll inside their own container. Product filters wrap. Mobile controls do not depend on hover.
- Sticky-header offsets keep anchor targets visible.

## Motion system

| Element | Owner | Behavior |
| --- | --- | --- |
| Section entrance | Framer Motion | 22px reveal, 600ms, once per view |
| Product menu | Framer Motion | Opacity and 8px entrance |
| Workspace/preview switch | Framer Motion | 150–200ms opacity transition |
| Product hover | Tailwind | 4px lift and border/shadow feedback |
| Workflow story | GSAP ScrollTrigger | 38px card movement and scroll progress line |
| Anchors | Browser | Smooth scrolling with header offset |

Framer Motion owns component transitions; GSAP owns only workflow cards/progress. The libraries do not animate the same element's transform. GSAP scopes selectors to the section and reverts on unmount. Its scroll effects require width ≥768px and `prefers-reduced-motion: no-preference`. App-level `MotionConfig reducedMotion="user"`, `useReducedMotion`, and CSS rules suppress nonessential movement. No scroll hijacking or infinite loops.

References: [Motion accessibility](https://motion.dev/docs/react-accessibility), [GSAP matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/).

## Interaction flows

**Product discovery:** choose category/type keyword → card → details → demo. Empty results provide Reset filters.

**Suite building:** select products → see summed illustrative per-user monthly price → save locally → confirmation and demo link. Zero selection disables saving. Storage errors remain visible. No account/subscription is created.

**Connected work:** CRM → create fictional deal → mark Won → Books receives pending invoice → Projects receives onboarding task → mark paid/complete → Overview totals update. Reopening/re-winning is idempotent. Reopening preserves financial/project records.

**Pricing:** switching billing periods changes prices and commitments together. The proposed $49 Dobis One monthly price becomes $39.20/month or $470.40/user billed yearly, a 20% reduction. Suite-builder a-la-carte prices are a separate illustrative model, not the Essentials package.

**Recovery:** unknown routes/products show 404; render/loading errors provide reload; malformed storage falls back with a warning; blocked storage permits session use. New-deal fields validate required text and finite positive amounts.

## Accessibility

Semantic landmarks, one main heading per page, skip links, visible keyboard focus, native controls, descriptive links, required-field labels, and live status/error announcements. Native modal dialog contains focus, supports Escape, and restores trigger focus on cleanup. Selection uses `aria-pressed`; menu expansion and current navigation are exposed. Essential meaning never depends on animation or color alone.

Contrast, screen-reader behavior, and touch targets require a manual audit before production. Tiny labels are confined to secondary preview metadata. No fake testimonials, security certifications, submitted forms, or real payment confirmations appear.

## Manual QA checklist

1. Inspect 360px, 768px, 1280px, and 1440px: overflow, typography, table scrolling, sticky offsets.
2. Keyboard through navigation, products, pricing, FAQs, and dialogs. Check modal containment and focus restoration.
3. Enable reduced motion; verify no scroll-scrub movement and all content remains usable.
4. Verify menu outside/Escape dismissal, mobile touch navigation, and browser back/forward.
5. Create/win a deal, inspect invoice/task, reopen/re-win, check no duplicates, reload to confirm persistence.
6. Test blocked storage, corrupt JSON, no search results, deep-link refresh, and invalid routes.
7. Use a screen reader, audit contrast, check 200% zoom and text resizing.
8. Measure Lighthouse/Core Web Vitals on the deployment target and validate all company content.

Visual and browser-interaction QA was not completed in this session due to computer-use URL-verification safeguards.
