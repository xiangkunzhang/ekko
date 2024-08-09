import type { RouteRecordRaw } from 'vue-router'

const childRouteList: RouteRecordRaw[] = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: () => import('@/pages/home/index.vue'),
    meta: {
      title: 'Dashboard',
      icon: 'Home',
      order: 1
    }
  },
]

const defaultLayout = () => import('@/layout/MainLayout.vue')

export const dynamicRouters: RouteRecordRaw[] = [
  {
    name: 'Index',
    path: '/',
    component: defaultLayout,
    redirect: { name: 'Dashboard' },
    meta: {
      title: 'index',
      hidden: true,
      withoutLogin: true
    },
    children: childRouteList
  }
]
