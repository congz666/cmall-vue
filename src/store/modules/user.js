/*
 * @Description: 用户登录状态模块
 * @Author: hai-27
 * @Date: 2020-02-19 17:42:11
 * @LastEditors: hai-27
 * @LastEditTime: 2020-02-26 23:14:32
 */
export default {
  state: {
    user: "", // 登录的用户
  },
  getters: {
    getUser (state) {
      return state.user
    }
  },
  mutations: {
    setUser (state, data) {
      state.user = data;
    },
  },
  actions: {
    setUser ({ commit }, data) {
      commit('setUser', data);
    }
  }
}