/*
 * @Descripttion:调用后端订单接口的函数
 * @Author: congz
 * @Date: 2020-06-14 14:24:12
 * @LastEditors: congz
 * @LastEditTime: 2020-07-17 11:01:06
 */

import axios from 'axios'

// 创建订单
const postOrder = (form, token) =>
  axios
    .post('/api/v1/orders', form, { params: { token } })
    .then(res => res.data)

// 读取订单
const showOrders = (user_id, start, limit, token) =>
  axios
    .get(`/api/v1/orders/${user_id}`, { params: { start, limit, token } })
    .then(res => res.data)

export { postOrder, showOrders }
