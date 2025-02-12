import request from '@/utils/http'



// 用户登录
export const queryAllCommentByArticle = (articleId: any) => {
  return request({
    url: `/anti/comment/queryById/${articleId}`,
    method: 'get',
  })
}
