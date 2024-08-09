import {ConfigEnv, UserConfigExport} from 'vite'
import {loadViteEnv} from "./build/vite-env";
import * as path from "node:path";
import {makePlugin} from "./build/vite-plugin";

export default ({mode, command}: ConfigEnv): UserConfigExport => {
  const env = loadViteEnv(mode, command)
  return {
    resolve: {
      alias: {
        '~': path.resolve(process.cwd()),
        '@': `${path.resolve(process.cwd())}/src`
      },
      extensions: ['.ts', '.tsx', '.vue']
    },
    plugins: makePlugin(env),
    server: {host: true, port: env.VITE_DEV_PORT},
    preview: {host: true, port: env.VITE_DEV_PORT},
  }
}
