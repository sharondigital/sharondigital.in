
(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================
     MOBILE NAV + HAMBURGER
  ========================= */
  const menu = document.querySelector('.menu');
  const nav = document.querySelector('.nav nav');

  if (menu && nav) {
    menu.setAttribute('aria-expanded', 'false');

    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menu.classList.toggle('is-open', open);
      menu.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('nav-menu-open', open);
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menu.classList.remove('is-open');
        menu.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-menu-open');
      });
    });
  }

  /* =========================
     NAVBAR — HIDE ON DOWN / SHOW ON UP
  ========================= */
  const header = document.querySelector('.nav');
  let lastY = window.scrollY;
  let ticking = false;

  function updateNavbar() {
    if (!header) return;

    const y = window.scrollY;
    const mobileMenuOpen = nav && nav.classList.contains('open');

    if (y <= 20 || mobileMenuOpen) {
      header.classList.remove('nav-hidden');
    } else if (y > lastY + 4) {
      header.classList.add('nav-hidden');
    } else if (y < lastY - 4) {
      header.classList.remove('nav-hidden');
    }

    lastY = y;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }, { passive: true });


  /* =========================
     ACTIVE NAV INDICATOR
  ========================= */
  const currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav nav a').forEach(link => {
    const href = (link.getAttribute('href') || '').split('#')[0].toLowerCase();
    if (href && href.endsWith(currentPage)) {
      document.querySelectorAll('.nav nav a').forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    }
  });

  /* =========================
     NAV LETTER SCRAMBLE HOVER
     Reference-inspired: each nav label stays inside
     its original button while the letters cycle quickly
     and resolve back to the real label.
  ========================= */
  if (!reduced) {
    const scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    document.querySelectorAll('.nav nav a').forEach(link => {
      const text = link.textContent.trim();
      if (!text) return;

      const label = document.createElement('span');
      label.className = 'nav-label';
      label.setAttribute('aria-hidden', 'true');

      [...text].forEach((char, index) => {
        const span = document.createElement('span');
        span.className = 'nav-char';
        span.dataset.original = char;
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.setProperty('--i', index);
        label.appendChild(span);
      });

      link.textContent = '';
      link.appendChild(label);

      let timers = [];
      let hovering = false;

      const clearTimers = () => {
        timers.forEach(clearInterval);
        timers = [];
      };

      const restore = () => {
        clearTimers();
        label.classList.remove('is-scrambling');
        label.querySelectorAll('.nav-char').forEach(char => {
          char.textContent = char.dataset.original === ' '
            ? '\u00A0'
            : char.dataset.original;
        });
      };

      const scramble = () => {
        clearTimers();
        hovering = true;
        label.classList.remove('is-scrambling');
        void label.offsetWidth;
        label.classList.add('is-scrambling');

        label.querySelectorAll('.nav-char').forEach((char, index) => {
          const original = char.dataset.original;
          if (original === ' ') return;

          let ticks = 0;
          const totalTicks = 3 + Math.floor(Math.random() * 3);
          const timer = setInterval(() => {
            if (!hovering) {
              clearInterval(timer);
              return;
            }

            ticks += 1;
            if (ticks >= totalTicks) {
              char.textContent = original;
              clearInterval(timer);
              return;
            }

            char.textContent =
              scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          }, 45 + index * 8);

          timers.push(timer);
        });
      };

      link.addEventListener('mouseenter', scramble);
      link.addEventListener('mouseleave', () => {
        hovering = false;
        restore();
      });
      link.addEventListener('focus', scramble);
      link.addEventListener('blur', () => {
        hovering = false;
        restore();
      });
    });
  }

  /* =========================
     SCROLL REVEAL
  ========================= */
  if (!reduced && 'IntersectionObserver' in window) {
    const targets = document.querySelectorAll(
      '.serviceBlock, .featureCard, .portfolio-category, .portfolio-card, .contactCard, .socialIcon, .ownerCard, .stats > div, .feedback-card, .home-intro, .home-services, .home-trust, .home-cta, .home-about-me, .talk-about-me, .ownerVisual, .ownerStory'
    );

    targets.forEach(el => el.classList.add('sd-reveal'));

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('sd-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10, rootMargin: '0px 0px -35px 0px' });

    targets.forEach(el => observer.observe(el));
  }

  /* =========================
     BACK TO TOP
  ========================= */
  const backTop = document.createElement('button');
  backTop.className = 'back-to-top';
  backTop.type = 'button';
  backTop.setAttribute('aria-label', 'Back to top');
  backTop.innerHTML = '↑';
  document.body.appendChild(backTop);

  const updateBackTop = () => {
    backTop.classList.toggle('show', window.scrollY > 500);
  };

  window.addEventListener('scroll', updateBackTop, { passive: true });
  updateBackTop();

  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  });

  /* =========================
     CLOSE MOBILE MENU WHEN RESIZING
  ========================= */
  window.addEventListener('resize', () => {
    if (window.innerWidth > 800 && nav && menu) {
      nav.classList.remove('open');
      menu.classList.remove('is-open');
      menu.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-menu-open');
    }
  });

  /* =========================
     STAGGERED REVEAL DELAYS
  ========================= */
  document.querySelectorAll('.sd-reveal').forEach((el, index) => {
    el.style.setProperty('--sd-delay', Math.min(index % 7, 6));
  });

  /* =========================
     DESKTOP MICRO-CURSOR GLOW
     Disabled on touch devices.
  ========================= */
  if (!reduced && window.matchMedia('(pointer:fine)').matches) {
    const glow = document.createElement('span');
    glow.className = 'sd-cursor-glow';
    document.body.appendChild(glow);
    let gx = -100, gy = -100;
    let tx = -100, ty = -100;
    const move = e => { tx = e.clientX; ty = e.clientY; };
    document.addEventListener('pointermove', move, {passive:true});
    const tick = () => {
      gx += (tx - gx) * .16;
      gy += (ty - gy) * .16;
      glow.style.transform = `translate3d(${gx - 70}px,${gy - 70}px,0)`;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    document.querySelectorAll('a,button,.portfolio-card,.gallery-item,.home-feature-card,.serviceBlock').forEach(el => {
      el.addEventListener('mouseenter', () => glow.classList.add('is-active'));
      el.addEventListener('mouseleave', () => glow.classList.remove('is-active'));
    });
  }





})();
