const fs = require('fs');
const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const paths = require('./utils/paths');

const pages = fs.readdirSync(paths.pages);
const chunks = fs.readdirSync(path.join(paths.pug, 'chunks')).filter((chunk) => path.extname(chunk) === '.pug');
const entry = {};

// pages.forEach((page) => {
//   entry[page] = [path.join(paths.pages, `${page}/${page}.js`), path.join(paths.components, 'app/app.js')];
// });

entry.main = pages
  .map((page) => path.join(paths.pages, `${page}/${page}.js`))
  .concat(path.join(paths.components, 'app/app.js'));

const htmlPluginEntries = pages.map((page) => new HTMLPlugin({
  template: path.join(paths.pages, `${page}/${page}.pug`),
  filename: `${page}.html`,
  chunks: 'all',
  title: 'Webpack Starter',
  minify: false,
}));

const htmlPluginChunks = chunks.map((chunk) => new HTMLPlugin({
  template: path.join(paths.pug, `chunks/${chunk}`),
  filename: `data/${path.basename(chunk, '.pug')}.html`,
  inject: false,
  minify: false,
}));

module.exports = {
  entry,
  htmlPluginEntries,
  htmlPluginChunks,
};
