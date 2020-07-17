/*
 * @Descripttion:调用后端md接口的函数
 * @Author: congz
 * @Date: 2020-06-12 23:26:38
 * @LastEditors: congz
 * @LastEditTime: 2020-07-17 10:59:26
 */

import axios from 'axios'

// 读取md
const readMe = () => axios.get('/api/v1/abouts').then(res => res.data)

export { readMe }
