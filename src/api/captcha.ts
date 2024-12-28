/*
 * @Author: zjy 3497577844@qq.com
 * @Date: 2024-11-03 15:19:58
 * @LastEditors: zjy 3497577844@qq.com
 * @LastEditTime: 2024-11-16 19:14:23
 * @FilePath: \uniapp_template\src\api\captcha.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/http'

export interface ImageCaptchaResp {
  uuid: string
  img: string
  expireTime: number
}

export const getImageCaptcha = () => {
  return request({
    // url: '/api/captcha/image',
    url: '/captcha/image',
    method: 'get',
    // responseType: 'blob'
  })
}