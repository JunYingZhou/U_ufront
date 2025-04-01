// 引入 request 文件
import request from '@/utils/http'


// 用户登录
export const queryAllCommunity = () => {
  return request({
    url: '/News/community',
    method: 'get',
  })
}