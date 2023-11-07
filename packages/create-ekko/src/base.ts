import { blue, cyan, green, yellow } from 'kolorist'

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

const TEMPLATES = FRAMEWORKS.map(f => (f.variants && f.variants.map(v => v.name)) || [f.name]).flat()

const renameFiles: Record<string, string | undefined> = {
  _gitignore: '.gitignore',
  _eslintignore: '.eslintignore',
  _prettierignore: '.prettierignore',
  '_eslintrc.yaml': '.eslintrc.yaml',
  '_prettierrc.yaml': '.prettierrc.yaml'
}

const defaultProjectName = 'ekko-project'

export { FRAMEWORKS, TEMPLATES, renameFiles, defaultProjectName }
