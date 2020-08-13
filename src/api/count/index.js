/*
 * @Descripttion:调用后端轮播图接口的函数
 * @Author: congz
 * @Date: 2020-06-10 19:03:02
 * @LastEditors: congz
 * @LastEditTime: 2020-08-13 10:11:10
 */

import axios from 'axios'

// 获取数量
const showCount = id => axios.get(`/api/v1/counts/${id}`).then(res => res.data)

export { showCount }
