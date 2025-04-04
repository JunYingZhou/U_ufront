/*
 * @Author: zjy 3497577844@qq.com
 * @Date: 2025-04-03 00:59:46
 * @LastEditors: zjy 3497577844@qq.com
 * @LastEditTime: 2025-04-03 01:00:45
 * @FilePath: \u_uf\src\api\questions.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 引入 request 文件
import request from '@/utils/http'


export const queryAllCommunity = () => {
  return request({
    url: '/news/questions',
    method: 'get',
  })
}