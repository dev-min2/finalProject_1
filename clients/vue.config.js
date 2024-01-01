const { defineConfig } = require('@vue/cli-service')
const target = 'http://localhost:12532'
module.exports = defineConfig({
  
  transpileDependencies: true,
  lintOnSave : false,
  devServer : {
    port : 8080,
    proxy : {
      '/api' : {
        target,
        changeOrigin : true,
        ws : false,
        pathRewrite : { // 경로를 다시씀. -> /api/~ -> / 
          '^/api' : '/'
        } 
      }
    }
  }
})
