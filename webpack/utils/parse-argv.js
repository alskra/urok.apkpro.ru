module.exports = (() => {
  const argv = [];
  let prop = null;

  const setProp = (val) => {
    if (typeof argv[prop] === 'string' || Array.isArray(argv[prop])) {
      argv[prop] = [].concat(argv[prop], val);
    } else {
      argv[prop] = val;
    }
  };

  process.argv.slice(2).forEach((arg) => {
    if (/^-/.test(arg)) {
      prop = arg.split('=')[0].replace(/^-{1,2}/, '');

      const val = arg.split('=')[1];

      if (/^no-/.test(prop)) {
        prop = prop.replace(/^no-/, '');

        argv[prop] = false;
        prop = null;
      } else if (val) {
        setProp(val);
        prop = null;
      } else {
        argv[prop] = argv[prop] || true;
      }
    }

    if (/^[^-].*/.test(arg)) {
      if (prop) {
        setProp(arg);
        prop = null;
      } else {
        argv.push(arg);
      }
    }
  });

  return argv;
})();
