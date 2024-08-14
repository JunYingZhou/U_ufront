/*
 * @Author: zjy 3497577844@qq.com
 * @Date: 2024-08-14 00:19:54
 * @LastEditors: zjy 3497577844@qq.com
 * @LastEditTime: 2024-08-14 01:28:46
 * @FilePath: \uni-preset-vue\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createSSRApp } from "vue";
import '@/utils/routeIntercept.ts';
// pinia
import pinia from './stores'

import App from "./App.vue";
export function createApp() {
  const app = createSSRApp(App);
  app.use(pinia)
  return {
    app,
  };
}
