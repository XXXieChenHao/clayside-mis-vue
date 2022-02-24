/*
 * @Author: xie chenhao
 * @Date: 2022-02-17 21:27:05
 * @LastEditTime: 2022-02-17 21:42:43
 * @LastEditors: xie chenhao
 * @Description: 
 * @FilePath: \clayside-mis-vue\src\interfaces\store\User.ts
 * 生命不息，代码不止
 */

// 用户状态
export interface UserState {
  token: string;
  codeData: string;
  userInfo: UserInfo
}

// 用户信息
export interface UserInfo {

}