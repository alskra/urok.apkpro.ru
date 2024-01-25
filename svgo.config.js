module.exports = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeUnknownsAndDefaults: false,
          removeViewBox: false,
          cleanupIDs: {
            prefix: {
              toString() {
                this.counter = (this.counter || 0) + 1;

                return `id-${this.counter}`;
              },
            },
          },
        },
      },
    },
    'removeDimensions',
    'sortAttrs',
  ],
};
