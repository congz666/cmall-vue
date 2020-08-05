/*
 * @Descripttion:调用后端用户接口的函数
 * @Author: congz
 * @Date: 2020-06-11 09:39:58
 * @LastEditors: congz
 * @LastEditTime: 2020-08-05 15:37:00
 */

import axios from 'axios'

//注册
const postUser = form =>
  axios.post('/api/v1/user/register', form).then(res => res.data)
//登录
const postLogin = form =>
  axios.post('/api/v1/user/login', form).then(res => res.data)
//检验token
const checkToken = () => axios.get('/api/v1/ping').then(res => res.data)
//修改信息
const updateUser = form => axios.put('/api/v1/user', form).then(res => res.data)

const logout = () => axios.delete('/api/v1/user/logout').then(res => res.data)

//极验初始化
const geetest = () => axios.get('/api/v1/geetest').then(res => res.data)

export { postUser, postLogin, checkToken, updateUser, logout, geetest }
