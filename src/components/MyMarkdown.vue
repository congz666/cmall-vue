<!--
 * @Descripttion:渲染Markdown文档组件
 * @Author: congz
 * @Date: 2020-06-04 11:22:40
 * @LastEditors: congz
 * @LastEditTime: 2020-08-04 11:16:50
--> 

<template>
  <div id="my-markdown" class="markdown-body">
    <vue-markdown :source="notice"></vue-markdown>
  </div>
</template>
<script>
import VueMarkdown from 'vue-markdown'
import * as noticeAPI from '@/api/notice'
export default {
  name: 'MyMarkdown',
  components: {
    VueMarkdown
  },
  data() {
    return {
      notice: ''
    }
  },
  created() {
    noticeAPI
      .showNotice()
      .then(res => {
        if (res.status === 200) {
          this.notice = res.data.text
        } else {
          this.notifyError('获取公告失败', res.msg)
        }
      })
      .catch(err => {
        this.notifyError('获取公告失败', err)
      })
  }
}
</script>
<style>
@import '../assets/css/github-markdown.css';
.markdown-body {
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0 40px;
}
</style>