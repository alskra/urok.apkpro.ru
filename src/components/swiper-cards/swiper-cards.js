import Alpine from 'alpinejs';
import 'swiper/css/bundle';
import Swiper from 'swiper';

Alpine.data('swiperCards', () => {
  let inst;

  return {
    swiper: undefined,
    swiperIsInit: false,
    init() {
      inst = this;
    },
    destroy() {
      inst.destroySwiper();
    },
    initSwiper() {
      if (!this.swiperIsInit) {
        this.swiper = new Swiper(this.$refs.swiper, {
          slidesPerView: 'auto',
          on: {
            init: () => {
              this.swiperIsInit = true;
            },
            destroy: () => {
              this.swiperIsInit = false;
            },
          },
        });
      }
    },
    destroySwiper() {
      if (this.swiperIsInit) {
        this.swiper.destroy();
      }
    },
    effect() {
      if (this.$store.isDesktop) {
        this.destroySwiper();
      } else {
        this.$nextTick(() => this.initSwiper());
      }
    },
  };
});
