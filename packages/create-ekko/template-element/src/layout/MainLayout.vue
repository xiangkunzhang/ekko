<script setup>

</script>

<template>
  <el-container>
    <el-aside width="200px" style="height: 100vh; ">
      <el-scrollbar>
        <el-menu router style="border-right: none" :default-active="$route.name">
          <el-menu-item :route="{name: 'Home'}" index="Home">Home</el-menu-item>
          <el-menu-item :route="{name: 'AboutPage'}" index="AboutPage">About</el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">

</style>
