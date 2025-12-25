import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/Home'),
  },
  {
    path: '/games',
    name: 'games',
    component: () => import('@/pages/Games'),
  },
  {
    path: '/wallet',
    name: 'wallet',
    component: () => import('@/pages/Wallet'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router
