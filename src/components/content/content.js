import Alpine from 'alpinejs';
import './content.scss';

Alpine.data('content', () => ({
  init() {
    this.$root.querySelectorAll('ul:not(.without-sep) li').forEach((item) => {
      // eslint-disable-next-line no-param-reassign
      item.innerHTML = item.innerHTML.trim();
      item.append(item.matches(':last-child') ? '.' : ';');
    });
  },
}));
