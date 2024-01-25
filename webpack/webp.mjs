import path from 'path';
import fs from 'fs';
import chokidar from 'chokidar';
import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import paths from './utils/paths.js';
import argv from './utils/parse-argv.js';

const basePaths = [
  // paths.images,
  paths.media,
];

const { watch = false, initial = true } = argv;

/* eslint-disable */
const log = (...args) => console.log('\x1b[92;1m[WebP]\x1b[0m', ...args);
const error = (...args) => console.error('\x1b[31;1m[WebP Error]\x1b[22m %s\x1b[39m', args.join(' '));
const dir = (...args) => console.dir(...args, { depth: null });
/* eslint-enable */

let initialArr = [];

log('started');

const watcher = chokidar.watch(basePaths.map((pathItem) => path.resolve(pathItem, '**/*.{jpg,png}')), {
  ignoreInitial: watch && !initial,
});

watcher.on('all', (evt, filePath) => {
  const webpFilePath = filePath.replace(/\.\w+$/, '.webp');

  if (!initialArr) {
    log(`source image \x1b[93m${evt.replace(/e$/, '')}ed\x1b[0m: \x1b[96m${filePath}\x1b[0m`);
  }

  if (evt === 'add' || evt === 'change') {
    const promise = (async (input, destination) => {
      await imagemin([input], {
        destination,
        plugins: [imageminWebp()],
      });

      log(`optimized image \x1b[93mcreated\x1b[0m: \x1b[96m${webpFilePath}\x1b[0m`);
    })(filePath, path.dirname(filePath));

    if (initialArr) {
      initialArr.push(promise);
    }
  }

  if (evt === 'unlink') {
    try {
      if (fs.existsSync(webpFilePath)) {
        fs.unlinkSync(webpFilePath);
        log(`optimized image \x1b[93munlinked\x1b[0m: \x1b[96m${webpFilePath}\x1b[0m`);
      }
    } catch (err) {
      error(err);
    }
  }
});

watcher.on('ready', () => {
  Promise.all(initialArr).then(() => {
    if (!watch) {
      watcher.close().then(() => log('finished'));
    } else {
      log('images are watched...');
    }
  });

  initialArr = null;
});
