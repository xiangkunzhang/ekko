<script setup>
  import {useRoute, useRouter} from 'vue-router'

  const route = useRoute()
  const router = useRouter()

  const {params, query} = route
  const {path} = params
  onBeforeMount(() => {
    router
        .replace({
          path: '/' + (Array.isArray(path) ? path.join('/') : path),
          query
        })
        .finally(() => {
        })
  })
</script>

<template>
  <div></div>
</template>
