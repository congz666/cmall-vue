/*
 * @Descripttion:
 * @Author: congz
 * @Date: 2020-07-20 11:08:33
 * @LastEditors: congz
 * @LastEditTime: 2020-07-20 20:59:40
 */
import axios from 'axios'

// 创建购物车
const postAddress = (form, token) =>
  axios
    .post('/api/v1/addresses', form, { params: { token } })
    .then(res => res.data)

// 读取购物车
const showAddresses = (user_id, token) =>
  axios
    .get(`/api/v1/addresses/${user_id}`, { params: { token } })
    .then(res => res.data)

// 更新购物车
const updateAddress = (form, token) =>
  axios
    .put('/api/v1/addresses', form, { params: { token } })
    .then(res => res.data)

// 删除购物车
const deleteAddress = (addressID, token) =>
  axios
    .delete('/api/v1/addresses', {
      data: { address_id: addressID },
      params: { token }
    })
    .then(res => res.data)

export { postAddress, showAddresses, updateAddress, deleteAddress }
