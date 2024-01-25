import Alpine from 'alpinejs';
import './words.scss';

Alpine.data('words', () => ({
  words: {
    '@mousemove.throttle.100ms'(evt) {
      if (this.$store.isDeviceDesktop && this.$store.minLg) {
        // eslint-disable-next-line no-console
        console.log(evt.clientX);

        const rect = evt.currentTarget.getBoundingClientRect();
        const offsetX = evt.clientX - (rect.left + rect.width / 2);
        const offsetY = evt.clientY - (rect.top + rect.height / 2);

        this.$refs.icons
          .style.transform = `translate(${-Math.round(offsetX * 0.04)}px, ${-Math.round(offsetY * 0.04)}px)`;
        this.$refs.list
          .style.transform = `translate(${-Math.round(offsetX * 0.07)}px, ${-Math.round(offsetY * 0.07)}px)`;
      }
    },
  },
}));
