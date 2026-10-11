
// Elevate Publishing v0.1
// Navigation, category filters, and animations

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');

menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');

  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute(
    'aria-label',
    open ? 'Close navigation' : 'Open navigation'
  );
});

navigation.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  });
});

// Book category filtering

const messages = {
  all: "Our first publications haven't been announced yet. Check back soon to discover the stories we're bringing to life.",
  novels: "Our first novels have not been announced yet. Watch this space for future releases.",
  comics: "Our first comics have not been announced yet. New stories are on the way.",
  graphic: "Our first graphic novels have not been announced yet. Check back for updates."
};

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(item => {
      const selected = item === button;

      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });

    document.querySelector('#catalog-message').textContent =
      messages[button.dataset.filter];
  });
});

// Automatic copyright year

document.querySelector('#year').textContent =
  new Date().getFullYear();

// Scroll animations

if (
  'IntersectionObserver' in window &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches
) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(element => {
    observer.observe(element);
  });
} else {
  document.querySelectorAll('.reveal').forEach(element => {
    element.classList.add('visible');
  });
}
