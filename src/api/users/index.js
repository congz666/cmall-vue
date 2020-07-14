import axios from 'axios'

//注册
const postUser = form =>
  axios.post('/api/v1/user/register', form).then(res => res.data)
//登录
const postLogin = form =>
  axios.post('/api/v1/user/login', form).then(res => res.data)
//个人中心
const getUser = () => axios.get('/api/v1/user/me').then(res => res.data)
//修改信息
const updateUser = form => axios.put('/api/v1/user', form).then(res => res.data)
const logout = () => axios.delete('/api/v1/user/logout').then(res => res.data)

export { postUser, postLogin, getUser, updateUser, logout }
