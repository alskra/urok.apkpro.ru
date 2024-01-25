import Alpine from 'alpinejs';

Alpine.store('isDeviceDesktop', document.documentElement.classList.contains('is-device-desktop'));

Alpine.store('minLg', window.innerWidth >= 1025);
window.addEventListener('resize', () => {
  Alpine.store('minLg', window.innerWidth >= 1025);
});

let scrollYPrev = 0;
let deltaResetTimeout;

const scrollYDelta = () => {
  clearTimeout(deltaResetTimeout);
  deltaResetTimeout = setTimeout(() => Alpine.store('scrollYDelta', 0));

  const delta = window.scrollY - scrollYPrev;

  scrollYPrev = window.scrollY;

  return delta;
};

Alpine.store('scrollY', window.scrollY);
Alpine.store('scrollYDelta', scrollYDelta());
window.addEventListener('scroll', () => {
  Alpine.store('scrollY', window.scrollY);
  Alpine.store('scrollYDelta', scrollYDelta());
}, { passive: true });

Alpine.store('hash', window.location.hash);
window.addEventListener('hashchange', () => {
  Alpine.store('hash', window.location.hash);
});

Alpine.store('transitionDuration', 500);
