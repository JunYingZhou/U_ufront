import request from '@/utils/http'


/**
 * 获取文章列表
 */
export const getCategoryList = () => {
  return request({
    url: '/anti/category/list',
    method: 'get',
  })
}