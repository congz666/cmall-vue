<!--
 * @Descripttion:渲染Markdown文档组件
 * @Author: congz
 * @Date: 2020-06-04 11:22:40
 * @LastEditors: congz
 * @LastEditTime: 2020-07-17 10:45:11
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
          this.$notify.error({
            title: '公告获取失败',
            message: res.msg
          })
        }
      })
      .catch(err => {
        return Promise.reject(err)
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