<!--
 * @Descripttion: 登录页面组件
 * @Author: congz
 * @Date: 2020-06-11 11:08:34
 * @LastEditors: congz
 * @LastEditTime: 2020-07-17 10:41:35
--> 

<template>
  <div class="login">
    <div>
      <el-card class="box-card" shadow="hover">
        <div>
          <img src="../assets/imgs/clogo.png" alt />
        </div>
        <div class="clearfix">
          <span>使用CMall账号 登录网站</span>
        </div>
        <div class="item">
          <el-form ref="form" :model="form">
            <el-form-item>
              <el-input v-model="form.user_name" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
            </el-form-item>
          </el-form>
          <GtPage @ok="ok"></GtPage>
          <el-link
            type="primary"
            href="/#/register"
            style="float:right;margin-bottom:20px;"
          >没有账号？请先注册></el-link>
          <el-button type="primary" style="width:100px;margin-right:90px" @click="login">登录</el-button>
          <el-button style="width:100px;" @click="goBack">返回</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import * as userAPI from '@/api/users'
import GtPage from '../components/GtPage.vue'
export default {
  name: 'Login',
  data() {
    return {
      okk: 0,
      form: {
        user_name: '',
        password: ''
      }
    }
  },
  methods: {
    ok(val) {
      this.okk = val
    },
    ...mapActions(['setUser', 'setToken']),
    goBack() {
      this.$router.go(-1)
    },
    login() {
      if (this.okk == 1) {
        userAPI
          .postLogin(this.form)
          .then(res => {
            if (res.status === 200) {
              // 登录信息存到本地
              let user = JSON.stringify(res.data.user)
              localStorage.setItem('user', user)
              localStorage.setItem('token', res.data.token)
              // 登录信息存到vuex
              this.setUser(res.data.user)
              this.setToken(res.data.token)
              // 弹出通知框提示登录成功信息
              this.notifySucceed(res.msg)
              this.$router.push({
                name: 'Home'
              })
            } else {
              this.$notify.error({
                title: '登录失败',
                message: res.msg
              })
            }
          })
          .catch(error => {
            this.$notify.error({
              title: '登录失败',
              message: error
            })
          })
      } else {
        this.$notify.error({
          title: '请验证',
          message: ''
        })
      }
    }
  },
  comments: {},
  components: {
    GtPage
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin: 0 auto;
  width: 300px;
}

.clearfix {
  font-size: 20px;
  margin-bottom: 20px;
}

.box-card {
  margin: 0 auto;
  text-align: center;
  width: 400px;
  margin-top: 100px;
  margin-bottom: 300px;
  border-radius: 10px;
}
</style>
