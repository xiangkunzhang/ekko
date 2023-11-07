import axios from "axios";
import type {App} from "vue";

export class AxiosInstance {
    instance
    private $message: any;

    constructor() {
        this.instance = axios.create({
            baseURL: '',
            timeout: 30 * 1000 // 请求超时
        })
        this.makeRequestInterceptor()
        this.makeResponseInterceptor()
    }

    makeRequestInterceptor = () => {
        this.instance.interceptors.request.use(async (config) => {
            // const authStore = useAuthStoreOut()
            // if (authStore.getToken && config.headers) {
            //     const jwt = authStore.getToken
            //     // config.headers
            //     config.headers['Authorization'] = `${jwt}`
            // }
            console.groupCollapsed(`【接口请求】%c %s`, 'background: #222; color: #bada55', config.url)
            console.log(`【headers】`, config.headers)
            console.log(`【baseURL】%c %s`, 'background: #222; color: #bada55', config.baseURL)
            console.log(`【方法】${config.method?.toUpperCase()}`)
            console.log(`【传参】Data`, config.data)
            console.log(`【传参】Params`, config.params)
            console.groupEnd()
            return config
        })
        return this
    }

    makeResponseInterceptor = () => {
        this.instance.interceptors.response.use(
            async (response) => {
                const {data, config, status, statusText} = response
                console.groupCollapsed(`【接口返回】%c %s`, 'background: #4c3c3c; color: #cc8f5c', config.url)
                console.log(`【headers】`, config.headers)
                console.log(`【方法】${config.method?.toUpperCase()}`)
                console.log(`【Status】Code`, status)
                console.log(`【Status】Text`, statusText)
                console.log(`【结果】`, data)
                console.groupEnd()
                return data
            },
            async (error) => {
                console.log(this.$message.warning)
                if (this.$message) {
                    this.$message.warning({
                        showClose: true,
                        message: 'request error',
                        center: true,
                    })
                }
                if (error.constructor.name === 'CanceledError') {
                    // window.$message?.warning('请求被取消')
                } else if (error.response) {
                    // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
                    if (error.response.status) {
                        if (error.response.status === 401) {
                            // 登录失效或未登录
                            // const authStore = useAuthStoreOut()
                            // await authStore.setLoginOut()
                            return Promise.reject(error)
                        }
                    }
                }
                return Promise.reject(error)
            }
        )
        return this
    }

    install(app: App) {
        app.config.globalProperties.$axios = this.instance
        if (app.config.globalProperties.$message) {
            this.$message = app.config.globalProperties.$message
        }
    }
}

export const axiosInstance = new AxiosInstance()

export const request = axiosInstance.instance
