/*
 * @Author: xie chenhao
 * @Date: 2022-02-14 20:54:35
 * @LastEditTime: 2022-02-24 22:14:54
 * @LastEditors: xie chenhao
 * @Description: 
 * @FilePath: \clayside-mis-vue\src\libs\request.ts
 * 生命不息，代码不止
 */

import axios from "./http";
import qs from 'qs';

export class Request {
  static get: (url: string, params?: any) => any = (url, params)=> {
    return new Promise((resolve, reject) => {
      axios.get(url, { params: params }).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    })
  }

  /**
   * @param url 
   * @param params 
   * @returns 
   */
  static getJson: (url: string, params?: any) => any = (url, params) => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        data: params,
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err);
      })
    })
  }

  /**
   * post json
   * @param url 
   * @param params 
   * @returns 
   */
  static post: (url: string, params?: any) => any = (url, params)=> {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url, 
        data: params,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        }
      }
      ).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    })
  }

  /**
   * 表单请求
   * @param url 
   * @param params 
   * @returns 
   */
  static form: (url: string, params?: any) => any = (url, params) => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url, 
        data: qs.stringify(params),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }
      ).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    })
  }
}