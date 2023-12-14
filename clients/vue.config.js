const { defineConfig } = require('@vue/cli-service')
const target = 'http://localhost:12532'
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave : false,
  devServer : {
    port : 8080,
    proxy : {
      '/' : {
        target,
        changeOrigin : true,
        ws : false
      }
    }
  }
})
