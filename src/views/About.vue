<!--
 * @Descripttion: 关于页面组件
 * @Author: congz
 * @Date: 2020-07-11 19:29:46
 * @LastEditors: congz
 * @LastEditTime: 2020-08-04 11:20:44
--> 


<template>
  <div class="about" id="about" name="about">
    <div class="about-layout">
      <el-row :gutter="10">
        <div>
          <CenterMenu></CenterMenu>
        </div>
        <el-col :span="20">
          <div class="about-content">
            <div class="extra"></div>
            <MyMarkdown></MyMarkdown>
            <div class="extra1"></div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import CenterMenu from '../components/CenterMenu'
import MyMarkdown from '../components/MyMarkdown'
export default {
  name: 'About',
  data() {
    return {}
  },
  components: {
    CenterMenu,
    MyMarkdown
  }
}
</script>
<style scoped>
.about-layout {
  max-width: 1225px;
  margin: 0 auto;
}
.about-content {
  background-color: #ffffff;
  margin-bottom: 30px;
}

.extra {
  height: 10px;
}
.extra1 {
  height: 50px;
}
</style>