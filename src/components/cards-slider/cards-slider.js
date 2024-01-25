import Alpine from 'alpinejs';
import 'swiper/css/bundle';
import Swiper, { Navigation } from 'swiper';
import './cards-slider.scss';

Alpine.data('cardsSlider', () => {
  let inst;

  return {
    swiper: undefined,
    swiperIsInit: false,
    init() {
      inst = this;
      this.$nextTick(() => this.initSwiper());
    },
    destroy() {
      inst.destroySwiper();
    },
    initSwiper() {
      if (!this.swiperIsInit) {
        this.swiper = new Swiper(this.$refs.swiper, {
          modules: [Navigation],
          slidesPerView: 'auto',
          on: {
            init: () => {
              this.swiperIsInit = true;
            },
            destroy: () => {
              this.swiperIsInit = false;
            },
          },
          navigation: {
            prevEl: this.$refs.prevEl,
            nextEl: this.$refs.nextEl,
          },
        });
      }
    },
    destroySwiper() {
      if (this.swiperIsInit) {
        this.swiper.destroy();
      }
    },
  };
});
