(() => {
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
      link.addEventListener('click', () => {
        toggle.classList.remove('is-open');
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation');
      });
    });
  }

  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  const setActive = () => {
    const current = sections.reduce((active, section) => {
      if (window.scrollY + 150 >= section.offsetTop) return section.id;
      return active;
    }, 'top');
    navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${current}`));
  };
  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
})();
