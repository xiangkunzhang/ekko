import { defineComponent } from 'vue'
import { RouterView, useRoute } from 'vue-router'

export default defineComponent({
  name: 'Redirect',
  setup() {
    const route = useRoute()
    return () => <RouterView key={route.path} />
  }
})
