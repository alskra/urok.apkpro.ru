// export const viewport = new Viewport({
//   sizesProperties: true,
//   scrollOptions: {
//     boundaryEl: document.querySelector('.header'),
//     spy: true,
//   },
// });

import ResizeObserver from 'resize-observer-polyfill';

export default class Viewport {
  html = document.documentElement;

  body = document.body;

  callbacks = [];

  static getScrollHeight() {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight,
    );
  }

  setVHProperty() {
    this.html.style.setProperty('--vh', `${window.innerHeight / 100}px`);
  }

  setSizesProperties(contentSizes) {
    let contentWidth;

    if (contentSizes) {
      contentWidth = contentSizes.inlineSize || contentSizes.width;
    } else {
      const style = getComputedStyle(this.body);

      contentWidth = this.body.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    }

    this.html.style.setProperty('--body-content-width', `${contentWidth}px`);
  }

  setScrollbarWidth() {
    this.html.style.overflow = 'scroll';
    this.html.style.setProperty('--scrollbar-width', `${window.innerWidth - this.html.clientWidth}px`);
    this.html.style.overflow = '';
  }

  constructor({
    vhProperty = true,
    sizesProperties = true,
    mutationObserver = false,
  } = {}) {
    if (vhProperty) {
      this.setVHProperty();

      window.addEventListener('resize', () => {
        this.setVHProperty();
        this.callbacks.forEach((callback) => callback());
      });
    }

    if (sizesProperties) {
      this.setSizesProperties();

      this.resizeObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          // eslint-disable-next-line no-nested-ternary
          const contentSizes = entry.contentBoxSize
            ? entry.contentBoxSize[0] ? entry.contentBoxSize[0] : entry.contentBoxSize
            : entry.contentRect;

          if (entry.target === this.body) {
            this.setSizesProperties(contentSizes);
          }
        });
      });

      this.resizeObserver.observe(this.body);
    }

    if (mutationObserver) {
      this.mutationObserver = new MutationObserver((records) => {
        // eslint-disable-next-line no-console
        // console.log(records);

        records.forEach((record) => {
          // Зачем сравнение значений атрибута?
          if (record.type !== 'attributes' || record.target.getAttribute(record.attributeName) !== record.oldValue) {
            // eslint-disable-next-line no-console
            // console.log(record);
            this.callbacks.forEach((callback) => callback());
          }
        });
      });

      this.mutationObserver.observe(document, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeOldValue: true,
        characterData: true,
      });
    }

    this.setScrollbarWidth();
  }
}
