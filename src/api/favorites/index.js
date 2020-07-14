import axios from 'axios'

// 创建收藏
const postFavorite = form =>
  axios.post('/api/v1/favorites', form).then(res => res.data)

// 读取收藏夹
const showFavorites = (user_id, start, limit) =>
  axios
    .get(`/api/v1/favorites/${user_id}`, { params: { start, limit } })
    .then(res => res.data)

//删除收藏
const deleteFavorite = form =>
  axios.delete('/api/v1/favorites', { data: form }).then(res => res.data)

export { postFavorite, showFavorites, deleteFavorite }
