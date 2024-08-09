<template>
  <div class="page-container">
    <h2>Home Page</h2>

    <HelloWorld msg="Vite + Vue + Ts" />
  </div>
</template>

<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
</script>

<style scoped lang="scss">
.page-container {
  width: 100%;
  height: 300px;
  text-align: center;
  font-size: large;
  padding-top: 100px;
}
</style>
