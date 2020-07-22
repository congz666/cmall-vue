/*
 * @Descripttion:全局变量
 * @Author: congz
 * @Date: 2020-06-04 11:22:40
 * @LastEditors: congz
 * @LastEditTime: 2020-07-17 19:41:54
 */

exports.install = function(Vue) {
  //Vue.prototype.$target = "http://47.115.85.237:3000/"; // 线上后端地址
  Vue.prototype.$target = 'http://localhost:3000/' // 本地后端地址
  // 封装提示成功的弹出框
  Vue.prototype.notifySucceed = function(title) {
    this.$notify({
      title: title,
      type: 'success',
      offset: 100
    })
  }
  // 封装提示失败的弹出框
  Vue.prototype.notifyError = function(title, msg) {
    this.$notify.error({
      title: title,
      message: msg,
      offset: 100
    })
  }
  // 封装登录超时的操作
  Vue.prototype.loginExpired = function(msg) {
    //token过期，需要重新登录
    this.$notify.error({
      title: '登录已过期，需重新登录',
      message: msg
    })
    this.$router.push({
      name: 'Login'
    })
  }
}
