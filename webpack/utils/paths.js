const path = require('path');

module.exports = {
  // Source files
  get src() {
    return path.join(__dirname, '../../src');
  },
  get components() {
    return path.join(this.src, 'components');
  },
  get css() {
    return path.join(this.src, 'css');
  },
  get fonts() {
    return path.join(this.src, 'fonts');
  },
  get images() {
    return path.join(this.src, 'images');
  },
  get js() {
    return path.join(this.src, 'js');
  },
  get pages() {
    return path.join(this.src, 'pages');
  },
  get pug() {
    return path.join(this.src, 'pug');
  },

  // Production build files
  get build() {
    return path.join(__dirname, '../../dist');
  },

  // Static files that get copied to build directory
  get public() {
    return path.join(__dirname, '../../public');
  },
  get media() {
    return path.join(this.public, 'media');
  },
};
