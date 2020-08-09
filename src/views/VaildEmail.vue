<!--
 * @Descripttion: 登录页面组件
 * @Author: congz
 * @Date: 2020-06-11 11:08:34
 * @LastEditors: congz
 * @LastEditTime: 2020-08-09 20:05:20
--> 

<template>
  <div class="vaild-email">
    <div class="vaild-email-content">
      <p>{{message}}</p>
    </div>
  </div>
</template>
<script>
import * as userAPI from '@/api/users'
import { mapActions } from 'vuex'
export default {
  name: 'VaildEmail',
  data() {
    return {
      token: '',
      message: '正在绑定/解绑邮箱，请稍候...'
    }
  },
  methods: {
    ...mapActions(['setUser']),
    vaild() {
      userAPI
        .vaildEmail(this.token)
        .then(res => {
          if (res.status === 200) {
            let user = JSON.stringify(res.data)
            localStorage.setItem('user', user)
            this.setUser(res.data)
            this.message = '邮箱绑定/解绑成功，跳转页面中...'
            this.$router.push({
              name: 'Center'
            })
            this.notifySucceed('绑定/解绑成功')
          } else if (res.status === 201) {
            // 清空本地登录信息
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            // 清空vuex登录信息
            this.setUser('')
            this.$router.push({
              name: 'Login'
            })
            this.notifySucceed('密码已修改，请重新登录')
          } else if (res.status === 20001) {
            this.notifyError('该链接已失效，请重新绑定/解绑', res.msg)
            this.$router.push({
              name: 'Center'
            })
          } else {
            this.notifyError('邮箱绑定/解绑失败', res.msg)
          }
        })
        .catch(error => {
          this.notifyError('邮箱绑定/解绑失败', error)
        })
    }
  },
  created() {
    this.token = this.$route.params.token
    this.vaild()
  },
  components: {}
}
</script>

<style scoped>
.vaild-email {
  height: 700px;
  display: flex;
  align-items: center;
}
.vaild-email .vaild-email-content {
  width: 500px;
  margin: 0 auto;
  text-align: center;
}
</style>
