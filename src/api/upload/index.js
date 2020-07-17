/*
 * @Descripttion:调用后端上传接口的函数
 * @Author: congz
 * @Date: 2020-07-12 15:44:02
 * @LastEditors: congz
 * @LastEditTime: 2020-07-17 11:01:25
 */

import axios from 'axios'

// 请求图片签名
const UploadAvatar = (fileName, token) =>
  axios
    .post('/api/v1/avatar', { filename: fileName }, { params: { token } })
    .then(res => res.data)

export { UploadAvatar }
