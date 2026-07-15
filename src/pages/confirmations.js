import { contact } from '../data.js';
import { designHelpPanel } from '../components.js';
import { icon } from '../icons.js';
import { money, track } from '../store.js';

const readSession = (key) => {
  try { return JSON.parse(sessionStorage.getItem(key)); } catch { return null; }
};

const displayLabels = {
  'full-kitchen': 'Full kitchen', 'kitchen-update': 'Kitchen update', bathroom: 'Bathroom or vanity',
  '3d-design': '3D kitchen design', 'cabinet-list': 'Cabinet selection and quote', review: 'Existing-plan review',
  'l-shape': 'L-shape', 'u-shape': 'U-shape', 'single-wall': 'Single wall', galley: 'Galley', island: 'Island / open plan',
  'under-5': 'Under $5,000', '5-10': '$5,000–$10,000', '10-20': '$10,000–$20,000', '20-30': '$20,000–$30,000', '30-plus': '$30,000+',
  asap: 'As soon as practical', '1-2': '1–2 months', '3-6': '3–6 months', '6-plus': '6+ months', planning: 'Just planning', unknown: 'Not sure'
};
const label = (value = '') => displayLabels[value] || value.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

export const quoteConfirmationPage = () => {
  const quote = readSession('temima-quote-confirmation');
  if (!quote) return `<main id="main-content"><section class="empty-state empty-state--confirmation"><div class="empty-state__visual">${icon('pencil')}<span></span></div><span class="eyebrow">Design request</span><h1>No recent prototype request was found.</h1><p>Start the four-step form to see the complete confirmation experience.</p><a class="button button--primary button--large" href="/free-3d-kitchen-design" data-link>Start a free design ${icon('arrow')}</a></section></main>`;
  return `<main id="main-content" class="confirmation-page"><section class="confirmation-hero confirmation-hero--quote"><div class="container confirmation-grid"><div class="success-mark">${icon('check')}</div><div><span class="eyebrow">Prototype request complete</span><h1>Your room has a clear next step.</h1><p>The front-end simulation captured the project summary below. No CRM message, email or file upload was actually sent.</p><div class="reference-card"><small>Reference number</small><strong>${quote.reference}</strong><button type="button" data-copy-reference="${quote.reference}">${icon('file')} Copy</button></div></div><img src="/assets/design-consultation.jpg" width="800" height="600" alt="Designer reviewing a kitchen plan" /></div></section>
    <section class="section confirmation-content"><div class="container confirmation-layout"><div><span class="eyebrow">What happens next in production</span><h2>A designer reviews the room context.</h2><div class="next-step-list"><article><span>1</span><div><strong>Submission is routed</strong><p>The WordPress form will send a structured lead summary and secure file links to the approved destination.</p></div></article><article><span>2</span><div><strong>Details are clarified</strong><p>The team confirms measurements, goals and response timing using your preferred contact method.</p></div></article><article><span>3</span><div><strong>A plan and cabinet path take shape</strong><p>You review the recommendation and verify final dimensions before purchase.</p></div></article></div><div class="button-row"><button class="button button--primary" type="button" data-schedule-treatment>View scheduling treatment ${icon('arrow')}</button><a class="button button--secondary" href="/shop/white-shaker-cabinets" data-link>Return to shop</a></div></div><aside class="submission-summary"><span class="eyebrow">Your summary</span><h2>${quote.reference}</h2><dl><div><dt>Project</dt><dd>${label(quote.projectType)}</dd></div><div><dt>Requested help</dt><dd>${label(quote.service)}</dd></div><div><dt>Layout</dt><dd>${label(quote.layout)}</dd></div><div><dt>Budget range</dt><dd>${label(quote.budget)}</dd></div><div><dt>Timing</dt><dd>${label(quote.timing)}</dd></div><div><dt>Files selected</dt><dd>${quote.fileCount}</dd></div></dl><div class="confirmation-contact"><strong>Need to add context?</strong><a href="${contact.phoneHref}">${icon('phone')} ${contact.phoneDisplay}</a><a href="mailto:${contact.email}">${icon('mail')} ${contact.email}</a></div></aside></div></section></main>`;
};

export const initQuoteConfirmation = () => {
  const quote = readSession('temima-quote-confirmation');
  if (!quote) return;
  track('quote_confirmation_view', { reference_type: 'design', project_type: quote.projectType });
  document.addEventListener('click', async (event) => {
    const copy = event.target.closest('[data-copy-reference]');
    if (copy) { try { await navigator.clipboard.writeText(copy.dataset.copyReference); window.temimaToast?.('Reference number copied.', 'success'); } catch { window.temimaToast?.('Select the reference number to copy it.', 'info'); } }
    if (event.target.closest('[data-schedule-treatment]')) window.temimaToast?.('Scheduling will open the client-approved calendar or consultation tool in production.', 'info');
  }, { signal: window.pageAbort?.signal });
};

export const orderConfirmationPage = () => {
  const order = readSession('temima-order-confirmation');
  if (!order) return `<main id="main-content"><section class="empty-state empty-state--confirmation"><div class="empty-state__visual">${icon('check')}<span></span></div><span class="eyebrow">Order confirmation</span><h1>No recent test order was found.</h1><p>Add a cabinet to the cart and complete guest checkout to see the full confirmation state.</p><a class="button button--primary button--large" href="/shop/white-shaker-cabinets" data-link>Return to shop ${icon('arrow')}</a></section></main>`;
  return `<main id="main-content" class="confirmation-page"><section class="confirmation-hero"><div class="container order-success"><div class="success-mark">${icon('check')}</div><span class="eyebrow">Test order placed</span><h1>Thank you—your checkout simulation is complete.</h1><p>No payment was processed, inventory changed or email sent. This confirmation demonstrates the production customer experience.</p><div class="order-meta"><div><small>Order number</small><strong>${order.orderNumber}</strong></div><div><small>Email status</small><strong>Prototype only · not sent</strong></div><div><small>Fulfillment</small><strong>${order.fulfillment === 'pickup' ? 'Pickup request · unconfirmed' : 'Freight delivery'}</strong></div></div></div></section>
    <section class="section confirmation-content"><div class="container confirmation-layout"><div><span class="eyebrow">Purchased items</span><h2>Every cabinet option follows the order.</h2><div class="confirmation-items">${order.items.map((item) => `<article><img src="${item.image}" width="100" height="100" alt="" /><div><strong>${item.title}</strong><span>${item.sku} · ${item.width}″ W · ${item.finish}</span><span>${item.configuration} · Qty ${item.quantity}</span></div><b>${money(item.price * item.quantity)}</b></article>`).join('')}</div><div class="confirmation-next"><h3>Expected production next steps</h3><ol><li>Order and payment confirmation emails are sent.</li><li>Inventory, freight access and delivery details are reviewed.</li><li>The carrier contacts the customer when scheduling applies.</li></ol></div><div class="button-row"><a class="button button--primary" href="/shop/white-shaker-cabinets" data-link>Continue shopping ${icon('arrow')}</a><a class="button button--secondary" href="mailto:${contact.serviceEmail}">Contact order support</a></div></div><aside class="submission-summary order-total-card"><span class="eyebrow">Order summary</span><h2>${order.orderNumber}</h2><dl><div><dt>Subtotal</dt><dd>${money(order.subtotal)}</dd></div><div><dt>Prototype discount</dt><dd>−${money(order.discount)}</dd></div><div><dt>Prototype shipping</dt><dd>${money(order.shipping)}</dd></div><div><dt>Tax</dt><dd>${money(0)}</dd></div><div class="total-row"><dt>Prototype total</dt><dd>${money(order.total)}</dd></div></dl>${order.fulfillment === 'delivery' ? `<div class="fulfillment-summary">${icon('truck')}<div><strong>Freight delivery</strong><p>${order.city ? `${order.city}, ${order.state}` : 'Address captured in checkout'} · timing confirmed after production order review.</p></div></div>` : `<div class="fulfillment-summary">${icon('location')}<div><strong>Pickup requested</strong><p>Availability and location require confirmation.</p></div></div>`}${order.accountOffer ? `<div class="account-offer"><strong>Save this order to an account?</strong><p>The production site can offer password creation after purchase.</p><button class="button button--secondary" type="button" data-account-treatment>Create account treatment</button></div>` : ''}</aside></div></section></main>`;
};

export const initOrderConfirmation = () => {
  document.querySelector('[data-account-treatment]')?.addEventListener('click', () => window.temimaToast?.('Account creation will connect to the WooCommerce customer endpoint.', 'info'), { signal: window.pageAbort?.signal });
};

export const notFoundPage = () => `<main id="main-content"><section class="empty-state"><div class="empty-state__visual">${icon('ruler')}<span></span></div><span class="eyebrow">404 · Page not found</span><h1>This cabinet path does not exist.</h1><p>Return to the collection or start a design if you are not sure where to go next.</p><div class="button-row"><a class="button button--primary" href="/shop/white-shaker-cabinets" data-link>Shop cabinets</a><a class="button button--secondary" href="/" data-link>Return home</a></div></section></main>`;
