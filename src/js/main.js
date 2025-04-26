
const menuToggle = document.getElementById('nav__toggle');
const menu = document.getElementById('nav__overlay');
const menuClose = document.getElementById('nav__btn-wrap--close');
console.log(menuToggle, menu, menuClose);

menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  menu.hidden = expanded;
  menu.classList.toggle('open', !expanded);

  if (!expanded) {
    menu.querySelector('a')?.focus();
  }
});

menuClose.addEventListener('click', () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  menu.hidden = true;
  menu.classList.remove('open');
  menuToggle.focus();
});

// Allow closing with ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !menu.hidden) {
    menuToggle.setAttribute('aria-expanded', 'false');
    menu.hidden = true;
    menu.classList.remove('open');
    menuToggle.focus();
  }
});