/*
 * @Author: zjy 3497577844@qq.com
 * @Date: 2024-11-12 22:52:07
 * @LastEditors: zjy 3497577844@qq.com
 * @LastEditTime: 2025-03-20 23:02:13
 * @FilePath: \uniapp_template\src\api\article.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/http'


/**
 * 获取文章列表
 */
export const getArticleList = (id: number) => {
  return request({
    url: `/anti/article/list/${id}`,
    method: 'get',
  })
}




export const getArticleListByTitle = (title: string) => {
  return request({
    url: `/anti/article/listByTitle/${title}`,
    method: 'get',
  })
}

/**
 * 获取文章详情
 */
export const getArticleById = (id: number) => {
  return request({
    url: `/anti/article/${id}`,
    method: 'get',
  })
}



/**
 * 获取文章列表
 */
export const getArticleFileByArticleId = (articleId: number) => {
  return request({
    url: `/news/artFile/getArtFile/${articleId}`,
    method: 'get',
  })
}

export const getArticleLikeCount = (id: number) => {
  return request({
    url: `/anti/article/getArticleLikeStarStatusCount/${id}/${'like'}`,
    method: 'get',
  })
}

/**
 * 获取文章列表
 */
export const getArticleByUserId = (userId: number) => {
  return request({
    url: `/anti/article/getArticleByUserId/${userId}`,
    method: 'get',
  })
}

export const getArticleLikeCountByUserId = (id: number) => {
  return request({
    url: `/anti/article/getArticleLikeCountByUserId/${id}/${'like'}`,
    method: 'get',
  })
}

export const getQuestionByUserId = (id: number) => {
  return request({
    url: `/anti/article/getQuestionByUserId/${id}`,
    method: 'get',
  })
}


/**
 * 新增文章列表
 */
export const addArticle = (params: any) => {
  return request({
    url: '/anti/article/addArticle',
    method: 'post',
    data: params
  })
}

/**
 * 获取文章点赞收藏状态
 */
export const getArticleLikeStarStatus = (queryIds: any, type: any) =>{
  return request({
    url: `/anti/article/getArticleLikeStarStatus/${queryIds}/${type}`,
    method: 'get',
  })
}

export const delArticleLikeStarStatus = (queryIds: any, type: any) =>{
  return request({
    url: `/anti/article/delArticleLikeStarStatus/${queryIds}/${type}`,
    method: 'get',
  })
}

export const getArticleCommentCount = (queryIds: any) =>{
  return request({
    url: `/anti/article/getArticleCommentCount/${queryIds}`,
    method: 'get',
  })
}


export const delArticle = (articleId: any) =>{
  return request({
    url: `/anti/article/delArticle/${articleId}`,
    method: 'get',
  })
}

export const getArticleContentImages = (articleId: any) =>{
  return request({
    url: `/anti/article/getArticleContentImages/${articleId}`,
    method: 'get',
  })
}

export const updateArticle = (data: any) =>{
  return request({
    url: `/anti/article/upArticle`,
    method: 'post',
    data: data,
  })
}


export const updateQuestions = (data: any) =>{
  return request({
    url: `/anti/article/updateQuestions`,
    method: 'post',
    data: data,
  })
}



/**
 * 插入数据到文章点赞收藏表
 */
export const insertArticleLikeStarStatus = (queryIds: any, type: any) =>{
  return request({
    url: `/anti/article/insertArticleLikeStarStatus/${queryIds}/${type}`,
    method: 'get',
  })
}

