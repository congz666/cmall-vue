<!--
 * @Descripttion: 项目根组件
 * @Author: congz
 * @Date: 2020-06-04 11:22:40
 * @LastEditors: congz
 * @LastEditTime: 2020-09-01 14:34:14
--> 

<template>
  <div id="app" name="app">
    <el-container>
      <!-- 顶部导航栏 -->
      <div class="topbar" v-show="$route.meta.showMenu!==false">
        <div class="nav">
          <ul>
            <li v-if="!this.$store.getters.getUser">
              <div style="margin-top:5px;font-size:16px">
                <router-link to="/login">登录</router-link>
              </div>
            </li>
            <li v-else class="header-user-con">
              <!-- 用户头像 -->
              <div class="user-avator">
                <img :src="this.$store.getters.getUser.avatar" />
              </div>
              <!-- 用户名下拉菜单 -->
              <div class="user-name">
                <el-dropdown>
                  <span class="el-dropdown-link">
                    {{this.$store.getters.getUser.nickname}}
                    <i class="el-icon-caret-bottom"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <a href="https://github.com/congz666/cmall-go" target="_blank">
                      <el-dropdown-item>项目仓库</el-dropdown-item>
                    </a>
                    <router-link to="/center">
                      <el-dropdown-item>个人中心</el-dropdown-item>
                    </router-link>
                    <a @click="logout">
                      <el-dropdown-item>退出登录</el-dropdown-item>
                    </a>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </li>
            <li class="font">
              <router-link to="/favorite">我的收藏</router-link>
            </li>
            <li class="font">
              <router-link to="/order">我的订单</router-link>
            </li>

            <li :class="getNum > 0 ? 'shopCart-full' : 'shopCart'">
              <div style="margin-top:5px">
                <router-link to="/cart">
                  <i class="el-icon-shopping-cart-full"></i> 购物车
                  <span>({{getNum}})</span>
                </router-link>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 顶部导航栏END -->

      <!-- 顶栏容器 -->

      <el-header v-show="$route.meta.showMenu!==false">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          active-text-color="#ff6700"
          background-color="#ffffff"
          router
        >
          <div class="logo">
            <router-link to="/">
              <img src="./assets/imgs/clogo.png" alt />
            </router-link>
          </div>
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/goods">全部商品</el-menu-item>
          <el-menu-item index="/about">关于我们</el-menu-item>
          <a href="https://congz666.gitee.io/" target="_blank">
            <el-menu-item :index="0">个人博客</el-menu-item>
          </a>
          <div class="so">
            <el-input placeholder="请输入搜索内容" v-model="search">
              <el-button slot="append" icon="el-icon-search" @click="searchClick"></el-button>
            </el-input>
          </div>
        </el-menu>
      </el-header>

      <!-- 顶栏容器END -->

      <!-- 主要区域容器 -->
      <el-main>
        <keep-alive>
          <router-view :key="key"></router-view>
        </keep-alive>
      </el-main>
      <!-- 主要区域容器END -->

      <!-- 底栏容器 -->
      <el-footer>
        <div class="footer">
          <div class="ng-promise-box">
            <div class="ng-promise">
              <p class="text">
                <a class="icon1" href="javascript:;">7天无理由退换货</a>
                <a class="icon2" href="javascript:;">满99元全场免邮</a>
                <a class="icon3" style="margin-right: 0" href="javascript:;">100%品质保证</a>
              </p>
            </div>
          </div>
          <div class="github">
            <a href="https://github.com/congz666/cmall-go" target="_blank">
              <div class="github-but"></div>
            </a>
          </div>
          <div class="mod_help">
            <p>
              <router-link to="/">首页</router-link>
              <span>|</span>
              <router-link to="/goods">全部商品</router-link>
              <span>|</span>
              <router-link to="/about">关于我们</router-link>
            </p>
            <p>
              Copyright ©2020, congz.top 本网站设计内容大部分属小米商城
              <iframe
                style="margin-left: 2px; margin-bottom:-5px;"
                frameborder="0"
                scrolling="0"
                width="91px"
                height="20px"
                src="https://ghbtns.com/github-btn.html?user=congz666&repo=cmall-go&type=star&count=true"
              ></iframe>
            </p>
            <a href="http://www.beian.miit.gov.cn/" target="_blank">粤ICP备20067893号</a>
          </div>
        </div>
      </el-footer>
      <!-- 底栏容器END -->
    </el-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import * as cartsAPI from '@/api/carts'
import * as userAPI from '@/api/users'

export default {
  beforeUpdate() {
    this.activeIndex = this.$route.path
  },
  data() {
    return {
      activeIndex: '', // 头部导航栏选中的标签
      search: '' // 搜索条件
    }
  },
  beforeCreate() {
    document.querySelector('body').setAttribute('style', 'background:#f5f5f5')
  },
  created() {
    // 获取浏览器localStorage，判断用户是否已经登录
    userAPI.checkToken(localStorage.getItem('token')).then(res => {
      // 如果已经登录，设置vuex登录状态
      if (res.status == 200) {
        this.setUser(JSON.parse(localStorage.getItem('user')))
      } else {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
      }
    })
  },
  computed: {
    ...mapGetters(['getUser', 'getNum']),
    key() {
      return this.$route.path + Math.random()
    }
  },
  watch: {
    // 获取vuex的登录状态
    getUser: function(val) {
      if (val === '') {
        // 用户没有登录
        this.setShoppingCart([])
      } else {
        // 用户已经登录,获取该用户的购物车信息
        cartsAPI
          .showCarts(val.id)
          .then(res => {
            if (res.status === 200) {
              if (res.data === null) {
                this.setShoppingCart([])
              } else {
                this.setShoppingCart(res.data)
              }
            } else if (res.status === 20001) {
              //token过期，需要重新登录
              this.loginExpired(res.msg)
            } else {
              this.$notify.error({
                title: '购物车获取失败',
                message: res.msg
              })
            }
          })
          .catch(err => {
            return Promise.reject(err)
          })
      }
    }
  },
  methods: {
    ...mapActions(['setUser', 'setShoppingCart']),
    login() {
      this.$router.push({
        name: 'Login'
      })
    },
    // 退出登录
    logout() {
      // 清空本地登录信息
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      // 清空vuex登录信息
      this.setUser('')
      this.$router.push({
        name: 'Home'
      })
      this.notifySucceed('登出成功')
    },
    //重定向
    register() {
      this.$router.push({
        name: 'Register'
      })
    },
    // 点击搜索按钮
    searchClick() {
      if (this.search != '') {
        // 跳转到全部商品页面,并传递搜索条件
        this.$router.push({ path: '/goods', query: { search: this.search } })
        this.search = ''
      }
    }
  }
}
</script>

<style>
/* 全局CSS */
* {
  padding: 0;
  margin: 0;
  border: 0;
  list-style: none;
}

.header-user-con {
  display: flex;
  height: 50px;
  align-items: center;
}
.user-name {
  margin-left: 10px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}

.el-dropdown-menu__item {
  text-align: center;
}
.el-dropdown-item:hover {
  color: #ff6700;
}

#app .el-header {
  padding: 0;
}
#app .el-main {
  min-height: 300px;
  padding: 0;
}
#app .el-footer {
  padding: 0;
}
a,
a:hover {
  text-decoration: none;
}
/* 全局CSS END */

/* 顶部导航栏CSS */
.topbar {
  height: 50px;
  background-color: #303643;
}
.topbar .nav {
  width: 1225px;
  margin: 0 auto;
}
.topbar .nav ul {
  float: right;
}
.topbar .nav li {
  float: left;
  height: 50px;
  color: #b0b0b0;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  margin-left: 20px;
}
.topbar .nav li.font {
  margin-top: 5px;
}

.topbar .nav li .router-link {
  margin-top: 5px;
}

.topbar .nav li .el-button {
  color: #b0b0b0;
}
.topbar .nav .el-button:hover {
  color: #fff;
}
.topbar .nav li a {
  color: #b0b0b0;
}
.topbar .nav a:hover {
  color: #fff;
}
.topbar .nav .shopCart {
  width: 120px;
  background: #424242;
}
.topbar .nav .shopCart:hover {
  background: #fff;
}
.topbar .nav .shopCart:hover a {
  color: #ff6700;
}
.topbar .nav .shopCart-full {
  width: 120px;
  background: #ff6700;
}
.topbar .nav .shopCart-full a {
  color: white;
}

/* 顶部导航栏CSS END */

/* 顶栏容器CSS */
.el-header {
  margin-bottom: 20px;
  background-color: #ffffff;
}
.el-header .el-menu {
  max-width: 1225px;
  margin: 0 auto;
  display: flex;
  align-items: center;
}

.el-header .logo {
  height: 60px;
  width: 100px;
  float: left;
  margin-right: 30px;
}
.el-header .logo img {
  height: 60px;
}
.el-header .so {
  width: 300px;
  margin-left: 437px;
}
/* 顶栏容器CSS END */

/* 底栏容器CSS */
.footer {
  width: 100%;
  text-align: center;
  background: #2f2f2f;
  padding-bottom: 20px;
}
.footer .ng-promise-box {
  border-bottom: 1px solid #3d3d3d;
  line-height: 145px;
}
.footer .ng-promise-box {
  margin: 0 auto;
  border-bottom: 1px solid #3d3d3d;
  line-height: 145px;
}
.footer .ng-promise-box .ng-promise p a {
  color: #fff;
  font-size: 20px;
  margin-right: 210px;
  padding-left: 44px;
  height: 40px;
  display: inline-block;
  line-height: 40px;
  text-decoration: none;
  background: url('./assets/imgs/us-icon.png') no-repeat left 0;
}
.footer .github {
  height: 50px;
  line-height: 50px;
  margin-top: 20px;
}
.footer .github .github-but {
  width: 50px;
  height: 50px;
  margin: 0 auto;
  background: url('./assets/imgs/github.png') no-repeat;
}
.footer .mod_help {
  text-align: center;
  color: #888888;
}
.footer .mod_help p {
  margin: 20px 0 16px 0;
}

.footer .mod_help p a {
  color: #888888;
  text-decoration: none;
}
.footer .mod_help p a:hover {
  color: #fff;
}
.footer .mod_help p span {
  padding: 0 22px;
}
.footer .mod_help a {
  color: #888888;
}
/* 底栏容器CSS END */
</style>