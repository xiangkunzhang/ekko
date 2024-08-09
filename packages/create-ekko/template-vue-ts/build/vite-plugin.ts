import type { Plugin, PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { configCompressPlugin, configHtmlPlugin } from './plugin'

/** 创建Vite插件集 */
export const makePlugin = (env: ViteEnv) => {
  const vitePlugins: (Plugin | PluginOption)[] = [
    vue(),
    vueJsx(),
    configHtmlPlugin(env),
    configCompressPlugin(env, 'gzip')
  ]
  return vitePlugins
}
