import Alpine from 'alpinejs';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import './app.scss';

Alpine.data('app', () => ({
  sectionId: 0,
  sectionsTotal: 0,
  navIsLocked: false,
  isTransition: false,
  menuIsOpenManual: false,
  touchStartY: 0,
  touchEndY: 0,
  touchPrecision: 50,
  get isSlides() {
    return Alpine.store('isDeviceDesktop') && Alpine.store('minLg');
  },
  get sectionEl() {
    return this.$refs.sections.children[this.sectionId];
  },
  get sectionData() {
    return JSON.parse(this.sectionEl.dataset.nav);
  },
  get menuIsOpen() {
    if (this.isSlides) {
      return this.sectionId === 0 || this.menuIsOpenManual;
    }

    if (this.$store.minLg) {
      return true;
    }

    return this.menuIsOpenManual;
  },
  get navIsOpen() {
    if (this.isSlides) {
      return this.sectionData.active;
    }

    return false;
  },
  app: {
    '@hashchange.window'() {
      if (this.isSlides) {
        this.loadSection();
      }
    },
    '@wheel.window'(evt) {
      if (this.isSlides) {
        this.handleWheel(evt);
      }
    },
    // '@touchstart.document'(evt) {
    //   this.handleTouchStart(evt);
    // },
    // '@touchend.document'(evt) {
    //   this.handleTouchEnd(evt);
    // },
  },
  init() {
    /* eslint-disable no-console */
    console.log('isDesktop:', this.$store.isDeviceDesktop);
    console.log('minLg:', this.$store.minLg);
    console.log('isSlides:', this.isSlides);

    const update = () => {
      if (this.isSlides) {
        window.history.scrollRestoration = 'manual';
        this.sectionsTotal = this.$refs.sections.childElementCount;
        this.loadSection();
      } else {
        window.history.scrollRestoration = 'auto';
        document.documentElement.classList.remove('has-padding-correct');
      }
    };

    update();

    this.$watch('isSlides', update);

    this.$watch('$store.minLg', (val) => {
      if (val) {
        this.menuIsOpenManual = false;
      }
    });

    this.$watch('sectionId', () => {
      if (this.isSlides) {
        this.menuIsOpenManual = false;
      }
    });

    this.$watch('menuIsOpen', (val) => {
      const menuEl = this.$root.querySelector('.menu');

      if (!this.$store.minLg) {
        this.navIsLocked = val;

        if (val) {
          disableBodyScroll(menuEl, { reserveScrollBarGap: true });
        } else {
          enableBodyScroll(menuEl);
        }
      } else {
        if (!this.isTransition) {
          this.navIsLocked = false;
        }

        enableBodyScroll(menuEl);
      }
    });
  },
  loadSection() {
    Array.from(this.$refs.sections.children).forEach((item, index) => {
      if (this.$store.hash === JSON.parse(item.dataset.nav).url) {
        this.lockNav();
        this.sectionId = index;
        this.setPadding();
      }
    });
  },
  setPadding() {
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.classList.add('has-padding-correct');
  },
  resetPadding() {
    if (this.sectionEl.offsetHeight > window.innerHeight) {
      document.documentElement.classList.remove('has-padding-correct');
    }

    document.documentElement.style.overflow = '';
  },
  lockNav() {
    this.navIsLocked = true;
    this.isTransition = true;

    setTimeout(() => {
      this.navIsLocked = false;
      this.isTransition = false;
      this.resetPadding();
      window.scrollTo(0, 0);
    }, this.$store.transitionDuration + 100);
  },
  prev() {
    if (this.sectionId > 0) {
      this.lockNav();
      this.sectionId -= 1;
      this.setPadding();
      window.history.pushState(null, null, this.sectionData.url || '#');
      this.$store.hash = this.sectionData.url;
    }
  },
  next() {
    if (this.sectionId < this.sectionsTotal - 1) {
      this.lockNav();
      this.sectionId += 1;
      this.setPadding();
      window.history.pushState(null, null, this.sectionData.url || '#');
      this.$store.hash = this.sectionData.url;
    }
  },
  handleNav(evt, dir) {
    if (!this.navIsLocked && dir) {
      const isEdgeTop = window.scrollY === 0;
      const isEdgeBottom = Math.abs(this.sectionEl.getBoundingClientRect().bottom - window.innerHeight) < 1;

      if (isEdgeTop && dir === 'prev') {
        this.prev();
      } else if (isEdgeBottom && dir === 'next') {
        this.next();
      }
    }
  },
  handleWheel(evt) {
    let dir = null;

    if (evt.deltaY < 0) {
      dir = 'prev';
    } else if (evt.deltaY > 0) {
      dir = 'next';
    }

    this.handleNav(evt, dir);
  },
  handleTouchStart(evt) {
    this.touchStartY = evt.touches[0].clientY;
  },
  handleTouchEnd(evt) {
    this.touchEndY = evt.changedTouches[0].clientY;

    let dir = null;

    if (this.touchStartY < this.touchEndY - this.touchPrecision) {
      dir = 'prev';
    } else if (this.touchStartY > this.touchEndY + this.touchPrecision) {
      dir = 'next';
    }

    this.handleNav(evt, dir);
  },
}));

Alpine.start();
