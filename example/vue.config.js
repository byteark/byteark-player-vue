const path = require('path');

module.exports = {
  publicPath: '/byteark-player-vue/',
  configureWebpack: {
    resolve: {
      symlinks: false,
      alias: {
        vue: path.resolve('./node_modules/vue'),
      },
    },
  },
};
