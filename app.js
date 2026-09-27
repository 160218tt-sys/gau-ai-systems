(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const themeButton = $('#theme-toggle');
  const preferredDark = matchMedia('(prefers-color-scheme: dark)').matches;
  const setTheme = theme => {
    document.documentElement.dataset.theme = theme;
    if (!themeButton) return;
    themeButton.textContent = theme === 'dark' ? '☀' : '☾';
    themeButton.setAttribute('aria-label', theme === 'dark' ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối');
  };
  setTheme(localStorage.getItem('gas-theme') || (preferredDark ? 'dark' : 'light'));
  themeButton?.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('gas-theme', next);
    setTheme(next);
  });

  const menuButton = $('#menu-toggle');
  const menu = $('#nav-links');
  menuButton?.addEventListener('click', () => {
    const open = menu?.classList.toggle('open') || false;
    menuButton.setAttribute('aria-expanded', String(open));
  });
  $$('#nav-links a').forEach(link => link.addEventListener('click', () => {
    menu?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));

  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.08 });
    $$('.reveal').forEach(element => observer.observe(element));
  } else {
    $$('.reveal').forEach(element => element.classList.add('visible'));
  }

  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
