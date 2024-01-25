const WebpackOptionsDefaulter = require('webpack/lib/WebpackOptionsDefaulter');
const argv = require('./utils/parse-argv');
const configDevelopment = require('./webpack.development.config');
const configProduction = require('./webpack.production.config');

/* eslint-disable */
const log = (...args) => console.log('\x1b[92;1m[Webpack Inspect]\x1b[0m', ...args);
const error = (...args) => console.error('\x1b[31;1m[Webpack Inspect Error]\x1b[22m %s\x1b[39m', args.join(' '));
const dir = (...args) => console.dir(...args, { depth: null });
/* eslint-enable */

const optionsDefaulter = new WebpackOptionsDefaulter();
const optionsDevelopmentDefault = optionsDefaulter.process({ mode: 'development' });
const optionsProductionDefault = optionsDefaulter.process({ mode: 'production' });

const optionsDevelopment = optionsDefaulter.process({
  ...configDevelopment,
  mode: 'development',
});

const optionsProduction = optionsDefaulter.process({
  ...configProduction,
  mode: 'production',
});

const dirOptions = (options) => {
  if (typeof argv.option === 'string') {
    // eslint-disable-next-line no-new-func
    dir((new Function('options', `
      try {
        return options.${argv.option};
      } catch (err) {
        console.error(err);
      }
    `))(options));
  } else {
    dir(options);
  }
};

const logMsg = (mode) => {
  const option = typeof argv.option === 'string' ? `\x1b[93m${argv.option}\x1b[39m option` : 'options';

  return log(`\x1b[1m${mode} ${option}:\x1b[22m`);
};

logMsg('Development Default');
dirOptions(optionsDevelopmentDefault);
logMsg('Production Default');
dirOptions(optionsProductionDefault);

logMsg('Development Applied');
dirOptions(optionsDevelopment);
logMsg('Production Applied');
dirOptions(optionsProduction);
