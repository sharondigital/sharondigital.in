(() => {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  const base = 'assets/portfolio/';

  // All portfolio images stored directly inside assets/portfolio/.
  // Add a new filename to this list when you add a new portfolio image.
  const files = [
  "IMG-20241010-WA0276(1).jpg",
  "IMG-20241010-WA0276.jpg",
  "IMG-20241010-WA0277.jpg",
  "IMG-20241010-WA0278(1).jpg",
  "IMG-20241010-WA0278.jpg",
  "IMG-20241010-WA0279(1).jpg",
  "IMG-20241010-WA0279.jpg",
  "IMG-20241010-WA0280(1).jpg",
  "IMG-20241010-WA0280.jpg",
  "IMG-20241010-WA0281.jpg",
  "IMG-20241010-WA0282.jpg",
  "IMG-20241010-WA0283.jpg",
  "IMG-20241010-WA0284.jpg",
  "IMG-20241010-WA0285.jpg",
  "IMG-20241010-WA0286.jpg",
  "IMG-20241010-WA0287(1).jpg",
  "IMG-20241010-WA0287.jpg",
  "IMG-20241010-WA0288.jpg",
  "IMG-20241010-WA0289.jpg",
  "IMG-20241010-WA0290.jpg",
  "IMG-20241010-WA0291.jpg",
  "IMG-20241010-WA0292.jpg",
  "IMG-20241010-WA0293.jpg",
  "IMG-20241010-WA0294(1).jpg",
  "IMG-20241010-WA0294.jpg",
  "IMG-20241010-WA0295.jpg",
  "IMG-20241010-WA0296.jpg",
  "IMG-20241010-WA0297.jpg",
  "IMG-20241010-WA0298.jpg",
  "IMG-20241010-WA0299.jpg",
  "IMG-20241010-WA0300.jpg",
  "IMG-20241010-WA0301.jpg",
  "IMG-20241010-WA0302.jpg",
  "IMG-20241010-WA0303.jpg",
  "IMG-20241010-WA0304.jpg",
  "IMG-20241010-WA0305.jpg",
  "IMG-20241010-WA0306.jpg",
  "IMG-20241010-WA0307.jpg",
  "IMG-20241010-WA0308.jpg",
  "IMG-20241010-WA0309.jpg",
  "IMG-20241010-WA0310.jpg",
  "IMG-20241010-WA0311.jpg",
  "IMG-20241010-WA0312.jpg",
  "IMG-20241010-WA0313.jpg",
  "IMG-20241010-WA0314.jpg",
  "WhatsApp Image 2024-10-10 at 21.05.20_2e8dc425.jpg"
]
  ;

  const esc = value => String(value)
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;')
    .replaceAll("'",'&#039;');

  const imgPath = file =>
    base + file.split('/').map(part => encodeURIComponent(part)).join('/');

  grid.innerHTML = files.map((file, index) => `
    <figure class="gallery-item" data-index="${index}">
      <img src="${imgPath(file)}" loading="lazy" decoding="async" alt="Sharon Digital portfolio design ${index + 1}">
    </figure>
  `).join('');

  /* =========================
     FULL-SIZE IMAGE VIEWER
  ========================= */
  const lightbox = document.createElement('div');
  lightbox.className = 'sd-lightbox';
  lightbox.innerHTML = `
    <button class="sd-lightbox-close" aria-label="Close">×</button>
    <button class="sd-lightbox-prev" aria-label="Previous">‹</button>
    <img alt="">
    <button class="sd-lightbox-next" aria-label="Next">›</button>
    <div class="sd-lightbox-count"></div>
  `;
  document.body.appendChild(lightbox);

  const image = lightbox.querySelector('img');
  const count = lightbox.querySelector('.sd-lightbox-count');
  let current = 0;

  const update = () => {
    image.src = imgPath(files[current]);
    image.alt = `Sharon Digital portfolio design ${current + 1}`;
    count.textContent = `${current + 1} / ${files.length}`;
  };

  const open = index => {
    current = index;
    update();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  grid.addEventListener('click', event => {
    const card = event.target.closest('.gallery-item');
    if (!card) return;
    open(Number(card.dataset.index));
  });

  lightbox.querySelector('.sd-lightbox-close').addEventListener('click', close);

  lightbox.querySelector('.sd-lightbox-prev').addEventListener('click', () => {
    current = (current - 1 + files.length) % files.length;
    update();
  });

  lightbox.querySelector('.sd-lightbox-next').addEventListener('click', () => {
    current = (current + 1) % files.length;
    update();
  });

  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) close();
  });

  document.addEventListener('keydown', event => {
    if (!lightbox.classList.contains('open')) return;
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowLeft') lightbox.querySelector('.sd-lightbox-prev').click();
    if (event.key === 'ArrowRight') lightbox.querySelector('.sd-lightbox-next').click();
  });

  /* =========================
     TRUE MASONRY GALLERY
     ========================= */
  const masonryLayout = () => {
    const items = [...grid.querySelectorAll('.gallery-item')];
    if (!items.length) return;

    const styles = getComputedStyle(grid);
    const gap = window.innerWidth <= 480 ? 8 : (window.innerWidth <= 700 ? 9 : 10);

    let columns = 6;
    if (window.innerWidth <= 1100) columns = 4;
    if (window.innerWidth <= 700) columns = 3;
    if (window.innerWidth <= 480) columns = 2;

    const gridWidth = grid.clientWidth;
    const columnWidth = (gridWidth - gap * (columns - 1)) / columns;
    const heights = new Array(columns).fill(0);

    items.forEach(item => {
      item.style.width = `${columnWidth}px`;

      const img = item.querySelector('img');
      const ratio = (img && img.naturalWidth && img.naturalHeight)
        ? img.naturalHeight / img.naturalWidth
        : 0.75;

      const itemHeight = columnWidth * ratio;
      let column = 0;

      for (let i = 1; i < columns; i++) {
        if (heights[i] < heights[column]) column = i;
      }

      const left = column * (columnWidth + gap);
      const top = heights[column];

      item.style.left = `${left}px`;
      item.style.top = `${top}px`;
      item.style.height = `${itemHeight}px`;

      heights[column] = top + itemHeight + gap;
    });

    grid.style.height = `${Math.max(...heights, 0) - gap}px`;
  };

  const scheduleMasonry = () => {
    requestAnimationFrame(() => requestAnimationFrame(masonryLayout));
  };

  grid.querySelectorAll('img').forEach(img => {
    if (img.complete) {
      img.addEventListener('load', scheduleMasonry, { once: true });
    } else {
      img.addEventListener('load', scheduleMasonry);
    }
  });

  window.addEventListener('resize', scheduleMasonry);
  window.addEventListener('load', scheduleMasonry);
  scheduleMasonry();

})();

(() => {
  const toggle = document.querySelector('.gallery-collapse-toggle');
  const panel = document.querySelector('.gallery-collapse-panel');
  if (!toggle || !panel) return;
  toggle.addEventListener('click', () => {
    const open = panel.classList.toggle('is-open');
    toggle.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });
})();
