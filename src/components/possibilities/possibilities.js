import Alpine from 'alpinejs';
import 'swiper/css/bundle';
import Swiper, { EffectFade, Pagination, Autoplay } from 'swiper';
import './possibilities.scss';

Alpine.data('possibilities', () => {
  let inst;

  return {
    swiper: undefined,
    swiperIsInit: false,
    paginationData: ['для учителей', 'для школьников', 'для родителей'],
    init() {
      inst = this;
      this.$nextTick(() => this.initSwiper());

      this.$watch('sectionId', (val) => {
        if (this.isSlides) {
          if (val === 2) {
            setTimeout(() => {
              this.$refs.swiper.swiper.slideTo(1);
              this.$refs.swiper.swiper.autoplay.start();
            }, 100);
          }
        }
      });
    },
    destroy() {
      inst.destroySwiper();
    },
    initSwiper() {
      if (!this.swiperIsInit) {
        this.swiper = new Swiper(this.$refs.swiper, {
          modules: [EffectFade, Pagination, Autoplay],
          effect: 'fade',
          fadeEffect: {
            crossFade: false,
          },
          slidesPerView: 1,
          on: {
            init: () => {
              this.swiperIsInit = true;
            },
            destroy: () => {
              this.swiperIsInit = false;
            },
          },
          pagination: {
            el: this.$refs.pagination,
            clickable: true,
            type: 'custom',
            renderCustom: (swiper, current) => {
              let template = '';

              this.paginationData.forEach((item, index) => {
                template += `<div class="possibilities__pagination-item${index + 1 === current ? ' is-active' : ''}"
@click="$refs.swiper.swiper.slideTo(${index + 1})">
<div>${this.paginationData[index]}</div><div></div></div>`;
              });

              return template;
            },
            modifierClass: 'possibilities__pagination--',
            currentClass: 'possibilities__pagination-current',
            totalClass: 'possibilities__pagination-total',
          },
          autoplay: {
            delay: 6000,
            disableOnInteraction: false,
          },
          loop: true,
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
