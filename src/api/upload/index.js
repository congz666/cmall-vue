import axios from 'axios'

// 请求图片签名
const UploadAvatar = (fileName, token) =>
  axios
    .post('/api/v1/avatar', { filename: fileName }, { params: { token } })
    .then(res => res.data)

export { UploadAvatar }
