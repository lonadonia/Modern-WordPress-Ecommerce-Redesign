# Source audit

## Audit scope

- Original files preserved unchanged:
  - `../old.zip`
  - `../Temima_Cabinets_Redesign_Detailed_Brief (1).pdf`
- `old.zip` extracted to `../_reference_old_site`
- Extracted inventory: 243 files, approximately 10.54 MB
- PDF: 24 pages reviewed in full. Page 1 is an image-only cover; pages 22–24 are current-site screenshot references.
- Legacy HTML reviewed:
  - Home snapshot (`index.html`)
  - FAQ snapshot (`pages/page.html`)
  - Referenced scripts, combined stylesheets, navigation URLs, image attributes, visible copy, and local fonts

## Existing identity

- Logo: navy line-art cabinet/house mark with “TEMIMA CABINETS” wordmark
- Main legacy colors found repeatedly: navy around `#192334`, orange around `#EE7C2B`, white, gray, and pale lavender/stone UI colors
- Legacy fonts: Poppins, Montserrat, Roboto, and Roboto Slab were bundled. The redesign uses only local Poppins Regular and Semibold.
- Refined redesign colors follow the supplied brief: Ink `#142238`, Orange `#F47A24`, Ivory `#F7F4EF`, Stone `#E8E2D9`, Text `#26313D`.

## Reused assets

| Legacy asset | Prototype asset | Use / quality note |
|---|---|---|
| `Transparent-150x150.png` | `temima-logo.png` | Header/footer mark; suitable at displayed size |
| `hero-kitchen-jRnB6yJa.jpg` | `hero-kitchen.jpg` | 1920×1080 finished kitchen; strongest supplied editorial asset |
| `design-consultation-DOEyEb4K.jpg` | `design-consultation.jpg` | 800×600 design-process visual |
| `manufacturing-CMxYsOx3.jpg` | `manufacturing.jpg` | 800×600 manufacturing visual |
| `installation-process-i785A5Ll.jpg` | `installation.jpg` | 800×600 installation visual |
| `Cabinet-Base-Resized-6.webp` | `white-shaker-door.webp` | White cabinet/door rendering |
| `Cabinet-Base-Resized-15.webp` | `tall-pantry.webp` | Tall cabinet rendering |
| `Cabinet-Base-Resized-7.webp` | `open-shelf-tall.webp` | Tall open-storage rendering |
| `DrawersResized1.webp` | `three-drawer-base.webp` | Three-drawer base rendering |
| `cupboards-1.webp` | `narrow-base.webp` | Narrow cabinet rendering |
| `cupboards-2.webp` | `drawer-door-base.webp` | Drawer/door base rendering |
| `cupboards-3.webp` | `drawer-base.webp` | Base cabinet rendering |
| `cupboards-5.webp` | `open-shelf.webp` | Open shelf rendering |
| `cupboards-6-1.webp` | `wall-cabinet.webp` | Wall cabinet rendering |
| `cupboards-9.webp` | `slim-base.webp` | Slim cabinet rendering |
| `Untitled-1-1.webp` | `corner-base.webp` | Corner cabinet rendering |
| Payment SVGs | Same normalized names | Source payment-mark treatment only |
| Poppins Regular/Semibold | Same names | Self-hosted interface typography |

## Externally licensed motion asset

| Prototype asset | Source | Creator | License / use note |
|---|---|---|---|
| `modern-kitchen-cabinets.mp4` | [Modern Kitchen Interior, Pexels video 10216191](https://www.pexels.com/video/modern-kitchen-interior-10216191/) | Ammad Rasool | 1280×720 background video downloaded from Pexels and verified in-browser. The [Pexels license](https://www.pexels.com/license/) permits free website and e-commerce use, modification, and use without required attribution. The prototype uses it as an integrated hero background and does not redistribute or sell the unaltered clip. |

The product WebP files declare 1080×1080 dimensions but are extremely small, low-detail pale renders. They are usable on a warm neutral stage, not as zoom-level technical evidence. No dimension diagram, interior photography, spec sheet, or alternate-angle set was supplied. The prototype creates a clearly labeled illustrative dimension diagram in HTML/SVG rather than pretending a manufacturer sheet exists.

Only one finished-kitchen photograph was supplied. The home project grid therefore uses disclosed crops of the same “source kitchen” rather than presenting invented customer projects.

## Reliable source information retained

- Business name: Temima Cabinets
- Phone: `(469) 209-6518`
- General email: `info@temimacabinets.com`
- Customer-service email: `customerservice@temimacabinets.com`
- Hours: Monday–Friday, 9:00 AM–5:00 PM
- Texas-based company; FAQ says headquarters are in Dallas
- No physical showroom stated in the FAQ
- Free design service stated in the FAQ, with no hidden fee or binding obligation
- Customers may begin design by sending dimensions or a kitchen photo
- Customer must approve and verify designs before purchase
- Cabinets are described as ready to assemble and shipped in boxes
- Shipping policy describes the continental United States where normal freight access is available
- FAQ states a limited lifetime warranty, but no warranty document was supplied
- FAQ describes a 30-day authorized-return policy and 30% restocking fee, but full current terms must be confirmed
- Freight-delivery guidance includes adult presence, inspection, piece count, visible-damage notation, and preparation of an accessible area

## Product data used

The supplied snapshot establishes the “White Shaker Cabinets” category and includes cabinet renders. The FAQ mentions examples such as a 15-inch drawer base, regular 15-inch base, 21×30 wall cabinet, 18×30 wall cabinet, and a 3-inch filler.

No WooCommerce CSV, database export, product page, SKU list, price list, precise image-to-product mapping, variation JSON, stock record, or product-level specification was supplied. The structured product objects in `src/data.js` are therefore functional prototype mappings. UI labels and documentation identify their prices, SKUs, dimensions, and variation availability as requiring production validation.

## Legacy navigation observed

- Home
- White Shaker Cabinets (`pages/white.html`)
- Get Free Quote (`pages/free-3d-kitchen-design.html`)
- FAQ
- Terms and Conditions
- Refund and Return Policy
- Contact reference

The prototype uses the brief’s clearer `/shop/white-shaker-cabinets` route. Production should preserve the existing canonical category URL if it differs, or add an approved permanent redirect from `/white`/`pages/white.html` after confirming the live WordPress permalink.

## Conflicting or uncertain information

| Topic | Source conflict / concern | Prototype treatment |
|---|---|---|
| Damage reporting | Several FAQ answers say 5 days; shipping sections say 7 days | Says inspect/contact immediately and requires written-policy confirmation |
| Warranty wording | Home says “lifetime warranty”; FAQ says “Limited Lifetime Warranty” | Uses the more defensible “limited lifetime warranty” and notes missing terms |
| Design timing | Home repeatedly claims 24-hour turnaround | No exact promise shown; production response timing requires confirmation |
| Delivery timing | Home claims nationwide shipping in 3–5 business days | Omitted; timing depends on style, destination, stock, carrier, and approved rules |
| Free shipping | Home claims free shipping over $1,999 | Omitted; no current rule/configuration evidence supplied |
| Quality claims | Home says solid-wood faces, plywood boxes, soft-close hardware, CARB2 | Shown only as legacy statements pending product-level documents |
| Customer proof | 50,000 customers, 15 years, 4.9/5, 2,847 reviews, 99% recommendation, savings, on-time delivery | Not used as verified metrics |
| Testimonials | Names, locations, projects, and savings appear on legacy home | Short excerpts are paraphrased and labeled verification pending; savings removed |
| Installation | Home describes certified installers and expert installation | Not asserted as a current service; form asks what help is needed |
| Payment | FAQ names cards, PayPal, Klarna, bank checks, and money orders | Checkout uses a clearly labeled test-card simulation only |
| Pickup | Not confirmed in supplied policy | Presented only as a request for information / unconfirmed prototype choice |
| Returns language | FAQ order and question/answer placement is inconsistent in places | Only the clearest 30-day/30% summary is retained with confirmation warning |

## Missing information requiring the client

- Current WordPress/WooCommerce export: product IDs, names, SKUs, prices, sale rules, images, categories, attributes, variations, stock, backorders, weights and dimensions
- Manufacturer product/specification sheets and certification documentation
- Current written warranty, return, cancellation, freight-damage, shipping, pickup, assembly, and installation policies
- Current delivery areas, warehouse/pickup locations, freight charges, lead times, free-shipping rules, and restricted destinations
- Tax/shipping/payment gateway sandbox configuration
- Verified review platform, ratings, customer permissions, and approved testimonials
- Additional high-resolution finished-kitchen projects with accurate captions
- Brand source files (SVG/EPS/AI) and any logo clear-space rules
- Quote response-time commitment and escalation process
- CRM/email destination, secure upload storage, retention policy, consent language, and spam/rate-limit rules
- Active theme/plugin list, staging access, analytics/consent configuration, sitemap/canonical baseline, and live permalink map

## Asset recommendation

The Pexels hero video is licensed for the current website treatment under the terms linked above. The supplied still hero kitchen and three process images should still receive client rights confirmation. Product renders need a consistent higher-quality export for production, especially for zoom and comparison. The client should supply at least 8–12 approved completed kitchens plus dimension diagrams and interiors for primary product families.
