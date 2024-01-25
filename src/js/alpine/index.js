import Alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';
import extending from './plugins/extending';
import './store';

Alpine.plugin(collapse);
Alpine.plugin(extending);
window.Alpine = Alpine;
