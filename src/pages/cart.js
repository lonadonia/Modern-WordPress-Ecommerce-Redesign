import { contact, representativeProduct } from '../data.js';
import { breadcrumbs, designHelpPanel, paymentMarks, quantityControl } from '../components.js';
import { icon } from '../icons.js';
import { cartSubtotal, getCart, money, removeCartLine, track, updateCartLine } from '../store.js';

const discountAmount = (subtotal) => sessionStorage.getItem('temima-demo-discount') === 'PROTOTYPE10' ? subtotal * 0.1 : 0;

const cartItem = (item) => `
  <article class="cart-item" data-cart-line="${item.key}">
    <a class="cart-item__image" href="/product/white-shaker-base-cabinet" data-link><img src="${item.image}" width="180" height="180" alt="${item.title}" /></a>
    <div class="cart-item__info"><span class="product-kicker">${item.configuration || 'White Shaker cabinet'}</span><h2><a href="/product/white-shaker-base-cabinet" data-link>${item.title}</a></h2><p>SKU: ${item.sku}</p><dl><div><dt>Size</dt><dd>${item.width}″ W × ${item.height}″ H × ${item.depth}″ D</dd></div><div><dt>Finish</dt><dd>${item.finish}</dd></div><div><dt>Configuration</dt><dd>${item.configuration}</dd></div></dl><div class="line-availability"><i></i><span><strong>${item.availability || 'Confirm availability'}</strong><small>Live inventory and lead time require WooCommerce.</small></span></div></div>
    <div class="cart-item__price"><small>Unit price</small><strong>${money(item.price)}</strong></div>
    <div class="cart-item__controls">${quantityControl(item.quantity, item.key)}<button type="button" data-edit-line="${item.key}">${icon('edit')} Edit options</button><button type="button" data-remove-line="${item.key}">${icon('trash')} Remove</button></div>
    <div class="cart-item__total"><small>Line total</small><strong>${money(item.price * item.quantity)}</strong></div>
  </article>`;

const summary = (cart) => {
  const subtotal = cartSubtotal(cart);
  const discount = discountAmount(subtotal);
  return `
    <aside class="cart-summary" aria-label="Order summary"><span class="eyebrow">Order summary</span><h2>Your total so far</h2>
      <dl class="totals"><div><dt>Subtotal</dt><dd>${money(subtotal)}</dd></div><div class="discount-line ${discount ? 'is-active' : ''}"><dt>Prototype discount</dt><dd>${discount ? `−${money(discount)}` : money(0)}</dd></div><div><dt>Estimated shipping</dt><dd>Calculated at checkout</dd></div><div><dt>Estimated tax</dt><dd>Calculated at checkout</dd></div><div class="total-row"><dt>Estimated total</dt><dd>${money(subtotal - discount)}</dd></div></dl>
      <p class="summary-note">Shipping, tax, product availability and freight access are confirmed during the production checkout flow.</p>
      <a class="button button--primary button--large button--full" href="/checkout" data-link data-begin-checkout>Proceed to secure checkout ${icon('arrow')}</a>
      <a class="continue-link" href="/shop/white-shaker-cabinets" data-link>${icon('arrow')} Continue shopping</a>
      <div class="secure-reassurance">${icon('lock')}<span><strong>Secure prototype checkout</strong><small>No real payment will be processed.</small></span></div>${paymentMarks()}
      <div class="summary-links"><a href="/#policies" data-link>Warranty</a><a href="/#policies" data-link>Returns</a><a href="mailto:${contact.serviceEmail}">Order support</a></div>
    </aside>`;
};

export const cartPage = () => {
  const cart = getCart();
  if (!cart.length) return `
    <main id="main-content">
      ${breadcrumbs([{ label: 'Home', href: '/' }, { label: 'Cart' }])}
      <section class="empty-state"><div class="empty-state__visual">${icon('cart')}<span></span></div><span class="eyebrow">Your cart is ready when you are</span><h1>No cabinet selections yet.</h1><p>Browse White Shaker cabinets or begin with a room plan if you would like help choosing the right pieces.</p><div class="button-row"><a class="button button--primary button--large" href="/shop/white-shaker-cabinets" data-link>Shop cabinets ${icon('arrow')}</a><a class="button button--secondary button--large" href="/free-3d-kitchen-design" data-link>Start a free design</a></div></section>
      <div class="container">${designHelpPanel({ title: 'Need a cabinet list before you shop?' })}</div>
    </main>`;

  return `
    <main id="main-content" class="cart-page">
      ${breadcrumbs([{ label: 'Home', href: '/' }, { label: 'Cart' }])}
      <section class="cart-heading"><div class="container"><div><span class="eyebrow">Review every detail</span><h1>Your cabinet cart</h1><p>${cart.reduce((total, item) => total + item.quantity, 0)} item${cart.reduce((total, item) => total + item.quantity, 0) === 1 ? '' : 's'} · configurations stay attached to each product.</p></div><a class="text-link" href="/shop/white-shaker-cabinets" data-link>Continue shopping ${icon('arrow')}</a></div></section>
      <div class="container cart-alert">${icon('info')}<p><strong>Before checkout:</strong> Prototype product data is not a live inventory feed. Verify SKUs, dimensions, price and availability against WooCommerce before placing a production order.</p></div>
      <section class="cart-content"><div class="container cart-layout"><div class="cart-main"><div class="cart-list">${cart.map(cartItem).join('')}</div>
        <form class="fulfillment-estimate" data-cart-zip novalidate><div>${icon('truck')}<span><strong>Estimate fulfillment by ZIP</strong><small>Freight eligibility depends on destination, access and order size.</small></span></div><label><span class="sr-only">ZIP code</span><input name="zip" maxlength="5" inputmode="numeric" placeholder="ZIP code" /><button class="button button--secondary" type="submit">Check ZIP</button></label><p data-cart-zip-result></p></form>
        <details class="promo-entry"><summary>Have a promo code? ${icon('chevron')}</summary><form data-promo-form><label for="promo-code">Promo code</label><div><input id="promo-code" name="code" autocomplete="off" placeholder="Enter code" /><button class="button button--secondary" type="submit">Apply</button></div><small>Prototype-only QA code: PROTOTYPE10</small><p data-promo-message></p></form></details>
        ${designHelpPanel({ compact: true, title: 'Want a designer to verify this cart?' })}
      </div>${summary(cart)}</div></section>
      <div class="mobile-cart-bar"><div><small>Estimated total</small><strong>${money(cartSubtotal(cart) - discountAmount(cartSubtotal(cart)))}</strong></div><a class="button button--primary" href="/checkout" data-link data-begin-checkout>Checkout ${icon('arrow')}</a></div>
    </main>
    <dialog class="edit-cart-dialog" id="edit-cart-dialog" aria-labelledby="edit-cart-title"><div class="dialog__head"><div><span class="eyebrow">Edit configuration</span><h2 id="edit-cart-title">Cabinet options</h2></div><button class="icon-button" type="button" data-close-dialog aria-label="Close edit options">${icon('close')}</button></div><div data-edit-cart-content></div></dialog>`;
};

export const initCartPage = () => {
  const cart = getCart();
  track('view_cart', { value: cartSubtotal(cart), currency: 'USD', item_count: cart.reduce((total, item) => total + item.quantity, 0) });
  if (!cart.length) return;
  let editKey = '';
  let editWidth = 15;
  let editConfig = 'Door + drawer';

  const refresh = (message = '') => {
    if (message) sessionStorage.setItem('temima-cart-message', message);
    window.temimaRenderCurrent();
  };

  const openEditor = (key) => {
    const item = getCart().find((line) => line.key === key);
    if (!item) return;
    editKey = key; editWidth = item.width; editConfig = item.configuration;
    const editable = item.productId === representativeProduct.id;
    document.querySelector('[data-edit-cart-content]').innerHTML = `<div class="edit-product"><img src="${item.image}" width="140" height="140" alt="" /><div><strong>${item.title}</strong><span>${item.sku}</span></div></div>${editable ? `<fieldset class="option-group"><legend>Configuration</legend><div class="choice-grid choice-grid--two"><button type="button" class="choice ${editConfig === 'Door + drawer' ? 'is-selected' : ''}" data-edit-config="Door + drawer">Door + drawer</button><button type="button" class="choice ${editConfig === 'Three drawers' ? 'is-selected' : ''}" data-edit-config="Three drawers">Three drawers</button></div></fieldset><fieldset class="option-group"><legend>Width</legend><div class="choice-grid choice-grid--four">${[15,18,21,24].map((width) => `<button type="button" class="choice ${editWidth === width ? 'is-selected' : ''}" data-edit-width="${width}">${width}″</button>`).join('')}</div></fieldset>` : `<div class="data-caution">${icon('info')} <p>This is shown as a fixed prototype product. Return to the catalog to choose another size.</p></div>`}<div class="dialog-actions"><button class="button button--secondary" type="button" data-close-dialog>Cancel</button>${editable ? '<button class="button button--primary" type="button" data-save-line>Save options</button>' : ''}</div>`;
    document.getElementById('edit-cart-dialog').showModal();
  };

  document.addEventListener('click', (event) => {
    const line = event.target.closest('[data-cart-line]');
    const key = line?.dataset.cartLine;
    if (event.target.closest('[data-quantity-plus]') && key) {
      const item = getCart().find((entry) => entry.key === key); updateCartLine(key, { quantity: Math.min(99, item.quantity + 1) }); refresh('Quantity updated.');
    }
    if (event.target.closest('[data-quantity-minus]') && key) {
      const item = getCart().find((entry) => entry.key === key); updateCartLine(key, { quantity: Math.max(1, item.quantity - 1) }); refresh('Quantity updated.');
    }
    const remove = event.target.closest('[data-remove-line]');
    if (remove) { removeCartLine(remove.dataset.removeLine); refresh('Item removed from cart.'); }
    const edit = event.target.closest('[data-edit-line]'); if (edit) openEditor(edit.dataset.editLine);
    const config = event.target.closest('[data-edit-config]'); if (config) { editConfig = config.dataset.editConfig; document.querySelectorAll('[data-edit-config]').forEach((node) => node.classList.toggle('is-selected', node === config)); }
    const width = event.target.closest('[data-edit-width]'); if (width) { editWidth = Number(width.dataset.editWidth); document.querySelectorAll('[data-edit-width]').forEach((node) => node.classList.toggle('is-selected', node === width)); }
    if (event.target.closest('[data-save-line]')) {
      let variation = representativeProduct.variations.find((item) => item.width === editWidth && item.configuration === editConfig);
      if (!variation) { window.temimaToast?.('That prototype combination is unavailable. Choose another width.', 'error'); return; }
      updateCartLine(editKey, { width: editWidth, configuration: editConfig, sku: variation.sku, price: variation.price, image: editConfig === 'Three drawers' ? '/assets/three-drawer-base.webp' : '/assets/drawer-door-base.webp', availability: variation.availability });
      document.getElementById('edit-cart-dialog').close(); refresh('Cabinet options updated.');
    }
    if (event.target.closest('[data-begin-checkout]')) track('begin_checkout', { value: cartSubtotal(getCart()), currency: 'USD', item_count: getCart().length });
  }, { signal: window.pageAbort?.signal });

  document.querySelectorAll('[data-quantity-input]').forEach((input) => input.addEventListener('change', () => {
    const key = input.closest('[data-cart-line]').dataset.cartLine; updateCartLine(key, { quantity: Math.max(1, Math.min(99, Number(input.value) || 1)) }); refresh('Quantity updated.');
  }, { signal: window.pageAbort?.signal }));

  document.querySelector('[data-cart-zip]')?.addEventListener('submit', (event) => {
    event.preventDefault(); const zip = new FormData(event.currentTarget).get('zip').trim(); const result = event.currentTarget.querySelector('[data-cart-zip-result]');
    result.textContent = /^\d{5}$/.test(zip) ? 'ZIP captured. Live freight eligibility, delivery timing and cost require the production shipping integration.' : 'Enter a valid 5-digit ZIP code.';
    result.className = /^\d{5}$/.test(zip) ? 'field-message--success' : 'field-message--error';
  }, { signal: window.pageAbort?.signal });

  document.querySelector('[data-promo-form]')?.addEventListener('submit', (event) => {
    event.preventDefault(); const code = new FormData(event.currentTarget).get('code').trim().toUpperCase(); const message = event.currentTarget.querySelector('[data-promo-message]');
    if (code === 'PROTOTYPE10') { sessionStorage.setItem('temima-demo-discount', code); message.textContent = 'Prototype discount applied. This code is not a real Temima offer.'; message.className = 'field-message--success'; window.setTimeout(() => refresh('Prototype discount applied.'), 400); }
    else { message.textContent = 'That code is not available in this prototype.'; message.className = 'field-message--error'; }
  }, { signal: window.pageAbort?.signal });

  const message = sessionStorage.getItem('temima-cart-message'); if (message) { sessionStorage.removeItem('temima-cart-message'); window.setTimeout(() => window.temimaToast?.(message, 'success'), 50); }
};
