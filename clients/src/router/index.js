import { createRouter, createWebHistory } from 'vue-router'
import MainBody from '../views/MainBody.vue'
import LoginComp from '../views/userview/LoginComp.vue'
import CreateAccountComp from '../views/userview/CreateAccountComp.vue'

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainBody
  },
  {
    path: '/login',
    name: 'login',
    component: LoginComp
  },
  {
    path: '/join/:sellerJoin',
    name: 'join',
    component: CreateAccountComp
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
