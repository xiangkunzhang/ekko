import { Plugin } from 'vite'
import compressPlugin from 'vite-plugin-compression'

/** 配置 文件压缩插件 */
export function configCompressPlugin(env: ViteEnv, compress: 'gzip' | 'brotli' | 'none'): Plugin | Plugin[] {
  const plugins: Plugin[] = []
  if (!env.isDev) {
    const compressList = compress.split(',')
    if (compressList.includes('gzip')) {
      plugins.push(compressPlugin({ ext: '.gz' }))
    }
    if (compressList.includes('brotli')) {
      plugins.push(compressPlugin({ ext: '.br', algorithm: 'brotliCompress' }))
    }
  }
  return plugins
}
