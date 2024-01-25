import Alpine from 'alpinejs';
import 'swiper/css/bundle';
import Swiper, { Navigation, Pagination } from 'swiper';
import './swiper-fraction.scss';

Alpine.data('swiperFraction', () => {
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
          modules: [Navigation, Pagination],
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
          pagination: {
            el: this.$refs.pagination,
            type: 'fraction',
            modifierClass: 'swiper-fraction__pagination--',
            currentClass: 'swiper-fraction__pagination-current',
            totalClass: 'swiper-fraction__pagination-total',
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
