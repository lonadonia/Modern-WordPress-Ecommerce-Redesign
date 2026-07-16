import { categories, homeFaqs, products, projects, reviews } from '../data.js';
import { designHelpPanel, faqList, productCard, sectionIntro, trustStrip } from '../components.js';
import { icon } from '../icons.js';

export const homePage = () => `
  <main id="main-content">
    <section class="home-hero">
      <div class="home-hero__backdrop" aria-hidden="true">
        <video class="home-hero__video" autoplay muted loop playsinline preload="metadata" poster="/assets/hero-kitchen.jpg" tabindex="-1">
          <source src="/assets/modern-kitchen-cabinets.mp4" type="video/mp4" />
        </video>
      </div>
      <div class="container home-hero__grid">
        <div class="home-hero__content">
          <span class="eyebrow eyebrow--light">Cabinets, planning and practical support</span>
          <h1>Build a kitchen you’ll love—without navigating it alone.</h1>
          <p>Shop ready-to-assemble cabinets with clear dimensions, or share your room with a designer for a free 3D plan and itemized next step.</p>
          <div class="hero-actions"><a class="button button--primary button--large" href="/shop/white-shaker-cabinets" data-link>Shop cabinets ${icon('arrow')}</a><a class="button button--ghost-light button--large" href="/free-3d-kitchen-design" data-link>Get a free 3D design</a></div>
          <div class="hero-reassurance"><span>${icon('check')} Texas-based support</span><span>${icon('check')} Free design service</span><span>${icon('check')} No showroom visit needed</span></div>
        </div>
        <figure class="home-hero__feature">
          <img src="/assets/hero-kitchen.jpg" width="1920" height="1080" alt="Bright finished kitchen with white Shaker cabinetry and a central island" />
        </figure>
      </div>
      <button class="hero-video-toggle" type="button" data-video-toggle aria-label="Pause background video">${icon('pause')}<span>Pause film</span></button>
      <div class="hero-index" aria-hidden="true"><span>01</span><i></i><span>PLAN</span></div>
    </section>
    ${trustStrip()}

    <section class="section section--ivory">
      <div class="container">
        ${sectionIntro({ eyebrow: 'Shop by cabinet type', title: 'Find the piece your plan is missing.', copy: 'Plain-language categories help you browse first. Exact widths, clearances and combinations come next.', action: '<a class="text-link" href="/shop/white-shaker-cabinets" data-link>View the full collection ' + icon('arrow') + '</a>' })}
        <div class="category-grid">
          ${categories.map((category, index) => `<a class="category-card ${index === 0 ? 'category-card--wide' : ''}" href="/shop/white-shaker-cabinets?type=${category.id}" data-link><div class="category-card__image"><img src="${category.image}" width="600" height="600" loading="lazy" alt="${category.name} product rendering" /></div><div><span>0${index + 1}</span><h3>${category.name}</h3><p>${category.copy}</p><b>Explore ${icon('arrow')}</b></div></a>`).join('')}
        </div>
      </div>
    </section>

    <section class="section design-story">
      <div class="container design-story__grid">
        <div class="design-story__media">
          <img src="/assets/design-consultation.jpg" width="800" height="600" loading="lazy" alt="Designer and homeowner reviewing a kitchen plan" />
          <div class="plan-sample" aria-label="Example design deliverables"><span>${icon('ruler')}</span><div><small>Your design package</small><strong>Room plan + 3D concept + cabinet list</strong></div></div>
        </div>
        <div class="design-story__content"><span class="eyebrow">Free professional design</span><h2>Bring what you have. We’ll help shape what comes next.</h2><p>You do not need perfect drawings to begin. Share approximate dimensions, a phone photo or an existing plan. The design team can use it to clarify layout and product questions.</p>
          <ul class="check-list"><li>${icon('check')} A 3D direction for your room</li><li>${icon('check')} Cabinet selection support</li><li>${icon('check')} A clearer, itemized path to purchase</li></ul>
          <div class="button-row"><a class="button button--primary" href="/free-3d-kitchen-design" data-link>Start free design ${icon('arrow')}</a><a class="text-link" href="tel:+14692096518">Talk to sales</a></div>
          <p class="fine-print">Final measurements and design details must be verified by the customer before purchase, as stated in the source FAQ.</p>
        </div>
      </div>
    </section>

    <section class="section section--ink why-section">
      <div class="container">
        ${sectionIntro({ eyebrow: 'Why Temima', title: 'Expert help around the decisions that matter.', copy: 'The experience is designed to make technical cabinet choices feel less technical—without hiding the checks a good order needs.' })}
        <div class="why-grid">
          <article><span>01</span>${icon('pencil')}<h3>Plan before purchase</h3><p>The free design service creates a practical checkpoint before a complex cabinet order.</p></article>
          <article><span>02</span>${icon('ruler')}<h3>Dimensions in context</h3><p>Width, height and depth stay visible while guides explain where each measurement matters.</p></article>
          <article><span>03</span>${icon('box')}<h3>RTA, clearly explained</h3><p>Cabinets arrive ready to assemble. Delivery, inspection and assembly guidance stays close at hand.</p></article>
          <article><span>04</span>${icon('phone')}<h3>Reach a real team</h3><p>Sales and customer-service contact paths are visible from planning through order review.</p></article>
        </div>
      </div>
    </section>

    <section class="section featured-products">
      <div class="container">
        ${sectionIntro({ eyebrow: 'White Shaker collection', title: 'A versatile starting point for the whole room.', copy: 'Browse representative cabinet types, then verify every configuration against the completed plan.', action: '<a class="text-link" href="/shop/white-shaker-cabinets" data-link>Shop White Shaker ' + icon('arrow') + '</a>' })}
        <div class="product-grid product-grid--four">${[products[1], products[3], products[6], products[8]].map(productCard).join('')}</div>
        <div class="prototype-note">${icon('info')} <span><strong>Prototype catalog note</strong> Prices, SKUs and attribute mappings shown here demonstrate the shopping flow and require a final WooCommerce catalog check.</span></div>
      </div>
    </section>

    <section class="section journey-section">
      <div class="container">
        ${sectionIntro({ eyebrow: 'A clearer cabinet journey', title: 'From room idea to a verified order.', copy: 'Each step produces the information needed for the next one.' })}
        <div class="journey-line" aria-hidden="true"><span></span></div>
        <div class="journey-grid">
          <article><img src="/assets/design-consultation.jpg" width="800" height="600" loading="lazy" alt="Kitchen plan being reviewed" /><div><span>Step 01</span><h3>Share the room</h3><p>Send dimensions, photos or a sketch—whatever you have today.</p><a href="/free-3d-kitchen-design" data-link>Start a project ${icon('arrow')}</a></div></article>
          <article><img src="/assets/manufacturing.jpg" width="800" height="600" loading="lazy" alt="Cabinet components being worked on in a manufacturing setting" /><div><span>Step 02</span><h3>Design and confirm</h3><p>Review the cabinet plan, product list and the details that need verification.</p><a href="/#measurement-help" data-link>See measurement help ${icon('arrow')}</a></div></article>
          <article><img src="/assets/installation.jpg" width="800" height="600" loading="lazy" alt="Installers working in a bright kitchen" /><div><span>Step 03</span><h3>Deliver and install</h3><p>Prepare for freight delivery, inspect the shipment and assemble with the right support.</p><a href="/#delivery" data-link>Read delivery guidance ${icon('arrow')}</a></div></article>
        </div>
      </div>
    </section>

    <section class="section section--stone inspiration" id="inspiration">
      <div class="container">
        ${sectionIntro({ eyebrow: 'Kitchen inspiration', title: 'Study the room, not only the door sample.', copy: 'The supplied project image is explored as a planning reference. Additional client-approved installations should replace these detail crops at launch.' })}
        <div class="project-grid">${projects.map((project, index) => `<article class="project-card ${index === 0 ? 'project-card--large' : ''}"><img src="${project.image}" style="object-position:${project.position}" width="1920" height="1080" loading="lazy" alt="${project.title}: ${project.detail}" /><div><span>Source kitchen</span><h3>${project.title}</h3><p>${project.detail}</p><a href="/shop/white-shaker-cabinets" data-link>Shop the style ${icon('arrow')}</a></div></article>`).join('')}</div>
      </div>
    </section>

    <section class="section review-section">
      <div class="container">
        ${sectionIntro({ eyebrow: 'Customer perspective', title: 'Confidence comes from details, not big numbers.', copy: 'These excerpts came from the legacy site. Source verification and customer permissions are required before production publishing.' })}
        <div class="review-grid">${reviews.map((review) => `<blockquote class="review-card"><div class="quote-mark">“</div><p>${review.quote}</p><footer><div><strong>${review.name}</strong><span>${review.location} · ${review.project}</span></div><small>${review.source}</small></footer></blockquote>`).join('')}</div>
      </div>
    </section>

    <section class="section measurement-section" id="measurement-help">
      <div class="container measurement-grid">
        <div><span class="eyebrow">Measurement help</span><h2>Measure the room once. Verify the cabinet run twice.</h2><p>A reliable plan starts with walls, doors, windows, ceiling height, utilities and appliance sizes—not only open wall length.</p><ol class="number-list"><li><span>1</span><div><strong>Sketch every wall</strong><p>Mark openings, obstructions and which way doors swing.</p></div></li><li><span>2</span><div><strong>Add appliance and utility locations</strong><p>Record widths and centerlines for plumbing, gas and electrical service.</p></div></li><li><span>3</span><div><strong>Ask for a design check</strong><p>Use the sketch to confirm fillers, corners and cabinet clearances.</p></div></li></ol><a class="button button--dark" href="/free-3d-kitchen-design" data-link>Have a designer check it ${icon('arrow')}</a></div>
        <div class="measure-card"><div class="measure-room"><span class="wall wall--top"></span><span class="wall wall--right"></span><span class="wall wall--bottom"></span><span class="wall wall--left"></span><div class="measure-island">ISLAND</div><span class="dimension dimension--top">142″</span><span class="dimension dimension--side">118″</span><span class="door-swing"></span></div><div class="measure-card__footer">${icon('ruler')} <span><strong>Start approximate. Finish precise.</strong> Final measurements are the customer’s responsibility and should be confirmed before purchase.</span></div></div>
      </div>
    </section>

    <section class="section final-cta">
      <div class="container final-cta__inner"><div><span class="eyebrow eyebrow--light">Your room can start as a rough sketch</span><h2>Turn it into a cabinet plan with a clearer next step.</h2><p>Share what you know today. Photos and files are optional, and your form progress stays with you while you work.</p><div class="button-row"><a class="button button--primary button--large" href="/free-3d-kitchen-design" data-link>Start my free design ${icon('arrow')}</a><a class="button button--ghost-light button--large" href="/shop/white-shaker-cabinets" data-link>Browse first</a></div></div><img src="/assets/hero-kitchen.jpg" width="1920" height="1080" loading="lazy" alt="White Shaker kitchen viewed from the island" /></div>
    </section>

    <section class="policy-band" id="policies">
      <div class="container policy-band__grid">
        <article id="delivery">${icon('truck')}<div><span class="eyebrow">Delivery</span><h2>Prepare for freight, inspection and a piece count.</h2><p>Continental U.S. delivery depends on normal access. The supplied FAQ gives conflicting damage-report windows, so contact support immediately and confirm the governing written policy.</p></div></article>
        <article>${icon('shield')}<div><span class="eyebrow">Returns & warranty</span><h2>Confirm the written terms before ordering.</h2><p>The source states a 30-day authorized-return policy, 30% restocking fee and limited lifetime warranty. Full exclusions and current documents were not supplied.</p></div></article>
        <article id="accessibility">${icon('check')}<div><span class="eyebrow">Accessibility</span><h2>Designed for keyboard, touch and readable contrast.</h2><p>If anything in this prototype blocks your use, contact <a href="mailto:info@temimacabinets.com">info@temimacabinets.com</a> so the production experience can be improved.</p></div></article>
      </div>
    </section>

    <section class="section faq-section">
      <div class="container faq-layout"><div><span class="eyebrow">Frequently asked</span><h2>Practical answers before you begin.</h2><p>Policy details are summarized from the supplied legacy FAQ. Where the source conflicts, the prototype says so.</p><a class="text-link" href="mailto:info@temimacabinets.com">Ask another question ${icon('arrow')}</a></div>${faqList(homeFaqs)}</div>
    </section>
    <div class="container">${designHelpPanel({ compact: true, title: 'Still deciding where to begin?' })}</div>
  </main>`;
