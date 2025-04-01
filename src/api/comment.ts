/*
 * @Author: zjy 3497577844@qq.com
 * @Date: 2025-02-09 16:12:18
 * @LastEditors: zjy 3497577844@qq.com
 * @LastEditTime: 2025-03-29 17:13:34
 * @FilePath: \u_uf\src\api\comment.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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

// 获取评论数据
export const likeComment = (articleId: any, userId: any) => {
  return request({
    url: `/anti/comment/likeComment/${articleId}/${userId}`,
    method: 'get',
  })
}

// 获取当前文章，自己点赞的评论
export const queryLikeCommentByArticle = (articleId: any, userId: any) => {
  return request({
    url: `/anti/comment/queryLikeCommentByArticle/${articleId}/${userId}`,
    method: 'get',
  })
}

export const addCommentLike = (commentId: any, userId: any, articleId: any) => {
  return request({
    url: `/anti/comment/addCommentLike/${commentId}/${userId}/${articleId}`,
    method: 'get',
  }) 
}

export const queryCommentByUserId = (userId: any, articleId: any) => {
  return request({
    url: `/anti/comment/queryCommentByUserId/${userId}/${articleId}`,
    method: 'get',
  })
}