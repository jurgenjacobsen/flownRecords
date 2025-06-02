import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/Home.vue'

const userAlias = [];
const orgAlias = [];

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    alias: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/getstarted',
    alias: '/register',
    name: 'getstarted',
    component: () => import('@/views/GetStarted.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/user',
    alias: ['/me'],
    name: 'user',
    component: () => import('@/views/User/View.vue'),
  },
  {
    path: '/user/:id',
    name: 'user-profile',
    component: () => import('@/views/User/View.vue')
  },
  {
    path: '/user/logbook',
    alias: ['/me/logbook'],
    name: 'user-logbook',
    component: () => import('@/views/User/Logbook.vue')
  },
  {
    path: '/organizations',
    alias: ['/orgs'],
    name: 'organizations',
    component: () => import('@/views/Organizations/Main.vue'),
  },
  {
    path: '/organization/:id',
    alias: ['/org/:id'],
    name: 'org-view',
    component: () => import('@/views/Organizations/View.vue')
  },
  {
    path: '/tools',
    name: 'tools',
    component: () => import('@/views/Tools/Main.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
