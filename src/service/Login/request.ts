/*
 * @Author: xie chenhao
 * @Date: 2022-02-17 21:11:00
 * @LastEditTime: 2022-02-24 22:19:18
 * @LastEditors: xie chenhao
 * @Description: 
 * @FilePath: \clayside-mis-vue\src\service\Login\request.ts
 * 生命不息，代码不止
 */

import { Request } from "lib/request"

import { LoginForm, LoginResult } from 'type/service/Login'

// 用户登录
export const login: (params: LoginForm) => Promise<LoginResult> = (params) => {
  return new Promise((resolve, reject) => {
    Request.form('/mis/login', params).then(res => {
      if(res.code == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}

// 获取用户信息
export const Info = () => {
  return new Promise((resolve, reject) => {
    Request.post('/mis/mis-user-info/getUserInfo', {
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}