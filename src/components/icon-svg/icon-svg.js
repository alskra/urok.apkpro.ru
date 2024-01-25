import ResizeObserver from 'resize-observer-polyfill';
import style from './icon-svg.scss?module';

const requireIcon = require.context(
  '@images/icons/svg?raw',
  false,
  /\.svg$/,
);

const icons = {};

const resizeObserver = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const contentBoxSize = (entry.contentBoxSize && entry.contentBoxSize[0]) || entry.contentBoxSize;
    const iconWidth = (contentBoxSize && contentBoxSize.inlineSize) || entry.contentRect.width;
    const iconHeight = (contentBoxSize && contentBoxSize.blockSize) || entry.contentRect.height;
    // eslint-disable-next-line max-len
    const viewBox = `0 0 ${(iconWidth / (iconHeight || 1)) * entry.target.svgViewBoxHeight} ${entry.target.svgViewBoxHeight}`;

    entry.target.svgEl.setAttribute('viewBox', viewBox);
  });
});

requireIcon.keys().forEach((iconPath) => {
  const iconName = iconPath
    .split('/')
    .pop()
    .replace(/\.\w+$/, '');

  icons[iconName] = requireIcon(iconPath).default || requireIcon(iconPath);
});

class IconSvg extends HTMLElement {
  static get observedAttributes() {
    return ['name'];
  }

  get name() {
    return this.getAttribute('name');
  }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    const styleEl = document.createElement('style');

    styleEl.innerHTML = style.toString();
    this.shadowRoot.append(styleEl);

    this.svgEl = document.createElement('svg');
    this.shadowRoot.append(this.svgEl);
  }

  update() {
    const template = document.createElement('template');

    template.innerHTML = icons[this.name];
    this.svgEl.replaceWith(template.content);
    this.svgEl = this.shadowRoot.lastElementChild;

    resizeObserver.unobserve(this);

    if (['arrow-left', 'arrow-right'].includes(this.name)) {
      this.svgViewBoxHeight = +this.svgEl.getAttribute('viewBox').split(/\s+/).pop();
      resizeObserver.observe(this);
    }
  }

  disconnectedCallback() {
    resizeObserver.unobserve(this);
  }

  attributeChangedCallback(name) {
    if (name === 'name') {
      this.update();
    }
  }
}

customElements.define('icon-svg', IconSvg);

export default IconSvg;
export { icons };
