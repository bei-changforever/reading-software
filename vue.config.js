const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '':{
        target: 'https://m.yuedu.163.com',
        changeOrigin: true,
      }
    }
  }
})
