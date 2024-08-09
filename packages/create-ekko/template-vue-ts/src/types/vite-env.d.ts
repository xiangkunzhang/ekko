/// <reference types="vite/client" />

declare const __APP_VERSION__: string

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

interface ImportMetaEnv extends ViteEnv {
    _: unknown
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

declare interface ViteEnv {
    isDev: boolean
    /**项目名称*/
    VITE_APP_TITLE: string
    /**开发模式下 项目端口号*/
    VITE_DEV_PORT: number
    /**网站前缀*/
    VITE_BASE_URL: string
    /**API 接口地址*/
    VITE_API_URL: string
    /**图片上传地址*/
    VITE_UPLOAD_URL: string
    /**图片前缀地址*/
    VITE_IMG_URL: string
    /**开启MOCK*/
    VITE_MOCK: boolean
}
