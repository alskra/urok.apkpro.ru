import Alpine from 'alpinejs';
import './nav.scss';

Alpine.data('nav', () => ({
  nav: {
    ':class'() {
      return { [`nav--style-${this.sectionData.style}`]: this.sectionData.style };
    },
    'x-show'() {
      return this.navIsOpen;
    },
    'x-transition:enter': 'enter',
    'x-transition:enter-start': 'enter-start',
    'x-transition:leave': 'leave',
    'x-transition:leave-end': 'leave-end',
  },
  hidden: {
    'x-show'() {
      return this.navIsOpen;
    },
  },
  btnPrev: {
    '@click'() {
      this.prev();
    },
  },
  btnNext: {
    '@click'() {
      this.next();
    },
  },
  title: {
    'x-text'() {
      return this.sectionData.title;
    },
  },
  current: {
    'x-text'() {
      return String(this.sectionId).padStart(2, '0');
    },
  },
  total: {
    'x-text'() {
      return String(this.sectionsTotal - 1).padStart(2, '0');
    },
  },
}));
