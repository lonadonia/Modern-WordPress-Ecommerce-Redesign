import { contact } from '../data.js';
import { icon } from '../icons.js';
import { cartSubtotal, clearCart, clearCheckout, createReference, getCart, getCheckout, money, setCheckout, track } from '../store.js';

const getDiscount = (subtotal) => sessionStorage.getItem('temima-demo-discount') === 'PROTOTYPE10' ? subtotal * 0.1 : 0;

const checkoutItems = (cart) => cart.map((item) => `<article class="checkout-item"><div class="checkout-item__image"><img src="${item.image}" width="72" height="72" alt="" /><span>${item.quantity}</span></div><div><strong>${item.title}</strong><small>${item.sku} · ${item.width}″ W · ${item.finish}</small><small>${item.configuration}</small></div><b>${money(item.price * item.quantity)}</b></article>`).join('');

const orderSummary = (cart) => {
  const subtotal = cartSubtotal(cart);
  const discount = getDiscount(subtotal);
  return `<div class="checkout-order-summary" data-checkout-summary><div class="summary-title"><span class="eyebrow">Your order</span><h2>${cart.reduce((total, item) => total + item.quantity, 0)} cabinet item${cart.reduce((total, item) => total + item.quantity, 0) === 1 ? '' : 's'}</h2><a href="/cart" data-link>Edit cart</a></div><div class="checkout-items">${checkoutItems(cart)}</div><dl class="totals"><div><dt>Subtotal</dt><dd>${money(subtotal)}</dd></div><div class="discount-line ${discount ? 'is-active' : ''}"><dt>Prototype discount</dt><dd>${discount ? `−${money(discount)}` : money(0)}</dd></div><div><dt>Prototype shipping</dt><dd data-checkout-shipping>${money(199)}</dd></div><div><dt>Tax</dt><dd>${money(0)}</dd></div><div class="total-row"><dt>Prototype total</dt><dd data-checkout-total>${money(subtotal - discount + 199)}</dd></div></dl><p class="summary-note">Shipping and tax shown here are test calculations only. Production totals come from WooCommerce shipping and tax rules.</p><div class="secure-reassurance">${icon('shield')}<span><strong>Configuration stays visible</strong><small>Every selected width and finish remains attached to the line item.</small></span></div></div>`;
};

export const checkoutPage = () => {
  const cart = getCart();
  if (!cart.length) return `<main id="main-content"><section class="empty-state empty-state--checkout"><div class="empty-state__visual">${icon('cart')}<span></span></div><span class="eyebrow">Secure checkout</span><h1>Your cart is empty.</h1><p>Add a cabinet selection before beginning the guest checkout simulation.</p><a class="button button--primary button--large" href="/shop/white-shaker-cabinets" data-link>Shop cabinets ${icon('arrow')}</a></section></main>`;

  return `
    <main id="main-content" class="checkout-page">
      <section class="checkout-heading"><div class="container"><div><span class="eyebrow">Guest checkout</span><h1>Complete your test order</h1><p>No account or real payment is required. Entered details persist on this device while you test the flow.</p></div><div class="checkout-steps" aria-label="Checkout steps"><span class="is-active">1 <small>Details</small></span><i></i><span>2 <small>Review</small></span><i></i><span>3 <small>Confirmation</small></span></div></div></section>
      <details class="mobile-order-summary"><summary>${icon('cart')} Show order summary <strong data-mobile-checkout-total>${money(cartSubtotal(cart) - getDiscount(cartSubtotal(cart)) + 199)}</strong>${icon('chevron')}</summary>${orderSummary(cart)}</details>
      <div class="container checkout-layout">
        <form class="checkout-form" data-checkout-form novalidate>
          <div class="error-summary" data-checkout-errors tabindex="-1" hidden><h2>${icon('alert')} Please review your checkout details</h2><ul></ul></div>
          <section class="checkout-section" aria-labelledby="contact-title"><div class="checkout-section__number">01</div><div class="checkout-section__body"><div class="checkout-section__head"><div><h2 id="contact-title">Contact</h2><p>We’ll use these details for the order simulation only.</p></div><button type="button" class="text-link" data-returning-login>Returning customer? Log in</button></div><div class="guest-choice">${icon('check')} <span><strong>Guest checkout selected</strong><small>Create an account only if you choose to after the order.</small></span></div><div class="field-grid"><div class="field"><label for="checkout-email">Email <span aria-hidden="true">*</span></label><input id="checkout-email" type="email" name="email" autocomplete="email" required /></div><div class="field"><label for="checkout-phone">Phone <span aria-hidden="true">*</span></label><input id="checkout-phone" type="tel" name="phone" autocomplete="tel" required /></div></div><label class="check-label"><input type="checkbox" name="updates" /><span>Send order and delivery updates by text in a production checkout.</span></label></div></section>

          <section class="checkout-section" aria-labelledby="delivery-title"><div class="checkout-section__number">02</div><div class="checkout-section__body"><div class="checkout-section__head"><div><h2 id="delivery-title">Delivery or pickup</h2><p>Choose a prototype fulfillment path.</p></div></div><div class="shipping-choices"><label><input type="radio" name="fulfillment" value="delivery" checked /><span>${icon('truck')}<strong>Freight delivery</strong><small>Carrier scheduling and normal-access rules apply.</small></span><b>Test $199</b>${icon('check')}</label><label><input type="radio" name="fulfillment" value="pickup" /><span>${icon('location')}<strong>Request pickup</strong><small>Pickup was not confirmed in the source and needs team approval.</small></span><b>Test $0</b>${icon('check')}</label></div></div></section>

          <section class="checkout-section" data-address-section aria-labelledby="address-title"><div class="checkout-section__number">03</div><div class="checkout-section__body"><div class="checkout-section__head"><div><h2 id="address-title">Delivery address</h2><p>Manual entry is always available.</p></div></div><div class="field-grid"><div class="field"><label for="first-name">First name <span aria-hidden="true">*</span></label><input id="first-name" name="firstName" autocomplete="given-name" required /></div><div class="field"><label for="last-name">Last name <span aria-hidden="true">*</span></label><input id="last-name" name="lastName" autocomplete="family-name" required /></div></div><div class="field"><label for="street">Street address <span aria-hidden="true">*</span></label><input id="street" name="street" autocomplete="street-address" required /></div><div class="field"><label for="address2">Apartment, suite or unit <span class="optional">Optional</span></label><input id="address2" name="address2" autocomplete="address-line2" /></div><div class="field-grid field-grid--address"><div class="field"><label for="city">City <span aria-hidden="true">*</span></label><input id="city" name="city" autocomplete="address-level2" required /></div><div class="field"><label for="state">State <span aria-hidden="true">*</span></label><select id="state" name="state" autocomplete="address-level1" required><option value="">Select</option>${['AL','AZ','AR','CA','CO','CT','DE','FL','GA','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'].map((state) => `<option>${state}</option>`).join('')}</select></div><div class="field"><label for="checkout-zip">ZIP <span aria-hidden="true">*</span></label><input id="checkout-zip" name="zip" autocomplete="postal-code" inputmode="numeric" maxlength="5" required /></div></div><div class="freight-note">${icon('info')} <p>Freight delivery requires normal access and an adult to receive the shipment. Final eligibility must be confirmed from the production shipping rules.</p></div></div></section>

          <section class="checkout-section" data-shipping-section aria-labelledby="shipping-title"><div class="checkout-section__number">04</div><div class="checkout-section__body"><div class="checkout-section__head"><div><h2 id="shipping-title">Shipping method</h2><p>Timing and price remain clearly separated from the product subtotal.</p></div></div><div class="shipping-choices"><label><input type="radio" name="shippingMethod" value="freight" checked /><span>${icon('truck')}<strong>Prototype freight delivery</strong><small>The carrier contacts you to schedule after shipment.</small></span><b>Test $199</b>${icon('check')}</label><label><input type="radio" name="shippingMethod" value="review" /><span>${icon('phone')}<strong>Review freight with support</strong><small>Place the test order, then clarify access and service needs.</small></span><b>Test $199</b>${icon('check')}</label></div></div></section>

          <section class="checkout-section" aria-labelledby="payment-title"><div class="checkout-section__number">05</div><div class="checkout-section__body"><div class="checkout-section__head"><div><h2 id="payment-title">Payment</h2><p>This interface never contacts a gateway or charges a card.</p></div><span class="secure-label">${icon('lock')} Encrypted treatment</span></div><div class="payment-choice"><label><input type="radio" name="paymentMethod" value="test-card" checked /><span><strong>Test card</strong><small>Use 4242 4242 4242 4242 for success or a number ending 0000 to test an error.</small></span>${icon('check')}</label><div class="test-payment-fields" data-card-fields><div class="field"><label for="card-number">Card number <span aria-hidden="true">*</span></label><div class="input-with-icon">${icon('lock')}<input id="card-number" name="cardNumber" inputmode="numeric" autocomplete="cc-number" placeholder="4242 4242 4242 4242" required /></div></div><div class="field-grid"><div class="field"><label for="expiry">Expiration <span aria-hidden="true">*</span></label><input id="expiry" name="expiry" inputmode="numeric" autocomplete="cc-exp" placeholder="12/30" required /></div><div class="field"><label for="cvc">Security code <span aria-hidden="true">*</span></label><input id="cvc" name="cvc" inputmode="numeric" autocomplete="cc-csc" maxlength="4" placeholder="123" required /></div></div></div></div><label class="check-label"><input type="checkbox" name="billingSame" checked /><span>Billing address is the same as delivery.</span></label><div class="billing-fields" data-billing-fields hidden><div class="field"><label for="billing-street">Billing street <span aria-hidden="true">*</span></label><input id="billing-street" name="billingStreet" autocomplete="billing street-address" /></div><div class="field-grid"><div class="field"><label for="billing-city">Billing city <span aria-hidden="true">*</span></label><input id="billing-city" name="billingCity" /></div><div class="field"><label for="billing-zip">Billing ZIP <span aria-hidden="true">*</span></label><input id="billing-zip" name="billingZip" inputmode="numeric" maxlength="5" /></div></div></div><div class="payment-error" data-payment-error role="alert" hidden>${icon('alert')}<div><strong>The test payment could not be authorized.</strong><p>Check the test card number or use 4242 4242 4242 4242 to complete the simulation.</p></div></div></div></section>

          <section class="checkout-section checkout-review" aria-labelledby="review-title"><div class="checkout-section__number">06</div><div class="checkout-section__body"><div class="checkout-section__head"><div><h2 id="review-title">Review and place test order</h2><p>Confirm that product configurations and contact details are correct.</p></div></div><div class="review-items">${checkoutItems(cart)}</div><label class="check-label consent-row"><input type="checkbox" name="terms" required /><span>I agree to the <a href="/#policies" data-link>terms and privacy information</a> for this prototype submission. <span aria-hidden="true">*</span></span></label><label class="check-label"><input type="checkbox" name="createAccount" /><span>Offer account creation after this test order.</span></label><button class="button button--primary button--large button--full" type="submit" data-place-order>${icon('lock')} Place test order · <span data-place-order-total>${money(cartSubtotal(cart) - getDiscount(cartSubtotal(cart)) + 199)}</span></button><p class="place-order-note">No real payment, inventory change, email or admin order is created.</p></div></section>
        </form>
        <aside class="desktop-checkout-summary">${orderSummary(cart)}<div class="checkout-help"><strong>Questions before you place it?</strong><a href="${contact.phoneHref}">${icon('phone')} ${contact.phoneDisplay}</a><a href="mailto:${contact.email}">${icon('mail')} ${contact.email}</a></div></aside>
      </div>
    </main>`;
};

export const initCheckoutPage = () => {
  const form = document.querySelector('[data-checkout-form]');
  const cart = getCart();
  if (!form || !cart.length) return;
  const stored = getCheckout();
  let shipping = stored.fulfillment === 'pickup' ? 0 : 199;
  let submitting = false;

  Object.entries(stored).forEach(([name, value]) => {
    const fields = form.elements[name];
    if (!fields) return;
    if (fields instanceof RadioNodeList) [...fields].forEach((field) => { field.checked = field.value === value; });
    else if (fields.type === 'checkbox') fields.checked = Boolean(value);
    else fields.value = value;
  });

  const formValues = () => {
    const data = new FormData(form); const result = {};
    for (const [key, value] of data.entries()) result[key] = value;
    ['updates','billingSame','terms','createAccount'].forEach((name) => { result[name] = form.elements[name]?.checked || false; });
    return result;
  };

  const updateTotals = () => {
    const subtotal = cartSubtotal(cart); const total = subtotal - getDiscount(subtotal) + shipping;
    document.querySelectorAll('[data-checkout-shipping]').forEach((node) => { node.textContent = money(shipping); });
    document.querySelectorAll('[data-checkout-total], [data-mobile-checkout-total], [data-place-order-total]').forEach((node) => { node.textContent = money(total); });
  };

  const updateConditional = () => {
    const pickup = form.elements.fulfillment.value === 'pickup';
    shipping = pickup ? 0 : 199;
    document.querySelector('[data-address-section]').hidden = pickup;
    document.querySelector('[data-shipping-section]').hidden = pickup;
    document.querySelector('[data-billing-fields]').hidden = form.elements.billingSame.checked;
    ['billingStreet','billingCity','billingZip'].forEach((name) => { form.elements[name].required = !form.elements.billingSame.checked; });
    updateTotals();
  };

  const save = () => setCheckout(formValues());

  const validate = () => {
    form.querySelectorAll('.has-error').forEach((node) => node.classList.remove('has-error'));
    form.querySelectorAll('[data-checkout-field-error]').forEach((node) => node.remove());
    const errors = [];
    [...form.querySelectorAll('[required]')].filter((field) => !field.closest('[hidden]')).forEach((field) => {
      let message = '';
      if (field.type === 'checkbox' && !field.checked) message = 'Review and accept this required agreement.';
      else if (!field.value.trim()) message = `Enter ${field.labels?.[0]?.textContent.replace('*', '').trim().toLowerCase() || 'this required field'}.`;
      else if (field.type === 'email' && !/^\S+@\S+\.\S+$/.test(field.value)) message = 'Enter a valid email address.';
      else if ((field.name === 'zip' || field.name === 'billingZip') && !/^\d{5}$/.test(field.value)) message = 'Enter a valid 5-digit ZIP code.';
      else if (field.name === 'cardNumber' && field.value.replace(/\D/g, '').length < 15) message = 'Enter a complete test card number.';
      else if (field.name === 'expiry' && !/^\d{2}\/\d{2}$/.test(field.value)) message = 'Use MM/YY for the test expiration.';
      else if (field.name === 'cvc' && !/^\d{3,4}$/.test(field.value)) message = 'Enter a 3 or 4 digit security code.';
      if (message) {
        errors.push({ field, message });
        const wrap = field.closest('.field') || field.closest('label'); wrap?.classList.add('has-error');
        const error = document.createElement('p'); error.className = 'field-error'; error.dataset.checkoutFieldError = ''; error.id = `${field.name}-checkout-error`; error.textContent = message; wrap?.append(error); field.setAttribute('aria-describedby', error.id);
      }
    });
    const summary = document.querySelector('[data-checkout-errors]');
    if (errors.length) {
      summary.querySelector('ul').innerHTML = errors.map(({ field, message }) => `<li><a href="#${field.id || field.name}">${message}</a></li>`).join(''); summary.hidden = false; summary.focus();
      return false;
    }
    summary.hidden = true; return true;
  };

  form.addEventListener('input', save, { signal: window.pageAbort?.signal });
  form.addEventListener('change', (event) => { save(); if (['fulfillment','billingSame'].includes(event.target.name)) updateConditional(); }, { signal: window.pageAbort?.signal });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    document.querySelector('[data-payment-error]').hidden = true;
    if (submitting || !validate()) return;
    const digits = form.elements.cardNumber.value.replace(/\D/g, '');
    const button = document.querySelector('[data-place-order]');
    button.disabled = true; button.innerHTML = '<span class="spinner"></span> Authorizing test order…'; submitting = true;
    window.setTimeout(() => {
      if (digits.endsWith('0000')) {
        submitting = false; button.disabled = false; button.innerHTML = `${icon('lock')} Place test order · <span data-place-order-total>${money(cartSubtotal(cart) - getDiscount(cartSubtotal(cart)) + shipping)}</span>`;
        const paymentError = document.querySelector('[data-payment-error]'); paymentError.hidden = false; paymentError.scrollIntoView({ behavior: 'smooth', block: 'center' }); paymentError.setAttribute('tabindex', '-1'); paymentError.focus(); return;
      }
      const order = {
        orderNumber: createReference('TC'),
        items: cart,
        fulfillment: form.elements.fulfillment.value,
        city: form.elements.city.value,
        state: form.elements.state.value,
        subtotal: cartSubtotal(cart), discount: getDiscount(cartSubtotal(cart)), shipping,
        total: cartSubtotal(cart) - getDiscount(cartSubtotal(cart)) + shipping,
        accountOffer: form.elements.createAccount.checked
      };
      sessionStorage.setItem('temima-order-confirmation', JSON.stringify(order));
      track('purchase', { transaction_id: order.orderNumber, value: order.total, currency: 'USD', shipping: order.shipping, tax: 0, item_count: cart.reduce((total, item) => total + item.quantity, 0), prototype: true });
      clearCart(); clearCheckout(); sessionStorage.removeItem('temima-demo-discount'); window.temimaNavigate('/order-confirmation');
    }, 1200);
  }, { signal: window.pageAbort?.signal });

  document.querySelector('[data-returning-login]').addEventListener('click', () => window.temimaToast?.('Returning-customer login will connect to the WooCommerce account flow.', 'info'), { signal: window.pageAbort?.signal });
  updateConditional(); save();
  track('begin_checkout', { value: cartSubtotal(cart), currency: 'USD', item_count: cart.reduce((total, item) => total + item.quantity, 0) });
};
