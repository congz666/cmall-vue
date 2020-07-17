/*
 * @Descripttion:调用后端轮播图接口的函数
 * @Author: congz
 * @Date: 2020-06-10 19:03:02
 * @LastEditors: congz
 * @LastEditTime: 2020-07-17 11:00:28
 */

import axios from 'axios'

// 创建轮播图
const postCarousel = form =>
  axios.post('/api/v1/carousels', form).then(res => res.data)

// 读取视频列表
const listCarousels = () => axios.get('/api/v1/carousels').then(res => res.data)

export { postCarousel, listCarousels }
