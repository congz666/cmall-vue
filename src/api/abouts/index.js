import axios from 'axios';

// 读取视频列表
const readMe = () => axios.get('/api/v1/abouts').then(res => res.data);

export {
 readMe,
};
