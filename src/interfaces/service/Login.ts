/*
 * @Author: xie chenhao
 * @Date: 2022-02-17 21:48:13
 * @LastEditTime: 2022-02-24 22:10:44
 * @LastEditors: xie chenhao
 * @Description: 
 * @FilePath: \clayside-mis-vue\src\interfaces\service\Login.ts
 * 生命不息，代码不止
 */
// 登录表单类型
export interface LoginForm {
  userName: string | number;
  pass: string | number;
  captchaVerification: any
}

export interface LoginResult {
  nickName: string; // 昵称
  shopId: string; // 店铺 ID
  token: string;  // JWT
  userId: string; // 用户 ID
  userName: string; // 用户名
  userType: 0;  // 用户类型
  appId?: string; // appId
  mobile?: string;  // 电话
  sessionKey?: null;
}