<script setup lang="ts">
  import {useRouter} from 'vue-router'

  const router = useRouter()

  const goHome = () => router.push('/')
</script>

<template>
  <div class="page-container flex flex-col justify-center">
    <div class="text-center">
      <img src="~@/assets/exception/404.svg" alt=""/>
    </div>
    <div class="text-center">
      <h1 class="text-base text-gray-500">Sorry，The page not found.</h1>
      <el-button type="info" @click="goHome">Back Home</el-button>
    </div>
  </div>
</template>

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
