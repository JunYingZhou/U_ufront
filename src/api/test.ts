// 引入 request 文件
import request from '@/utils/http'



// 获取信息
export const getTestInfoByUserId = (userId: any, categoryId: any) => {
  return request({
    url: `/anti/chat/getTestInfoByUserId/${userId}/${categoryId}`,
    method: 'get',
  })
}