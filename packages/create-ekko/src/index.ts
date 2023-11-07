import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import prompts from 'prompts'
import { red, reset } from 'kolorist'
import { Command } from 'commander'
import { FRAMEWORKS, TEMPLATES, renameFiles, defaultProjectName } from './base'
import {
  emptyDir,
  pkgFromUserAgent,
  isEmpty,
  formatTargetDir,
  copy,
  isValidPackageName,
  toValidPackageName
} from './helper'
import pkgJson from '../package.json'

const program = new Command()

const cwd = process.cwd()

const doPrompts = async (name: string, argTemplate: string, configTargetPath: string) => {
  let result: prompts.Answers<'projectName' | 'overwrite' | 'packageName' | 'framework' | 'variant'>
  let targetPath = configTargetPath
  const questions: prompts.PromptObject<
    'projectName' | 'overwrite' | 'overwriteChecker' | 'packageName' | 'framework' | 'variant'
  >[] = [
    {
      type: name !== defaultProjectName ? null : 'text',
      name: 'projectName',
      message: reset('Project name:'),
      initial: defaultProjectName,
      onState: state => {
        name = state.value
        const targetName = formatTargetDir(name) || defaultProjectName
        targetPath = configTargetPath ? configTargetPath : path.join(cwd, targetName)
      }
    },
    {
      type: () => (!fs.existsSync(targetPath) || isEmpty(targetPath) ? null : 'confirm'),
      name: 'overwrite',
      message: () =>
        (targetPath === cwd ? 'Current directory' : `Target directory "${targetPath}"`) +
        ` is not empty. Remove existing files and continue?`
    },
    {
      type: (_, { overwrite }: { overwrite?: boolean }) => {
        if (typeof overwrite !== 'undefined' && !overwrite) {
          throw new Error(red('✖') + ' Operation cancelled')
        }
        return null
      },
      name: 'overwriteChecker'
    },
    {
      type: () => (isValidPackageName(name) ? null : 'text'),
      name: 'packageName',
      message: reset('Package name:'),
      initial: () => toValidPackageName(name),
      validate: pkgName => isValidPackageName(pkgName) || 'Invalid package.json name'
    },
    {
      type: argTemplate && TEMPLATES.includes(argTemplate) ? null : 'select',
      name: 'framework',
      message:
        argTemplate && !TEMPLATES.includes(argTemplate)
          ? reset(`"${argTemplate}" isn't a valid template. Please choose from below: `)
          : reset('Select a framework:'),
      initial: 0,
      choices: FRAMEWORKS.map(framework => ({
        title: framework.color(framework.display || framework.name),
        value: framework
      }))
    },
    {
      type: (framework: Framework) => (framework && framework.variants ? 'select' : null),
      name: 'variant',
      message: reset('Select a variant:'),
      choices: (framework: Framework) =>
        framework.variants.map(variant => {
          const variantColor = variant.color
          return {
            title: variantColor(variant.display || variant.name),
            value: variant.name
          }
        })
    }
  ]

  try {
    result = await prompts(questions, {
      onCancel: () => {
        throw new Error(red('✖') + red(' Operation cancelled'))
      }
    })
  } catch (cancelled: any) {
    console.log(cancelled.message)
    return
  }

  const { framework, overwrite, packageName, variant } = result

  if (overwrite) {
    emptyDir(targetPath)
  } else if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true })
  }

  const template: string = variant || framework?.name || argTemplate
  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent)
  const pkgManager = pkgInfo ? pkgInfo.name : 'npm'

  console.log(`\nScaffolding project in ${targetPath}...`)

  const templateDir = path.resolve(fileURLToPath(import.meta.url), '../..', `template-${template}`)

  const write = (file: string, content?: string) => {
    const tPath = path.join(targetPath, renameFiles[file] ?? file)
    if (content) {
      fs.writeFileSync(tPath, content)
    } else {
      copy(path.join(templateDir, file), tPath)
    }
  }

  const files = fs.readdirSync(templateDir)
  for (const file of files.filter(f => f !== 'package.json')) {
    write(file)
  }

  const pkg = JSON.parse(fs.readFileSync(path.join(templateDir, `package.json`), 'utf-8'))
  pkg.name = packageName || name
  write('package.json', JSON.stringify(pkg, null, 2) + '\n')
  const cdProjectName = path.relative(cwd, targetPath)
  console.log(`\nDone. Now run:\n`)
  if (targetPath !== cwd) {
    console.log(`  cd ${cdProjectName.includes(' ') ? `"${cdProjectName}"` : cdProjectName}`)
  }
  switch (pkgManager) {
    case 'yarn':
      console.log('  yarn')
      console.log('  yarn dev')
      break
    default:
      console.log(`  ${pkgManager} install`)
      console.log(`  ${pkgManager} run dev`)
      break
  }
  console.log()
}

function init() {
  program
    .name(pkgJson.name || 'create-ekko')
    .description('前端项目创建Cli')
    .version(pkgJson.version || '0.0.1')
    .argument('[Project Name]', '项目名称', defaultProjectName)
    .option('-t, --template <template>', '指定使用模板')
    .option('-p, --path <targetPath>', '指定项目生成目录')
    .action((projectName, { template, path: targetPath }) => {
      let rootPath = ''
      if (targetPath) {
        if (targetPath.startsWith('/')) {
          rootPath = targetPath
        } else if (targetPath === '.') {
          rootPath = path.resolve()
        } else {
          rootPath = path.join(cwd, targetPath)
        }
      }
      doPrompts(projectName || '', template || '', rootPath || '').catch(e => {
        console.error(e)
      })
    })

  program.parse(process.argv)
}

init()
