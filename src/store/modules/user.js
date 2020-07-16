/*
 * @Description: 用户登录状态模块
 * @Author: hai-27
 * @Date: 2020-02-19 17:42:11
 * @LastEditors: hai-27
 * @LastEditTime: 2020-02-26 23:14:32
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
