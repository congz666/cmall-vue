import axios from 'axios'

// 创建订单
const postOrder = (form, token) =>
  axios
    .post('/api/v1/orders', form, { params: { token } })
    .then(res => res.data)

// 读取订单
const showOrders = (user_id, start, limit, token) =>
  axios
    .get(`/api/v1/orders/${user_id}`, { params: { start, limit, token } })
    .then(res => res.data)

export { postOrder, showOrders }
