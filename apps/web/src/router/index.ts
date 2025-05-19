import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/getstarted',
    name: 'getstarted',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(
    // webpackChunkName: "about"
    '../views/GetStarted.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(
      '../views/Login.vue'
    )
  },
  {
    path: '/organizations',
    name: 'organizations',
    component: () => import(
      '../views/Organizations.vue'
    )
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(
      '../views/About.vue'
    )
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(
      '../views/User.vue'
    )
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
