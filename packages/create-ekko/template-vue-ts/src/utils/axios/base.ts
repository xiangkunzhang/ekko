import type { Axios, AxiosRequestConfig, AxiosResponse, AxiosInstance, AxiosDefaults } from 'axios'
import axios from 'axios'

export class BaseAxios implements Axios {
  defaults: AxiosDefaults
  interceptors: any
  instance: AxiosInstance

  constructor(config?: AxiosRequestConfig) {
    const timeout = Number.parseInt(String(import.meta.env.VITE_REQUEST_TIMEOUT)) || 30
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      timeout: timeout * 1000, // 请求超时时间(单位毫秒)
      ...(config || {})
    })
    this.defaults = this.instance.defaults
    this.interceptors = this.instance.interceptors
  }

  getUri(config?: AxiosRequestConfig): string {
    return this.instance.getUri(config)
  }

  request<T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R> {
    return this.instance.request(config)
  }

  get<T = any, R = ResponseData<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.instance.get(url, config)
  }

  delete<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.instance.delete(url, config)
  }

  head<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.instance.head(url, config)
  }

  options<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.instance.options(url, config)
  }

  post<T = any, R = ResponseData<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.instance.post(url, data, config)
  }

  put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.instance.put(url, data, config)
  }

  patch<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.instance.patch(url, data, config)
  }

  putForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.instance.putForm(url, data, config)
  }

  postForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.instance.postForm(url, data, config)
  }

  patchForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.instance.patchForm(url, data, config)
  }
}
