// 引入 request 文件
import request from '@/utils/http'



// 获取信息
export const getChatInfoByUserId = (userId: any, categoryId: any) => {
  return request({
    url: `/anti/chat/getChatInfoByUserId/${userId}/${categoryId}`,
    method: 'get',
  })
}

export const getAdvise = (data: any) => {
  return request({
    url: `/ai/getAntiMsg`,
    method: 'post',
    data: data,
  })
}


export const addUserChatResult = (data: any) => {
  return request({
    url: `/anti/chat/addChatInfo`,
    method: 'post',
    data: data,
  })
}


