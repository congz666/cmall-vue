/*
 * @Descripttion:调用后端分类接口的函数
 * @Author: congz
 * @Date: 2020-06-12 22:36:05
 * @LastEditors: congz
 * @LastEditTime: 2020-07-17 11:00:36
 */

import axios from 'axios'

// 创建分类
const postCategory = form =>
  axios.post('/api/v1/categories', form).then(res => res.data)

// 读取分类列表
const listCategories = () =>
  axios.get('/api/v1/categories').then(res => res.data)

// 读取分类商品列表
const showCategory = (category_id, start, limit) =>
  axios
    .get(`/api/v1/categories/${category_id}`, { params: { start, limit } })
    .then(res => res.data)

export { postCategory, listCategories, showCategory }
