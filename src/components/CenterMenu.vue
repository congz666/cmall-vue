<!--
 * @Descripttion:个人中心导航组件 
 * @Author: congz
 * @Date: 2020-07-03 09:40:21
 * @LastEditors: congz
 * @LastEditTime: 2020-08-09 13:02:14
--> 

<template>
  <div class="centerMenu" id="centerMenu">
    <el-col :span="4">
      <div class="menu">
        <div class="menu-content">
          <div class="menu-part">
            <p class="submenu">个人中心</p>
            <ul class="menu-ul">
              <li>
                <router-link to="/center" class="menu-a">我的个人中心</router-link>
              </li>
              <li>
                <router-link to="/favorite" class="menu-a">我的收藏</router-link>
              </li>
              <li>
                <router-link to="/order" class="menu-a">我的订单</router-link>
              </li>
              <li>
                <router-link to="/cart" class="menu-a">我的购物车</router-link>
              </li>
            </ul>
            <p class="submenu">账户管理</p>
            <ul class="menu-ul">
              <li>
                <router-link to="/user/details" class="menu-a">个人信息</router-link>
              </li>
              <li>
                <router-link to="/user/pass" class="menu-a">修改密码</router-link>
              </li>
              <li>
                <router-link to="/user/address" class="menu-a">收货地址</router-link>
              </li>
            </ul>
            <p class="submenu">关于</p>
            <ul class="menu-ul">
              <li>
                <router-link to="/about" class="menu-a">关于网站</router-link>
              </li>
              <li>
                <a
                  href="https://github.com/congz666/cmall-vue"
                  target="_blank"
                  class="menu-a"
                >项目地址(前端)</a>
              </li>
              <li>
                <a
                  href="https://github.com/congz666/cmall-go"
                  target="_blank"
                  class="menu-a"
                >项目地址(后端)</a>
              </li>
            </ul>
          </div>

          <div class="extra"></div>
        </div>
      </div>
    </el-col>
  </div>
</template>
<script>
export default {
  name: 'CenterMenu',
  data() {
    return {}
  },
  methods: {}
}
</script>
<style scoped>
.menu {
  background-color: #ffffff;
}
.menu-content {
  width: 120px;
  margin: 0 auto;
}
.submenu {
  padding-top: 30px;
  padding-bottom: 20px;
}
.menu-ul {
  line-height: 30px;
}
.menu-ul .menu-a {
  font-size: 15px;
  color: #7b7f86;
}
.menu-ul .menu-a:hover {
  color: #ff6700;
}
.extra {
  height: 40px;
}
</style>