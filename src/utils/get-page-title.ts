/*
 * @Author: xie chenhao
 * @Date: 2022-02-24 21:27:23
 * @LastEditTime: 2022-02-24 21:38:19
 * @LastEditors: xie chenhao
 * @Description: 
 * @FilePath: \clayside-mis-vue\src\utils\get-page-title.ts
 * 生命不息，代码不止
 */
import defaultSettings from '../settings'

const title = defaultSettings.title || 'Vue Admin Template'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
