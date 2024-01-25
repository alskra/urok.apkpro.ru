import Alpine from 'alpinejs';
import '@components/scene/scene';
import './section.scss';

Alpine.data('section', () => ({
  section: {
    ':class'() {
      return {
        'is-active': this.isSlides && this.$index === this.sectionId,
        'is-transition': this.isSlides && this.isTransition && this.$index === this.sectionId,
      };
    },
    'x-show'() {
      return this.isSlides ? this.$index === this.sectionId : true;
    },
    [`x-transition.opacity.duration.${Alpine.store('transitionDuration')}ms`]: '',
  },
}));
