/*
 * @Author: zjy 3497577844@qq.com
 * @Date: 2024-08-18 13:50:09
 * @LastEditors: zjy 3497577844@qq.com
 * @LastEditTime: 2024-08-18 13:54:17
 * @FilePath: \uni-preset-vue\src\api\asset.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/http'

// 获取资产
export const getAssetInfo = () => {
  return request({
    url: '/api/tenant/assetInfos?pageSize=10&page=0&sortProperty=createdTime&sortOrder=DESC&assetProfileId=',
    method: 'get',
  })
}