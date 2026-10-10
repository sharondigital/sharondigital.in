(() => {
  const root = document.getElementById('portfolioCategories');
  const filters = document.getElementById('portfolioFilters');
  if (!root || !filters) return;

  const base = 'assets/portfolio/';

  const categories = [
    {
      id: 'digital-flex',
      title: 'Digital / Flex Designs',
      description: 'Large-format, promotional and print-ready advertising creatives.',
      showcaseFiles: ['showcase/digital-flex/1.png','showcase/digital-flex/2.png','showcase/digital-flex/3.png','showcase/digital-flex/4.png'],
      files: ['IMG-20241010-WA0276(1).jpg','IMG-20241010-WA0280(1).jpg','WhatsApp Image 2024-10-10 at 21.05.20_2e8dc425.jpg']
    },
    {
      id: 'social',
      title: 'Social Media Designs',
      description: 'Social-ready promotional graphics for brands and businesses.',
      showcaseFiles: ['showcase/social/1.png','showcase/social/2.png','showcase/social/3.png','showcase/social/4.png'],
      files: ['IMG-20241010-WA0277.jpg','IMG-20241010-WA0281.jpg']
    },
   {
  id: 'hoardings',
  title: 'Hoardings Designs',
  description: 'Large outdoor advertising and high-visibility display creatives.',
  showcaseFiles: [
    'showcase/hoardings/1.jpg',
    'showcase/hoardings/2.jpg',
    'showcase/hoardings/3.jpg',
    'showcase/hoardings/4.jpg'
  ],
  files: [
    'IMG-20241010-WA0311.jpg',
    'IMG-20241010-WA0304.jpg'
  ]
},
    {
      id: 'notice-posters',
      title: 'Notice / Poster Designs',
      description: 'Opening, announcement, promotional and notice poster creatives.',
      showcaseFiles: ['showcase/notice-posters/1.png','showcase/notice-posters/2.png','showcase/notice-posters/3.png','showcase/notice-posters/4.png'],
      files: ['IMG-20241010-WA0278(1).jpg','IMG-20241010-WA0287(1).jpg']
    },
    {
      id: 'logos',
      title: 'Logo Designs',
      description: 'Brand identity, marks and logo-focused creative work.',
      showcaseFiles: ['showcase/logos/1.jpg','showcase/logos/2.jpg','showcase/logos/3.jpg','showcase/logos/4.jpg'],
      files: []
    },
    {
      id: 'cards',
      title: 'Card Designs',
      description: 'Business cards, invitation cards and compact print layouts.',
      showcaseFiles: ['showcase/cards/1.jpg','showcase/cards/2.jpg','showcase/cards/3.jpg','showcase/cards/4.jpg'],
      files: ['IMG-20241010-WA0294(1).jpg']
    },
    {
      id: 'other',
      title: 'Other Designs',
      description: 'Additional creative work and designs outside the main categories.',
      showcaseFiles: ['showcase/other/1.jpg','showcase/other/2.jpg','showcase/other/3.jpg','showcase/other/4.jpg'],
      files: ['IMG-20241010-WA0279(1).jpg','showcase/flyers/1.jpg','showcase/flyers/2.jpg','showcase/flyers/3.jpg']
    }
  ];

  const esc = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
  const imgPath = file => base + file.split('/').map(part => encodeURIComponent(part)).join('/');

  filters.innerHTML = `<button class="portfolio-filter active" data-filter="all">All</button>` +
    categories.map(c => `<button class="portfolio-filter" data-filter="${esc(c.id)}">${esc(c.title.replace(' Designs',''))}</button>`).join('');

  root.innerHTML = categories.map(category => {
    const previews = category.showcaseFiles.slice(0,4);
    return `
      <article class="portfolio-category premium-category" data-category="${esc(category.id)}">
        <div class="portfolio-category-head">
          <div class="portfolio-collapse-toggle">
            <span class="portfolio-kicker">SHARON DIGITAL • SELECTED WORK</span>
            <h2>${esc(category.title)}</h2>
            <p>${esc(category.description)}</p>
          </div>
          <div class="portfolio-actions">
            <a class="portfolio-whatsapp" href="https://wa.me/919659331000?text=${encodeURIComponent('Hi Sharon Digital, I would like to enquire about ' + category.title + '.') }" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
        <div class="portfolio-collapse-content">
          <div class="portfolio-preview portfolio-preview-four">
            ${previews.map((file,i)=>`
              <figure class="portfolio-card showcase-card">
                <img src="${imgPath(file)}" loading="lazy" decoding="async" alt="${esc(category.title)} showcase ${i+1}">
              </figure>`).join('')}
          </div>
        </div>
      </article>`;
  }).join('');

  filters.addEventListener('click', event => {
    const button = event.target.closest('.portfolio-filter');
    if (!button) return;
    filters.querySelectorAll('.portfolio-filter').forEach(b=>b.classList.remove('active'));
    button.classList.add('active');
    const selected = button.dataset.filter;
    root.querySelectorAll('.portfolio-category').forEach(card => {
      const show = selected === 'all' || card.dataset.category === selected;
      card.classList.toggle('is-filtered-out', !show);
    });
  });
})();
