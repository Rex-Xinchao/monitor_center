const path = require('path')
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@': path.resolve(__dirname, './src'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@components': path.resolve(__dirname, './src/components'),
        '@libs': path.resolve(__dirname, './src/libs'),
        '@views': path.resolve(__dirname, './src/views')
      }
    }
  }
}
