import { createWebHistory } from 'vue-router'
import type { RouteRecordRaw, RouterScrollBehavior } from 'vue-router'

export const scrollBehavior: RouterScrollBehavior = to => {
  return new Promise(resolve => {
    if (to.hash) {
      const el = document.querySelector(to.hash)
      if (el) {
        resolve({ el, behavior: 'smooth' })
      }
    }

    const scrollPosition = { left: 0, top: 0 }

    const duration = !scrollPosition.left && !scrollPosition.top ? 0 : 350

    setTimeout(() => resolve(scrollPosition), duration)
  })
}

/** 路由默认设置 */
export const defaultConfig = (routers: RouteRecordRaw[]) => {
  return {
    scrollBehavior: scrollBehavior,
    history: createWebHistory(),
    routes: routers
  }
}
