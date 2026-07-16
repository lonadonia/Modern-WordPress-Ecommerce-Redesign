# Temima Cabinets design system

## Direction

“Modern Cabinet Atelier” combines an architectural showroom atmosphere with direct-to-consumer clarity. It is warm, spacious, practical, and specific. One action is visually dominant in each decision context: shop on catalog pages, configure on product pages, submit on the design form, and complete on checkout.

## Color tokens

| Token | Value | Use |
|---|---:|---|
| Ink | `#142238` | Navigation, headings, footer, checkout emphasis |
| Ink 2 | `#1B2D48` | Layered dark surfaces |
| Temima Orange | `#F47A24` | Primary actions and active progress |
| Orange Dark | `#D85D0B` | Accessible text accents on light surfaces |
| Warm Ivory | `#F7F4EF` | Editorial sections and calm form/card backgrounds |
| Stone | `#E8E2D9` | Borders, separators, product stages |
| Main Text | `#26313D` | Body copy |
| Muted Text | `#66717C` | Supporting copy |
| Sage | `#3D745D` | Success and selected reassurance |
| Error | `#B42318` | Validation and payment errors |

Orange is not used for long body copy. Dark-orange text is used where necessary to preserve contrast.

## Typography

- Primary family: locally hosted Poppins from the supplied legacy site
- Fallback: Arial, sans-serif
- Body default: 16px with 1.65 line height
- Display headings: responsive `clamp()` values, weight 600, tight letter spacing
- Eyebrows: 11–12px equivalent, uppercase, increased tracking
- Small technical/supporting text is used only inside cards and metadata; primary form and paragraph content remains readable
- No remote font requests

The supplied Poppins family refines the existing identity while retaining the clarity requested in the brief. Only regular and semibold weights are loaded.

## Layout and grid

- Maximum container: 1280px
- Desktop: 12-column design logic expressed through CSS Grid
- Section rhythm: 112px desktop, 88px tablet, 72px mobile
- Base spacing logic: multiples of 8px, with limited optical adjustments
- Primary radius: 16px; large media/forms: 24px; controls: 10–12px
- Shadows are reserved for sticky overlays, dialogs, purchase summaries, and featured conversion surfaces

## Breakpoints

| Context | CSS range | Behavior |
|---|---|---|
| Small mobile | up to 370px | Narrow control refinements |
| Mobile | up to 640px | Single column, full-width actions, fixed contextual bars |
| Tablet | 641–960px | Two-column commerce grids, drawers, stacked purchase/checkout |
| Laptop | 961–1180px | Compact desktop grid, mobile navigation |
| Desktop | 1181px+ | Full navigation, 3–4 product columns, sticky panels |
| Large desktop | 1600px+ viewport | Content remains capped at 1280px |

## Buttons

- Primary: Temima Orange, dark ink text, subtle orange shadow
- Dark: Ink background for catalog card actions
- Secondary: white surface with Stone border
- Ghost-light: transparent dark-surface alternative
- Minimum control height: 48px; major actions: 56px
- Hover motion is limited to 1px lift and color/shadow change
- Visible focus ring: 3px blue with offset

## Cards

- Product: warm neutral image stage, visible collection label, dimensions, finish, availability checkpoint, price, honest View Options/Quick Add split
- Category: strong product silhouette paired with plain-language use case
- Review: editorial quote with identity/source status separated
- Project: image-led with readable bottom information layer
- Form/checkout: one bordered white surface per decision group
- Trust: flat dividers instead of elevated tiles

## Forms

- Labels are always visible; placeholder text is not a label substitute
- Native input semantics are retained under custom choice cards
- Required and optional status is explicit
- Inline errors appear at the field and in a focusable error summary for long flows
- Success, warning, and error colors are paired with icons/text
- Inputs have 48–50px minimum height and clear focus styles
- Uploads support drag/drop, file picker, mobile camera, preview, status, and removal

## Icons

Icons use the inline SVG helper in `src/icons.js`:

- 24px view box
- 1.8px rounded outline stroke
- No icon font or third-party runtime package
- Decorative icons use `aria-hidden="true"`; icon-only controls receive explicit labels

## States

- Loading: small spinner for submit/order actions and opacity transition for filtered grids
- Empty: illustrated cart/catalog/search treatment with a next action
- Error: pale red surface, dark red text, connected field message, error summary
- Success: sage surface/mark and specific next step
- Warning: pale warm surface for unverified catalog/policy information
- Disabled: reduced opacity plus native disabled semantics
- Selected: 2px Ink border and/or check icon, never color alone

## Motion

- Typical interface duration: 180–250ms; editorial reveal duration: 660ms
- Motion explains drawers, dialogs, filter refresh, hover, progress, toasts, and content hierarchy as sections enter the viewport
- The hero uses a locally hosted, muted kitchen video with a visible pause/play control and a still-image fallback
- Lightweight native `IntersectionObserver` reveals replace a third-party animation package; there is no parallax or scroll hijacking
- `prefers-reduced-motion: reduce` removes reveals, pauses/hides the background video, uses its poster image, and restores instant scrolling

## Accessibility rules

- One H1 per route
- Semantic header, navigation, main, section, article, aside, footer, form, fieldset, legend, details, and dialog elements
- Keyboard-operable menu, drawer, search, filters, gallery, accordions, variation controls, cart, and forms
- Focus trapping and Escape handling for overlays; native dialog semantics where available
- Touch targets approximately 44px or larger
- Meaningful image alt text; decorative thumbnails/icons use empty alt or `aria-hidden`
- No required interaction depends only on hover
- Error messages are written in plain language and announced/focused where appropriate
- Sticky actions include bottom padding/context so the order can still be completed
