import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store.js'

console.log('/api');
Kakao.init(process.env.VUE_APP_KAKAO_JS_KEY);
import globalMethods from "./appModule/globalMethods"//생성한 파일
createApp(App).use(router).use(store).use(globalMethods ).mount('#app')
