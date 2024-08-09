import type { Router } from 'vue-router'
// import { useAuthStoreOut } from '@/store/modules/Auth'

export default class TitleGuard {
  router: Router

  constructor(r: Router) {
    this.router = r
    this.init()
  }

  init() {
    this.router.beforeEach(async (_to, _from, next) => {
      // 页面跳转权限处理
      // const authStore = useAuthStoreOut()
      // if (!_to.meta.withoutLogin) {
      //   // 判断页面需要登录权限
      //   if (!authStore.getToken) {
      //     // 不存在登录token 跳转至登录页
      //     next({ name: 'AuthLogin' })
      //     return
      //   }
      // } else if (_to.name === 'AuthLogin' && authStore.getToken) {
      //   // 存在token 并且目标页面为登录页，跳转至首页
      //   next('/')
      //   return
      // }

      next()
    })
  }
}

export function initAuthGuard(r: Router): void {
  new TitleGuard(r)
}
