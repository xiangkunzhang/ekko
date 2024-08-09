import { RouteRecordRaw } from 'vue-router'

export const NotFoundPage = () => import('@/pages/error/NotFound.vue')
export const NoPermissionPage = () => import('@/pages/error/NoPermission.vue')
export const RedirectPage = () => import('@/pages/midPage/Redirect')

export const basicRouters: RouteRecordRaw[] = [
  {
    name: 'Redirect',
    path: '/redirect/:path(.*)',
    component: RedirectPage,
    meta: {
      title: 'Redirect',
      hidden: true,
      withoutLogin: true
    }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFoundPage,
    meta: {
      title: '404',
      hidden: true,
      withoutLogin: true
    }
  },
  {
    path: '/403',
    name: 'NoPermission',
    component: NoPermissionPage,
    meta: {
      title: '401',
      hidden: true,
      withoutLogin: true
    }
  },
  {
    path: '/:w+',
    redirect: '/404',
    meta: {
      title: 'Mid-404',
      hidden: true,
      withoutLogin: true
    }
  }
]
