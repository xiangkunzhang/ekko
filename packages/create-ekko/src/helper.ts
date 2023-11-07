import fs from 'node:fs'
import path from 'node:path'

/**
 * 格式化目标目录
 * @param {string} targetDir - 目标目录
 * @return {string} - 格式化后结果
 */
function formatTargetDir(targetDir: string | undefined): string {
  return targetDir?.trim().replace(/\/+$/g, '') || ''
}

/**
 * 复制文件
 * @param {string} src - 原始地址
 * @param {string} dest - 目标地址
 */
function copy(src: string, dest: string): void {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    // 如果原始地址是目录，调用复制复制目录方法
    copyDir(src, dest)
  } else {
    fs.copyFileSync(src, dest)
  }
}

/**
 * 判断项目名称是否符合package.json name规则
 * @param {string} projectName - 项目名称
 * @return {boolean} - true: 合格 false: 不符合
 */
function isValidPackageName(projectName: string): boolean {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(projectName)
}

/**
 * 将项目名称格式化为符合package.json name规则的名称
 * @param {string} projectName - 项目名称
 * @return {string} - 合规package名称
 */
function toValidPackageName(projectName: string): string {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z\d\-~]+/g, '-')
}

/**
 * 复制目录下文件
 * @param {string} srcDir - 原始路径
 * @param {string} destDir - 目标路径
 */
function copyDir(srcDir: string, destDir: string): void {
  fs.mkdirSync(destDir, { recursive: true })
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file)
    const destFile = path.resolve(destDir, file)
    copy(srcFile, destFile)
  }
}

/**
 * 判断路径是否为空
 * @param {string} path - 目标路径
 * @return {boolean} - 判断后返回是否存在
 *                   - 空  返回true
 *                   - 非空 返回false
 */
function isEmpty(path: string): boolean {
  const files = fs.readdirSync(path)
  return files.length === 0 || (files.length === 1 && files[0] === '.git')
}

/**
 * 清空目录
 * @param {string} dir - 目标目录
 * @desc 清空目标目录，跳过.git目录
 */
function emptyDir(dir: string): void {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach((file: string) => {
      console.log(file)
      if (file !== '.git') {
        fs.rmSync(path.resolve(dir, file), { recursive: true, force: true })
      }
    })
  }
}

/**
 * 获取当前使用包管理器类型及版本
 * @param {string} userAgent - npm_config_user_agent
 * @return {PkgInfo|undefined} - 包管理器类型、版本
 */
function pkgFromUserAgent(userAgent: string | undefined): PkgInfo | undefined {
  if (!userAgent) return undefined
  const pkgSpec = userAgent.split(' ')[0]
  const pkgSpecArr = pkgSpec.split('/')
  return { name: pkgSpecArr[0], version: pkgSpecArr[1] } as PkgInfo
}

export { emptyDir, pkgFromUserAgent, isEmpty, formatTargetDir, copy, isValidPackageName, toValidPackageName, copyDir }
