/*
 * @Descripttion:调用后端购物车接口的函数
 * @Author: congz
 * @Date: 2020-06-14 15:50:08
 * @LastEditors: congz
 * @LastEditTime: 2020-08-05 15:33:58
 */

import axios from 'axios'

// 创建购物车
const postCart = form => axios.post('/api/v1/carts', form).then(res => res.data)

// 读取购物车
const showCarts = user_id =>
  axios.get(`/api/v1/carts/${user_id}`).then(res => res.data)

// 更新购物车
const updateCart = form =>
  axios.put('/api/v1/carts', form).then(res => res.data)

// 删除购物车
const deleteCart = form =>
  axios.delete('/api/v1/carts', { data: form }).then(res => res.data)

export { postCart, showCarts, updateCart, deleteCart }
