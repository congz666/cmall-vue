import axios from 'axios'

//注册
const postUser = form =>
  axios.post('/api/v1/user/register', form).then(res => res.data)
//登录
const postLogin = form =>
  axios.post('/api/v1/user/login', form).then(res => res.data)
//检验token
const checkToken = token =>
  axios.get('/api/v1/ping', { params: { token } }).then(res => res.data)
//修改信息
const updateUser = (form, token) =>
  axios.put('/api/v1/user', form, { params: { token } }).then(res => res.data)

const logout = token =>
  axios
    .delete('/api/v1/user/logout', { params: { token } })
    .then(res => res.data)

export { postUser, postLogin, checkToken, updateUser, logout }
