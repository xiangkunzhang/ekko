<script setup lang="ts">
  import {useRoute, useRouter} from 'vue-router'
  import {onBeforeMount} from 'vue'

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
