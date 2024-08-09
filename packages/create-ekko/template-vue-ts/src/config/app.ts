import { createApp } from 'vue'
import { lucinaRouter } from '@/router'
import { appStore } from '@/store'
import AppPage from '@/App.vue'

export const initApp = () => {
  const app = createApp(AppPage)
  app.use(lucinaRouter).use(appStore)

  return app
}

export default initApp()
