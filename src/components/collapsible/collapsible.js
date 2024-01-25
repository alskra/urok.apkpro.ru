import Alpine from 'alpinejs';
import './collapsible.scss';

Alpine.data('collapsible', (isExpanded = false) => ({
  isExpanded,
  header: {
    ':class'() {
      return { 'is-expanded': this.isExpanded };
    },
    '@click'() {
      this.isExpanded = !this.isExpanded;
    },
  },
  main: {
    'x-show'() {
      return this.isExpanded;
    },
    'x-collapse': '',
  },
}));
