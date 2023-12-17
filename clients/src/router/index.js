import { createRouter, createWebHistory } from 'vue-router'
import MainBody from '../views/MainBody.vue'
import LoginComp from '../views/userview/LoginComp.vue'
import CreateAccountComp from '../views/userview/CreateAccountComp.vue'
import TestUploadView from '../views/userview/TestUploadView.vue'
import TestView from '../views/userview/TestView.vue'

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
  },
  {
    path: '/upload',
    name: 'upload',
    component : TestUploadView
  },
  {
    path: '/uploadView',
    name: 'uploadView',
    component : TestView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
