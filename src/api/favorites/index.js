/*
 * @Descripttion:调用后端收藏接口的函数
 * @Author: congz
 * @Date: 2020-06-12 10:19:12
 * @LastEditors: congz
 * @LastEditTime: 2020-07-17 11:00:54
 */

import axios from 'axios'

// 创建收藏
const postFavorite = (form, token) =>
  axios
    .post('/api/v1/favorites', form, { params: { token } })
    .then(res => res.data)

// 读取收藏夹
const showFavorites = (user_id, start, limit, token) =>
  axios
    .get(`/api/v1/favorites/${user_id}`, { params: { start, limit, token } })
    .then(res => res.data)

//删除收藏
const deleteFavorite = (form, token) =>
  axios
    .delete('/api/v1/favorites', { data: form, params: { token } })
    .then(res => res.data)

export { postFavorite, showFavorites, deleteFavorite }
