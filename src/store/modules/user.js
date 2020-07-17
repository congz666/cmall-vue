/*
 * @Descripttion:用户登录状态模块
 * @Author: congz
 * @Date: 2020-06-04 11:22:40
 * @LastEditors: congz
 * @LastEditTime: 2020-07-17 10:43:53
 */

export default {
  state: {
    user: '', // 登录的用户
    token: '' // token
  },
  getters: {
    getUser(state) {
      return state.user
    },
    getToken(state) {
      return state.token
    }
  },
  mutations: {
    setUser(state, data) {
      state.user = data
    },
    setToken(state, data) {
      state.token = data
    }
  },
  actions: {
    setUser({ commit }, data) {
      commit('setUser', data)
    },
    setToken({ commit }, data) {
      commit('setToken', data)
    }
  }
}
