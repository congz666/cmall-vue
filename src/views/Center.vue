<!--
 * @Descripttion: 个人中心页面组件
 * @Author: congz
 * @Date: 2020-07-03 09:31:23
 * @LastEditors: congz
 * @LastEditTime: 2020-07-17 10:39:42
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
                <p style="font-size:13px;color:#999999">早上好～</p>
                <p>
                  <router-link to="/user/details" style="font-size:13px;color:#ff6700;">修改个人信息 ></router-link>
                </p>
              </div>
              <div class="user-message">
                <ul>
                  <li>账户安全：</li>
                  <li>绑定手机：</li>
                  <li>绑定邮箱：</li>
                </ul>
              </div>
              <div class="user-data">
                <ul>
                  <li>普通</li>
                  <li>12345678910</li>
                  <li>123456@qq.com</li>
                </ul>
              </div>
            </div>
            <!--end--个人信息头部-->
            <div class="user-details">
              <div class>
                <img src="https://s01.mifile.cn/i/user/portal-icon-1.png" />
              </div>
              <div class="operate1">
                <p class="oper-title">待支付订单：0</p>
                <p>
                  <a href class="oper-href">查看待支付订单 ></a>
                </p>
              </div>
              <div class="operate">
                <img src="https://s01.mifile.cn/i/user/portal-icon-2.png" />
              </div>
              <div class="operate1">
                <p class="oper-title">待收货订单：0</p>
                <p>
                  <a href class="oper-href">查看待收货订单 ></a>
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
                  <a href class="oper-href">查看待评价订单 ></a>
                </p>
              </div>
              <div class="operate">
                <img src="https://s01.mifile.cn/i/user/portal-icon-4.png" />
              </div>
              <div class="operate1">
                <p class="oper-title">收藏的商品：0</p>
                <p>
                  <a href class="oper-href">查看收藏的商品 ></a>
                </p>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import CenterMenu from '../components/CenterMenu'
export default {
  name: 'Center',
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
  width: 300px;
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
</style>