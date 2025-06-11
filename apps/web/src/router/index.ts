import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/Home.vue'

const userAlias = [];
const orgAlias = [];

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    alias: '/home',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/getstarted',
    alias: '/signup',
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
    path: '/me',
    name: 'me',
    component: () => import('@/views/User/View.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/user/:id',
    alias: ['/u/:id'],
    name: 'user-profile',
    component: () => import('@/views/User/View.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/me/logbook',
    alias: ['/logbook'],
    name: 'user-logbook',
    component: () => import('@/views/User/Logbook.vue'),
    meta: {
      requiresAuth: true,
    }
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
  },
  {
    path: '/tools/planner',
    name: 'ofp',
    component: () => import('@/views/Tools/Planner.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Global navigation guard to handle aliases
router.beforeEach((to, from, next) => {
  // Check if the route has an alias
  const token = localStorage.getItem('accessToken');
  if (to.meta.requiresAuth && !token) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router
