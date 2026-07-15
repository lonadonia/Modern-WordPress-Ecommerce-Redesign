import { representativeProduct as product, products, homeFaqs } from '../data.js';
import { breadcrumbs, designHelpPanel, faqList, productCard, quantityControl, trustStrip } from '../components.js';
import { icon } from '../icons.js';
import { addToCart, money, track } from '../store.js';

const dimensionDiagram = (width = 15) => `
  <div class="dimension-diagram" role="img" aria-label="Cabinet dimension diagram showing ${width} inch width, 34.5 inch height and 24 inch depth">
    <svg viewBox="0 0 620 520" aria-hidden="true">
      <path class="diagram-face" d="M170 105h245v330H170z"/><path class="diagram-side" d="m415 105 90-52v330l-90 52z"/><path class="diagram-top" d="m170 105 90-52h245l-90 52z"/>
      <path d="M190 130h205v72H190zM190 218h205v195H190z"/>
      <path class="measure" d="M170 470h245M170 455v30M415 455v30"/><path class="measure" d="M128 105v330M115 105h28M115 435h28"/><path class="measure" d="m440 98 83-48m-93 30 10 18m73-66 10 18"/>
      <text x="292" y="505" text-anchor="middle">${width}″ width</text><text x="62" y="275" text-anchor="middle" transform="rotate(-90 62 275)">34.5″ height</text><text x="483" y="52" transform="rotate(-30 483 52)">24″ depth</text>
    </svg>
    <p>Diagram for prototype interaction only. Confirm exact dimensions, overlays and tolerances against the approved manufacturer specification.</p>
  </div>`;

const galleryPanel = (item, width = 15) => item.type === 'diagram' ? dimensionDiagram(width) : `<div class="gallery-image ${item.label === 'In a kitchen' ? 'gallery-image--context' : ''}"><img src="${item.src}" width="1080" height="1080" alt="${item.alt}" /><button class="gallery-zoom" type="button" data-gallery-zoom aria-label="Expand ${item.label}">${icon('zoom')} Expand</button></div>`;

export const productPage = () => `
  <main id="main-content">
    ${breadcrumbs([{ label: 'Home', href: '/' }, { label: 'White Shaker Cabinets', href: '/shop/white-shaker-cabinets' }, { label: product.title }])}
    <section class="product-main">
      <div class="container product-main__grid">
        <div class="product-gallery" data-product-gallery>
          <div class="gallery-stage" data-gallery-stage>${galleryPanel(product.gallery[0])}</div>
          <div class="gallery-thumbnails" role="tablist" aria-label="Product images">
            ${product.gallery.map((item, index) => `<button type="button" role="tab" aria-selected="${index === 0}" data-gallery-index="${index}" aria-label="Show ${item.label}">${item.type === 'diagram' ? `<span class="thumb-diagram">${icon('ruler')}</span>` : `<img src="${item.src}" width="96" height="96" alt="" />`}<small>${item.label}</small></button>`).join('')}
          </div>
          <p class="swipe-hint">${icon('arrow')} Swipe or use thumbnails to explore</p>
        </div>

        <div class="purchase-panel">
          <div class="product-heading"><span class="product-kicker">White Shaker · Base cabinet</span><h1>${product.title}</h1><div class="sku-line">SKU: <strong data-product-sku>${product.variations[0].sku}</strong><span>Product data verification pending</span></div></div>
          <p class="product-benefit">${product.benefit}</p>
          <div class="product-price"><span data-product-price>${money(product.variations[0].price)}</span><small>Prototype price before shipping and tax</small></div>
          <div class="data-caution">${icon('info')} <p>The supplied files did not include a product export. Validate SKU, price, construction and variation data before production use.</p></div>

          <fieldset class="option-group"><legend>Finish <span>Painted white</span></legend><div class="swatch-options"><button class="swatch is-selected" type="button" aria-pressed="true"><i></i><span>White Shaker<small>Only sourced finish shown</small></span>${icon('check')}</button></div></fieldset>
          <fieldset class="option-group"><legend>Configuration <span data-selected-config>Door + drawer</span></legend><div class="choice-grid choice-grid--two"><button class="choice is-selected" type="button" data-config="Door + drawer" aria-pressed="true"><strong>Door + drawer</strong><small>One drawer above a door</small></button><button class="choice" type="button" data-config="Three drawers" aria-pressed="false"><strong>Three drawers</strong><small>Stacked drawer storage</small></button></div></fieldset>
          <fieldset class="option-group"><legend>Cabinet width <span data-selected-width>15 inches</span></legend><div class="choice-grid choice-grid--four">${[15, 18, 21, 24].map((width) => `<button class="choice ${width === 15 ? 'is-selected' : ''}" type="button" data-width="${width}" aria-pressed="${width === 15}"><strong>${width}″</strong><small>${width} W × 34.5 H</small></button>`).join('')}</div><p class="option-help">${icon('ruler')} Depth is shown as 24″. <a href="/#measurement-help" data-link>What size do I need?</a></p></fieldset>

          <div class="availability-box"><span class="availability-dot"></span><div><strong data-availability>${product.variations[0].availability}</strong><p>Live inventory and lead time require WooCommerce integration.</p></div></div>

          <form class="delivery-check" data-delivery-form novalidate><label for="delivery-zip">Check delivery by ZIP</label><div><input id="delivery-zip" name="zip" inputmode="numeric" maxlength="5" placeholder="ZIP code" aria-describedby="delivery-help" /><button class="button button--secondary" type="submit">Check</button></div><p id="delivery-help" data-delivery-result>Eligibility and freight details depend on destination and order size.</p></form>

          <div class="purchase-actions">${quantityControl()}<button class="button button--primary button--large" type="button" data-add-product>${icon('cart')} Add to cart</button><button class="button button--secondary button--large" type="button" data-buy-now>Buy now</button></div>
          <button class="verify-link" type="button" data-verify-design>${icon('pencil')} Ask a designer to verify this configuration ${icon('arrow')}</button>
          <div class="purchase-trust"><span>${icon('shield')} Limited lifetime warranty stated in source FAQ</span><span>${icon('lock')} Secure purchase interface</span><span>${icon('phone')} Sales help: (469) 209-6518</span></div>
        </div>
      </div>
    </section>

    ${trustStrip(true)}

    <section class="section product-details-section">
      <div class="container product-details-grid">
        <div><span class="eyebrow">Product information</span><h2>Know what is confirmed—and what still needs checking.</h2><p>The source snapshot establishes the White Shaker collection and RTA format. Manufacturer-specific specifications need an approved product feed or spec sheet.</p><button class="button button--secondary" type="button" data-spec-sheet>${icon('file')} Download spec sheet treatment</button></div>
        <div class="detail-accordions">
          <details open><summary>Dimensions and fit ${icon('plus')}</summary><div><dl class="spec-grid"><div><dt>Selected width</dt><dd data-spec-width>15″</dd></div><div><dt>Shown height</dt><dd>34.5″</dd></div><div><dt>Shown depth</dt><dd>24″</dd></div><div><dt>Door style</dt><dd>Shaker</dd></div></dl><p>Final dimensions, frame/overlay detail, hinge clearance and installation tolerances must be verified against the production product record.</p></div></details>
          <details><summary>Materials and construction ${icon('plus')}</summary><div><p>The legacy home page describes solid-wood faces, plywood boxes and soft-close hardware. No product-level specification or certification document was supplied, so these statements remain pending verification for this SKU.</p></div></details>
          <details><summary>Assembly and installation ${icon('plus')}</summary><div><p>The source FAQ states that cabinets ship ready to assemble in boxes. Assembly instructions and product-specific hardware lists were not included. Use the production manufacturer documents before installation.</p></div></details>
          <details><summary>Shipping, inspection and returns ${icon('plus')}</summary><div><p>Freight eligibility depends on ZIP and normal access within the continental United States. Inspect boxes and count pieces at delivery. The source gives conflicting damage-report deadlines (5 versus 7 days); contact customer service immediately and confirm the governing written policy.</p><p>The source also describes a 30-day return policy and a 30% restocking fee for authorized returns. Confirm full terms before purchase.</p></div></details>
          <details><summary>Warranty and support ${icon('plus')}</summary><div><p>The FAQ states that products include a limited lifetime warranty. Coverage, exclusions and claim documentation were not included in the supplied package. Contact customer service for the current written warranty.</p></div></details>
        </div>
      </div>
    </section>

    <section class="section section--ivory compatible-section">
      <div class="container">
        <div class="compatible-grid"><div><span class="eyebrow">Complete the cabinet run</span><h2>Matching pieces for the same planning conversation.</h2><p>Use related items as a checklist, not a substitute for reviewing the complete room.</p></div><div class="compatibility-note">${icon('ruler')} <span><strong>Check fillers and corners early.</strong> Door swing, wall variation and adjacent appliances affect which finishing pieces you need.</span></div></div>
        <div class="product-grid product-grid--four">${[products[3], products[6], products[8], products[11]].map(productCard).join('')}</div>
      </div>
    </section>
    <div class="container">${designHelpPanel({ title: 'Add this cabinet to a room plan before the order gets complex.' })}</div>
    <section class="section faq-section"><div class="container faq-layout"><div><span class="eyebrow">Product questions</span><h2>Good orders start with the right checks.</h2><p>Need a product-specific answer? Send the SKU and room context to the design team.</p></div>${faqList(homeFaqs.slice(0, 4), 'product-faq')}</div></section>

    <div class="mobile-purchase-bar" data-mobile-purchase><div><small>Current selection</small><strong data-mobile-price>${money(product.variations[0].price)}</strong></div><button class="button button--primary" type="button" data-add-product>Add to cart</button></div>
  </main>

  <dialog class="image-dialog" id="image-dialog" aria-labelledby="zoom-title"><div class="dialog__head"><h2 id="zoom-title">Product image</h2><button class="icon-button" type="button" data-close-dialog aria-label="Close expanded image">${icon('close')}</button></div><div data-zoom-content></div></dialog>`;

export const initProductPage = () => {
  let selectedWidth = 15;
  let selectedConfig = 'Door + drawer';
  let quantity = 1;
  let galleryIndex = 0;
  const galleryStage = document.querySelector('[data-gallery-stage]');
  const getVariation = () => product.variations.find((variation) => variation.width === selectedWidth && variation.configuration === selectedConfig);

  const renderSelection = () => {
    let variation = getVariation();
    if (!variation) {
      selectedWidth = product.variations.find((item) => item.configuration === selectedConfig)?.width || 15;
      variation = getVariation();
    }
    document.querySelectorAll('[data-config]').forEach((button) => { const active = button.dataset.config === selectedConfig; button.classList.toggle('is-selected', active); button.setAttribute('aria-pressed', active); });
    document.querySelectorAll('[data-width]').forEach((button) => {
      const width = Number(button.dataset.width);
      const valid = product.variations.some((item) => item.width === width && item.configuration === selectedConfig);
      button.disabled = !valid;
      button.title = valid ? '' : 'This prototype combination is unavailable';
      const active = width === selectedWidth;
      button.classList.toggle('is-selected', active); button.setAttribute('aria-pressed', active);
    });
    document.querySelector('[data-selected-config]').textContent = selectedConfig;
    document.querySelector('[data-selected-width]').textContent = `${selectedWidth} inches`;
    document.querySelector('[data-product-sku]').textContent = variation.sku;
    document.querySelector('[data-product-price]').textContent = money(variation.price);
    document.querySelector('[data-mobile-price]').textContent = money(variation.price);
    document.querySelector('[data-availability]').textContent = variation.availability;
    document.querySelector('[data-spec-width]').textContent = `${selectedWidth}″`;
    if (product.gallery[galleryIndex].type === 'diagram') galleryStage.innerHTML = galleryPanel(product.gallery[galleryIndex], selectedWidth);
    track('select_item', { item_id: product.id, sku: variation.sku, selected_width: selectedWidth, configuration: selectedConfig, value: variation.price, currency: 'USD' });
  };

  const cartItem = () => {
    const variation = getVariation();
    return { productId: product.id, title: product.title, sku: variation.sku, width: selectedWidth, height: 34.5, depth: 24, finish: 'Painted white', configuration: selectedConfig, price: variation.price, image: selectedConfig === 'Three drawers' ? '/assets/three-drawer-base.webp' : '/assets/drawer-door-base.webp', quantity, availability: variation.availability };
  };

  const add = (goToCheckout = false) => {
    addToCart(cartItem());
    window.temimaToast?.(`${selectedWidth}″ ${selectedConfig.toLowerCase()} cabinet added to cart.`, 'success', goToCheckout ? '/checkout' : '/cart');
    if (goToCheckout) window.temimaNavigate('/checkout');
  };

  document.addEventListener('click', (event) => {
    const config = event.target.closest('[data-config]');
    if (config) { selectedConfig = config.dataset.config; renderSelection(); }
    const width = event.target.closest('[data-width]');
    if (width && !width.disabled) { selectedWidth = Number(width.dataset.width); renderSelection(); }
    const thumb = event.target.closest('[data-gallery-index]');
    if (thumb) {
      galleryIndex = Number(thumb.dataset.galleryIndex);
      galleryStage.innerHTML = galleryPanel(product.gallery[galleryIndex], selectedWidth);
      document.querySelectorAll('[data-gallery-index]').forEach((button) => button.setAttribute('aria-selected', button === thumb));
    }
    if (event.target.closest('[data-gallery-zoom]')) {
      const dialog = document.getElementById('image-dialog');
      dialog.querySelector('[data-zoom-content]').innerHTML = galleryPanel(product.gallery[galleryIndex], selectedWidth);
      dialog.showModal();
    }
    if (event.target.closest('[data-add-product]')) add(false);
    if (event.target.closest('[data-buy-now]')) add(true);
    if (event.target.closest('[data-verify-design]')) window.temimaNavigate(`/free-3d-kitchen-design?product=${encodeURIComponent(getVariation().sku)}`);
    if (event.target.closest('[data-spec-sheet]')) window.temimaToast?.('Spec-sheet download is ready for the approved manufacturer PDF in WordPress.', 'info');
  }, { signal: window.pageAbort?.signal });

  document.querySelector('[data-quantity-control]')?.addEventListener('change', (event) => { if (event.target.matches('[data-quantity-input]')) quantity = Math.max(1, Number(event.target.value) || 1); }, { signal: window.pageAbort?.signal });
  document.querySelector('[data-delivery-form]')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const zip = new FormData(event.currentTarget).get('zip').trim();
    const result = event.currentTarget.querySelector('[data-delivery-result]');
    if (!/^\d{5}$/.test(zip)) { result.textContent = 'Enter a valid 5-digit ZIP code.'; result.className = 'field-message field-message--error'; return; }
    result.textContent = 'This prototype can capture your ZIP, but live freight eligibility and price require WooCommerce shipping rules.';
    result.className = 'field-message field-message--success';
  }, { signal: window.pageAbort?.signal });

  let startX = 0;
  galleryStage.addEventListener('touchstart', (event) => { startX = event.changedTouches[0].clientX; }, { passive: true, signal: window.pageAbort?.signal });
  galleryStage.addEventListener('touchend', (event) => {
    if (Math.abs(event.changedTouches[0].clientX - startX) < 50) return;
    galleryIndex = (galleryIndex + (event.changedTouches[0].clientX < startX ? 1 : -1) + product.gallery.length) % product.gallery.length;
    galleryStage.innerHTML = galleryPanel(product.gallery[galleryIndex], selectedWidth);
    document.querySelectorAll('[data-gallery-index]').forEach((button, index) => button.setAttribute('aria-selected', index === galleryIndex));
  }, { passive: true, signal: window.pageAbort?.signal });
  track('product_view', { item_id: product.id, item_name: product.title, value: getVariation().price, currency: 'USD' });
  renderSelection();
};
