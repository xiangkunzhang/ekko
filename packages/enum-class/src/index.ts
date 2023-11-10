/**
 * @description: 枚举结构
 */
declare interface Enumerate<T> {
  value: string | number | boolean
  label: string
  other?: T | any
}

/**
 * @description: 枚举模块
 */
declare interface EnumerateModule<T> {
  name: string
  enums: Enumerate<T>[]
  extendFunc?: Record<string, (arg0: EnumerateModule<T>) => any>
}

/**
 * @description: 枚举对象初始结构
 */
export const enumAppObj: Record<string, EnumerationPlugin<any>> = {}

class EnumerationPlugin<T> {
  private _name: string
  private readonly _enums: Enumerate<T>[];

  [k: string]: any

  constructor(param: string | EnumerateModule<T>, enums?: Enumerate<T>[]) {
    if (typeof param === 'string') {
      this._name = param
      this._enums = enums || []
    } else {
      this._name = param.name
      this._enums = param.enums
      if (param.extendFunc) {
        Object.keys(param.extendFunc).forEach((key: string) => {
          this[key] = () => {
            if (param.extendFunc && param.extendFunc[key]) {
              param.extendFunc[key](this)
            }
          }
        })
      }
    }
  }

  get name(): string {
    return this._name
  }

  set name(v: string) {
    this._name = v
  }

  get enums(): Enumerate<T>[] {
    return this._enums
  }

  /**
   * 根据Value获取label描述
   * @param {string | number | boolean} value 枚举值
   * @param {string} [defaultStr="--"] 默认描述
   */
  string(value: string | number | boolean | undefined, defaultStr: string = '--'): string {
    if (typeof value === 'string' && !value) {
      return defaultStr || '--'
    }
    if (value === null || value === undefined) {
      return defaultStr || '--'
    }
    const activeEnum = this.enums.find((item: Enumerate<T>) => {
      return item.value.toString() === value.toString()
    })
    if (activeEnum) {
      return activeEnum.label
    }
    return (value && value.toString()) || defaultStr || '--'
  }

  /**
   * 根据枚举描述获取值Value
   * @param {string} label 枚举描述
   * @returns {string | number | boolean} 枚举值
   */
  value(label: string): string | number | boolean {
    const activeEnum = this.enums.find((item: Enumerate<T>) => {
      return item.label === label
    })
    if (activeEnum) {
      return activeEnum.value
    }
    return label
  }

  /**
   * 枚举数据生成Option选项列表
   * @param {boolean} [labelIsValue] - 使用value作为label
   * @return {Enumerate[]}
   */
  options(labelIsValue?: boolean): Enumerate<T>[]
  /**
   * 枚举数据生成Option选项列表
   * @param {function} [customFunc] - map处理数据方法
   * @return {Enumerate[]}
   */
  options(customFunc?: (value: Enumerate<T>, index: number, array: Enumerate<T>[]) => Enumerate<T>): Enumerate<T>[]

  /**
   * 枚举数据生成Option选项列表
   * @param [param]
   * @return {Enumerate[]}
   */
  options(param?: boolean | mapFunc): Enumerate<T>[] {
    if (typeof param === 'undefined') {
      return this.enums || []
    }
    if (typeof param === 'boolean') {
      if (param) {
        return this.enums.reduce((result: Enumerate<T>[], item: Enumerate<T>) => {
          result.push({ ...item, label: this.string(item.value) })
          return result
        }, [])
      } else {
        return this.enums || []
      }
    }
    if (typeof param === 'function') {
      return this.enums.map(param)
    }
    return this.enums || []
  }

  others(): any[] {
    return this.enums.reduce((result: string[], item: Enumerate<T>) => {
      result.push(item.other || {})
      return result
    }, [])
  }

  /**
   * 判断枚举是否包含此label
   * @param {string} label
   * @return {boolean}
   */
  includeLabel(label: string): boolean {
    return this.enums.some((enumerate: Enumerate<T>) => {
      return enumerate.label === label
    })
  }
}

type mapFunc = <T>(value: Enumerate<T>, index: number, array: Enumerate<T>[]) => Enumerate<T>

/**
 * 定义枚举
 * @param {string} name - 枚举名称
 * @param {Enumerate[]} enums - 枚举数据
 * @return { ()=> EnumerationPlugin } - 枚举对象函数
 */
export const defineEnum = <T>(
  name: string | EnumerateModule<T>,
  enums?: Enumerate<T>[]
): (() => EnumerationPlugin<T>) => {
  const enumeration = new EnumerationPlugin<T>(name, enums)
  enumerationApp[enumeration.name] = enumeration
  return () => enumeration
}

/**
 * 全局枚举对象
 */
export const enumerationApp:Record<string, EnumerationPlugin<any>> = new Proxy(enumAppObj, {
  set(obj: Record<string, EnumerationPlugin<any>>, prop: string, value: EnumerationPlugin<any>) {
    const key = value.name || prop
    value.name = key
    return Reflect.set(obj, key, value, obj)
  }
})

/**
 * 初始化枚举插件
 * @return {Object}
 */
export const createEnumeration = (): object => {
  return {
    enumerations: enumerationApp,
    install(app: any, options: any) {
      app.config.globalProperties.$enum = enumerationApp
      app.provide('enumeration', enumerationApp)
    }
  }
}
