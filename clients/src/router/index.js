import { createRouter, createWebHistory } from 'vue-router'
import user from './user'
import admin from './admin'
<<<<<<< HEAD
import seller from './seller'
=======
import leave from './leave'
>>>>>>> develop

const routes = [
  user, // 일반 회원관련 작업은 user라우터에서
  admin,
<<<<<<< HEAD
  seller
=======
  leave
>>>>>>> develop
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
