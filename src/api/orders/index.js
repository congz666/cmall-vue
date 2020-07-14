import axios from 'axios'

// 创建订单
const postOrder = form =>
  axios.post('/api/v1/orders', form).then(res => res.data)

// 读取订单
const showOrders = (user_id, start, limit) =>
  axios
    .get(`/api/v1/orders/${user_id}`, { params: { start, limit } })
    .then(res => res.data)

export { postOrder, showOrders }
