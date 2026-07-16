# Temima Cabinets — Modern Cabinet Atelier prototype

This project is a complete, responsive front-end redesign of the Temima Cabinets customer journey. It covers discovery, guided catalog browsing, product configuration, a four-step free-design request, persistent cart editing, guest checkout simulation, and confirmation states.

## Technology

- Semantic HTML generated from small reusable JavaScript modules
- Modern CSS with custom properties and separate responsive rules
- Lightweight vanilla JavaScript for routing, forms, catalog state, cart, checkout, dialogs, drawers, and analytics
- Vite for development and production bundling
- Playwright for multi-viewport browser QA and screenshots
- Local source fonts and images; no runtime font, image, UI-library, or animation dependency

Vite + vanilla JavaScript was selected because it provides a fast local workflow and production build while keeping the markup, data, CSS, and behavior straightforward to translate into Elementor sections, WooCommerce templates, and child-theme assets.

## Run locally

From Windows CMD:

```bat
cd /d "C:\Users\Admin\Desktop\W\Freelance & bot\contests\1\Modern WordPress Ecommerce Redesign\temima-modern-redesign"
npm install
npm run dev
```

Open the local URL Vite prints, normally `http://localhost:5173`.

Production build and preview:

```bat
npm run build
npm run preview
```

Browser QA requires the dev server on port 4173:

```bat
npm run dev -- --port 4173
npm run qa
```

The npm scripts invoke Vite through Node directly. This avoids a Windows `.cmd` path-resolution problem caused by the `&` character in the parent folder name.

## Main routes

- `/` — Home
- `/shop/white-shaker-cabinets` — Category/catalog
- `/product/white-shaker-base-cabinet` — Representative product detail
- `/free-3d-kitchen-design` — Four-step design request
- `/cart` — Persistent cart
- `/checkout` — Guest checkout simulation
- `/order-confirmation` — Order success state
- `/quote-confirmation` — Design-request success state

Catalog filters are reflected in query parameters, for example `/shop/white-shaker-cabinets?type=base&width=18`.

## Directory structure

```text
temima-modern-redesign/
├─ index.html                  Document shell and global metadata
├─ public/assets/              Optimized/reused source assets and local fonts
├─ scripts/qa.mjs              Playwright journey and viewport QA
├─ src/
│  ├─ app.js                   Router, metadata, schemas, global interactions
│  ├─ components.js            Header, footer, cards, FAQ, trust and CTA components
│  ├─ data.js                  Products, categories, FAQs, contact and content data
│  ├─ icons.js                 Lightweight inline SVG icon system
│  ├─ store.js                 Cart, form persistence and analytics abstraction
│  ├─ styles.css               Core design system and page styling
│  ├─ responsive.css           Tablet, mobile, large-screen and reduced-motion rules
│  └─ pages/                   Route-specific templates and interactions
├─ preview/screenshots/        Desktop/mobile screenshots for required page types
├─ DESIGN_SYSTEM.md
├─ SOURCE_AUDIT.md
├─ WORDPRESS_HANDOFF.md
└─ QA_REPORT.md
```

## Functional coverage

- Sticky desktop header, accessible mega-menu, search dialog, mobile drawer, and cart count
- Category filters, active chips, clear-all, sorting, result count, URL state, mobile filter dialog, empty and loading states
- Product thumbnails, swipe behavior, expanded image dialog, dimension diagram, variation availability, dynamic price/SKU, ZIP treatment, quantity, Add to Cart, Buy Now, and mobile purchase bar
- Four quote steps with progress, local persistence, conditional input, inline validation, error summary, drag/drop, camera/file inputs, previews, removal, loading, and confirmation
- `localStorage` cart with variations, quantities, removal, option editing, demo coupon state, fulfillment treatment, empty state, and responsive summaries
- Guest-first checkout with optional login/account treatments, delivery/pickup choices, address, shipping method, test payment success/error, billing choice, validation, order review, and confirmation
- Privacy-aware local analytics events in `window.temimaAnalytics`

## Assets and data

The supplied static imagery and branding in `public/assets` was copied from `old.zip`; the source ZIP and PDF remain untouched. The final kitchen, logo, process imagery, product renders, and payment marks are reused. The hero background combines the supplied kitchen still with three original landscape kitchen scenes generated for this prototype, rendered through a lightweight 1600ms cinematic canvas cross-fade. The Pexels video asset from an earlier treatment remains locally documented but is not active in the current hero. See `SOURCE_AUDIT.md` for the complete mapping, generation disclosure, source link, license note, and factual-confidence notes.

The snapshot did not include a WooCommerce product export, prices, SKU table, product-level construction specifications, or a reliable variation matrix. Catalog prices/SKUs/attribute combinations are therefore labeled prototype data throughout the interface and must be replaced by the approved WooCommerce catalog before production.

## Analytics

`src/store.js` exposes a small `track(event, data)` abstraction. Events are stored in `window.temimaAnalytics` and logged in development. Personal form fields are filtered out. Production can forward the same normalized events to `dataLayer`, GA4, Meta, or another consent-aware analytics layer.

## Deployment

### Vercel

1. Import the project directory into Vercel.
2. Framework preset: Vite.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Deploy. `vercel.json` provides SPA route rewrites and immutable asset caching.

### Other static hosting

Run `npm run build`, publish `dist`, and configure unknown application routes to fall back to `index.html`. Do not cache the HTML shell indefinitely.

## Known limitations

- No live WordPress, WooCommerce, CRM, shipping, tax, inventory, payment, account, email, or file-storage endpoint is connected.
- Test checkout amounts are explicitly marked as prototype calculations and no charge is made.
- Product data must be reconciled with a WooCommerce export.
- Testimonials came from the legacy snapshot and remain labeled verification pending.
- Current warranty, return, shipping, delivery-damage, pickup, installation, and design-response terms require client approval; the supplied source contains conflicts.
- Only one supplied finished-kitchen photograph was suitable for editorial use, so project-gallery detail crops are intentionally disclosed as a single source kitchen.

See `WORDPRESS_HANDOFF.md` for production mapping and `QA_REPORT.md` for verification evidence.
