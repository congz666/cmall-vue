<!--
 * @Descripttion: 注册页面组件
 * @Author: congz
 * @Date: 2020-06-11 10:01:19
 * @LastEditors: congz
 * @LastEditTime: 2020-08-18 19:58:16
--> 

<template>
  <div class="register">
    <div>
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>注册</span>
        </div>
        <div class="item">
          <el-form :model="form" status-icon :rules="rules" ref="form">
            <el-form-item prop="nickname">
              <el-input v-model="form.nickname" placeholder="昵称"></el-input>
            </el-form-item>
            <el-form-item prop="user_name">
              <el-input v-model="form.user_name" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="form.password" placeholder="密码" type="password"></el-input>
            </el-form-item>
            <el-form-item prop="password_confirm">
              <el-input v-model="form.password_confirm" placeholder="确认密码" type="password"></el-input>
            </el-form-item>
          </el-form>
          <div id="captcha">
            <p id="wait">正在加载验证码...</p>
          </div>
          <div style="margin-top:15px">
            <a href="javascript:;" class="btn-gradient blue block" @click="register('form')">注册</a>
          </div>
          <el-link type="primary" href="/#/login" style="float:right;margin-bottom:20px;">已有账号？直接登录></el-link>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script src="../assets/gt.js"></script>
<script>
import * as userAPI from '@/api/users'
require('../assets/gt.js')
var captcha
export default {
  name: 'Register',
  data() {
    var validateNick = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入昵称'))
      } else if (value.length < 2 || value.length > 10) {
        callback(new Error('昵称长度需在2到10之间'))
      }
      callback()
    }
    var validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (value.length < 5 || value.length > 15) {
        callback(new Error('用户名长度需在5到15之间'))
      }
      callback()
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 8 || value.length > 16) {
        callback(new Error('密码长度需在8到16之间'))
      } else {
        if (this.form.password_confirm !== '') {
          this.$refs.form.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      imageUrl: '',
      form: {
        nickname: '',
        user_name: '',
        password: '',
        password_confirm: '',
        challenge: '',
        validate: '',
        seccode: ''
      },
      rules: {
        nickname: [{ validator: validateNick, trigger: 'blur' }],
        user_name: [{ validator: validateUser, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }],
        password_confirm: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  methods: {
    register(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return
        }
        var result = captcha.getValidate()
        if (!result) {
          this.notifyError('请验证', null)
          return
        }
        ;(this.form.challenge = result.geetest_challenge),
          (this.form.validate = result.geetest_validate),
          (this.form.seccode = result.geetest_seccode),
          userAPI
            .postUser(this.form)
            .then(res => {
              if (res.status === 404) {
                this.notifyError('验证失败', res.msg)
              } else if (res.status === 200) {
                this.notifySucceed('注册成功')
                this.$router.push({
                  name: 'Login'
                })
              } else {
                this.notifyError('注册失败', res.msg)
              }
            })
            .catch(error => {
              this.notifyError('注册失败', error)
            })
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
}

.box-card {
  margin: 0 auto;
  text-align: center;
  width: 400px;
  margin-top: 100px;
  margin-bottom: 200px;
  border-radius: 10px;
}
</style>
