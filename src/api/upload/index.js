import axios from 'axios'

// 请求图片签名
const UploadAvatar = fileName =>
  axios.post('/api/v1/avatar', { filename: fileName }).then(res => res.data)

export { UploadAvatar }
