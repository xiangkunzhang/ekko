<template>
  <div class="page-container flex flex-col justify-center">
    <div class="text-center">
      <img src="~@/assets/images/exception/403.svg" alt="" />
    </div>
    <div class="text-center">
      <h1 class="text-base text-gray-500">抱歉，你无权访问该页面</h1>
      <button type="button" @click="goHome">回到首页</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()

  function goHome() {
    router.push('/')
  }
</script>

<style lang="scss" scoped>
  .page-container {
    width: 100%;
    border-radius: 4px;
    padding: 50px 0;
    height: 100vh;

    .text-center {
      h1 {
        color: #666;
        padding: 20px 0;
      }
    }

    img {
      width: 350px;
      margin: 0 auto;
    }
  }
</style>
