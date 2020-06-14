<!--
 * @Description: 渲染markdown文件
 * @Author: hai-27
 * @Date: 2020-03-12 17:30:46
 * @LastEditors: hai-27
 * @LastEditTime: 2020-03-12 18:23:58
 -->
<template>
  <div id="my-markdown" class="markdown-body">
    <vue-markdown :source="md"></vue-markdown>
  </div>
</template>
<script>
import VueMarkdown from "vue-markdown";
import * as aboutAPI from '@/api/abouts';
export default {
  name: "MyMarkdown",
  components: {
    VueMarkdown
  },
  data() {
    return {
      md: ""
    };
  },
  created() {
    aboutAPI.readMe().then(res =>{
      this.md=res.data
    }).catch(err => {
        return Promise.reject(err);
      });
  }
};
</script>
<style>
@import "../assets/css/github-markdown.css";
.markdown-body {
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0 40px;
}
</style>