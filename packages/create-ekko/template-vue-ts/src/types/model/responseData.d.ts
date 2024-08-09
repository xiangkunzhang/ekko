declare interface ResponseData<T = any> {
  msg?: string
  code?: number
  data?: T

  [property: string]: any
}

declare interface ResponseRowData<T = any> {
  total?: number
  rows?: T[]
  msg?: string
  code?: number
}
