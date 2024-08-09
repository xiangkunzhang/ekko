import { loadEnv } from 'vite'

/* 解析ViteEnv 强类型数据 */
export const loadViteEnv = (mode: string, command: string): ViteEnv => {
  const root = process.cwd()
  const envConf = loadEnv(mode, root)
  const envData: any = {
    isDev: command === 'serve'
  }
  for (const envName of Object.keys(envConf)) {
    envData[envName] = makeEnvValue(envConf[envName])
  }
  const result = makeDefaultEnv(envData)
  initPrint(mode, result)
  return result
}

/* 解析Env 设置值 */
const makeEnvValue = (envStr: string): any => {
  if (envStr === '') {
    return null
  }
  if (['true', 'false'].includes(envStr.toLowerCase())) {
    return envStr.toLowerCase() !== 'false'
  }
  if (String(Number(envStr)) === envStr) {
    return Number(envStr)
  }
  return envStr
}

/* ViteEnv 空值使用用默认值 */
const makeDefaultEnv = (origin: ViteEnv): ViteEnv => {
  return {
    isDev: origin.isDev,
    /*项目名称*/
    VITE_APP_TITLE: origin.VITE_APP_TITLE || 'Admin',
    /*开发模式下 项目端口号*/
    VITE_DEV_PORT: origin.VITE_DEV_PORT || 3000,
    /*网站前缀*/
    VITE_BASE_URL: origin.VITE_BASE_URL || '/',
    /*API 接口地址*/
    VITE_API_URL: origin.VITE_API_URL || '',
    /*图片上传地址*/
    VITE_UPLOAD_URL: origin.VITE_UPLOAD_URL || '',
    /*图片前缀地址*/
    VITE_IMG_URL: origin.VITE_IMG_URL || '',
    /**开启MOCK*/
    VITE_MOCK: origin.VITE_MOCK || false
  }
}

/* 解析后打印ViteEnv */
function initPrint(mode: any, env: any) {
  console.group('vite config')
  console.log('vite mode', mode)
  console.table(env)
  console.log('vite config======================')
  console.groupEnd()
}
