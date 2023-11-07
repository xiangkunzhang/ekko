import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      AutoImport({resolvers: [ElementPlusResolver({importStyle: 'sass'})]}),
      Components({resolvers: [ElementPlusResolver({importStyle: 'sass'})]})
  ],
  resolve: {
    alias: {
      '~/': `${path.resolve(process.cwd(), 'src')}/`,
      '@': `${path.resolve(process.cwd(), 'src')}`
    }
  },
    css: {
      preprocessorOptions: {
          scss: {
              additionalData: `@use "~/styles/element/index.scss" as *;`
          }
      }
    }
})
