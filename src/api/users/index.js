/*
 * @Descripttion:调用后端用户接口的函数
 * @Author: congz
 * @Date: 2020-06-11 09:39:58
 * @LastEditors: congz
 * @LastEditTime: 2020-08-19 10:16:06
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

//发送邮件
const sendEmail = form =>
  axios.post('/api/v1/user/sending-email', form).then(res => res.data)

//绑定或解绑邮箱
const vaildEmail = val =>
  axios.post('/api/v1/user/vaild-email', { token: val }).then(res => res.data)

//QQ初始化
const qqInit = () => axios.get('/api/v1/qq/login').then(res => res.data)
//QQ登录
const qqLogin = code =>
  axios
    .post('/api/v1/qq/login', { authorization_code: code })
    .then(res => res.data)
//极验初始化
const geetest = () => axios.get('/api/v1/geetest').then(res => res.data)

export {
  postUser,
  postLogin,
  checkToken,
  updateUser,
  sendEmail,
  vaildEmail,
  qqInit,
  qqLogin,
  geetest
}
