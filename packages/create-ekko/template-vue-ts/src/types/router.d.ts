import 'vue-router'

declare module 'vue-router' {
  /** 路由描述 */
  interface RouteMeta {
    /** 路由菜单名称 */
    title: string
    /** 菜单图标 */
    icon?: string
    /** 路由顺序，可用于菜单的排序 */
    order?: number
    /** 是否在菜单中隐藏(一些列表、表格的详情页面需要通过参数跳转，所以不能显示在菜单中) */
    hidden?: boolean
    /** 不需要登录权限 */
    withoutLogin?: boolean
  }
}
