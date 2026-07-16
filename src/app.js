import './styles.css';
import './responsive.css';
import { products, homeFaqs, shopFaqs } from './data.js';
import { checkoutHeader, productSearchResults, siteFooter, siteHeader } from './components.js';
import { cartCount, addToCart, track } from './store.js';
import { homePage } from './pages/home.js';
import { initShopPage, shopPage } from './pages/shop.js';
import { initProductPage, productPage } from './pages/product.js';
import { initQuotePage, quotePage } from './pages/quote.js';
import { cartPage, initCartPage } from './pages/cart.js';
import { checkoutPage, initCheckoutPage } from './pages/checkout.js';
import { initOrderConfirmation, initQuoteConfirmation, notFoundPage, orderConfirmationPage, quoteConfirmationPage } from './pages/confirmations.js';
import { icon } from './icons.js';

const app = document.getElementById('app');
let initialRender = true;
window.pageAbort = new AbortController();

const normalizePath = (path) => path !== '/' ? path.replace(/\/+$/, '') : path;

const routes = [
  { test: (path) => path === '/', title: 'Temima Cabinets | Plan, select and order with confidence', description: 'Shop ready-to-assemble kitchen cabinets or start a free 3D kitchen design with Temima Cabinets.', page: homePage, init: () => {}, faq: homeFaqs },
  { test: (path) => path === '/shop/white-shaker-cabinets', title: 'White Shaker Cabinets | Temima Cabinets', description: 'Browse White Shaker base, wall, pantry and finishing cabinets with clear filters and measurement help.', page: shopPage, init: initShopPage, faq: shopFaqs },
  { test: (path) => path.startsWith('/product/'), title: 'White Shaker Base Cabinet | Temima Cabinets', description: 'Choose a White Shaker base cabinet configuration with visible dimensions and designer verification support.', page: productPage, init: initProductPage, product: true },
  { test: (path) => path === '/free-3d-kitchen-design', title: 'Free 3D Kitchen Design | Temima Cabinets', description: 'Share your kitchen photos, rough dimensions or plan and begin a free 3D kitchen design request.', page: quotePage, init: initQuotePage },
  { test: (path) => path === '/cart', title: 'Your Cabinet Cart | Temima Cabinets', description: 'Review cabinet configurations, update quantities and proceed to secure prototype checkout.', page: cartPage, init: initCartPage },
  { test: (path) => path === '/checkout', title: 'Secure Guest Checkout | Temima Cabinets', description: 'Complete a guest-first cabinet checkout simulation with visible product configurations.', page: checkoutPage, init: initCheckoutPage, checkout: true },
  { test: (path) => path === '/order-confirmation', title: 'Test Order Confirmation | Temima Cabinets', description: 'Review the result of your Temima Cabinets prototype order.', page: orderConfirmationPage, init: initOrderConfirmation, checkout: true },
  { test: (path) => path === '/quote-confirmation', title: 'Design Request Confirmation | Temima Cabinets', description: 'Review your prototype 3D kitchen design request and next steps.', page: quoteConfirmationPage, init: initQuoteConfirmation }
];

const checkoutFooter = () => `<footer class="checkout-footer"><div class="container"><p>© ${new Date().getFullYear()} Temima Cabinets · Secure checkout prototype</p><div><a href="mailto:info@temimacabinets.com">Support</a><a href="/#policies" data-link>Privacy</a><a href="/#policies" data-link>Terms</a></div></div></footer>`;

const setMetadata = (route) => {
  document.title = route?.title || 'Page not found | Temima Cabinets';
  document.querySelector('meta[name="description"]')?.setAttribute('content', route?.description || 'The requested Temima Cabinets page could not be found.');
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.href = `https://temimacabinets.com${location.pathname}`;
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', route?.description || '');
  document.querySelectorAll('[data-page-schema]').forEach((node) => node.remove());
  let schema = null;
  if (route?.faq) schema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: route.faq.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) };
  if (route?.product) schema = { '@context': 'https://schema.org', '@type': 'Product', name: 'White Shaker Base Cabinet', image: ['https://temimacabinets.com/assets/drawer-door-base.webp'], description: 'A configurable White Shaker base cabinet. Production SKU, offer and availability data must come from WooCommerce.', category: 'Kitchen Cabinets', brand: { '@type': 'Brand', name: 'Temima Cabinets' } };
  if (schema) { const script = document.createElement('script'); script.type = 'application/ld+json'; script.dataset.pageSchema = ''; script.textContent = JSON.stringify(schema); document.head.append(script); }
};

const updateCartBadge = () => {
  const count = cartCount();
  document.querySelectorAll('[data-cart-count]').forEach((node) => { node.textContent = count; node.hidden = count === 0; });
  document.querySelectorAll('.cart-link').forEach((node) => node.setAttribute('aria-label', `View cart, ${count} item${count === 1 ? '' : 's'}`));
};

const focusables = (root) => [...root.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')].filter((item) => !item.hidden && item.offsetParent !== null);

const trapFocus = (container, event) => {
  if (event.key !== 'Tab') return;
  const items = focusables(container); if (!items.length) return;
  const first = items[0]; const last = items[items.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
};

const showToast = (message, type = 'info', actionPath = '') => {
  const region = document.querySelector('[data-toast-region]');
  if (!region) return;
  const toast = document.createElement('div'); toast.className = `toast toast--${type}`;
  toast.innerHTML = `${type === 'success' ? icon('check') : type === 'error' ? icon('alert') : icon('info')}<span>${message}</span>${actionPath ? `<a href="${actionPath}" data-link>${actionPath === '/cart' ? 'View cart' : 'Continue'} ${icon('arrow')}</a>` : ''}<button type="button" aria-label="Dismiss message">${icon('close')}</button>`;
  region.append(toast); requestAnimationFrame(() => toast.classList.add('is-visible'));
  toast.querySelector('button').addEventListener('click', () => toast.remove());
  window.setTimeout(() => { toast.classList.remove('is-visible'); window.setTimeout(() => toast.remove(), 250); }, 5000);
};
window.temimaToast = showToast;

const closeDrawer = () => {
  const drawer = document.getElementById('mobile-nav'); const backdrop = document.querySelector('[data-drawer-backdrop]');
  if (!drawer) return;
  drawer.classList.remove('is-open'); drawer.setAttribute('aria-hidden', 'true'); backdrop.hidden = true; document.body.classList.remove('has-overlay');
};

const initPageMotion = (signal) => {
  const selectors = [
    '.section-intro', '.category-card', '.design-story__media', '.design-story__content', '.why-grid article',
    '.product-card', '.journey-grid article', '.project-card', '.review-card', '.measurement-grid > *',
    '.final-cta__inner', '.policy-band article', '.faq-layout > *', '.design-help', '.catalog-hero__grid > *',
    '.subcategory-scroll > *', '.catalog-notice', '.catalog-toolbar', '.catalog-results', '.buying-guide__grid > *',
    '.product-main__grid > *', '.product-details-grid > *', '.quote-hero__grid > *', '.quote-layout > *',
    '.cart-heading .container > *', '.cart-layout > *', '.checkout-heading .container > *', '.checkout-layout > *',
    '.confirmation-grid > *', '.confirmation-layout > *'
  ];
  const elements = [...new Set(document.querySelectorAll(selectors.join(',')))];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  elements.forEach((element) => {
    const siblingIndex = [...element.parentElement.children].indexOf(element);
    element.classList.add('motion-reveal');
    element.style.setProperty('--reveal-delay', `${Math.min(siblingIndex % 4, 3) * 70}ms`);
  });

  if (reducedMotion || !('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });

  elements.forEach((element) => observer.observe(element));
  signal.addEventListener('abort', () => observer.disconnect(), { once: true });
};

const initHeroVideo = (signal) => {
  const video = document.querySelector('.home-hero__video');
  const backdrop = document.querySelector('.home-hero__backdrop');
  const toggle = document.querySelector('[data-video-toggle]');
  if (!video || !backdrop || !toggle) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let intentionallyPaused = false;

  const updateControl = () => {
    const paused = intentionallyPaused || reducedMotion.matches;
    toggle.hidden = reducedMotion.matches;
    toggle.setAttribute('aria-label', paused ? 'Play background video' : 'Pause background video');
    toggle.innerHTML = `${icon(paused ? 'play' : 'pause')}<span>${paused ? 'Play film' : 'Pause film'}</span>`;
  };

  const syncPlayback = () => {
    if (reducedMotion.matches || intentionallyPaused || document.hidden) video.pause();
    else video.play().catch(() => { intentionallyPaused = true; updateControl(); });
    updateControl();
  };

  const markReady = () => backdrop.classList.add('is-video-ready');
  if (video.readyState >= 2) markReady(); else video.addEventListener('canplay', markReady, { once: true, signal });
  video.addEventListener('error', () => { backdrop.classList.add('is-video-unavailable'); toggle.hidden = true; }, { once: true, signal });
  toggle.addEventListener('click', () => { intentionallyPaused = !intentionallyPaused; syncPlayback(); }, { signal });
  reducedMotion.addEventListener('change', syncPlayback, { signal });
  document.addEventListener('visibilitychange', syncPlayback, { signal });
  syncPlayback();
};

const initGlobal = () => {
  const signal = window.pageAbort.signal;
  const header = document.querySelector('[data-site-header]');
  const sticky = () => header?.classList.toggle('is-sticky', scrollY > 80);
  window.addEventListener('scroll', sticky, { passive: true, signal }); sticky();

  document.addEventListener('click', (event) => {
    const anchor = event.target.closest('a[href]');
    if (anchor && anchor.dataset.link !== undefined) {
      const url = new URL(anchor.href, location.href);
      if (url.origin === location.origin) { event.preventDefault(); closeDrawer(); navigate(`${url.pathname}${url.search}${url.hash}`); return; }
    }
    const mega = event.target.closest('[data-mega-trigger]');
    if (mega) { const open = mega.getAttribute('aria-expanded') === 'true'; mega.setAttribute('aria-expanded', String(!open)); header?.classList.toggle('mega-open', !open); }
    else if (header?.classList.contains('mega-open') && !event.target.closest('.mega-menu')) { header.classList.remove('mega-open'); document.querySelector('[data-mega-trigger]')?.setAttribute('aria-expanded', 'false'); }

    const openDrawer = event.target.closest('[data-open-drawer]');
    if (openDrawer) { const drawer = document.getElementById(openDrawer.dataset.openDrawer); drawer.classList.add('is-open'); drawer.setAttribute('aria-hidden', 'false'); document.querySelector('[data-drawer-backdrop]').hidden = false; document.body.classList.add('has-overlay'); window.setTimeout(() => focusables(drawer)[0]?.focus(), 50); }
    if (event.target.closest('[data-close-drawer]') || event.target.closest('[data-drawer-backdrop]')) closeDrawer();

    const openDialog = event.target.closest('[data-open-dialog]');
    if (openDialog) { const dialog = document.getElementById(openDialog.dataset.openDialog); if (dialog && !dialog.open) { dialog.showModal(); window.setTimeout(() => (dialog.querySelector('input,button') || dialog).focus(), 30); } }
    const closeDialog = event.target.closest('[data-close-dialog]'); if (closeDialog) closeDialog.closest('dialog')?.close();
    if (event.target.closest('[data-account]')) showToast('Account access will connect to WooCommerce customer accounts in production.', 'info');

    const save = event.target.closest('[data-save-product]'); if (save) { const active = save.classList.toggle('is-saved'); save.setAttribute('aria-pressed', active); showToast(active ? 'Product saved on this screen.' : 'Product removed from saved items.', 'success'); }
    const selected = event.target.closest('[data-select-item]'); if (selected) track('select_item', { item_id: selected.dataset.selectItem, item_list_name: 'Product grid' });

    const plus = event.target.closest('[data-quantity-plus]'); const minus = event.target.closest('[data-quantity-minus]');
    if ((plus || minus) && !event.target.closest('[data-cart-line]')) { const control = event.target.closest('[data-quantity-control]'); const input = control.querySelector('[data-quantity-input]'); input.value = Math.max(1, Math.min(99, Number(input.value || 1) + (plus ? 1 : -1))); input.dispatchEvent(new Event('change', { bubbles: true })); }

    const quick = event.target.closest('[data-quick-add]');
    if (quick && normalizePath(location.pathname) !== '/shop/white-shaker-cabinets') {
      const product = products.find((item) => item.id === quick.dataset.quickAdd);
      if (product) { addToCart({ productId: product.id, title: product.name, sku: product.sku, width: product.width, height: product.height, depth: product.depth, finish: product.finish, configuration: product.type, price: product.price, image: product.image, quantity: 1, availability: product.availability }); showToast(`${product.shortName} added to cart.`, 'success', '/cart'); }
    }
  }, { signal });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') { if (header?.classList.contains('mega-open')) { header.classList.remove('mega-open'); document.querySelector('[data-mega-trigger]')?.setAttribute('aria-expanded', 'false'); document.querySelector('[data-mega-trigger]')?.focus(); } closeDrawer(); }
    const drawer = document.getElementById('mobile-nav'); if (drawer?.classList.contains('is-open')) trapFocus(drawer, event);
  }, { signal });

  document.querySelectorAll('dialog').forEach((dialog) => {
    dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); }, { signal });
    dialog.addEventListener('keydown', (event) => trapFocus(dialog, event), { signal });
  });
  const search = document.querySelector('[data-search-input]');
  search?.addEventListener('input', () => { document.querySelector('[data-search-results]').innerHTML = productSearchResults(search.value); }, { signal });
  initPageMotion(signal);
  initHeroVideo(signal);
  updateCartBadge();
};

const render = (focusMain = false) => {
  window.pageAbort.abort(); window.pageAbort = new AbortController();
  const path = normalizePath(location.pathname);
  const route = routes.find((item) => item.test(path));
  const checkout = route?.checkout;
  app.innerHTML = `${checkout ? checkoutHeader() : siteHeader()}${route ? route.page() : notFoundPage()}${checkout ? checkoutFooter() : siteFooter()}`;
  setMetadata(route); initGlobal(); route?.init?.(); updateCartBadge();
  document.body.dataset.route = path.replace(/^\//, '').split('/')[0] || 'home';
  requestAnimationFrame(() => {
    if (location.hash) document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({ block: 'start' }); else window.scrollTo({ top: 0, behavior: 'instant' });
    if (focusMain) { const main = document.getElementById('main-content'); main?.setAttribute('tabindex', '-1'); main?.focus({ preventScroll: true }); }
  });
  initialRender = false;
};

const navigate = (href, replace = false) => {
  const url = new URL(href, location.origin);
  if (`${location.pathname}${location.search}${location.hash}` !== `${url.pathname}${url.search}${url.hash}`) history[replace ? 'replaceState' : 'pushState']({}, '', `${url.pathname}${url.search}${url.hash}`);
  render(!initialRender);
};

window.temimaNavigate = navigate;
window.temimaRenderCurrent = () => render(false);
window.addEventListener('popstate', () => render(true));
window.addEventListener('cart:change', updateCartBadge);

render(false);
