export const contact = {
  phoneDisplay: '(469) 209-6518',
  phoneHref: 'tel:+14692096518',
  email: 'info@temimacabinets.com',
  serviceEmail: 'customerservice@temimacabinets.com',
  hours: 'Mon–Fri, 9:00 AM–5:00 PM',
  location: 'Dallas, Texas',
  serviceArea: 'Continental United States'
};

export const navigation = [
  { label: 'Shop Cabinets', href: '/shop/white-shaker-cabinets', mega: true },
  { label: 'Projects & Inspiration', href: '/#inspiration' },
  { label: 'Free 3D Design', href: '/free-3d-kitchen-design', featured: true },
  { label: 'Measurement Help', href: '/#measurement-help' },
  { label: 'Support', href: '/#support' }
];

export const categories = [
  { id: 'base', name: 'Base Cabinets', count: 7, image: '/assets/drawer-base.webp', copy: 'Floor cabinets that support counters and define your work zones.' },
  { id: 'wall', name: 'Wall Cabinets', count: 2, image: '/assets/wall-cabinet.webp', copy: 'Upper storage in practical widths and heights.' },
  { id: 'tall', name: 'Tall & Pantry', count: 1, image: '/assets/tall-pantry.webp', copy: 'Full-height storage for food, appliances and utility needs.' },
  { id: 'open', name: 'Open Storage', count: 1, image: '/assets/open-shelf.webp', copy: 'Display and transition pieces for a more considered plan.' },
  { id: 'corner', name: 'Corner Cabinets', count: 1, image: '/assets/corner-base.webp', copy: 'Cabinets designed to make a corner part of the working layout.' },
  { id: 'accessory', name: 'Finishing Pieces', count: 1, image: '/assets/white-shaker-door.webp', copy: 'Panels and fillers that complete an installation.' }
];

const productDefaults = {
  collection: 'White Shaker',
  doorStyle: 'Shaker',
  finish: 'Painted white',
  depth: 24,
  availability: 'Confirm availability',
  delivery: 'Continental U.S. eligibility confirmed by ZIP',
  sourceStatus: 'Prototype catalog mapping — confirm against WooCommerce before launch'
};

export const products = [
  {
    ...productDefaults,
    id: 'ws-b15', slug: 'white-shaker-base-cabinet', sku: 'WS-B15',
    name: 'Base Cabinet · 15 in.', shortName: '15 in. Base Cabinet', type: 'Base', category: 'base',
    width: 15, height: 34.5, price: 218, image: '/assets/drawer-base.webp', complex: true,
    description: 'A compact base-cabinet configuration for narrow work zones.'
  },
  {
    ...productDefaults,
    id: 'ws-b18', slug: 'white-shaker-base-cabinet', sku: 'WS-B18',
    name: 'Base Cabinet · 18 in.', shortName: '18 in. Base Cabinet', type: 'Base', category: 'base',
    width: 18, height: 34.5, price: 232, image: '/assets/drawer-door-base.webp', complex: true,
    description: 'A practical base-cabinet width for flexible kitchen planning.'
  },
  {
    ...productDefaults,
    id: 'ws-b21', slug: 'white-shaker-base-cabinet', sku: 'WS-B21',
    name: 'Base Cabinet · 21 in.', shortName: '21 in. Base Cabinet', type: 'Base', category: 'base',
    width: 21, height: 34.5, price: 248, image: '/assets/drawer-door-base.webp', complex: true,
    description: 'A mid-width base cabinet shown in the White Shaker collection.'
  },
  {
    ...productDefaults,
    id: 'ws-db15', slug: 'white-shaker-three-drawer-base', sku: 'WS-DB15',
    name: 'Three-Drawer Base · 15 in.', shortName: '15 in. Drawer Base', type: 'Drawer Base', category: 'base',
    width: 15, height: 34.5, price: 329, image: '/assets/three-drawer-base.webp', complex: true,
    description: 'Three stacked drawers for utensils, linens and everyday storage.'
  },
  {
    ...productDefaults,
    id: 'ws-db18', slug: 'white-shaker-three-drawer-base', sku: 'WS-DB18',
    name: 'Three-Drawer Base · 18 in.', shortName: '18 in. Drawer Base', type: 'Drawer Base', category: 'base',
    width: 18, height: 34.5, price: 349, image: '/assets/three-drawer-base.webp', complex: true,
    description: 'A drawer-led base configuration with a clean Shaker front.'
  },
  {
    ...productDefaults,
    id: 'ws-db24', slug: 'white-shaker-three-drawer-base', sku: 'WS-DB24',
    name: 'Three-Drawer Base · 24 in.', shortName: '24 in. Drawer Base', type: 'Drawer Base', category: 'base',
    width: 24, height: 34.5, price: 389, image: '/assets/three-drawer-base.webp', complex: true,
    description: 'Wider drawer storage for cookware and high-use kitchen items.'
  },
  {
    ...productDefaults,
    id: 'ws-w1830', slug: 'white-shaker-wall-cabinet', sku: 'WS-W1830',
    name: 'Wall Cabinet · 18 × 30 in.', shortName: '18 × 30 in. Wall Cabinet', type: 'Wall', category: 'wall',
    width: 18, height: 30, depth: 12, price: 176, image: '/assets/wall-cabinet.webp', complex: true,
    description: 'A single-door wall cabinet for compact upper storage.'
  },
  {
    ...productDefaults,
    id: 'ws-w2130', slug: 'white-shaker-wall-cabinet', sku: 'WS-W2130',
    name: 'Wall Cabinet · 21 × 30 in.', shortName: '21 × 30 in. Wall Cabinet', type: 'Wall', category: 'wall',
    width: 21, height: 30, depth: 12, price: 189, image: '/assets/wall-cabinet.webp', complex: true,
    description: 'A wider upper cabinet that keeps frequently used pieces in reach.'
  },
  {
    ...productDefaults,
    id: 'ws-p1884', slug: 'white-shaker-pantry-cabinet', sku: 'WS-P1884',
    name: 'Pantry Cabinet · 18 × 84 in.', shortName: '18 × 84 in. Pantry', type: 'Tall', category: 'tall',
    width: 18, height: 84, price: 618, image: '/assets/tall-pantry.webp', complex: true,
    description: 'Tall storage for a pantry run or utility zone.'
  },
  {
    ...productDefaults,
    id: 'ws-os1530', slug: 'white-shaker-open-shelf', sku: 'WS-OS1530',
    name: 'Open Shelf · 15 × 30 in.', shortName: '15 × 30 in. Open Shelf', type: 'Open shelf', category: 'open',
    width: 15, height: 30, depth: 12, price: 158, image: '/assets/open-shelf.webp', complex: false,
    description: 'Open storage for display pieces or an intentional cabinet transition.'
  },
  {
    ...productDefaults,
    id: 'ws-bbc36', slug: 'white-shaker-corner-base', sku: 'WS-BBC36',
    name: 'Blind Corner Base · 36 in.', shortName: '36 in. Blind Corner Base', type: 'Corner base', category: 'corner',
    width: 36, height: 34.5, price: 498, image: '/assets/corner-base.webp', complex: true,
    description: 'A corner configuration that needs layout and clearance verification.'
  },
  {
    ...productDefaults,
    id: 'ws-f3', slug: 'white-shaker-filler', sku: 'WS-F3',
    name: 'Cabinet Filler · 3 in.', shortName: '3 in. Cabinet Filler', type: 'Filler', category: 'accessory',
    width: 3, height: 30, depth: 0.75, price: 44, image: '/assets/white-shaker-door.webp', complex: false,
    description: 'A finishing piece used to manage wall clearances and spacing.'
  }
];

export const representativeProduct = {
  ...products[0],
  title: 'White Shaker Base Cabinet',
  benefit: 'Plan a compact storage run with clear dimension choices and designer verification before ordering.',
  gallery: [
    { type: 'image', src: '/assets/drawer-door-base.webp', alt: 'White Shaker base cabinet product rendering', label: 'Front view' },
    { type: 'diagram', label: 'Dimensions' },
    { type: 'image', src: '/assets/open-shelf-tall.webp', alt: 'Open cabinet rendering used to explain interior storage', label: 'Interior reference' },
    { type: 'image', src: '/assets/hero-kitchen.jpg', alt: 'Finished kitchen with white Shaker cabinetry', label: 'In a kitchen' }
  ],
  variations: [
    { width: 15, configuration: 'Door + drawer', sku: 'WS-B15', price: 218, availability: 'Confirm before ordering' },
    { width: 18, configuration: 'Door + drawer', sku: 'WS-B18', price: 232, availability: 'Confirm before ordering' },
    { width: 21, configuration: 'Door + drawer', sku: 'WS-B21', price: 248, availability: 'Confirm before ordering' },
    { width: 24, configuration: 'Door + drawer', sku: 'WS-B24', price: 264, availability: 'Confirm before ordering' },
    { width: 15, configuration: 'Three drawers', sku: 'WS-DB15', price: 329, availability: 'Confirm before ordering' },
    { width: 18, configuration: 'Three drawers', sku: 'WS-DB18', price: 349, availability: 'Confirm before ordering' },
    { width: 24, configuration: 'Three drawers', sku: 'WS-DB24', price: 389, availability: 'Confirm before ordering' }
  ]
};

export const trustItems = [
  { icon: 'pencil', title: 'Free design service', text: 'No hidden fee or obligation stated in the source FAQ.' },
  { icon: 'map', title: 'Texas-based support', text: 'Headquartered in Dallas, with phone and email help.' },
  { icon: 'box', title: 'Ready to assemble', text: 'Cabinets are supplied in boxes for assembly.' },
  { icon: 'shield', title: 'Limited lifetime warranty', text: 'Coverage details should be reviewed before purchase.' }
];

export const reviews = [
  {
    quote: 'The white shaker cabinets are gorgeous, and delivery arrived carefully packaged.',
    name: 'Mike C.', location: 'San Diego, CA', project: 'Kitchen and island',
    source: 'Supplied legacy-site testimonial — verification pending'
  },
  {
    quote: 'Ordering cabinets online felt uncertain at first, but the support made the process easier.',
    name: 'Jennifer M.', location: 'Denver, CO', project: 'Open-concept kitchen',
    source: 'Supplied legacy-site testimonial — verification pending'
  },
  {
    quote: 'The cabinet quality and straightforward installation stood out during our remodel.',
    name: 'Sarah J.', location: 'Austin, TX', project: 'Kitchen remodel',
    source: 'Supplied legacy-site testimonial — verification pending'
  }
];

export const projects = [
  { title: 'White Shaker kitchen', detail: 'Full-room planning reference', image: '/assets/hero-kitchen.jpg', position: '50% 50%' },
  { title: 'Island and work zone', detail: 'Storage and circulation detail', image: '/assets/hero-kitchen.jpg', position: '50% 70%' },
  { title: 'Tall storage wall', detail: 'Appliance and pantry planning detail', image: '/assets/hero-kitchen.jpg', position: '90% 45%' }
];

export const homeFaqs = [
  {
    question: 'Do I need perfect measurements to start a design?',
    answer: 'No. The source FAQ says you can begin by emailing dimensions or a photo. Approximate information is enough to start a conversation, but you must verify the final design before ordering.'
  },
  {
    question: 'Are the cabinets delivered assembled?',
    answer: 'No. The supplied FAQ identifies the cabinets as ready to assemble (RTA) and shipped in boxes.'
  },
  {
    question: 'Can a designer review my cabinet list?',
    answer: 'Yes. Temima offers a free design service. For this prototype, use the Free 3D Design form to request review; the live WordPress build will connect that submission to the business workflow.'
  },
  {
    question: 'Where does Temima deliver?',
    answer: 'The supplied shipping policy describes delivery within the continental United States where normal freight access is available. Product-specific eligibility and charges must be confirmed by ZIP.'
  },
  {
    question: 'Is there a showroom?',
    answer: 'The source FAQ says Temima does not operate a physical showroom. Door samples and project imagery are offered as alternatives.'
  },
  {
    question: 'What should I know before delivery?',
    answer: 'Freight deliveries require preparation, inspection, a piece count and prompt reporting of any issue. The source contains conflicting damage-report deadlines, so the final policy must be confirmed before launch.'
  }
];

export const shopFaqs = [
  { question: 'How do I choose the right cabinet width?', answer: 'Start with a measured wall plan and verify openings, appliances, fillers and clearances. A designer should confirm the complete run before a large order is placed.' },
  { question: 'What does W × H × D mean?', answer: 'Width is measured left to right, height from floor or cabinet bottom to top, and depth from front to back. Product dimensions in this prototype need final WooCommerce verification.' },
  { question: 'Why do some products say View options?', answer: 'Cabinets with several size or configuration choices need a full product page so the selection can be checked before adding it to the cart.' },
  { question: 'Are prices and availability live?', answer: 'Not in this front-end prototype. Displayed catalog values exercise the shopping flow and must be synchronized with the approved WooCommerce catalog before production.' }
];

export const quoteSteps = [
  { number: 1, label: 'Project basics' },
  { number: 2, label: 'Space & style' },
  { number: 3, label: 'Budget & timing' },
  { number: 4, label: 'Contact & files' }
];

export const analyticsEvents = [
  'product_view', 'select_item', 'add_to_cart', 'view_cart', 'begin_checkout', 'purchase',
  'quote_start', 'quote_step_complete', 'quote_upload', 'quote_submit', 'quote_error',
  'quote_confirmation_view'
];
