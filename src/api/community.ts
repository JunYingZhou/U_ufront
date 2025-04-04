// 引入 request 文件
import request from '@/utils/http'


// 获取所有的社区话题
export const queryAllCommunity = () => {
  return request({
    url: '/News/community',
    method: 'get',
  })
}


// 大接口-获取社区话题列表(questions)和文章列表(articles)
export const queryCommunityList = (communityId: number) => {
  return request({
    url: `/News/community/list/${communityId}`,
    method: 'get',
  })
}