<!--
 * @Descripttion: 关于QQ回调组件
 * @Author: congz
 * @Date: 2020-07-11 19:29:46
 * @LastEditors: congz
 * @LastEditTime: 2020-08-19 10:39:48
--> 


<template>
  <div class="callback" id="callback" name="callback">
    <div class="callback-content">
      <div class="callback-text">
        <p>正在登录中...</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import * as userAPI from '@/api/users'
export default {
  name: 'CallbackQQ',

  data() {
    return {
      code: '',
      state: ''
    }
  },
  activated() {
    if (this.$route.query.code != undefined) {
      this.code = this.$route.query.code
    }
    if (this.$route.query.state != undefined) {
      this.state = this.$route.query.state
    }
  },
  watch: {
    // 监听code的变化
    code: function() {
      this.qqLogin()
    }
  },
  methods: {
    ...mapActions(['setUser']),
    qqLogin() {
      if (this.state != 'congz') {
        this.notifyError('不是本站的请求', '')
        return
      }
      userAPI
        .qqLogin(this.code)
        .then(res => {
          if (res.status == 200) {
            // 登录信息存到本地
            let user = JSON.stringify(res.data.user)
            localStorage.setItem('user', user)
            localStorage.setItem('token', res.data.token)
            // 登录信息存到vuex
            this.setUser(res.data.user)
            this.$router.push({
              name: 'Home'
            })
            // 弹出通知框提示登录成功信息
            this.notifySucceed('登录成功')
          } else {
            this.notifyError('登录失败', res.msg)
          }
        })
        .catch(error => {
          this.notifyError('登录失败', error)
        })
    }
  }
}
</script>
<style scoped>
.callback .callback-content {
  height: 700px;
  width: 100%;
  display: flex;
  align-items: center;
}
.callback .callback-content .callback-text {
  color: #757575;
  width: 500px;
  margin: 0 auto;
  text-align: center;
}
</style>