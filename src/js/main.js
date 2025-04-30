
const menuToggle = document.getElementById('nav__toggle');
const menu = document.getElementById('nav__overlay');
const menuClose = document.getElementById('nav__btn-wrap--close');

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


const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const openModalButtons = document.querySelectorAll('.open-modal-button');
const closeModalButton = document.getElementById('modal-close');
let lastFocusedElement;

if (modal) {
  openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      lastFocusedElement = document.activeElement;

      const imgSrc = button.getAttribute('data-image');
      const imgAlt = button.getAttribute('data-alt');
      const imgDesc = button.getAttribute('data-description');
      const imgLink = button.getAttribute('data-link');
      const descEl = document.getElementById('modal-description');

      modalImage.src = imgSrc;
      modalImage.alt = imgAlt;
      descEl.textContent = imgDesc;
      document.getElementById('modal-heading').textContent = imgAlt;
      if (imgLink) {
        const a = document.createElement('a');
        a.setAttribute('href', imgLink);
        a.setAttribute('target', '_blank');
        a.classList.add('modal__link');
        a.textContent = 'View Website';

        descEl.appendChild(a);
      }

      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
      closeModalButton.removeAttribute('tabindex');
      closeModalButton.focus();
    });
  });
}

if (closeModalButton) {
  closeModalButton.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }

    if (e.key === 'Tab' && modal.classList.contains('show')) {
      trapFocus(e);
    }
  });
}


function trapFocus(e) {
  const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  if (e.shiftKey) {
    // If Shift + Tab
    if (document.activeElement === firstFocusable) {
      e.preventDefault();
      lastFocusable.focus();
    }
  } else {
    // If Tab
    if (document.activeElement === lastFocusable) {
      e.preventDefault();
      firstFocusable.focus();
    }
  }
}

function closeModal() {
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  closeModalButton.setAttribute('tabindex', '-1');

  if (lastFocusedElement) {
    lastFocusedElement.focus(); // Return focus to the button/image that opened the modal
  }
}

const faqButtons = document.querySelectorAll('.faq__question-btn');

if (faqButtons) {
  // Initially close all
  faqButtons.forEach((btn) => {
    btn.setAttribute('aria-expanded', 'false');
    const answerId = btn.getAttribute('aria-controls');
    const answerEl = document.querySelector(`.${answerId}`);
    answerEl.classList.remove('faq__answer--open');
    answerEl.classList.add('faq__answer--closed');


    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';

      // Toggle this one
      if (!expanded) {
        btn.setAttribute('aria-expanded', 'true');
        answerEl.classList.add('faq__answer--open');
        answerEl.classList.remove('faq__answer--closed');
      } else {
        btn.setAttribute('aria-expanded', 'false');
        answerEl.classList.remove('faq__answer--open');
        answerEl.classList.add('faq__answer--closed');
      }
    });
  });
}



