import { defineComponent, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'Redirect',
  setup() {
    const route = useRoute()
    const router = useRouter()
    onBeforeMount(() => {
      const { params, query } = route
      const { path } = params
      router
        .replace({
          path: '/' + (Array.isArray(path) ? path.join('/') : path),
          query
        })
        .finally(() => {})
    })
    return () => <div />
  }
})
