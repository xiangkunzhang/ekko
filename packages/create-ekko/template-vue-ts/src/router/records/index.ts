import type { RouteRecordRaw } from 'vue-router'
import { staticRouters } from './staticRouters'
import { basicRouters } from './basicRouters'
import { dynamicRouters } from './dynamicRouters'

export const routerRecords: RouteRecordRaw[] = [...staticRouters, ...dynamicRouters, ...basicRouters]

/** 初始化路由表 */
export const initRoutes = (): RouteRecordRaw[] => {
  return [...routerRecords]
}

export { staticRouters, basicRouters, dynamicRouters }
