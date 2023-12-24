import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store.js'


import globalMethods from "./appModule/globalMethods"//생성한 파일
createApp(App).use(router).use(store).use(globalMethods ).mount('#app')
