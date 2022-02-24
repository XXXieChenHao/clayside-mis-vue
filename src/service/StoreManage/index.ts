/*
 * @Author: xie chenhao
 * @Date: 2022-02-17 20:44:44
 * @LastEditTime: 2022-02-17 21:02:07
 * @LastEditors: xie chenhao
 * @Description: 
 * @FilePath: \clayside-mis-vue\src\service\StoreManage\index.ts
 * 生命不息，代码不止
 */

// 抽离数据请求的逻辑
import {
  pageCommodityType,
  listCommodityTypeByLevel,
} from './request.js'

export const getCommodityList = async () => {
  let res = await pageCommodityType()
  return res 
}

// 根据分类 id 获取分类
export const commodityLevelList = async () => {
  let res = await listCommodityTypeByLevel()
  return res
}