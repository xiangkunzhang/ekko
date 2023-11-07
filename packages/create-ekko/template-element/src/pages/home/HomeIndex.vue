<script setup>
  import {Setting} from "@element-plus/icons-vue"
  import {request} from "@/utils/index.js";
  const handleClick = ()=>{
    request.get('/asdasd')
  }
</script>

<template>
  <div>Home Page</div>
  <el-button circle @click="handleClick">
    <template #icon>
      <el-icon>
        <Setting/>
      </el-icon>
    </template>
  </el-button>
</template>

<style scoped lang="scss">

</style>
