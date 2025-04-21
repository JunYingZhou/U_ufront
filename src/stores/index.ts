/*
 * @Author: zjy 3497577844@qq.com
 * @Date: 2024-12-21 01:59:18
 * @LastEditors: zjy 3497577844@qq.com
 * @LastEditTime: 2025-04-06 01:52:06
 * @FilePath: \u_uf\src\stores\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

// 创建 pinia 实例
const pinia = createPinia()
// 使用持久化存储插件
pinia.use(persist)

// 默认导出，给 main.ts 使用
export default pinia

// 模块统一导出
export * from './modules/userStore'
export * from './modules/useCategory'
