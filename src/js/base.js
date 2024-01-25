// Styles
import 'normalize.css';
import '@css/fonts.scss';
import '@css/root.scss';
import '@css/base.scss';
import '@css/grid.scss';
import '@css/utilities.scss';

// Modules
import 'ninelines-ua-parser';
import '@js/postcss-polyfills';
import Viewport from '@js/viewport';

// AlpineJS
import '@js/alpine';

// Components
import '@components/icon-svg/icon-svg';
import '@components/line-clamp/line-clamp';
import '@components/content/content';
import '@components/text-style/text-style';
import '@components/block-style/block-style';
import '@components/btn/btn.scss';

// eslint-disable-next-line import/prefer-default-export
export const viewport = new Viewport();
