import Alpine from 'alpinejs';
import '@components/menu/menu';
import './header.scss';

Alpine.data('header', () => ({
  posTop: 0,
  header: {
    ':class'() {
      return {
        'menu-is-open': this.menuIsOpen,
        'nav-is-open': this.navIsOpen,
        'is-fill': this.isSlides ? this.menuIsOpenManual : this.$store.scrollY > 0
          || (!this.$store.minLg && this.menuIsOpen),
        // 'is-hidden': !this.isSlides && this.$store.scrollYDelta > 0,
      };
    },
    ':style'() {
      if (!this.isSlides && this.$store.scrollY) {
        if (!this.$store.minLg && this.menuIsOpen) {
          this.posTop = 0;
        }

        if (this.$store.scrollYDelta > 0) {
          this.posTop = Math.max(this.posTop - this.$store.scrollYDelta, -this.$root.offsetHeight);
        } else {
          this.posTop = Math.min(this.posTop - this.$store.scrollYDelta, 0);
        }

        return {
          top: `${this.posTop}px`,
        };
      }

      this.posTop = 0;

      return {
        top: '',
      };
    },
  },
  logo: {
    'x-show'() {
      if (this.isSlides) {
        return this.sectionId === 0;
      }

      return true;
    },
    [`x-transition.opacity.duration.${Alpine.store('transitionDuration')}ms`]: '',
  },
  btnMenu: {
    'x-show'() {
      if (this.isSlides) {
        return this.sectionId !== 0;
      }

      return !this.$store.minLg;
    },
    [`x-transition:enter.opacity.duration.${Alpine.store('transitionDuration')}ms`]: '',
    'x-transition:leave.duration.0ms': '',
    '@click'() {
      this.menuIsOpenManual = !this.menuIsOpenManual;
    },
  },
}));
