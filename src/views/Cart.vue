<!--
 * @Descripttion: 我的购物车页面组件
 * @Author: congz
 * @Date: 2020-06-04 11:22:40
 * @LastEditors: congz
 * @LastEditTime: 2020-08-17 10:55:06
--> 


<template>
  <div class="shoppingCart">
    <!-- 购物车头部 -->
    <div class="top-header">
      <div class="cart-header">
        <div class="logo">
          <router-link to="/">
            <img src="../assets/imgs/clogo.png" alt />
          </router-link>
        </div>
        <div class="cart-header-content">
          <p>我的购物车</p>
          <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
        </div>
        <div class="cart-header-right">
          <div class="cart-header-select">
            <el-dropdown>
              <router-link to class="href">
                <span style="margin-right:5px">{{this.$store.getters.getUser.nickname}}</span>
                <i class="el-icon-caret-bottom"></i>
              </router-link>
              <el-dropdown-menu slot="dropdown">
                <router-link to="/">
                  <el-dropdown-item class="dropdown-menu">首页</el-dropdown-item>
                </router-link>
                <router-link to="/center">
                  <el-dropdown-item class="dropdown-menu">个人中心</el-dropdown-item>
                </router-link>
                <router-link to="/">
                  <el-dropdown-item class="dropdown-menu">评价晒单</el-dropdown-item>
                </router-link>
                <router-link to="/favorite">
                  <el-dropdown-item class="dropdown-menu">我的收藏</el-dropdown-item>
                </router-link>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

          <div class="cart-header-order">
            <span>|</span>
            <router-link to="/order" class="href">我的订单</router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- 购物车头部END -->

    <!-- 购物车主要内容区 -->
    <div class="cart-content" v-if="getShoppingCart.length>0">
      <ul>
        <!-- 购物车表头 -->
        <li class="content-header">
          <div class="pro-check">
            <el-checkbox v-model="isAllCheck">全选</el-checkbox>
          </div>
          <div class="pro-img"></div>
          <div class="pro-name">商品名称</div>
          <div class="pro-price">单价</div>
          <div class="pro-num">数量</div>
          <div class="pro-total">小计</div>
          <div class="pro-action">操作</div>
        </li>
        <!-- 购物车表头END -->

        <!-- 购物车列表 -->
        <li class="product-list" v-for="(item,index) in getShoppingCart" :key="item.id">
          <div class="pro-check">
            <el-checkbox :value="item.check" @change="checkChange($event,index)"></el-checkbox>
          </div>
          <div class="pro-img">
            <router-link :to="{ path: '/goods/details', query: {productID:item.product_id} }">
              <img :src="item.img_path" />
            </router-link>
          </div>
          <div class="pro-name">
            <router-link
              :to="{ path: '/goods/details', query: {productID:item.product_id} }"
            >{{item.name}}</router-link>
          </div>
          <div class="pro-price">{{item.discount_price}}元</div>
          <div class="pro-num">
            <el-input-number
              size="small"
              :value="item.num"
              @change="handleChange($event,index,item.product_id)"
              :min="1"
              :max="item.max_num"
            ></el-input-number>
          </div>
          <div class="pro-total pro-total-in">{{item.discount_price*item.num}}元</div>
          <div class="pro-action">
            <el-popover placement="right">
              <p>确定删除吗？</p>
              <div style="text-align: right; margin: 10px 0 0">
                <el-button
                  type="primary"
                  size="mini"
                  @click="deleteItem($event,item.id,item.product_id)"
                >确定</el-button>
              </div>
              <i class="el-icon-error" slot="reference" style="font-size: 18px"></i>
            </el-popover>
          </div>
        </li>
        <!-- 购物车列表END -->
      </ul>
      <div style="height:20px;background-color: #f5f5f5"></div>
      <!-- 购物车底部导航条 -->
      <div class="cart-bar">
        <div class="cart-bar-left">
          <span>
            <router-link to="/goods">继续购物</router-link>
          </span>
          <span class="sep">|</span>
          <span class="cart-total">
            共
            <span class="cart-total-num">{{getNum}}</span> 件商品，已选择
            <span class="cart-total-num">{{getCheckNum}}</span> 件
          </span>
        </div>
        <div class="cart-bar-right">
          <span>
            <span class="total-price-title">合计：</span>
            <span class="total-price">{{getTotalPrice}}元</span>
          </span>
          <router-link :to="getCheckNum > 0 ? '/confirmOrder' : ''">
            <div :class="getCheckNum > 0 ? 'btn-primary' : 'btn-primary-disabled'">去结算</div>
          </router-link>
        </div>
      </div>
      <!-- 购物车底部导航条END -->
    </div>
    <!-- 购物车主要内容区END -->

    <!-- 购物车为空的时候显示的内容 -->
    <div v-else class="cart-empty">
      <div class="empty">
        <h2>您的购物车还是空的！</h2>
        <p>快去购物吧！</p>
      </div>
    </div>
    <!-- 购物车为空的时候显示的内容END -->
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import * as cartsAPI from '@/api/carts'

export default {
  data() {
    return {}
  },
  methods: {
    ...mapActions(['updateShoppingCart', 'deleteShoppingCart', 'checkAll']),
    // 修改商品数量的时候调用该函数
    handleChange(currentValue, key, productID) {
      // 当修改数量时，默认勾选
      this.updateShoppingCart({ key: key, prop: 'check', val: true })
      // 向后端发起更新购物车的数据库信息请求
      var form = {
        user_id: this.$store.getters.getUser.id,
        product_id: productID,
        num: currentValue
      }
      cartsAPI
        .updateCart(form)
        .then(res => {
          if (res.status === 200) {
            // 更新vuex状态
            this.updateShoppingCart({
              key: key,
              prop: 'num',
              val: currentValue
            })
          } else if (res.status === 20001) {
            //token过期，需要重新登录
            this.loginExpired(res.msg)
          } else {
            this.notifyError('更新失败', res.msg)
          }
        })
        .catch(err => {
          this.notifyError('更新失败', err)
        })
    },
    checkChange(val, key) {
      // 更新vuex中购物车商品是否勾选的状态
      this.updateShoppingCart({ key: key, prop: 'check', val: val })
    },
    // 向后端发起删除购物车的数据库信息请求
    deleteItem(e, id, productID) {
      var form = {
        user_id: this.$store.getters.getUser.id,
        product_id: productID
      }
      cartsAPI
        .deleteCart(form)
        .then(res => {
          if (res.status === 200) {
            // 更新vuex状态
            this.deleteShoppingCart(productID)
            this.notifySucceed('删除成功')
          } else if (res.status === 20001) {
            //token过期，需要重新登录
            this.loginExpired(res.msg)
          } else {
            this.notifyError('删除失败', res.msg)
          }
        })
        .catch(err => {
          this.notifyError('删除失败', err)
        })
    }
  },
  computed: {
    ...mapGetters([
      'getShoppingCart',
      'getCheckNum',
      'getTotalPrice',
      'getNum'
    ]),
    isAllCheck: {
      get() {
        return this.$store.getters.getIsAllCheck
      },
      set(val) {
        this.checkAll(val)
      }
    }
  }
}
</script>
<style scoped>
.shoppingCart {
  background-color: #f5f5f5;
  padding-bottom: 80px;
}
/* 购物车头部CSS */
.shoppingCart .top-header {
  width: 100%;
  background-color: #ffffff;
  margin-bottom: 30px;
  border-bottom: 2px solid #ff6700;
}
.shoppingCart .top-header .cart-header {
  display: flex;
  height: 100px;
  background-color: #ffffff;
  margin-bottom: 20px;
  width: 1225px;
  margin: 0 auto;
  position: relative;
}
.shoppingCart .top-header .cart-header .logo {
  height: 60px;
  width: 100px;
  margin-top: 22px;
  margin-right: 20px;
}
.shoppingCart .top-header .cart-header .logo img {
  height: 60px;
}

.shoppingCart .top-header .cart-header p {
  margin-top: 23px;
  font-size: 28px;
  line-height: 58px;
  float: left;
  font-weight: normal;
  color: #424242;
}
.shoppingCart .top-header .cart-header .cart-header-content span {
  color: #757575;
  font-size: 12px;
  float: left;
  height: 20px;
  line-height: 20px;
  margin-top: 48px;
  margin-left: 15px;
}
.shoppingCart .top-header .cart-header .cart-header-right {
  display: flex;
  position: absolute;
  right: 0px;
  float: right;
}

.shoppingCart .top-header .cart-header .cart-header-select {
  margin-top: 40px;
}

.shoppingCart .top-header .cart-header .cart-header-select .href {
  font-size: 13px;
  color: #757575;
}
.shoppingCart .top-header .cart-header .cart-header-select .href:hover {
  color: #ff6700;
}
.dropdown-menu:hover {
  color: #ff6700;
  background-color: #f5f5f5;
}
.shoppingCart .top-header .cart-header .cart-header-order {
  margin-top: 40px;
}
.shoppingCart .top-header .cart-header .cart-header-order span {
  color: #c9c7c7;
  margin-left: 20px;
  margin-right: 20px;
}
.shoppingCart .top-header .cart-header .cart-header-order .href {
  font-size: 13px;
  color: #757575;
}
.shoppingCart .top-header .cart-header .cart-header-order .href:hover {
  color: #ff6700;
}

/* 购物车头部CSS END */

/* 购物车主要内容区CSS */
.shoppingCart .cart-content {
  width: 1225px;
  margin: 0 auto;
  background-color: #fff;
}

.shoppingCart .cart-content ul {
  background-color: #fff;
  color: #424242;
  line-height: 85px;
}
/* 购物车表头及CSS */
.shoppingCart .cart-content ul .content-header {
  height: 60px;
  padding-right: 26px;
  color: #424242;
  display: flex;
  align-items: center;
}
.shoppingCart .cart-content ul .product-list {
  height: 85px;
  padding: 15px 26px 15px 0;
  border-top: 1px solid #e0e0e0;
}
.shoppingCart .cart-content ul .pro-check {
  float: left;
  height: 85px;
  width: 110px;
}
.shoppingCart .cart-content ul .pro-check .el-checkbox {
  font-size: 16px;
  margin-left: 24px;
}
.shoppingCart .cart-content ul .pro-img {
  float: left;
  height: 85px;
  width: 120px;
}
.shoppingCart .cart-content ul .pro-img img {
  height: 80px;
  width: 80px;
}
.shoppingCart .cart-content ul .pro-name {
  float: left;
  width: 380px;
}
.shoppingCart .cart-content ul .pro-name a {
  color: #424242;
}
.shoppingCart .cart-content ul .pro-name a:hover {
  color: #ff6700;
}
.shoppingCart .cart-content ul .pro-price {
  float: left;
  width: 140px;
  padding-right: 18px;
  text-align: center;
}
.shoppingCart .cart-content ul .pro-num {
  float: left;
  width: 150px;
  text-align: center;
}
.shoppingCart .cart-content ul .pro-total {
  float: left;
  width: 120px;
  padding-right: 81px;
  text-align: right;
}
.shoppingCart .cart-content ul .pro-total-in {
  color: #ff6700;
}
.shoppingCart .cart-content ul .pro-action {
  float: left;
  width: 80px;
  text-align: center;
}
.shoppingCart .cart-content ul .pro-action i:hover {
  color: #ff6700;
}
/* 购物车表头及CSS END */

/* 购物车底部导航条CSS */
.shoppingCart .cart-bar {
  width: 1225px;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  margin-bottom: 150px;
}
.shoppingCart .cart-bar .cart-bar-left {
  float: left;
}
.shoppingCart .cart-bar .cart-bar-left a {
  line-height: 50px;
  margin-left: 32px;
  color: #757575;
}
.shoppingCart .cart-bar .cart-bar-left a:hover {
  color: #ff6700;
}
.shoppingCart .cart-bar .cart-bar-left .sep {
  color: #eee;
  margin: 0 20px;
}
.shoppingCart .cart-bar .cart-bar-left .cart-total {
  color: #757575;
}
.shoppingCart .cart-bar .cart-bar-left .cart-total-num {
  color: #ff6700;
}
.shoppingCart .cart-bar .cart-bar-right {
  float: right;
}
.shoppingCart .cart-bar .cart-bar-right .total-price-title {
  color: #ff6700;
  font-size: 14px;
}
.shoppingCart .cart-bar .cart-bar-right .total-price {
  color: #ff6700;
  font-size: 30px;
}
.shoppingCart .cart-bar .cart-bar-right .btn-primary {
  float: right;
  width: 200px;
  text-align: center;
  font-size: 18px;
  margin-left: 50px;
  background: #ff6700;
  color: #fff;
}
.shoppingCart .cart-bar .cart-bar-right .btn-primary-disabled {
  float: right;
  width: 200px;
  text-align: center;
  font-size: 18px;
  margin-left: 50px;
  background: #e0e0e0;
  color: #b0b0b0;
}
.shoppingCart .cart-bar .cart-bar-right .btn-primary:hover {
  background-color: #f25807;
}
/* 购物车底部导航条CSS END */
/* 购物车主要内容区CSS END */

/* 购物车为空的时候显示的内容CSS */
.shoppingCart .cart-empty {
  width: 1225px;
  margin: 0 auto;
}
.shoppingCart .cart-empty .empty {
  height: 300px;
  padding: 0 0 130px 558px;
  margin: 65px 0 0;
  background: url(../assets/imgs/cart-empty.png) no-repeat 124px 0;
  color: #b0b0b0;
  overflow: hidden;
}
.shoppingCart .cart-empty .empty h2 {
  margin: 70px 0 15px;
  font-size: 36px;
}
.shoppingCart .cart-empty .empty p {
  margin: 0 0 20px;
  font-size: 20px;
}
/* 购物车为空的时候显示的内容CSS END */
</style>