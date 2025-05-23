/*
 * @Author: zjy 3497577844@qq.com
 * @Date: 2024-11-12 22:52:07
 * @LastEditors: zjy 3497577844@qq.com
 * @LastEditTime: 2024-11-16 19:17:14
 * @FilePath: \uniapp_template\src\api\article.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/http'


/**
 * 获取文章列表
 */
export const getArticleList = () => {
  return request({
    url: '/anti/article/list',
    method: 'get',
  })
}