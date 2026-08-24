(() => {
  document.documentElement.classList.add('js-enabled');

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.classList.toggle('is-open');
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', (event) => {
        const href = link.getAttribute('href');
        if (href?.startsWith('#')) {
          const target = document.querySelector(href);
          if (target) {
            event.preventDefault();
            const targetTop = Math.max(0, target.offsetTop - 76);
            window.scrollTo({ top: targetTop, behavior: 'smooth' });
            window.history.replaceState(null, '', href);
            window.setTimeout(setActive, 500);
          }
        }
        toggle.classList.remove('is-open');
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation');
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && toggle.classList.contains('is-open')) {
        toggle.classList.remove('is-open');
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation');
        toggle.focus();
      }
    });
  }

  const revealItems = [...document.querySelectorAll('.reveal')];
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const sectionIds = ['research', 'news', 'publications', 'about'];
  const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
  const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  const setActive = () => {
    let current = 'top';
    if (window.location.hash === '#research' && window.scrollY < 200) {
      current = 'research';
    } else if (window.scrollY >= 200) {
      current = sections.reduce((active, section) => {
        if (section.id !== 'research' && window.scrollY + 150 >= section.offsetTop) return section.id;
        return active;
      }, 'top');
    }
    navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${current}`));
  };
  window.addEventListener('hashchange', setActive);
  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
})();
