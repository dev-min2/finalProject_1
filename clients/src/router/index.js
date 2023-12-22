import { createRouter, createWebHistory } from 'vue-router'
import MainBody from '../views/MainBody.vue'
import LoginComp from '../views/userview/LoginComp.vue'
import CreateAccountComp from '../views/userview/CreateAccountComp.vue'
import NewProducts from '../views/userview/NewProducts.vue'
import BestProducts from '../views/userview/BestProducts.vue'
import RecommendedProducts from '../views/userview/RecommendedProducts.vue'
import DryFeed from '../views/userview/DryFeed.vue'
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
  },
  {
    path: '/newProducts',
    name: 'newProducts',
    component : NewProducts
  },
  {
    path: '/bestProducts',
    name: 'bestProducts',
    component : BestProducts
  },
  {
    path: '/recommendedProducts',
    name: 'recommendedProducts',
    component : RecommendedProducts
  },
  {
    path: '/dryFeed',
    name: 'dryFeed',
    component : DryFeed
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
