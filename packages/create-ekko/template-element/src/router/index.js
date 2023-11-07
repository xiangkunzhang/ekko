import {createRouter} from 'vue-router'
import {createWebHistory} from 'vue-router'

const RedirectPage = () => import('@/pages/midPage/RedirectPage.vue')
const NotFoundPage = () => import('@/pages/error/NotFound.vue')
const NoPermissionPage = () => import('@/pages/error/NoPermission.vue')

const staticRouters = [
    {
      name: 'StaticRoutePage',
      path: '/',
      component: () => import('@/layout/MainLayout.vue'),
      children: [
          {
              name: 'Home',
              path: '',
              component: ()=> import('@/pages/home/HomeIndex.vue'),
              meta: {
                  title: 'Home'
              }
          }
      ]
    },
    {
        name: 'About',
        path: '/about',
        component: () => import('@/layout/MainLayout.vue'),
        redirect: '/about/index',
        children: [
            {
                name: 'AboutPage',
                path: '/about/index',
                component: () => import('@/pages/home/HomeIndex.vue'),
                meta: {
                    title: 'About'
                }
            }
        ]
    }
]

const basicRouters = [
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

const routers = [...basicRouters, ...staticRouters]

const scrollBehavior = to => {
    return new Promise(resolve => {
        if (to.hash) {
            const el = document.querySelector(to.hash)
            if (el) {
                resolve({el, behavior: 'smooth'})
            }
        }

        const scrollPosition = {left: 0, top: 0}

        const duration = !scrollPosition.left && !scrollPosition.top ? 0 : 350

        setTimeout(() => resolve(scrollPosition), duration)
    })
}

const makeGuard = (router) => {
    router.beforeEach(async (_to, _from, next) => {
        next()
    })
    return router
}

const router = createRouter({
    scrollBehavior: scrollBehavior,
    history: createWebHistory(),
    routes: routers
})

makeGuard(router)

export default router

export {router}
