import App from './config/app'

console.group('CareFinder Admin Panel')
console.table(import.meta.env)
console.groupEnd()
App.mount('#app')

