import Alpine from 'alpinejs';
import 'swiper/css/bundle';
import Swiper, { EffectFade, Navigation, Autoplay } from 'swiper';
import './slider.scss';

Alpine.data('slider', () => ({
  init() {
    this.swiper = new Swiper(this.$refs.swiper, {
      modules: [EffectFade, Navigation, Autoplay],
      effect: 'fade',
      fadeEffect: {
        crossFade: false,
      },
      navigation: {
        prevEl: this.$refs.buttonPrev,
        nextEl: this.$refs.buttonNext,
      },
      autoplay: true,
      loop: true,
    });
  },
}));
