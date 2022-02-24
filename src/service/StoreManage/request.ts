/*
 * @Author: xie chenhao
 * @Date: 2022-02-17 20:45:49
 * @LastEditTime: 2022-02-17 21:41:08
 * @LastEditors: xie chenhao
 * @Description: 
 * @FilePath: \clayside-mis-vue\src\service\StoreManage\request.ts
 * 生命不息，代码不止
 */

import { Request } from "lib/request";


export const listCommodityTypeByLevel = () => {
  return new Promise((resolve, reject) => {
    Request.post('/mis/commodityType/listCommodityTypeByLevel', {

    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 获取分类列表
export const pageCommodityType = () => {
  return new Promise((resolve, reject) => {
    Request.post('/mis/commodityType/pageCommodityType', {
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}