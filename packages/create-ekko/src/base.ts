import { blue, cyan, green, yellow } from 'kolorist'

/**
 * 模板数组
 */
const FRAMEWORKS: Framework[] = [
  {
    name: 'vue',
    display: 'Vue',
    color: green,
    variants: [
      {
        name: 'vue-ts',
        display: 'TypeScript',
        color: blue
      },
      {
        name: 'vue',
        display: 'JavaScript',
        color: yellow
      }
    ]
  },
  {
    name: 'element',
    display: 'Element-Plus',
    color: cyan,
    variants: [
      {
        name: 'element',
        display: 'Element with Javascript',
        color: green
      },
      {
        name: 'element-ts',
        display: 'Element with Typescript',
        color: blue
      }
    ]
  }
]

/**
 * 模板名称数组
 */
const TEMPLATES = FRAMEWORKS.map(f => (f.variants && f.variants.map(v => v.name)) || [f.name]).flat()

/**
 * 重命名文件列表
 */
const renameFiles: Record<string, string | undefined> = {
  _gitignore: '.gitignore',
  _eslintignore: '.eslintignore',
  _prettierignore: '.prettierignore',
  '_eslintrc.yaml': '.eslintrc.yaml',
  '_prettierrc.yaml': '.prettierrc.yaml'
}

/**
 * 默认项目名称
 */
const defaultProjectName = 'ekko-project'

export { FRAMEWORKS, TEMPLATES, renameFiles, defaultProjectName }
