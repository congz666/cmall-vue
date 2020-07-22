/*
 * @Descripttion:调用后端订单接口的函数
 * @Author: congz
 * @Date: 2020-06-14 14:24:12
 * @LastEditors: congz
 * @LastEditTime: 2020-07-22 14:46:17
 */

import axios from 'axios'

// 创建订单
const postOrder = (form, token) =>
  axios
    .post('/api/v1/orders', form, { params: { token } })
    .then(res => res.data)

// 读取订单
const listOrders = (user_id, start, limit, token) =>
  axios
    .get(`/api/v1/user/${user_id}/orders`, { params: { start, limit, token } })
    .then(res => res.data)

// 读取订单详情
const showOrder = (order_id, token) =>
  axios
    .get(`/api/v1/orders/${order_id}`, { params: { token } })
    .then(res => res.data)

export { postOrder, listOrders, showOrder }
