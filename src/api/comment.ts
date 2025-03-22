import request from '@/utils/http'

// 新增评论
export const addComment = (commentDo: any) => {
  return request({
    url: `/anti/comment/addComment`,
    method: 'post',
    data: commentDo,
  })
}
// 获取评论数据
export const queryAllCommentByArticle = (articleId: any) => {
  return request({
    url: `/anti/comment/queryById/${articleId}`,
    method: 'get',
  })
}
