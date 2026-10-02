const WA = '919361418749';

const cats = [
  {
    id: 'digital-flex',
    title: 'Digital / Flex Printing',
    img: 'assets/images/flex-printing.png',
    items: [
      'Flex Printing',
      'Vinyl Printing',
      'Star Flex Printing',
      'Large-Format Printing',
      'Cup Printing'
    ]
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing & Social Media Management',
    img: 'assets/images/digital-marketing.png',
    items: [
      'Social Media Management',
      'Social Media Marketing',
      'Reels Creation & Editing',
      'Content Creation',
      'Social Media Designs',
      'Online Advertising'
    ]
  },
  {
    id: 'web-app',
    title: 'Web & App Development',
    img: 'assets/images/web-app.png',
    items: [
      'Website Development',
      'App Development'
    ]
  },
  {
    id: 'interior',
    title: 'Interior Branding',
    img: 'assets/images/interior-branding.png',
    items: [
      'Full Shop Interior Sticker Branding',
      'Wall Sticker Branding',
      'Glass Sticker Branding',
      'Complete Shop Branding'
    ]
  },
  {
    id: 'led-display',
    title: 'LED & Display Boards',
    img: 'assets/images/led-display.png',
    items: [
      'LED Boards',
      'Backlit Boards'
    ]
  },
  {
    id: 'poster-notice',
    title: 'Poster & Notice Printing',
    img: 'assets/images/poster-notice.png',
    items: [
      'Multi-Colour Poster Printing',
      'Notice Printing'
    ]
  },
  {
    id: 'hoardings',
    title: 'Hoardings',
    img: 'assets/images/hoardings.png',
    items: [
      'Hoardings',
      'Political Banners',
      'Advertising Banners',
      'Event Banners',
      'Promotional Banners'
    ]
  },
  {
    id: 'offset',
    title: 'Offset & Commercial Printing',
    img: 'assets/images/offset-commercial.png',
    items: [
      'Brochures',
      'Flyers',
      'Business Cards',
      'Invitations'
    ]
  }
];

const wa = (item) =>
  `https://wa.me/${WA}?text=${encodeURIComponent(
    `Hi Sharon Digital, I'm interested in ${item}. Please share the details and price.`
  )}`;

const categories = document.getElementById('categories');

categories.innerHTML = cats.map((cat, index) => `
  <article class="serviceBlock" id="${cat.id}">

    <!-- LEFT: 60% IMAGE -->
    <div class="serviceCover">

      <img
        src="${cat.img}"
        alt="${cat.title}"
        loading="lazy"
      >

      <div class="coverShade"></div>

      <div class="coverTitle">
        <span>${String(index + 1).padStart(2, '0')}</span>
        <h2>${cat.title}</h2>
      </div>

    </div>

    <!-- RIGHT: 40% SERVICES -->
    <div class="serviceItems">

      ${cat.items.map(item => `
        <a
          class="serviceItem"
          href="${wa(item)}"
          target="_blank"
          rel="noopener"
          aria-label="WhatsApp about ${item}"
        >
          <span>${item}</span>
          <span class="serviceAction">WhatsApp ↗</span>
        </a>
      `).join('')}

    </div>

  </article>
`).join('');