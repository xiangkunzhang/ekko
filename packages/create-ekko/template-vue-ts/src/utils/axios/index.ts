import { BaseAxios } from './base'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
// import { useAuthStoreOut } from 'src/stores/modules/Auth'

export class AxiosRequest extends BaseAxios {
  private printConsole = true

  private readonly noErrorMsg: boolean = false
  static instance: AxiosInstance

  constructor(noErrorMsg?: boolean) {
    super()
    this.noErrorMsg = noErrorMsg || false
    this.init()
  }

  init() {
    this.makeRequestInterceptor()
    this.makeResponseInterceptor()
  }

  makeRequestInterceptor() {
    this.instance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
        // const authStore = useAuthStoreOut()
        // if (authStore.getToken && config.headers) {
        //   const jwt = authStore.getToken
        //   // config.headers
        //   config.headers['Authorization'] = `${jwt}`
        // }
        if (this.printConsole) {
          console.groupCollapsed(`【接口请求】%c %s`, 'background: #222; color: #bada55', config.url)
          console.log(`【headers】`, config.headers)
          console.log(`【baseURL】%c %s`, 'background: #222; color: #bada55', config.baseURL)
          console.log(`【方法】${config.method?.toUpperCase()}`)
          console.log(`【传参】Data`, config.data)
          console.log(`【传参】Params`, config.params)
          console.groupEnd()
        }
        return config
      }
    )
  }

  makeResponseInterceptor() {
    this.instance.interceptors.response.use(
      async (response: AxiosResponse<ResponseData>): Promise<any> => {
        const { data, config, status, statusText } = response
        if (this.printConsole) {
          console.groupCollapsed(`【接口返回】%c %s`, 'background: #4c3c3c; color: #cc8f5c', config.url)
          console.log(`【headers】`, config.headers)
          console.log(`【方法】${config.method?.toUpperCase()}`)
          console.log(`【Status】Code`, status)
          console.log(`【Status】Text`, statusText)
          console.log(`【结果】`, data)
          console.groupEnd()
        }
        if (data.code !== 200) {
          // if (data.code === 401) {
          //   // 登录失效或未登录
          //   const authStore = useAuthStoreOut()
          //   await authStore.setLoginOut()
          //   window.$message?.error('登录失效')
          //   return Promise.reject(data)
          // }
          // if (data.msg) {
          //   window.$message?.error(data.msg)
          //   return Promise.reject(data)
          // }
          // if (data.code === 500) {
          //   window.$message?.error('内部异常，请联系管理员')
          //   return Promise.reject(data)
          // }
        }
        return data
      },
      async (error: any): Promise<any> => {
        if (this.noErrorMsg) {
          console.error(error)
          return Promise.reject(error)
        }
        if (error.constructor.name === 'CanceledError') {
          // window.$message?.warning('请求被取消')
        } else if (error.response) {
          // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
          if (error.response.status) {
            if (error.response.code === 401) {
              // 登录失效或未登录
              // const authStore = useAuthStoreOut()
              // await authStore.setLoginOut()
              // window.$message?.error('登录失效')
              return Promise.reject(error)
            }
            if (error.response.data?.message) {
              // window.$message?.error(error.response.data.message)
              return Promise.reject(error)
            }
            console.log(error.response)
            // window.$message?.error('请求错误,错误状态：' + error.response.status)
          } else {
            // window.$message?.error('请求错误,服务异常')
          }
        } else if (error.request) {
          // 请求已经成功发起，但没有收到响应
          if (error.message) {
            if (error.message.startsWith('timeout')) {
              // window.$message?.error('请求超时')
            } else {
              // window.$message?.error(error.message)
            }
          } else {
            // window.$message?.error('请求异常')
          }
        } else {
          console.error(error)
          // window.$message?.error('请求失败，未知错误')
        }
        return Promise.reject(error)
      }
    )
  }

  controlGet<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): { reqBody: Promise<R>; controller: AbortController } {
    const controller = new AbortController()
    return {
      reqBody: this.get(url, { ...(config || {}), signal: controller.signal }),
      controller
    }
  }

  withoutMsg() {
    return new AxiosRequest(true)
  }
}

export const request = new AxiosRequest()

export default request
