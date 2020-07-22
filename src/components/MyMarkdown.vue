<!--
 * @Descripttion:渲染Markdown文档组件
 * @Author: congz
 * @Date: 2020-06-04 11:22:40
 * @LastEditors: congz
 * @LastEditTime: 2020-07-17 19:58:39
--> 

<template>
  <div id="my-markdown" class="markdown-body">
    <vue-markdown :source="md"></vue-markdown>
  </div>
</template>
<script>
import VueMarkdown from 'vue-markdown'
import * as aboutAPI from '@/api/abouts'
export default {
  name: 'MyMarkdown',
  components: {
    VueMarkdown
  },
  data() {
    return {
      md: ''
    }
  },
  created() {
    aboutAPI
      .readMe()
      .then(res => {
        if (res.status === 200) {
          this.md = res.data
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