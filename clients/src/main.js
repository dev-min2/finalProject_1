import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store.js'

import globalMethods from "./appModule/globalMethods"//생성한 파일
createApp(App).use(router).use(globalMethods ).mount('#app')