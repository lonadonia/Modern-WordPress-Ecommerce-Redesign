# WordPress / WooCommerce handoff

## Production architecture

Use Elementor Pro Theme Builder for staff-editable marketing/global sections and a lightweight child theme for WooCommerce behavior, hooks, template overrides, data formatting, and tightly scoped JavaScript. Do not edit WordPress core, WooCommerce plugin files, or the parent theme.

Recommended layers:

1. Lightweight parent theme or purpose-built minimal theme
2. Version-controlled child theme
3. Elementor Pro for Home, design-service content, global CTA/FAQ sections, and selected header/footer content
4. WooCommerce templates/hooks for archive, product, cart, checkout, and account behavior
5. ACF or native blocks/fields for structured projects, FAQs, proof, and policy summaries
6. One form system capable of multi-step forms, conditional logic, secure uploads, and CRM/email integration
7. One performant faceted-filter solution if WooCommerce native blocks cannot meet the final catalog requirements

## Prototype-to-WordPress mapping

| Prototype | WordPress destination |
|---|---|
| `components.js` announcement/header/mega-menu | Elementor Theme Builder header plus child-theme accessible menu behavior |
| `components.js` footer | Elementor Theme Builder footer with editable contact, link groups and policy links |
| `pages/home.js` | WordPress Home page built from reusable Elementor sections/widgets |
| `pages/shop.js` | `archive-product.php`, taxonomy archive hooks, product loop overrides, filter integration |
| `pages/product.js` | `single-product.php` plus WooCommerce hooks and targeted template parts |
| `pages/quote.js` | WordPress page + selected multi-step form plugin/custom endpoint |
| `pages/cart.js` | WooCommerce cart block/template or child-theme cart override |
| `pages/checkout.js` | WooCommerce checkout block/template plus approved field and fulfillment hooks |
| Confirmation pages | WooCommerce thank-you endpoint and form confirmation page/template |
| `data.js` | WooCommerce product/taxonomy data plus ACF/options fields |
| `store.js` cart | Native WooCommerce sessions/cart fragments/Store API |
| `store.js` analytics | Consent-aware `dataLayer`/GA4 integration using WooCommerce IDs and totals |
| CSS files | Child-theme compiled CSS, loaded conditionally by template |
| Page-specific init functions | Small deferred child-theme modules loaded only where needed |

## Global header and footer

### Header

- Create announcement copy as an Elementor global section or an Options Page field.
- Render logo from the Site Logo setting; replace the raster source with an approved SVG if supplied.
- Build the primary navigation from WordPress menus.
- Build cabinet mega-menu groups from product categories, collections, and resource links. Prefer native menu data/ACF menu metadata over hardcoded URLs.
- Keep search integrated with WooCommerce product search and expose SKU/attribute results.
- Cart badge must use WooCommerce fragments or Store API state and remain accurate after AJAX actions.
- Preserve keyboard controls, Escape behavior, focus restoration, and mobile drawer semantics.

### Footer

- Contact details and hours: Options Page fields.
- Link groups: WordPress menus.
- Service area and policy summaries: editable Options/ACF fields.
- Accessibility, privacy, terms, returns, shipping and warranty must link to approved published pages.
- Do not publish legacy proof metrics until source/permissions are confirmed.

## Elementor Theme Builder responsibilities

Suitable for Elementor:

- Home hero and editorial content
- Category introduction/SEO content around the WooCommerce loop
- Free-design introduction and reassurance content
- Project gallery, review, FAQ, measurement help, process, and reusable design-help CTA sections
- Global header/footer content where performance remains acceptable
- Static policy summaries linking to complete policy pages

Keep out of Elementor where possible:

- Product variation logic
- Add-to-cart/cart-session operations
- Product-loop filtering and sorting
- Cart quantity/configuration edits
- Checkout fields, validation, shipping/payment refresh, totals and order submission
- Analytics values derived from real cart/order data

## Child-theme responsibilities

- Register and enqueue compiled CSS/JS by route/template
- Add preload only for the critical font file and LCP image when justified
- Register image sizes for hero, project, product card, thumbnail and gallery use
- Format catalog attribute labels and dimension display
- Add accessible mega-menu/drawer/search behavior if the selected theme does not provide it
- Implement product-card metadata, View Options/Quick Add rules, save/compare integrations if approved
- Implement variation controls by synchronizing custom buttons/swatches with real WooCommerce variation selects
- Preserve chosen attributes in cart/order item metadata and emails
- Add ZIP/delivery estimator UI backed by approved shipping logic
- Add designer-verification/cart-to-quote handoff
- Add checkout validation/error-summary enhancements without bypassing WooCommerce validation
- Dispatch normalized analytics events after confirmed WooCommerce events
- Include versioned rollback-safe templates and snippets in Git

## WooCommerce archive

Use existing product category permalinks when possible. Recommended implementation:

- Breadcrumb: WooCommerce breadcrumb hook with schema preserved
- Category title/description: taxonomy fields
- Visual subcategories: child terms with term images and optional short descriptions
- Product count/sort: WooCommerce result count and catalog ordering
- Filters: indexed/query-string state with back/forward and shareable URLs
- Product cards: template part using product object, real attributes, stock, price HTML and product type
- Use Quick Add only for simple products with no required choice
- Use View Options for variable/grouped/compatibility-sensitive products
- Insert design-help CTA with loop hooks after an approved item position
- Keep SEO copy and FAQs server rendered below the loop
- Test filtered canonicals and index rules with the SEO owner; do not index every faceted combination by default

## Product template and variations

Map prototype fields to WooCommerce:

| Prototype field | WooCommerce source |
|---|---|
| Product title/ID/SKU | Product post and `_sku` |
| Collection/door style/finish | Global attributes or product taxonomies |
| Width/height/depth | Global attributes and/or dimension metadata |
| Price | Product/variation price APIs; never duplicate in ACF |
| Availability | Stock status/backorder/lead-time field |
| Gallery | Product gallery attachments with per-image alt text |
| Diagram/spec sheet | Product document fields or attachment relationship |
| Construction/materials | Structured product fields/tabs |
| Shipping/returns/warranty | Global policy plus per-product exceptions |
| Related/accessories | Upsells, cross-sells, same-collection query, or explicit relationship field |

Variation buttons must remain a progressive enhancement over WooCommerce selects. Invalid combinations and price/availability updates must come from WooCommerce variation data. Do not hardcode the prototype matrix.

Suggested hooks/template areas:

- `woocommerce_before_single_product_summary`
- `woocommerce_single_product_summary`
- `woocommerce_before_add_to_cart_form`
- `woocommerce_after_add_to_cart_form`
- `woocommerce_product_tabs`
- `woocommerce_after_single_product_summary`
- `woocommerce_cart_item_name`
- `woocommerce_get_item_data`
- `woocommerce_checkout_create_order_line_item`

Use hooks before copying full WooCommerce templates. When an override is necessary, record the upstream template version and review it after WooCommerce updates.

## Cart

- Use the WooCommerce cart/session as the source of truth.
- Display full variation attributes and SKU per line.
- “Edit options” should return to the product/configuration UI or use a carefully tested modal that replaces the cart item atomically.
- Quantity changes must call the Store API/AJAX endpoint, announce success, and refresh fragments/totals.
- Promo codes must use native coupon validation.
- Shipping estimator must use WooCommerce packages/zones/methods; never keep the prototype amount.
- Designer verification can package cart item IDs/variations into the quote request without blocking checkout.
- Preserve an accessible empty-cart route and recovery links.

## Checkout

- Guest checkout enabled and selected by default in WooCommerce settings.
- Account creation optional and preferably offered after purchase.
- Reduced header via a checkout-specific Theme Builder condition/template.
- Use configured shipping zones and pickup methods. Remove pickup UI if the client does not offer it.
- Use current approved payment gateways in sandbox mode during QA.
- Retain native nonces, server validation, order creation, stock reduction and emails.
- Add error-summary/focus behavior around native WooCommerce notices.
- Do not cache checkout, cart, account or Store API responses.
- Test address/tax/shipping recalculation, payment decline, retry without data loss, duplicate submission prevention, and thank-you endpoint security.

## Editable fields / ACF model

Suggested fields:

- Site options: phone, sales email, customer-service email, hours, headquarters label, service area, announcement, design-response copy
- Home hero: headline, copy, image, primary/secondary CTA
- Trust items: title, supporting text, icon key, evidence/source note
- Projects: title, location, style, color, room type, image gallery, related products, permission status
- Reviews: quote, name display, location, project, rating, source URL/platform, verification status, image permission
- Process steps: title, description, image, timing text
- FAQs: question, answer, template/taxonomy placement
- Policy summaries: warranty, returns, shipping, delivery inspection, assembly, installation
- Design-service content: deliverables, reassurance, response-time copy, consent/privacy links

Do not copy WooCommerce price, stock, SKU or variation data into ACF.

## Quote form integration

Choose one: Elementor Forms, Gravity Forms, Fluent Forms, or a custom endpoint. Select on required capability and current site standards, not on overlapping add-on bundles.

Production requirements:

- Four steps with server/client validation and preserved progress
- Conditional installation/fulfillment questions
- JPG/PNG/PDF type allowlist and client/server 10 MB limit (or approved value)
- Randomized/private storage; never expose guessable public uploads
- Malware scanning if supported by hosting/storage
- Honeypot, nonce, rate limit, and optional low-friction challenge after abuse evidence
- Consent record, retention/deletion schedule, and privacy notice
- Structured email/CRM payload containing lead reference, answers, UTM/source, landing page, device class, and secure file links
- No personal values in analytics events
- Retry/logging/alerting for delivery failures
- Accessible confirmation route with approved response-time expectation

Integration points should be isolated behind a form submission action/webhook so the front-end fields can change without coupling to one CRM.

## Analytics mapping

| Prototype event | Production trigger |
|---|---|
| `product_view` | Real product detail view with product ID/variation context |
| `select_item` | Product selected from a named list |
| `add_to_cart` | WooCommerce confirms add-to-cart success |
| `view_cart` | Cart rendered with current value/items |
| `begin_checkout` | Checkout starts with current cart |
| `purchase` | Thank-you endpoint validates the real order; deduplicate by order ID |
| Quote events | Step completion/upload/submission/confirmation callbacks |

Use real currency, item IDs, coupons, shipping and tax. Respect the site’s consent state before forwarding marketing/analytics events.

## SEO

- Preserve existing product/category/page permalinks unless a signed redirect map exists.
- Replace prototype client-side metadata with server-rendered WordPress SEO metadata.
- Keep one H1, WooCommerce breadcrumbs, Product schema, FAQ schema, Open Graph image, canonical, XML sitemap and meaningful image alt text.
- Product schema must use real price, currency, stock and SKU from WooCommerce.
- Category filter URLs need canonical/index rules.
- Proposed `/shop/white-shaker-cabinets` route must be reconciled with the observed legacy `white.html`/live permalink.
- Crawl staging with authentication/noindex, then verify production robots/sitemap after launch.

## Performance

- Convert approved imagery to responsive WebP/AVIF while retaining a fallback as needed.
- Generate WordPress `srcset`/sizes and reserve aspect ratios.
- Preload only the LCP image and one critical font subset when measurements justify it.
- Keep Poppins to required weights or switch to an approved variable/subset font.
- Avoid multiple Elementor add-on suites, icon fonts, slider libraries and duplicate optimization plugins.
- Defer route-specific scripts and load catalog/product/quote/checkout modules only where needed.
- Use CDN/page cache for public pages; exclude cart, checkout, account, Store API, Woo AJAX and personalized fragments.
- Test representative cold/warm mobile runs against the agreed GTmetrix location and Core Web Vitals targets.

## Recommended plugin categories

- Elementor Pro (existing/approved page-building layer)
- WooCommerce
- ACF Pro or native fields/blocks, not both without a reason
- One capable form solution
- One faceted filter solution if required
- One SEO solution consistent with the existing site
- One caching/performance layer coordinated with the host
- Image optimization/CDN if the host does not provide it
- Security/backups appropriate to the hosting environment

Avoid stacking several Elementor widget packs, several caches, multiple schema plugins, or multiple form systems.

## Staging, deployment and rollback

1. Inventory live permalinks, plugins, theme overrides, payment/shipping/tax configuration, analytics and current performance.
2. Create a restorable file/database backup.
3. Clone to password-protected/noindex staging.
4. Import child theme and templates into version control.
5. Reconcile real catalog data and policy content before visual sign-off.
6. Test quote CRM/email/upload delivery with non-sensitive test data.
7. Run complete guest purchases in every gateway sandbox, desktop and mobile.
8. Crawl links/assets, validate schema/canonicals, and run accessibility/performance tests.
9. Schedule launch with a content/order freeze if database migration requires it.
10. Back up again, deploy child-theme/templates/settings, clear relevant caches, and run smoke tests.
11. Monitor 404s, PHP logs, browser errors, failed payments/forms, emails and analytics.

Rollback must restore both database and files/settings from the same point. Keep the previous theme/templates available, record plugin/configuration changes, and avoid irreversible live database edits during template deployment.
