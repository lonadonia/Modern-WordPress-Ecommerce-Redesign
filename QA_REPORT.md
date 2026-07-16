# QA report

- QA date: 2026-07-16
- Environment: local Vite server, headless Chromium via Playwright
- Primary evidence: `preview/qa-results.json` and `preview/screenshots/`

## Routes tested

- `/`
- `/shop/white-shaker-cabinets`
- `/product/white-shaker-base-cabinet`
- `/free-3d-kitchen-design`
- `/cart`
- `/checkout`
- `/quote-confirmation`
- `/order-confirmation`

Direct route loads and client-side navigation were exercised. The Vercel rewrite sends application routes to `index.html` while leaving assets cacheable.

## Screen sizes tested

- 360×800 mobile
- 390×844 mobile
- 768×900 tablet
- 1024×900 laptop/tablet landscape
- 1440×1000 desktop
- 1680×1050 large desktop

The automated matrix checks every one of the six required page types at every listed width. Full-page screenshots were captured at 1440px and 390px.

## Screenshot evidence

Required page types:

- `home-desktop.png`, `home-mobile.png`
- `category-desktop.png`, `category-mobile.png`
- `product-desktop.png`, `product-mobile.png`
- `quote-desktop.png`, `quote-mobile.png`
- `cart-desktop.png`, `cart-mobile.png`
- `checkout-desktop.png`, `checkout-mobile.png`

Additional states:

- `quote-confirmation-desktop.png`
- `order-confirmation-desktop.png`

## Functional interactions tested

### Global

- Client-side route changes and direct route loads
- Desktop/mobile responsive rendering
- Mobile navigation drawer open/close state
- Desktop and mobile cart count
- Internal application links used by the tested journeys

### Category

- Cabinet-type selection
- Width selection in mobile filter dialog
- Result filtering and visible result count
- Sort: price high-to-low
- Query-string state (`type`, `width`, `sort`)
- Mobile filter open/apply/close
- Empty/loading UI is implemented in code; primary test uses matching filters

### Product

- Door/drawer configuration change
- Width change
- Live price/SKU/availability state
- Invalid combination disabling/reset logic
- Add configured product to cart
- Variation attributes preserved
- Quantity control, gallery, zoom dialog, swipe code path, ZIP validation and spec-sheet treatment implemented

### Quote

- All four steps
- Required-field validation model and error-summary code path
- Visible choice-card/label interactions
- Conditional project answers
- Local progress persistence
- File selection and preview creation
- Consent
- Simulated loading submission
- Quote confirmation route and reference number
- Analytics events contain normalized non-personal data

### Cart

- Persistent configured line item
- Quantity/update code path
- Variation details and SKU display
- Edit/remove code paths
- Subtotal and estimated total rendering
- Responsive desktop summary and mobile checkout bar
- ZIP and demo promo states implemented
- Empty-cart state exists and is used on a fresh session

### Checkout

- Guest checkout is default
- Contact, fulfillment, address, shipping method, payment, billing and review sections
- Product configuration in summary
- Test shipping/total refresh
- Valid test-card completion
- Payment-error path implemented for numbers ending in `0000`
- Required terms consent
- Loading/double-submit guard
- Order confirmation with items, fulfillment and totals
- Cart cleared after successful simulation
- No real gateway, CRM, inventory or email call

## Accessibility checks

Automated route checks verify:

- Exactly one visible main H1 per tested route
- No visible unlabeled input, select or textarea on tested states
- No visible unnamed button on tested states
- No horizontal document overflow at the six required widths
- Visible focus styles in CSS
- Reduced-motion context used during QA

Motion-specific browser checks also verify:

- The locally hosted hero MP4 loads as 1280×720 media with a valid duration
- Muted autoplay starts in a no-preference motion context
- The visible hero control pauses and resumes playback
- The four-image hero gallery loads all three generated assets, advances to exactly one active slide, and updates its counter and current indicator
- Previous/next controls retain accessible names while the 1050ms cross-fade remains present in the computed browser styles
- Scroll-triggered section reveals reach their final visible state
- Reduced-motion mode replaces the moving background with the static poster and removes reveal motion

Manual/code review confirms:

- Semantic landmarks and heading structure
- Real buttons/links and fieldset/legend use
- Drawer/dialog Escape handling and focus containment
- Search, gallery, filter, variation and accordion keyboard semantics
- Error summaries and connected inline messages
- `aria-live` for toast/search/result feedback where appropriate
- Meaningful alt text and decorative empty alt usage
- Selected states communicated by border/check/text, not color alone
- Approximately 44px or larger primary touch targets

Formal assistive-technology testing with NVDA, JAWS, VoiceOver and TalkBack remains a production acceptance task.

## Console, assets and links

- Browser console errors: 0 in final automated matrix
- Unhandled page errors: 0
- Failed network requests: 0
- HTTP 404 responses during tested routes/assets: 0
- Broken loaded images: 0
- Empty `href="#"` links: 0
- Horizontal overflow: 0 after correcting the 360px review carousel boundary

The single supplied finished-kitchen image is intentionally reused as disclosed detail crops. Lazy images are not treated as broken until they complete with zero natural width; failed requests are captured separately.

## Production build

- Command: `npm run build`
- Vite: 7.3.6
- Result: successful
- Initial Windows `&`-path issue was fixed by invoking Vite through Node in npm scripts
- Dynamic/static import warning was removed
- Final build must be rerun after any production content/data integration

## Visual review and refinements

Screenshots were inspected for all six desktop/mobile templates. Refinements made after inspection include:

- Warm neutral product stages to prevent white-on-white product loss
- Mobile single-column product cards for legibility
- Mobile category scroller containment
- Cart/quote pre-footer spacing reduction
- Checkout test-card label wrapping correction
- 360px review carousel containment correction
- Disclosed single-source kitchen crops instead of invented project imagery
- Sticky mobile purchase/checkout actions with explicit current total/price

## Remaining limitations / production-only QA

- Product prices, SKUs, variation matrix, availability and technical specifications are prototype data pending WooCommerce reconciliation.
- Shipping and tax amounts are labeled test calculations; production must use WooCommerce zones/methods/tax tables.
- No live payment or sandbox gateway is connected in this static phase.
- No order, stock change, customer/admin email or account is created.
- Quote files remain local; no storage, malware scan, CRM/email delivery, rate limit or server validation exists in the prototype.
- Pickup, installation, response-time, warranty, return, shipping and damage-report terms need current client approval.
- Testimonials require source verification and publication permission.
- Real WordPress acceptance must include latest Chrome, Safari, Firefox and Edge plus iOS/Android devices.
- Production must complete gateway sandbox purchases, order/admin email checks, inventory behavior, analytics/consent validation, PHP log review, SEO crawl, schema testing and agreed GTmetrix/Core Web Vitals runs.
