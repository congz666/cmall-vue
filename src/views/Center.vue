<!--
 * @Descripttion: 个人中心页面组件
 * @Author: congz
 * @Date: 2020-07-03 09:31:23
 * @LastEditors: congz
 * @LastEditTime: 2020-08-19 11:38:48
--> 

<template>
  <div class="center" id="center" name="center">
    <div class="center-layout">
      <el-row :gutter="10">
        <div>
          <CenterMenu></CenterMenu>
        </div>
        <el-col :span="20">
          <div class="center-content">
            <!--个人信息头部-->
            <div class="center-user">
              <div class="user-avator">
                <img :src="this.$store.getters.getUser.avatar" />
              </div>
              <div class="user-info">
                <p
                  style="font-size:25px;font-weight:100;color:#464547"
                >{{this.$store.getters.getUser.nickname}}</p>
                <p>
                  <router-link to="/user/details" style="font-size:13px;color:#ff6700;">修改个人信息 ></router-link>
                </p>
              </div>
              <div class="user-message">
                <ul>
                  <li>账户安全：</li>
                  <li>绑定QQ：</li>
                  <li>绑定邮箱：</li>
                </ul>
              </div>
              <div class="user-data">
                <ul>
                  <li>普通</li>
                  <li>12345678910</li>
                  <li v-if="this.$store.getters.getUser.email==''">
                    点此
                    <a href="javascript:;" @click="addVisible=true">绑定邮箱</a>
                  </li>
                  <li v-else>
                    {{this.$store.getters.getUser.email}}
                    <a
                      href="javascript:;"
                      @click="deleteVisible=true"
                    >『解除绑定』</a>
                  </li>
                </ul>
              </div>
            </div>
            <!--end--个人信息头部-->
            <div class="user-details">
              <div class>
                <img src="https://s01.mifile.cn/i/user/portal-icon-1.png" />
              </div>
              <div class="operate1">
                <p class="oper-title">待支付订单：{{notPayTotal}}</p>
                <p>
                  <router-link :to="{ path: '/order', query: {type:1} }" class="oper-href">查看待支付订单 ></router-link>
                </p>
              </div>
              <div class="operate">
                <img src="https://s01.mifile.cn/i/user/portal-icon-2.png" />
              </div>
              <div class="operate1">
                <p class="oper-title">已付款订单：{{payTotal}}</p>
                <p>
                  <router-link :to="{ path: '/order', query: {type:2} }" class="oper-href">查看已付款订单 ></router-link>
                </p>
              </div>
            </div>
            <div class="user-details1">
              <div class>
                <img src="https://s01.mifile.cn/i/user/portal-icon-3.png" />
              </div>
              <div class="operate1">
                <p class="oper-title">待评价商品：0</p>
                <p>
                  <router-link to class="oper-href">查看待评价订单 ></router-link>
                </p>
              </div>
              <div class="operate">
                <img src="https://s01.mifile.cn/i/user/portal-icon-4.png" />
              </div>
              <div class="operate1">
                <p class="oper-title">收藏的商品：{{favoriteTotal}}</p>
                <p>
                  <router-link :to="{ path: '/favorite'}" class="oper-href">查看收藏的商品 ></router-link>
                </p>
              </div>
            </div>
          </div>
          <!-- 绑定邮箱弹出框 -->
          <el-dialog title="绑定邮箱" :visible.sync="addVisible" width="30%" center>
            <el-form ref="form" :model="form" label-width="70px">
              <el-form-item
                prop="email"
                label="邮箱"
                :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
              >
                <el-input v-model="form.email"></el-input>
              </el-form-item>
              <p>{{message}}</p>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button
                type="primary"
                @click="postEmail('form')"
                :disabled="cannotClick"
              >{{content}}</el-button>
            </span>
          </el-dialog>
          <!-- 绑定邮箱弹出框END -->
          <!-- 绑定邮箱弹出框 -->
          <el-dialog title="解除绑定" :visible.sync="deleteVisible" width="30%" center>
            <p>{{deleteMessage}}</p>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="deleteEmail()" :disabled="cannotClick">{{content}}</el-button>
            </span>
          </el-dialog>
          <!-- 新建收货地址弹出框END -->
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import CenterMenu from '../components/CenterMenu'
import * as userAPI from '@/api/users'
import * as countAPI from '@/api/count'
export default {
  name: 'Center',
  data() {
    return {
      favoriteTotal: 0,
      notPayTotal: 0,
      payTotal: 0,
      addVisible: false,
      deleteVisible: false,
      content: '发送验证邮件',
      message: 'Cmall 将发送一封验证邮件到你的邮箱，此邮箱将作为您的绑定邮箱',
      deleteMessage: 'Cmall 将发送一封验证邮件到你的邮箱，此操作会解除邮箱绑定',
      cannotClick: false,
      totalTime: 30,
      form: {
        user_id: 0,
        email: '',
        //1:绑定，2:解绑
        operation_type: 0
      }
    }
  },
  methods: {
    //按钮点击计时器
    countDown() {
      if (this.cannotClick) return //改动的是这两行代码
      this.cannotClick = true
      this.content = this.totalTime + 's后重新发送'
      let clock = window.setInterval(() => {
        this.totalTime--
        this.content = this.totalTime + 's后重新发送'
        if (this.totalTime < 0) {
          window.clearInterval(clock)
          this.content = '重新发送验证邮件'
          this.message =
            'Cmall 将发送一封验证邮件到你的邮箱，此邮箱将作为您的绑定邮箱'
          this.deleteMessage =
            'Cmall 将发送一封验证邮件到你的邮箱，此操作会解除邮箱绑定'
          this.totalTime = 30
          this.cannotClick = false //这里重新开启
        }
      }, 1000)
    },
    postEmail(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false
        }
        this.countDown()
        this.form.operation_type = 1
        this.form.user_id = this.$store.getters.getUser.id
        userAPI.sendEmail(this.form).then(res => {
          if (res.status === 200) {
            this.message =
              '验证邮件已发送到您的邮箱，15分钟内有效，如果没有收到，请检查垃圾邮件,如果还是没有收到，请重新填写邮箱'
          } else {
            this.notifyError('发送邮件失败', res.msg)
          }
        })
      })
    },
    deleteEmail() {
      this.countDown()
      this.form.operation_type = 2
      this.form.user_id = this.$store.getters.getUser.id
      this.form.email = this.$store.getters.getUser.email
      userAPI.sendEmail(this.form).then(res => {
        if (res.status === 200) {
          this.deleteMessage =
            '验证邮件已发送到您的邮箱，15分钟内有效，如果没有收到，请检查垃圾邮件,如果还是没有收到，请重新发送'
        } else {
          this.notifyError('发送邮件失败', res.msg)
        }
      })
    },
    getCount() {
      countAPI
        .showCount(this.$store.getters.getUser.id)
        .then(res => {
          if (res.status === 200) {
            this.favoriteTotal = res.data.favorite_total
            this.notPayTotal = res.data.not_pay_total
            this.payTotal = res.data.pay_total
          } else if (res.status === 20001) {
            //token过期，需要重新登录
            this.loginExpired(res.msg)
          } else {
            this.notifyError('获取数量失败', res.msg)
          }
        })
        .catch(err => {
          this.notifyError('获取数量失败', err)
        })
    }
  },
  created() {
    this.getCount()
  },
  components: {
    CenterMenu
  }
}
</script>
<style scoped>
.center-layout {
  max-width: 1225px;
  margin: 0 auto;
}
.center-content {
  background-color: #ffffff;
  margin-bottom: 30px;
}
.center-user {
  height: 280px;
  width: 800px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 0;
  border-bottom: 1px solid #c2c4ca;
}
.user-avator img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  padding: 5px;
  border: 1px solid #ddd;
}
.user-info {
  width: 260px;
  line-height: 30px;
  margin-left: 15px;
  padding: 0;
}
.user-message {
  line-height: 30px;
  padding: 0;
}
.user-message ul li {
  color: #77787b;
  font-size: 15px;
}
.user-data {
  line-height: 30px;
  padding: 0;
}
.user-data ul li {
  color: #77787b;
  font-size: 15px;
}
.user-data ul li a {
  color: #77787b;
}
.user-data ul li a:hover {
  color: #ff6700;
}
.user-details {
  height: 150px;
  width: 800px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  margin-top: 50px;
}
.user-details1 {
  height: 150px;
  width: 800px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding-bottom: 50px;
}
.operate {
  margin-left: 200px;
}
.operate1 {
  line-height: 30px;
  margin-left: 20px;
}
.operate1 .oper-title {
  font-size: 20px;
  color: #7b7f86;
}
.operate1 .oper-href {
  font-size: 15px;
  color: #7b7f86;
}
.operate1 .oper-href:hover {
  color: #ff6700;
}

.email-pop-out {
  text-align: center;
}
</style>