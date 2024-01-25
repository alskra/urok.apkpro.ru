import Alpine from 'alpinejs';
import './menu.scss';

Alpine.data('menu', () => ({
  menu: {
    'x-show'() {
      return this.menuIsOpen;
    },
    'x-transition:enter': 'enter',
    'x-transition:enter-start': 'enter-start',
    'x-transition:leave': 'leave',
    'x-transition:leave-end': 'leave-end',
  },
  menuItem: {
    ':class'() {
      return { 'is-active': this.$el.hash === this.$store.hash };
    },
    '@click'() {
      if (!this.isSlides) {
        this.menuIsOpenManual = false;
      }
    },
  },
}));
