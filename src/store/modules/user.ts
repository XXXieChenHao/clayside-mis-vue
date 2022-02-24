/*
 * @Author: xie chenhao
 * @Date: 2022-02-17 21:08:33
 * @LastEditTime: 2022-02-24 22:22:59
 * @LastEditors: xie chenhao
 * @Description: 
 * @FilePath: \clayside-mis-vue\src\store\modules\user.ts
 * 生命不息，代码不止
 */

import { userLogin, userInfo } from 'api/Login/index';
import { UserState, UserInfo } from 'type/store/user';
import { LoginForm } from 'type/service/Login'


// 默认信息
const defaultState: () => UserState = () => {
  return {
    token: '',
    codeData: '',
    userInfo: {
      userNickName: ''
    },
  }
}
const state = defaultState()

const mutations = {
  RESET_STATE: (state: UserState) => {
    state = defaultState()
  },
  SET_TOKEN: (state: UserState, token: string) => {
    state.token = token
    sessionStorage.setItem('token', JSON.stringify(token))
  },
  SET_USERINFO: (state: UserState, userInfo: string) => {
    state.userInfo = userInfo
  }
}

const actions = {
  // user login action
  login( { commit }: any, userInfo: LoginForm) {
    const params = userInfo
    return new Promise((resolve, reject) => {
      userLogin(params).then(res => {
        commit('SET_TOKEN', res.token)
        resolve('success')
      }).catch(error => {
        reject(error)
      })
    })
  },
  getToken({ commit, state }) {
    return new Promise((resolve, reject) => {
      const token = sessionStorage.getItem('token') ? JSON.parse(sessionStorage.getItem('token')) : ''
      if (token) {
        commit('SET_TOKEN', token)
        resolve(token)
      } else {
        reject('用户信息已过期')
      }
    })
  },
    // 获取用户信息
    getUserInfo({ commit }, params) {
      const info = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : ''
      if (info) {
        commit('SET_USERINFO', info)
        return info
      }
      return new Promise((resolve, reject) => {
        userInfo().then(res => {
          sessionStorage.setItem('userInfo', JSON.stringify(res.data))
          commit('SET_USERINFO', res.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
  
    // // user logout
    logout({ commit, state }) {
      return new Promise(resolve => {
        sessionStorage.removeItem('userInfo')
        commit('RESET_STATE')
        resolve()
      })
    },
  
    // remove token
    resetToken({ commit }) {
      return new Promise(resolve => {
        sessionStorage.removeItem('userInfo')
        commit('RESET_STATE')
        resolve()
      })
    }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

