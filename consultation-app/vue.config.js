const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');  // Додаємо імпорт webpack

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
      })
    ]
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/medical-project-front/consultation-app/'
    : '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'https://xammax.pythonanywhere.com',  // Ваш бекенд сервер
        changeOrigin: true,
        secure: false, // Можливо, потрібно встановити true, якщо бекенд має SSL
        pathRewrite: { '^/api': '/api' }, // Якщо ваші API запити мають префікс /api
      }
    }
  }
});
