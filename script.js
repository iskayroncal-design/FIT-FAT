const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('#main-nav');
const backToTop = document.querySelector('#back-to-top');
const modal = document.querySelector('#food-modal');
const modalTitle = document.querySelector('#modal-title');
const modalCategory = document.querySelector('#modal-category');
const modalDescription = document.querySelector('#modal-description');
const modalInfo = document.querySelector('#modal-info');

function closeMenu() {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document
  .querySelectorAll('.main-nav a, .hero-actions a, .brand')
  .forEach(link => {
    link.addEventListener('click', closeMenu);
  });

function openFoodModal(card) {
  modalTitle.textContent = card.dataset.title;
  modalCategory.textContent = card.dataset.category;
  modalDescription.textContent = card.dataset.description;
  modalInfo.textContent = card.dataset.info;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeFoodModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.more-button').forEach(button => {
  button.addEventListener('click', () =>
    openFoodModal(button.closest('.food-card')),
  );
});

document.querySelectorAll('[data-close-modal]').forEach(element => {
  element.addEventListener('click', closeFoodModal);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modal.classList.contains('open'))
    closeFoodModal();
});

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 500);
  const sections = document.querySelectorAll('main section[id]');
  let current = 'inicio';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 130) current = section.id;
  });
  document.querySelectorAll('.main-nav a').forEach(link => {
    link.classList.toggle(
      'active',
      link.getAttribute('href') === `#${current}`,
    );
  });
});

backToTop.addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' }),
);

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 35, 180)}ms`;
  revealObserver.observe(element);
});
