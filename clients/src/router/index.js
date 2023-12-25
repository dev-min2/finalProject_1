import { createRouter, createWebHistory } from 'vue-router'
import user from './user'
import admin from './admin'
import seller from './seller'

const routes = [
  user, // 일반 회원관련 작업은 user라우터에서
  admin,
  seller
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
