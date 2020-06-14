import axios from 'axios';

// 创建轮播图
const postCarousel = form => axios.post('/api/v1/carousels', form).then(res => res.data);


// 读取视频列表
const listCarousels = () => axios.get('/api/v1/carousels').then(res => res.data);

export {
  postCarousel,
  listCarousels,
};
