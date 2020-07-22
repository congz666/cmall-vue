<!--
 * @Descripttion: 注册页面组件
 * @Author: congz
 * @Date: 2020-06-11 10:01:19
 * @LastEditors: congz
 * @LastEditTime: 2020-07-17 20:04:11
--> 

<template>
  <div class="register">
    <div>
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>注册</span>
        </div>
        <div class="item">
          <el-form ref="form" :model="form">
            <el-form-item>
              <el-input v-model="form.nickname" placeholder="昵称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="form.user_name" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="form.password" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="form.password_confirm" placeholder="确认密码"></el-input>
            </el-form-item>
          </el-form>
          <GtPage @ok="ok"></GtPage>
          <el-button type="primary" style="width:300px;margin-bottom:10px;" @click="register">注册</el-button>
          <el-link type="primary" href="/#/login" style="float:right;margin-bottom:20px;">已有账号？直接登录></el-link>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import * as userAPI from '@/api/users'
import GtPage from '../components/GtPage.vue'
export default {
  name: 'Register',
  data() {
    return {
      okk: 0,
      imageUrl: '',
      form: {
        nickname: '',
        user_name: '',
        password: '',
        password_confirm: ''
      }
    }
  },
  methods: {
    ok(val) {
      this.okk = val
    },
    register() {
      if (this.okk == 1) {
        userAPI
          .postUser(this.form)
          .then(res => {
            if (res.status === 200) {
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
      } else {
        this.notifyError('请验证', '')
      }
    }
  },
  comments: {},
  components: {
    GtPage
  }
}
</script>

<style >
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
