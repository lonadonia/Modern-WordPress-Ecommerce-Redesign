import { categories, contact, navigation, products, trustItems } from './data.js';
import { cartCount, money } from './store.js';
import { icon } from './icons.js';

export const logo = (compact = false) => `
  <a class="brand ${compact ? 'brand--compact' : ''}" href="/" aria-label="Temima Cabinets home" data-link>
    <img src="/assets/temima-logo.png" width="54" height="54" alt="" />
    <span><strong>TEMIMA</strong><small>CABINETS</small></span>
  </a>`;

const megaMenu = () => `
  <div class="mega-menu" id="shop-mega-menu" role="region" aria-label="Shop cabinets menu">
    <div class="mega-menu__inner container">
      <div class="mega-menu__intro">
        <span class="eyebrow">Shop with a plan</span>
        <h2>Cabinetry, made easier to navigate.</h2>
        <p>Start with cabinet type or ask a designer to review your room.</p>
        <a class="text-link" href="/shop/white-shaker-cabinets" data-link>Browse all White Shaker ${icon('arrow')}</a>
      </div>
      <div class="mega-menu__links">
        ${categories.slice(0, 5).map((category) => `
          <a href="/shop/white-shaker-cabinets?type=${category.id}" data-link>
            <span>${category.name}</span><small>${category.copy}</small>
          </a>`).join('')}
      </div>
      <aside class="mega-menu__help">
        <img src="/assets/design-consultation.jpg" alt="Designer reviewing a kitchen plan" width="320" height="240" />
        <div><strong>Not sure what fits?</strong><p>Share a photo or sketch. Perfect measurements are not required to begin.</p><a href="/free-3d-kitchen-design" data-link>Start free design ${icon('arrow')}</a></div>
      </aside>
    </div>
  </div>`;

export const siteHeader = () => `
  <div class="announcement">
    <div class="container announcement__inner">
      <p>${icon('pencil')} Free 3D kitchen design — start with a photo, sketch or measurements.</p>
      <div><a href="${contact.phoneHref}">Sales: ${contact.phoneDisplay}</a><span aria-hidden="true">•</span><span>${contact.hours}</span></div>
    </div>
  </div>
  <header class="site-header" data-site-header>
    <div class="container site-header__inner">
      <button class="icon-button mobile-only" type="button" data-open-drawer="mobile-nav" aria-label="Open navigation" aria-controls="mobile-nav">${icon('menu')}</button>
      ${logo()}
      <nav class="desktop-nav" aria-label="Primary navigation">
        ${navigation.map((item) => item.mega ? `
          <button class="nav-link nav-link--mega" type="button" aria-expanded="false" aria-controls="shop-mega-menu" data-mega-trigger>${item.label}${icon('chevron')}</button>` : `
          <a class="nav-link ${item.featured ? 'nav-link--featured' : ''}" href="${item.href}" data-link>${item.label}</a>`).join('')}
      </nav>
      <div class="header-actions">
        <button class="icon-button" type="button" data-open-dialog="search-dialog" aria-label="Search products">${icon('search')}</button>
        <button class="icon-button desktop-only" type="button" data-account aria-label="Account options">${icon('user')}</button>
        <a class="icon-button cart-link" href="/cart" data-link aria-label="View cart, ${cartCount()} items">${icon('cart')}<span data-cart-count>${cartCount()}</span></a>
      </div>
    </div>
    ${megaMenu()}
  </header>
  <div class="drawer-backdrop" data-drawer-backdrop hidden></div>
  <aside class="mobile-drawer" id="mobile-nav" aria-hidden="true" aria-label="Mobile navigation">
    <div class="drawer__head">${logo(true)}<button class="icon-button" type="button" data-close-drawer aria-label="Close navigation">${icon('close')}</button></div>
    <button class="mobile-search" type="button" data-open-dialog="search-dialog">${icon('search')} Search cabinets</button>
    <nav aria-label="Mobile primary">
      <details open><summary>Shop Cabinets ${icon('chevron')}</summary>
        ${categories.slice(0, 5).map((category) => `<a href="/shop/white-shaker-cabinets?type=${category.id}" data-link>${category.name}<small>${category.copy}</small></a>`).join('')}
      </details>
      ${navigation.filter((item) => !item.mega).map((item) => `<a class="mobile-nav-link ${item.featured ? 'mobile-nav-link--featured' : ''}" href="${item.href}" data-link>${item.label}${icon('arrow')}</a>`).join('')}
    </nav>
    <div class="drawer__support"><span>Need a human?</span><a href="${contact.phoneHref}">${icon('phone')} ${contact.phoneDisplay}</a><a href="mailto:${contact.email}">${icon('mail')} ${contact.email}</a></div>
  </aside>
  <dialog class="search-dialog" id="search-dialog" aria-labelledby="search-title">
    <div class="dialog__head"><div><span class="eyebrow">Product search</span><h2 id="search-title">What are you looking for?</h2></div><button class="icon-button" type="button" data-close-dialog aria-label="Close search">${icon('close')}</button></div>
    <label class="search-field">${icon('search')}<span class="sr-only">Search cabinet products</span><input type="search" data-search-input placeholder="Try “18 inch wall cabinet”" autocomplete="off" /></label>
    <div class="search-results" data-search-results aria-live="polite">
      <p class="search-hint">Popular: Base cabinets, wall cabinets, pantry, White Shaker</p>
    </div>
  </dialog>
  <div class="toast-region" data-toast-region aria-live="polite" aria-atomic="true"></div>`;

export const checkoutHeader = () => `
  <header class="checkout-header">
    <div class="container checkout-header__inner">
      ${logo(true)}
      <div class="checkout-secure">${icon('lock')} <span><strong>Secure checkout</strong><small>Prototype payment — no charge is made</small></span></div>
      <div class="checkout-support"><span>Need help?</span><a href="${contact.phoneHref}">${contact.phoneDisplay}</a></div>
      <a class="text-link" href="/cart" data-link>Return to cart</a>
    </div>
  </header>`;

export const siteFooter = () => `
  <footer class="site-footer" id="support">
    <div class="container footer__top">
      <div class="footer__brand">${logo()}<p>Practical cabinet shopping and design guidance from a Texas-based team.</p><a href="${contact.phoneHref}">${icon('phone')} ${contact.phoneDisplay}</a><a href="mailto:${contact.email}">${icon('mail')} ${contact.email}</a><span>${contact.hours}</span></div>
      <div><h2>Shop</h2><a href="/shop/white-shaker-cabinets?type=base" data-link>Base cabinets</a><a href="/shop/white-shaker-cabinets?type=wall" data-link>Wall cabinets</a><a href="/shop/white-shaker-cabinets?type=tall" data-link>Tall and pantry</a><a href="/shop/white-shaker-cabinets?type=accessory" data-link>Finishing pieces</a></div>
      <div><h2>Design help</h2><a href="/free-3d-kitchen-design" data-link>Free 3D kitchen design</a><a href="/#measurement-help" data-link>Measurement guide</a><a href="/#inspiration" data-link>Kitchen inspiration</a><a href="mailto:${contact.email}">Contact a designer</a></div>
      <div><h2>Customer care</h2><a href="/#faq" data-link>Frequently asked questions</a><a href="mailto:${contact.serviceEmail}">Order support</a><a href="/#delivery" data-link>Delivery guidance</a><a href="/#policies" data-link>Returns and warranty</a></div>
    </div>
    <div class="container footer__bottom"><p>© ${new Date().getFullYear()} Temima Cabinets. Prototype experience.</p><div><a href="/#policies" data-link>Privacy</a><a href="/#policies" data-link>Terms</a><a href="/#accessibility" data-link>Accessibility</a></div><p>${contact.location} · Serving the ${contact.serviceArea}</p></div>
  </footer>`;

export const breadcrumbs = (items) => `
  <nav class="breadcrumbs container" aria-label="Breadcrumb"><ol>
    ${items.map((item, index) => `<li>${index < items.length - 1 ? `<a href="${item.href}" data-link>${item.label}</a>${icon('chevron')}` : `<span aria-current="page">${item.label}</span>`}</li>`).join('')}
  </ol></nav>`;

export const sectionIntro = ({ eyebrow, title, copy, action = '' }) => `
  <div class="section-intro">
    <div>${eyebrow ? `<span class="eyebrow">${eyebrow}</span>` : ''}<h2>${title}</h2>${copy ? `<p>${copy}</p>` : ''}</div>${action}
  </div>`;

export const trustStrip = (compact = false) => `
  <section class="trust-strip ${compact ? 'trust-strip--compact' : ''}" aria-label="Why shop with Temima">
    <div class="container trust-strip__grid">${trustItems.map((item) => `<div>${icon(item.icon)}<span><strong>${item.title}</strong><small>${item.text}</small></span></div>`).join('')}</div>
  </section>`;

export const productCard = (product) => `
  <article class="product-card" data-product-card data-category="${product.category}" data-width="${product.width}" data-price="${product.price}">
    <div class="product-card__media">
      <a href="/product/${product.slug}" data-link aria-label="View ${product.name}" data-select-item="${product.id}"><img src="${product.image}" width="600" height="600" loading="lazy" alt="${product.name} in the White Shaker style" /></a>
      <button class="round-action" type="button" data-save-product="${product.id}" aria-label="Save ${product.name}">${icon('heart')}</button>
      <span class="product-card__status">White Shaker</span>
    </div>
    <div class="product-card__body">
      <span class="product-kicker">${product.type} cabinet</span>
      <h3><a href="/product/${product.slug}" data-link data-select-item="${product.id}">${product.name}</a></h3>
      <p class="product-dimensions">${product.width}″ W × ${product.height}″ H × ${product.depth}″ D</p>
      <div class="product-meta"><span>${product.finish}</span><span>${product.availability}</span></div>
      <div class="product-card__buy"><div><small>Prototype ${product.complex ? 'from ' : ''}price</small><strong>${money(product.price)}</strong></div>${product.complex ? `<a class="button button--dark button--small" href="/product/${product.slug}" data-link>View options</a>` : `<button class="button button--dark button--small" type="button" data-quick-add="${product.id}">Quick add</button>`}</div>
      <a class="spec-link" href="/#measurement-help" data-link>${icon('ruler')} Specs & measurement help</a>
    </div>
  </article>`;

export const designHelpPanel = ({ title = 'Let a designer check the cabinet run.', compact = false } = {}) => `
  <aside class="design-help ${compact ? 'design-help--compact' : ''}">
    <div class="design-help__icon">${icon('pencil')}</div><div><span class="eyebrow">Free design assistance</span><h2>${title}</h2><p>Upload a sketch, photo or measurements. We’ll help you identify the next questions before you commit to a complex order.</p></div>
    <a class="button button--primary" href="/free-3d-kitchen-design" data-link>Start your design ${icon('arrow')}</a>
  </aside>`;

export const faqList = (faqs, id = 'faq') => `
  <div class="faq-list" id="${id}">${faqs.map((faq, index) => `<details ${index === 0 ? 'open' : ''}><summary><span>${faq.question}</span>${icon('plus')} </summary><div><p>${faq.answer}</p></div></details>`).join('')}</div>`;

export const quantityControl = (quantity = 1, key = '') => `
  <div class="quantity" data-quantity-control ${key ? `data-line-key="${key}"` : ''}>
    <button type="button" data-quantity-minus aria-label="Decrease quantity">${icon('minus')}</button>
    <input type="number" value="${quantity}" min="1" max="99" inputmode="numeric" aria-label="Quantity" data-quantity-input />
    <button type="button" data-quantity-plus aria-label="Increase quantity">${icon('plus')}</button>
  </div>`;

export const paymentMarks = () => `<div class="payment-marks" aria-label="Payment types shown in the source site"><img src="/assets/visa.svg" alt="Visa" /><img src="/assets/mastercard.svg" alt="Mastercard" /><img src="/assets/amex.svg" alt="American Express" /><img src="/assets/discover.svg" alt="Discover" /></div>`;

export const productSearchResults = (query) => {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return '<p class="search-hint">Popular: Base cabinets, wall cabinets, pantry, White Shaker</p>';
  const matches = products.filter((product) => `${product.name} ${product.type} ${product.sku} ${product.width}`.toLowerCase().includes(normalized)).slice(0, 6);
  if (!matches.length) return `<div class="empty-inline">${icon('search')}<p><strong>No exact cabinet found.</strong><br />Try a cabinet type, width or “White Shaker”.</p></div>`;
  return `<p class="result-label">${matches.length} result${matches.length === 1 ? '' : 's'}</p>${matches.map((product) => `<a class="search-result" href="/product/${product.slug}" data-link><img src="${product.image}" alt="" width="72" height="72" /><span><strong>${product.name}</strong><small>${product.width}″ W × ${product.height}″ H · ${product.sku}</small></span><b>${money(product.price)}</b>${icon('arrow')}</a>`).join('')}`;
};
