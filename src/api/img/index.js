/*
 * @Descripttion:调用后端商品图片接口的函数
 * @Author: congz
 * @Date: 2020-06-10 18:59:36
 * @LastEditors: congz
 * @LastEditTime: 2020-07-22 19:44:14
 */

import axios from 'axios'

//读取商品概述的图片
const showInfoImgs = id =>
  axios.get(`/api/v1/info-imgs/${id}`).then(res => res.data)

//读取商品参数的图片
const showParamImgs = id =>
  axios.get(`/api/v1/param-imgs/${id}`).then(res => res.data)

export { showInfoImgs, showParamImgs }
