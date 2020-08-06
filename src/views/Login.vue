<!--
 * @Descripttion: 登录页面组件
 * @Author: congz
 * @Date: 2020-06-11 11:08:34
 * @LastEditors: congz
 * @LastEditTime: 2020-08-06 10:28:10
--> 

<template>
  <div class="login">
    <div>
      <el-card class="box-card" shadow="hover">
        <router-link to="/">
          <img src="../assets/imgs/clogo.png" alt />
        </router-link>
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
          <div id="captcha">
            <p id="wait">正在加载验证码...</p>
          </div>
          <div style="margin-top:15px">
            <a href="#" class="btn-gradient blue block" @click="login">登录</a>
          </div>
          <el-link
            type="primary"
            href="/#/register"
            style="float:right;margin-bottom:10px;"
          >没有账号？请先注册></el-link>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script src="../assets/gt.js"></script>
<script>
import { mapActions } from 'vuex'
import * as userAPI from '@/api/users'
require('../assets/gt.js')
var captcha
export default {
  name: 'Login',
  data() {
    return {
      form: {
        user_name: '',
        password: '',
        challenge: '',
        validate: '',
        seccode: ''
      }
    }
  },
  methods: {
    ...mapActions(['setUser']),
    login() {
      var result = captcha.getValidate()
      if (!result) {
        this.notifyError('请验证', null)
        return
      }
      ;(this.form.challenge = result.geetest_challenge),
        (this.form.validate = result.geetest_validate),
        (this.form.seccode = result.geetest_seccode),
        userAPI
          .postLogin(this.form)
          .then(res => {
            if (res.status === 404) {
              this.notifyError('验证失败', res.msg)
            } else if (res.status === 200) {
              // 登录信息存到本地
              let user = JSON.stringify(res.data.user)
              localStorage.setItem('user', user)
              localStorage.setItem('token', res.data.token)
              // 登录信息存到vuex
              this.setUser(res.data.user)
              // 弹出通知框提示登录成功信息
              this.notifySucceed('登录成功')
              this.$router.push({
                name: 'Home'
              })
            } else {
              this.notifyError('登录失败', res.msg)
            }
          })
          .catch(error => {
            this.notifyError('登录失败', error)
          })
    },
    init_geetest() {
      userAPI.geetest().then(res => {
        window.initGeetest(
          {
            gt: res.gt,
            challenge: res.challenge,
            new_captcha: res.new_captcha,
            offline: !res.success,
            product: 'popup',
            width: '100%'
          },
          function(captchaObj) {
            captcha = captchaObj
            captchaObj.appendTo('#captcha')
            captchaObj.onReady(function() {
              document.getElementById('wait').style.display = 'none'
            })
          }
        )
      })
    }
  },
  mounted() {
    this.init_geetest()
  },

  components: {}
}
</script>

<style scoped>
@import '../assets/css/button.css';
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
