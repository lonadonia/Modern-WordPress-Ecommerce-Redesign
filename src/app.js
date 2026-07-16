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

const initHeroBackdrop = (signal) => {
  const backdrop = document.querySelector('[data-hero-backdrop]');
  const controls = document.querySelector('[data-hero-backdrop-controls]');
  const canvas = backdrop?.querySelector('[data-backdrop-canvas]');
  const context = canvas?.getContext('2d', { alpha: false });
  if (!backdrop || !controls || !canvas || !context) return;
  const slides = [...backdrop.querySelectorAll('[data-backdrop-slide]')];
  const dots = [...controls.querySelectorAll('[data-backdrop-dot]')];
  const current = controls.querySelector('[data-backdrop-current]');
  const toggle = controls.querySelector('[data-backdrop-toggle]');
  const status = document.querySelector('[data-backdrop-status]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = window.matchMedia('(max-width: 640px)');
  const transitionDuration = 1600;
  const focalPoints = [[.5, .5], [.51, .5], [.49, .49], [.51, .5]];
  let index = 0;
  let timer = null;
  let animationFrame = null;
  let imagesReady = false;
  let intentionallyPaused = false;

  const sceneFocalPoint = (sceneIndex) => mobile.matches ? [.62, .5] : focalPoints[sceneIndex] || [.5, .5];

  const drawCover = (image, sceneIndex, alpha = 1, zoom = 1.01) => {
    if (!image?.naturalWidth || !image?.naturalHeight) return;
    const width = canvas.width;
    const height = canvas.height;
    const [focusX, focusY] = sceneFocalPoint(sceneIndex);
    const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight) * zoom;
    const drawWidth = image.naturalWidth * scale;
    const drawHeight = image.naturalHeight * scale;
    context.save();
    context.globalAlpha = alpha;
    context.drawImage(image, (width - drawWidth) * focusX, (height - drawHeight) * focusY, drawWidth, drawHeight);
    context.restore();
  };

  const clearCanvas = () => {
    context.globalAlpha = 1;
    context.fillStyle = '#091321';
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  const drawScene = (sceneIndex) => {
    clearCanvas();
    drawCover(slides[sceneIndex], sceneIndex);
  };

  const resizeCanvas = () => {
    const bounds = backdrop.getBoundingClientRect();
    const density = Math.min(window.devicePixelRatio || 1, 1.5);
    const width = Math.max(1, Math.round(bounds.width * density));
    const height = Math.max(1, Math.round(bounds.height * density));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    if (imagesReady) drawScene(index);
  };

  const animateScene = (previousIndex, nextIndex) => {
    if (animationFrame) window.cancelAnimationFrame(animationFrame);
    if (!imagesReady || reducedMotion.matches) {
      drawScene(nextIndex);
      return;
    }
    const startedAt = performance.now();
    const paint = (now) => {
      const progress = Math.min(1, (now - startedAt) / transitionDuration);
      const eased = progress * progress * (3 - (2 * progress));
      clearCanvas();
      drawCover(slides[previousIndex], previousIndex, 1, 1.01 + (.012 * eased));
      drawCover(slides[nextIndex], nextIndex, eased, 1.025 - (.015 * eased));
      if (progress < 1) animationFrame = window.requestAnimationFrame(paint);
      else {
        animationFrame = null;
        drawScene(nextIndex);
      }
    };
    animationFrame = window.requestAnimationFrame(paint);
  };

  const showScene = (nextIndex, announce = false) => {
    const normalized = (nextIndex + slides.length) % slides.length;
    if (normalized === index) return;
    const previousIndex = index;
    dots[index]?.classList.remove('is-active');
    index = normalized;
    dots[index]?.classList.add('is-active');
    if (current) current.textContent = String(index + 1).padStart(2, '0');
    if (announce && status) status.textContent = `Kitchen scene ${index + 1} of ${slides.length}`;
    animateScene(previousIndex, index);
  };

  const stop = () => {
    if (timer) window.clearTimeout(timer);
    timer = null;
  };

  const updateControl = () => {
    if (!toggle) return;
    toggle.hidden = reducedMotion.matches;
    toggle.setAttribute('aria-label', intentionallyPaused ? 'Resume kitchen slideshow' : 'Pause kitchen slideshow');
    toggle.innerHTML = icon(intentionallyPaused ? 'play' : 'pause');
  };

  const schedule = () => {
    stop();
    const paused = !imagesReady || reducedMotion.matches || document.hidden || intentionallyPaused || slides.length < 2;
    controls.classList.toggle('is-paused', paused);
    updateControl();
    if (paused) {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = null;
        if (imagesReady) drawScene(index);
      }
      return;
    }
    const activeDot = dots[index];
    activeDot?.classList.remove('is-active');
    if (activeDot) {
      void activeDot.offsetWidth;
      activeDot.classList.add('is-active');
    }
    timer = window.setTimeout(() => {
      showScene(index + 1);
      schedule();
    }, 6800);
  };

  const select = (nextIndex) => { showScene(nextIndex, true); schedule(); };
  controls.querySelector('[data-backdrop-previous]')?.addEventListener('click', () => select(index - 1), { signal });
  controls.querySelector('[data-backdrop-next]')?.addEventListener('click', () => select(index + 1), { signal });
  toggle?.addEventListener('click', () => { intentionallyPaused = !intentionallyPaused; schedule(); }, { signal });
  document.addEventListener('visibilitychange', schedule, { signal });
  reducedMotion.addEventListener('change', () => { if (imagesReady) drawScene(index); schedule(); }, { signal });
  mobile.addEventListener('change', resizeCanvas, { signal });
  const resizeObserver = 'ResizeObserver' in window ? new ResizeObserver(resizeCanvas) : null;
  if (resizeObserver) resizeObserver.observe(backdrop);
  else window.addEventListener('resize', resizeCanvas, { passive: true, signal });
  backdrop.dataset.transitionMs = String(transitionDuration);
  resizeCanvas();
  Promise.all(slides.map((slide) => slide.decode().catch(() => undefined))).then(() => {
    if (signal.aborted) return;
    imagesReady = slides.every((slide) => slide.complete && slide.naturalWidth > 0);
    backdrop.classList.toggle('is-canvas-ready', imagesReady);
    controls.hidden = !imagesReady;
    if (imagesReady) drawScene(index);
    schedule();
  });
  signal.addEventListener('abort', () => {
    stop();
    resizeObserver?.disconnect();
    if (animationFrame) window.cancelAnimationFrame(animationFrame);
  }, { once: true });
};

const initHeroProducts = (signal) => {
  const gallery = document.querySelector('[data-hero-products]');
  if (!gallery) return;
  const slides = [...gallery.querySelectorAll('[data-hero-product-slide]')];
  const name = gallery.querySelector('[data-hero-product-name]');
  const status = gallery.querySelector('[data-product-status]');
  let index = Math.max(0, slides.findIndex((slide) => slide.classList.contains('is-active')));
  let touchStart = null;

  const showProduct = (nextIndex, announce = false) => {
    const normalized = (nextIndex + slides.length) % slides.length;
    if (normalized === index) return;
    slides[index].classList.remove('is-active');
    slides[index].setAttribute('aria-hidden', 'true');
    index = normalized;
    slides[index].classList.add('is-active');
    slides[index].setAttribute('aria-hidden', 'false');
    const label = slides[index].dataset.productLabel || `Product ${index + 1}`;
    if (name) name.textContent = label;
    if (announce && status) status.textContent = `${label}, product ${index + 1} of ${slides.length}`;
  };

  gallery.querySelector('[data-product-previous]')?.addEventListener('click', () => showProduct(index - 1, true), { signal });
  gallery.querySelector('[data-product-next]')?.addEventListener('click', () => showProduct(index + 1, true), { signal });
  gallery.addEventListener('pointerdown', (event) => { if (event.pointerType === 'touch') touchStart = event.clientX; }, { signal });
  gallery.addEventListener('pointerup', (event) => {
    if (touchStart === null) return;
    const distance = event.clientX - touchStart;
    touchStart = null;
    if (Math.abs(distance) > 36) showProduct(index + (distance < 0 ? 1 : -1), true);
  }, { signal });
  gallery.addEventListener('pointercancel', () => { touchStart = null; }, { signal });
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
  initHeroBackdrop(signal);
  initHeroProducts(signal);
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
