import { EkkoEncrypt } from './encrypt'

export class Index {
  readonly baseAppName = 'school-delivered'

  storageName = ''

  constructor(name: string) {
    this.storageName = this.makeName(name)
  }

  setLocal(data: any) {
    localStorage.setItem(this.storageName, this.encodeData(data))
  }

  getLocal<T>(): T | any {
    return this.decodeData<T>(localStorage.getItem(this.storageName) || '') as T
  }

  setSession(data: any) {
    sessionStorage.setItem(this.storageName, this.encodeData(data))
  }
  getSession<T>(): T | unknown {
    return this.decodeData<T>(sessionStorage.getItem(this.storageName) || '') as T
  }

  clear() {
    localStorage.removeItem(this.storageName)
    sessionStorage.removeItem(this.storageName)
  }

  allClear() {
    localStorage.clear()
    sessionStorage.clear()
  }

  private makeName(name: string): string {
    return `${this.baseAppName}_${name}`
  }

  private encodeData(data: any): string {
    if (!data) {
      return ''
    }
    switch (data.constructor) {
      case Array:
      case Object:
        return EkkoEncrypt.aesEncrypt(encodeURIComponent(JSON.stringify(data)))
      case String:
      case Number:
        return EkkoEncrypt.aesEncrypt(encodeURIComponent(String(data)))
      case Boolean:
        return EkkoEncrypt.aesEncrypt(encodeURIComponent(data))
      default:
        return ''
    }
  }

  private decodeData<T>(val: string): T | unknown {
    let res = ''
    if (val) {
      const decodeStr = decodeURIComponent(EkkoEncrypt.aesDecrypt(val))
      try {
        res = JSON.parse(decodeStr)
      } catch (e) {
        res = decodeStr
      }
    }
    return res
  }
}

export const useWebStorage = (name: string) => {
  return new Index(name)
}
