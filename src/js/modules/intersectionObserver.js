const targets = document.querySelectorAll('.js-trigger');
const observer = new IntersectionObserver(targetsElements, {
  root: null,
  rootMargin: '-40% 0px',
  threshold: 0
});

targets.forEach(target => {
  observer.observe(target);
});

function targetsElements(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-active');
    }
  });
};