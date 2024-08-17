/*
 * @Author: zjy 3497577844@qq.com
 * @Date: 2024-08-14 02:16:33
 * @LastEditors: zjy 3497577844@qq.com
 * @LastEditTime: 2024-08-17 15:42:58
 * @FilePath: \uni-preset-vue\src\api\user.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 引入 request 文件
import request from '@/utils/http'


// 用户登录
export const userLogin1 = (params: any) => {
  return request({
    url: '/api/auth/login',
    method: 'post',
    data: params,
  })
}