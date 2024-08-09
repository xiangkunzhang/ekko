import type { App } from 'vue'
import { createRouter } from 'vue-router'
import type { RouteRecordRaw, Router } from 'vue-router'
import { initGuard } from '@/router/guard'
import { defaultConfig } from '@/router/helper'
import { initRoutes } from '@/router/records'

class LucinaRouter {
  router: Router
  routers: RouteRecordRaw[]

  constructor() {
    this.routers = initRoutes()
    this.router = createRouter(defaultConfig(this.routers))
    this.init()
  }

  init() {
    this.makeGuard()
  }

  makeGuard() {
    initGuard(this.router)
  }

  install(app: App<Element>) {
    app.use(this.router)
  }
}

export const lucinaRouter = new LucinaRouter()

export default lucinaRouter.router
