import type { RouteRecordRaw } from 'vue-router'

export const mainLayout = () => import('@/layout/MainLayout.vue')
export const loginLayout = () => import('@/layout/LoginLayout.vue')

export const staticRouters: RouteRecordRaw[] = [
  {
    name: 'Auth',
    path: '/login',
    component: loginLayout,
    meta: {
      title: '',
      hidden: true,
      withoutLogin: true
    },
    children: [
      {
        name: 'AuthLogin',
        path: '',
        component: () => import('@/pages/auth/Login.vue'),
        meta: {
          title: 'Login',
          hidden: true,
          withoutLogin: true
        }
      }
    ]
  },
  {
    name: 'LoginUser',
    path: '/auth',
    redirect: '/auth/info',
    component: mainLayout,
    meta: {
      title: 'LoginUser',
      hidden: true
    },
    children: [
      {
        name: 'LoginUserInfo',
        path: 'info',
        component: () => import('@/pages/auth/Login.vue'),
        meta: {
          title: 'LoginUser',
          hidden: true
        }
      }
    ]
  }
]
