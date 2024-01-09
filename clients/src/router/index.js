import { createRouter, createWebHistory } from 'vue-router'
import user from './user'
import admin from './admin'
import seller from './seller'
import leave from './leave'

const routes = [
  user, // 일반 회원관련 작업은 user라우터에서
  admin,
  seller,
  leave
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // to : 현재 요청된 route 정보를 가지고 있음
    return { top: 0 }
  }
});

export default router;
