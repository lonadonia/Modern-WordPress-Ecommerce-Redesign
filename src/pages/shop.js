import { categories, products, shopFaqs } from '../data.js';
import { breadcrumbs, designHelpPanel, faqList, productCard, sectionIntro } from '../components.js';
import { icon } from '../icons.js';
import { addToCart, track } from '../store.js';

const filterMarkup = (prefix) => `
  <form class="filter-form" data-filter-form="${prefix}">
    <fieldset><legend>Cabinet type</legend>${[
      ['base', 'Base cabinets'], ['wall', 'Wall cabinets'], ['tall', 'Tall & pantry'], ['open', 'Open storage'], ['corner', 'Corner cabinets'], ['accessory', 'Finishing pieces']
    ].map(([value, label]) => `<label class="check-row"><input type="checkbox" name="type" value="${value}" /><span>${label}</span><small>${products.filter((product) => product.category === value).length}</small></label>`).join('')}</fieldset>
    <fieldset><legend>Width</legend><div class="filter-pills">${[3, 15, 18, 21, 24, 36].map((width) => `<label><input type="checkbox" name="width" value="${width}" /><span>${width}″</span></label>`).join('')}</div></fieldset>
    <fieldset><legend>Height</legend><div class="filter-pills">${[30, 34.5, 84].map((height) => `<label><input type="checkbox" name="height" value="${height}" /><span>${height}″</span></label>`).join('')}</div></fieldset>
    <fieldset><legend>Depth</legend><div class="filter-pills">${[12, 24].map((depth) => `<label><input type="checkbox" name="depth" value="${depth}" /><span>${depth}″</span></label>`).join('')}</div></fieldset>
    <fieldset><legend>Style & finish</legend><label class="check-row"><input type="checkbox" name="style" value="shaker" /><span>Shaker</span><small>${products.length}</small></label><label class="check-row"><input type="checkbox" name="finish" value="white" /><span>Painted white</span><small>${products.length}</small></label></fieldset>
    <fieldset><legend>Prototype price</legend><label class="check-row"><input type="radio" name="price" value="" checked /><span>Any price</span></label><label class="check-row"><input type="radio" name="price" value="under-250" /><span>Under $250</span></label><label class="check-row"><input type="radio" name="price" value="250-400" /><span>$250–$400</span></label><label class="check-row"><input type="radio" name="price" value="over-400" /><span>$400+</span></label></fieldset>
    <fieldset><legend>Fulfillment</legend><label class="check-row"><input type="checkbox" name="delivery" value="continental-us" /><span>Continental U.S. ZIP check</span><small>${products.length}</small></label><p class="filter-note">Live stock and lead-time data were not supplied.</p></fieldset>
  </form>`;

export const shopPage = () => `
  <main id="main-content">
    ${breadcrumbs([{ label: 'Home', href: '/' }, { label: 'Shop', href: '/shop/white-shaker-cabinets' }, { label: 'White Shaker Cabinets' }])}
    <section class="catalog-hero">
      <div class="container catalog-hero__grid"><div><span class="eyebrow">White Shaker collection</span><h1>White Shaker Cabinets</h1><p>A calm, versatile cabinet style organized by function and size. Browse individual pieces, then verify the complete run against your room plan.</p><div class="catalog-hero__links"><a class="text-link" href="/#measurement-help" data-link>${icon('ruler')} How to measure</a><a class="text-link" href="/free-3d-kitchen-design" data-link>${icon('pencil')} Ask a designer to plan it</a></div></div><div class="catalog-hero__sample"><img src="/assets/hero-kitchen.jpg" width="1920" height="1080" alt="Finished white Shaker kitchen" /><div><span>Planning first?</span><strong>Share your room for a free 3D design.</strong><a href="/free-3d-kitchen-design" data-link>Start here ${icon('arrow')}</a></div></div></div>
    </section>

    <section class="subcategory-section">
      <div class="container"><div class="subcategory-scroll" aria-label="Browse cabinet types">${categories.map((category) => `<a href="/shop/white-shaker-cabinets?type=${category.id}" data-link><img src="${category.image}" width="160" height="160" alt="" /><span><strong>${category.name}</strong><small>${category.count} prototype item${category.count === 1 ? '' : 's'}</small></span></a>`).join('')}</div></div>
    </section>

    <section class="catalog-section">
      <div class="container">
        <div class="catalog-notice">${icon('info')} <p><strong>Catalog data checkpoint:</strong> images and the White Shaker category come from the source snapshot. Prices, SKUs and exact attribute mappings are functional prototype values pending WooCommerce export validation.</p><button type="button" data-dismiss-notice aria-label="Dismiss note">${icon('close')}</button></div>
        <div class="catalog-toolbar">
          <button class="button button--filter" type="button" data-open-dialog="filter-dialog">${icon('filter')} Filters <span data-filter-count>0</span></button>
          <p data-result-count aria-live="polite">Showing ${products.length} products</p>
          <div class="active-filters" data-active-filters></div>
          <label class="sort-control"><span>Sort by</span><select data-sort><option value="featured">Recommended</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="width-asc">Width: narrow to wide</option><option value="name">Name: A–Z</option></select>${icon('chevron')}</label>
        </div>
        <div class="catalog-layout">
          <aside class="filter-rail" aria-label="Product filters"><div class="filter-rail__head"><h2>Filter cabinets</h2><button type="button" data-clear-filters>Clear all</button></div>${filterMarkup('desktop')}</aside>
          <div class="catalog-results">
            <div class="product-grid product-grid--three" data-product-grid aria-busy="false">${products.map(productCard).join('')}</div>
            <div class="catalog-empty" data-catalog-empty hidden>${icon('search')}<h2>No cabinets match those filters.</h2><p>Clear a filter or send your measurements to a designer for another route.</p><button class="button button--dark" type="button" data-clear-filters>Clear filters</button></div>
            ${designHelpPanel({ title: 'A filter can narrow the list. A designer can check the whole room.' })}
          </div>
        </div>
      </div>
    </section>

    <dialog class="filter-dialog" id="filter-dialog" aria-labelledby="filter-title">
      <div class="filter-dialog__head"><div><span class="eyebrow">Refine results</span><h2 id="filter-title">Cabinet filters</h2></div><button class="icon-button" type="button" data-close-dialog aria-label="Close filters">${icon('close')}</button></div>
      <div class="filter-dialog__body">${filterMarkup('mobile')}</div>
      <div class="filter-dialog__actions"><button class="button button--secondary" type="button" data-clear-filters>Clear all</button><button class="button button--primary" type="button" data-apply-filters>Show <span data-mobile-result-count>${products.length}</span> products</button></div>
    </dialog>

    <section class="section catalog-guide" id="buying-guide">
      <div class="container buying-guide__grid"><div><span class="eyebrow">White Shaker buying guide</span><h2>Build the run in the right order.</h2><p>Start with fixed constraints—room dimensions, appliance widths, openings and plumbing. Then place primary cabinets, corner solutions and fillers before adding finishing pieces.</p><div class="guide-links"><a href="/#measurement-help" data-link>${icon('ruler')} Measurement checklist ${icon('arrow')}</a><a href="/free-3d-kitchen-design" data-link>${icon('pencil')} Designer verification ${icon('arrow')}</a><a href="mailto:info@temimacabinets.com">${icon('phone')} Ask a product question ${icon('arrow')}</a></div></div><div class="cabinet-anatomy"><div class="anatomy-cabinet"><span class="anatomy-drawer"></span><span class="anatomy-door"></span><i class="anatomy-width">Width</i><i class="anatomy-height">Height</i><i class="anatomy-depth">Depth</i></div><div><strong>Read dimensions as W × H × D</strong><p>Exact product dimensions and fit tolerances must come from the approved product record and final design.</p></div></div></div>
    </section>

    <section class="section faq-section section--ivory">
      <div class="container faq-layout"><div><span class="eyebrow">Before you choose</span><h2>Cabinet shopping questions, answered plainly.</h2><p>Technical product data in the prototype remains intentionally labeled until the production catalog is supplied.</p></div>${faqList(shopFaqs, 'category-faq')}</div>
    </section>
  </main>`;

const getSelected = (form) => {
  const data = new FormData(form);
  const selected = {};
  for (const [name, value] of data.entries()) {
    if (!value) continue;
    selected[name] = selected[name] || [];
    selected[name].push(value);
  }
  return selected;
};

const productMatches = (product, filters) => {
  if (filters.type?.length && !filters.type.includes(product.category)) return false;
  if (filters.width?.length && !filters.width.includes(String(product.width))) return false;
  if (filters.height?.length && !filters.height.includes(String(product.height))) return false;
  if (filters.depth?.length && !filters.depth.includes(String(product.depth))) return false;
  if (filters.price?.length) {
    const range = filters.price[0];
    if (range === 'under-250' && product.price >= 250) return false;
    if (range === '250-400' && (product.price < 250 || product.price > 400)) return false;
    if (range === 'over-400' && product.price <= 400) return false;
  }
  return true;
};

const labels = {
  base: 'Base cabinets', wall: 'Wall cabinets', tall: 'Tall & pantry', open: 'Open storage', corner: 'Corner cabinets', accessory: 'Finishing pieces',
  shaker: 'Shaker', white: 'Painted white', 'continental-us': 'Continental U.S. ZIP check',
  'under-250': 'Under $250', '250-400': '$250–$400', 'over-400': '$400+'
};

export const initShopPage = () => {
  const forms = [...document.querySelectorAll('[data-filter-form]')];
  const grid = document.querySelector('[data-product-grid]');
  if (!grid || !forms.length) return;
  const cards = [...grid.querySelectorAll('[data-product-card]')];
  const params = new URLSearchParams(location.search);
  const sort = document.querySelector('[data-sort]');
  const keys = ['type', 'width', 'height', 'depth', 'style', 'finish', 'price', 'delivery'];
  let active = {};

  keys.forEach((key) => {
    const values = params.getAll(key).flatMap((value) => value.split(',')).filter(Boolean);
    if (values.length) active[key] = values;
  });
  if (params.get('sort')) sort.value = params.get('sort');

  const syncForms = () => {
    forms.forEach((form) => form.querySelectorAll('input').forEach((input) => {
      if (input.type === 'radio' && input.value === '') input.checked = !active.price?.length;
      else input.checked = active[input.name]?.includes(input.value) || false;
    }));
  };

  const renderChips = () => {
    const wrap = document.querySelector('[data-active-filters]');
    const entries = Object.entries(active).flatMap(([name, values]) => values.map((value) => ({ name, value })));
    wrap.innerHTML = entries.map(({ name, value }) => `<button type="button" data-remove-filter="${name}:${value}">${labels[value] || (name === 'width' || name === 'height' || name === 'depth' ? `${value}″ ${name}` : value)} ${icon('close')}</button>`).join('');
    document.querySelectorAll('[data-filter-count]').forEach((node) => { node.textContent = entries.length; node.hidden = entries.length === 0; });
  };

  const updateUrl = (push = true) => {
    const next = new URL(location.href);
    keys.forEach((key) => next.searchParams.delete(key));
    Object.entries(active).forEach(([key, values]) => values.forEach((value) => next.searchParams.append(key, value)));
    if (sort.value === 'featured') next.searchParams.delete('sort'); else next.searchParams.set('sort', sort.value);
    history[push ? 'pushState' : 'replaceState']({}, '', `${next.pathname}${next.search}`);
  };

  const render = (push = false) => {
    grid.setAttribute('aria-busy', 'true');
    grid.classList.add('is-loading');
    const matched = products.filter((product) => productMatches(product, active));
    const sorted = [...matched].sort((a, b) => {
      if (sort.value === 'price-asc') return a.price - b.price;
      if (sort.value === 'price-desc') return b.price - a.price;
      if (sort.value === 'width-asc') return a.width - b.width;
      if (sort.value === 'name') return a.name.localeCompare(b.name);
      return products.indexOf(a) - products.indexOf(b);
    });
    sorted.forEach((product) => {
      const card = cards.find((node) => node.querySelector(`[data-select-item="${product.id}"]`));
      if (card) grid.append(card);
    });
    cards.forEach((card) => { card.hidden = !matched.some((product) => card.querySelector(`[data-select-item="${product.id}"]`)); });
    document.querySelector('[data-result-count]').textContent = `Showing ${matched.length} of ${products.length} products`;
    document.querySelector('[data-mobile-result-count]').textContent = matched.length;
    document.querySelector('[data-catalog-empty]').hidden = matched.length !== 0;
    renderChips();
    if (push) updateUrl(true);
    window.setTimeout(() => { grid.classList.remove('is-loading'); grid.setAttribute('aria-busy', 'false'); }, 180);
  };

  const applyFrom = (form, push = true) => {
    active = getSelected(form);
    syncForms(); render(push);
  };

  forms.forEach((form) => form.addEventListener('change', () => {
    if (form.dataset.filterForm === 'desktop') applyFrom(form, true);
    else {
      active = getSelected(form); syncForms(); render(false);
    }
  }));
  sort.addEventListener('change', () => { render(true); });
  document.addEventListener('click', (event) => {
    const remove = event.target.closest('[data-remove-filter]');
    if (remove) {
      const [name, value] = remove.dataset.removeFilter.split(':');
      active[name] = (active[name] || []).filter((item) => item !== value);
      if (!active[name].length) delete active[name];
      syncForms(); render(true);
    }
    if (event.target.closest('[data-clear-filters]')) { active = {}; syncForms(); render(true); }
    if (event.target.closest('[data-apply-filters]')) {
      updateUrl(true);
      document.getElementById('filter-dialog')?.close();
    }
    if (event.target.closest('[data-dismiss-notice]')) event.target.closest('.catalog-notice').remove();
    const quick = event.target.closest('[data-quick-add]');
    if (quick) {
      const product = products.find((item) => item.id === quick.dataset.quickAdd);
      addToCart({ productId: product.id, title: product.name, sku: product.sku, width: product.width, height: product.height, depth: product.depth, finish: product.finish, configuration: product.type, price: product.price, image: product.image, quantity: 1, availability: product.availability });
      window.temimaToast?.(`${product.shortName} added to cart.`, 'success', '/cart');
    }
  }, { signal: window.pageAbort?.signal });
  syncForms();
  render(false);
  track('select_item', { item_list_name: 'White Shaker Cabinets', visible_items: products.filter((product) => productMatches(product, active)).length });
};
