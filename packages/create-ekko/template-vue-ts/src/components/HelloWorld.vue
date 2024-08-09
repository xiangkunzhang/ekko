<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Application built with
    <a href="https://www.npmjs.com/package/create-ekko" target="_blank"
    >create-ekko</a
    >
  </p>
</template>

<style scoped>
.card{
  button{
    background-color: #409EFF;
    color: #fff;
    padding: 10px 20px;
    border-radius: 4px;
    border: none;
  }
}
</style>
