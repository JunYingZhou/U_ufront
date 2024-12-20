/*
 * @Author: zjy 3497577844@qq.com
 * @Date: 2024-11-02 12:28:51
 * @LastEditors: zjy 3497577844@qq.com
 * @LastEditTime: 2024-11-16 19:15:42
 * @FilePath: \uniapp_template\src\api\user.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: zjy 3497577844@qq.com
 * @Date: 2024-08-14 02:16:33
 * @LastEditors: zjy 3497577844@qq.com
 * @LastEditTime: 2024-11-03 15:10:49
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


// 账号登录
export const accountLogin = (params: any) => {
  return request({
    url: '/auth/account',
    method: 'post',
    data: params,
  })
}