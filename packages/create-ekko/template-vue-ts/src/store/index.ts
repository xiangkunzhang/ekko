import type { App } from 'vue'
import type { Pinia } from 'pinia'
import { createPinia } from 'pinia'

class AppStore {
  store: Pinia

  constructor() {
    this.store = createPinia()
  }

  install(app: App<Element>) {
    app.use(this.store)
  }
}

export const appStore = new AppStore()

export const store: Pinia = appStore.store
