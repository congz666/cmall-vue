/*
 * @Descripttion:调用支付接口的函数
 * @Author: congz
 * @Date: 2020-06-10 19:03:02
 * @LastEditors: congz
 * @LastEditTime: 2020-08-12 17:51:36
 */

import axios from 'axios'

// 初始化支付信息
const initPayment = form =>
  axios.post('/api/v1/payments', form).then(res => res.data)

export { initPayment }
