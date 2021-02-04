const path = require('path');

module.exports = {
  devServer: {
    port: 8081,
    public: 'whirled'
  },
  css: {
    requireModuleExtension: false,
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/assets/styles/variables.scss";`
      }
    }
  },
  assetsDir: '@/assets/',
}