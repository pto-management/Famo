document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) window.lucide.createIcons();

  document.querySelectorAll('.year').forEach(el => el.textContent = new Date().getFullYear());

  const menuButton = document.querySelector('.menu-button');
  const mobileNav = document.querySelector('.mobile-nav');
  if (menuButton && mobileNav) {
    menuButton.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menuButton.innerHTML = open ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
      if (window.lucide) window.lucide.createIcons();
    });
    mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => mobileNav.classList.remove('open')));
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const params = new URLSearchParams(window.location.search);
  const requestedService = params.get('service');
  const serviceSelect = document.querySelector('select[name="service"]');
  if (requestedService && serviceSelect) {
    const serviceAliases = { 'web hosting and it': 'Website & Hosting' };
    const normalizedService = serviceAliases[requestedService.toLowerCase()] || requestedService;
    const option = [...serviceSelect.options].find(item => item.value.toLowerCase() === normalizedService.toLowerCase());
    if (option) serviceSelect.value = option.value;
  }

  const form = document.querySelector('#contact-form');
  if (form) form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const name = `${data.get('firstName')} ${data.get('lastName')}`.trim();
    const subject = encodeURIComponent(`FAMO project inquiry — ${data.get('service')}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${data.get('email')}\nCompany: ${data.get('company') || 'Not provided'}\nService: ${data.get('service')}\n\nChallenge:\n${data.get('message')}`);
    window.location.href = `mailto:makrami@famo.com?subject=${subject}&body=${body}`;
  });
});
