declare type ColorFunc = (str: string | number) => string

declare type Framework = {
  name: string
  display: string
  color: ColorFunc
  variants: FrameworkVariant[]
}

declare type FrameworkVariant = {
  name: string
  display: string
  color: ColorFunc
}

declare type PkgInfo = {
  name: string
  version: string
}
