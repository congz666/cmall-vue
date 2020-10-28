<!--
 * @Descripttion:确认订单页面组件 
 * @Author: congz
 * @Date: 2020-06-04 11:22:40
 * @LastEditors: congz
 * @LastEditTime: 2020-10-28 12:20:28
--> 

<template>
  <div class="confirmOrder">
    <!-- 头部 -->
    <div class="top-header">
      <div class="cart-header">
        <div class="logo">
          <router-link to="/">
            <img src="../assets/imgs/clogo.png" alt />
          </router-link>
        </div>
        <div class="cart-header-content">
          <p>确认订单</p>
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
    <!-- 头部END -->

    <!-- 主要内容容器 -->
    <div class="confirm-content">
      <!-- 选择地址 -->
      <div class="section-address">
        <p class="title">收货地址</p>
        <div class="address-body">
          <ul>
            <router-link to>
              <li
                :class="item.id == confirmAddress ? 'in-section' : ''"
                v-for="item in address"
                :key="item.id"
                @click="selectAddress(item)"
              >
                <h2>{{item.name}}</h2>
                <p class="phone">{{item.phone}}</p>
                <p class="address">{{item.address}}</p>
              </li>
            </router-link>
            <li class="add-address" @click="addVisible=true">
              <i class="el-icon-circle-plus-outline"></i>
              <p>添加新地址</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- 选择地址END -->

      <!-- 商品及优惠券 -->
      <div class="section-goods">
        <p class="title">商品及优惠券</p>
        <div class="goods-list">
          <ul>
            <li v-for="item in getCheckGoods" :key="item.id">
              <img :src="item.img_path" />
              <span class="pro-name">{{item.name}}</span>
              <span class="pro-price">{{item.discount_price}}元</span>
              <span class="pro-num">x {{item.num}}</span>
              <span class="pro-status"></span>
              <span class="pro-total">{{item.discount_price * item.num}}元</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 商品及优惠券END -->

      <!-- 配送方式 -->
      <div class="section-shipment">
        <p class="title">配送方式</p>
        <p class="shipment">包邮</p>
      </div>
      <!-- 配送方式END -->

      <!-- 发票 -->
      <div class="section-invoice">
        <p class="title">发票</p>
        <p class="invoice">电子发票</p>
        <p class="invoice">个人</p>
        <p class="invoice">商品明细</p>
      </div>
      <!-- 发票END -->

      <!-- 结算列表 -->
      <div class="section-count">
        <div class="money-box">
          <ul>
            <li>
              <span class="title">商品件数：</span>
              <span class="value">{{getCheckNum}}件</span>
            </li>
            <li>
              <span class="title">商品总价：</span>
              <span class="value">{{getTotalPrice}}元</span>
            </li>
            <li>
              <span class="title">活动优惠：</span>
              <span class="value">-0元</span>
            </li>
            <li>
              <span class="title">优惠券抵扣：</span>
              <span class="value">-0元</span>
            </li>
            <li>
              <span class="title">运费：</span>
              <span class="value">0元</span>
            </li>
            <li class="total">
              <span class="title">应付总额：</span>
              <span class="value">
                <span class="total-price">{{getTotalPrice}}</span>元
              </span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 结算列表END -->

      <!-- 结算导航 -->
      <div class="section-bar">
        <div class="btn">
          <router-link to="/cart" class="btn-base btn-return">返回购物车</router-link>
          <a href="javascript:void(0);" @click="addOrder" class="btn-base btn-primary">结算</a>
        </div>
      </div>
      <!-- 结算导航END -->
    </div>
    <!-- 主要内容容器END -->
    <!-- 新建收货地址弹出框 -->
    <el-dialog title="新建收货地址" :visible.sync="addVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input type="textarea" rows="5" v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="postEdit">确 定</el-button>
        <el-button @click="addVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 新建收货地址弹出框END -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import * as addressesAPI from '@/api/addresses'
import * as ordersAPI from '@/api/orders'
import * as cartsAPI from '@/api/carts'
export default {
  name: '',
  data() {
    return {
      // 选择的地址id
      confirmAddress: 0,
      // 地址列表
      address: [],
      addVisible: false,
      form: {
        user_id: '',
        name: '',
        phone: '',
        address: ''
      }
    }
  },
  created() {
    // 如果没有勾选购物车商品直接进入确认订单页面,提示信息并返回购物车
    if (this.getCheckNum < 1) {
      this.notifyError('请勾选商品后再结算')
      this.$router.push({ path: '/cart' })
    }
    this.getAddress()
  },
  computed: {
    // 结算的商品数量; 结算商品总计; 结算商品信息
    ...mapGetters(['getCheckNum', 'getTotalPrice', 'getCheckGoods'])
  },
  methods: {
    ...mapActions(['deleteShoppingCart']),
    selectAddress(item) {
      this.confirmAddress = item.id
    },
    getAddress() {
      addressesAPI
        .showAddresses(this.$store.getters.getUser.id)
        .then(res => {
          if (res.status === 200) {
            this.address = res.data
          } else if (res.status === 20001) {
            //token过期，需要重新登录
            this.loginExpired(res.msg)
          } else {
            this.notifyError('获取收货地址失败', res.msg)
          }
        })
        .catch(err => {
          this.notifyError('获取收货地址失败', err)
        })
    },
    addOrder() {
      if (this.confirmAddress === 0) {
        this.notifyError('请选择收货地址', null)
        return
      }
      let orders = this.getCheckGoods
      for (let i = 0; i < orders.length; i++) {
        var form = {
          user_id: this.$store.getters.getUser.id,
          product_id: orders[i].product_id,
          num: orders[i].num,
          address_id: this.confirmAddress
        }
        ordersAPI
          .postOrder(form)
          .then(res => {
            if (res.status === 200) {
              const temp = orders[i]
              // 删除已经结算的购物车商品
              var form1 = {
                user_id: this.$store.getters.getUser.id,
                product_id: temp.product_id
              }
              cartsAPI
                .deleteCart(form1)
                .then(res => {
                  if (res.status === 200) {
                    // 更新vuex状态
                    this.deleteShoppingCart(temp.product_id)
                  } else if (res.status === 20001) {
                    //token过期，需要重新登录
                    this.loginExpired(res.msg)
                  } else {
                    this.notifyError('购物车删除失败', res.msg)
                  }
                })
                .catch(err => {
                  this.notifyError('购物车删除失败', err)
                })
              // 跳转我的订单页面
              this.$router.push({ path: '/order' })
              this.notifySucceed('未付款的订单将于15分钟后删除')
            } else if (res.status === 20001) {
              //token过期，需要重新登录
              this.loginExpired(res.msg)
            } else {
              this.notifyError('结算失败', res.msg)
            }
          })
          .catch(err => {
            this.notifyError('结算失败', err)
          })
      }
    },
    postEdit() {
      this.form.user_id = this.$store.getters.getUser.id
      addressesAPI
        .postAddress(this.form)
        .then(res => {
          if (res.status === 200) {
            this.address = res.data
            this.addVisible = false
            this.notifySucceed('新建收货地址成功')
          } else if (res.status === 20001) {
            //token过期，需要重新登录
            this.loginExpired(res.msg)
          } else {
            this.notifyError('新建收货地址失败', res.msg)
          }
        })
        .catch(err => {
          this.notifyError('新建收货地址失败', err)
        })
    }
  }
}
</script>
<style scoped>
.confirmOrder {
  background-color: #f5f5f5;
  padding-bottom: 20px;
}
/* 购物车头部CSS */
.confirmOrder .top-header {
  width: 100%;
  background-color: #ffffff;
  margin-bottom: 30px;
  border-bottom: 2px solid #ff6700;
}
.confirmOrder .top-header .cart-header {
  display: flex;
  height: 100px;
  background-color: #ffffff;
  margin-bottom: 20px;
  width: 1225px;
  margin: 0 auto;
  position: relative;
}
.confirmOrder .top-header .cart-header .logo {
  height: 60px;
  width: 100px;
  margin-top: 22px;
  margin-right: 20px;
}
.confirmOrder .top-header .cart-header .logo img {
  height: 60px;
}

.confirmOrder .top-header .cart-header p {
  margin-top: 23px;
  font-size: 28px;
  line-height: 58px;
  float: left;
  font-weight: normal;
  color: #424242;
}

.confirmOrder .top-header .cart-header .cart-header-right {
  display: flex;
  position: absolute;
  right: 0px;
  float: right;
}

.confirmOrder .top-header .cart-header .cart-header-select {
  margin-top: 40px;
}

.confirmOrder .top-header .cart-header .cart-header-select .href {
  font-size: 13px;
  color: #757575;
}
.confirmOrder .top-header .cart-header .cart-header-select .href:hover {
  color: #ff6700;
}
.dropdown-menu:hover {
  color: #ff6700;
  background-color: #f5f5f5;
}
.confirmOrder .top-header .cart-header .cart-header-order {
  margin-top: 40px;
}
.confirmOrder .top-header .cart-header .cart-header-order span {
  color: #c9c7c7;
  margin-left: 20px;
  margin-right: 20px;
}
.confirmOrder .top-header .cart-header .cart-header-order .href {
  font-size: 13px;
  color: #757575;
}
.confirmOrder .top-header .cart-header .cart-header-order .href:hover {
  color: #ff6700;
}

/* 购物车头部CSS END */

/* 主要内容容器CSS */
.confirmOrder .confirm-content {
  width: 1225px;
  margin: 0 auto;
  padding: 48px 0 0;
  background-color: #fff;
}

/* 选择地址CSS */
.confirmOrder .confirm-content .section-address {
  margin: 0 48px;
  overflow: hidden;
}
.confirmOrder .confirm-content .section-address .title {
  color: #333;
  font-size: 18px;
  line-height: 20px;
  margin-bottom: 20px;
}
.confirmOrder .confirm-content .address-body li {
  float: left;
  color: #333;
  width: 210px;
  height: 178px;
  border: 1px solid #e0e0e0;
  padding: 15px 24px 0;
  margin-right: 17px;
  margin-bottom: 24px;
}
.confirmOrder .confirm-content .address-body .in-section {
  border: 1px solid #ff6700;
}
.confirmOrder .confirm-content .address-body li h2 {
  font-size: 18px;
  font-weight: normal;
  line-height: 30px;
  margin-bottom: 10px;
}
.confirmOrder .confirm-content .address-body li p {
  font-size: 14px;
  color: #757575;
}
.confirmOrder .confirm-content .address-body li .address {
  padding: 10px 0;
  max-width: 180px;
  max-height: 88px;
  line-height: 22px;
  overflow: hidden;
}
.confirmOrder .confirm-content .address-body .add-address {
  text-align: center;
  line-height: 30px;
}
.confirmOrder .confirm-content .address-body .add-address i {
  font-size: 30px;
  padding-top: 50px;
  text-align: center;
}
/* 选择地址CSS END */

/* 商品及优惠券CSS */
.confirmOrder .confirm-content .section-goods {
  margin: 0 48px;
}
.confirmOrder .confirm-content .section-goods p.title {
  color: #333;
  font-size: 18px;
  line-height: 40px;
}
.confirmOrder .confirm-content .section-goods .goods-list {
  padding: 5px 0;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
}
.confirmOrder .confirm-content .section-goods .goods-list li {
  padding: 10px 0;
  color: #424242;
  overflow: hidden;
}
.confirmOrder .confirm-content .section-goods .goods-list li img {
  float: left;
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
.confirmOrder .confirm-content .section-goods .goods-list li .pro-name {
  float: left;
  width: 650px;
  line-height: 30px;
}
.confirmOrder .confirm-content .section-goods .goods-list li .pro-price {
  float: left;
  width: 120px;
  line-height: 30px;
}
.confirmOrder .confirm-content .section-goods .goods-list li .pro-num {
  float: left;
  width: 30px;
  text-align: center;
  line-height: 30px;
}
.confirmOrder .confirm-content .section-goods .goods-list li .pro-status {
  float: left;
  width: 99px;
  height: 30px;
  text-align: center;
  line-height: 30px;
}
.confirmOrder .confirm-content .section-goods .goods-list li .pro-total {
  float: left;
  width: 190px;
  text-align: center;
  color: #ff6700;
  line-height: 30px;
}
/* 商品及优惠券CSS END */

/* 配送方式CSS */
.confirmOrder .confirm-content .section-shipment {
  margin: 0 48px;
  padding: 25px 0;
  border-bottom: 1px solid #e0e0e0;
  overflow: hidden;
}
.confirmOrder .confirm-content .section-shipment .title {
  float: left;
  width: 150px;
  color: #333;
  font-size: 18px;
  line-height: 38px;
}
.confirmOrder .confirm-content .section-shipment .shipment {
  float: left;
  line-height: 38px;
  font-size: 14px;
  color: #ff6700;
}
/* 配送方式CSS END */

/* 发票CSS */
.confirmOrder .confirm-content .section-invoice {
  margin: 0 48px;
  padding: 25px 0;
  border-bottom: 1px solid #e0e0e0;
  overflow: hidden;
}
.confirmOrder .confirm-content .section-invoice .title {
  float: left;
  width: 150px;
  color: #333;
  font-size: 18px;
  line-height: 38px;
}
.confirmOrder .confirm-content .section-invoice .invoice {
  float: left;
  line-height: 38px;
  font-size: 14px;
  margin-right: 20px;
  color: #ff6700;
}
/* 发票CSS END */

/* 结算列表CSS */
.confirmOrder .confirm-content .section-count {
  margin: 0 48px;
  padding: 20px 0;
  overflow: hidden;
}
.confirmOrder .confirm-content .section-count .money-box {
  float: right;
  text-align: right;
}
.confirmOrder .confirm-content .section-count .money-box .title {
  float: left;
  width: 126px;
  height: 30px;
  display: block;
  line-height: 30px;
  color: #757575;
}
.confirmOrder .confirm-content .section-count .money-box .value {
  float: left;
  min-width: 105px;
  height: 30px;
  display: block;
  line-height: 30px;
  color: #ff6700;
}
.confirmOrder .confirm-content .section-count .money-box .total .title {
  padding-top: 15px;
}
.confirmOrder .confirm-content .section-count .money-box .total .value {
  padding-top: 10px;
}
.confirmOrder .confirm-content .section-count .money-box .total-price {
  font-size: 30px;
}
/* 结算列表CSS END */

/* 结算导航CSS */
.confirmOrder .confirm-content .section-bar {
  padding: 20px 48px;
  border-top: 2px solid #f5f5f5;
  overflow: hidden;
}
.confirmOrder .confirm-content .section-bar .btn {
  float: right;
}
.confirmOrder .confirm-content .section-bar .btn .btn-base {
  float: left;
  margin-left: 30px;
  width: 158px;
  height: 38px;
  border: 1px solid #b0b0b0;
  font-size: 14px;
  line-height: 38px;
  text-align: center;
}
.confirmOrder .confirm-content .section-bar .btn .btn-return {
  color: rgba(0, 0, 0, 0.27);
  border-color: rgba(0, 0, 0, 0.27);
  color: #757575;
}
.confirmOrder .confirm-content .section-bar .btn .btn-primary {
  background: #ff6700;
  border-color: #ff6700;
  color: #fff;
}
/* 结算导航CSS */

/* 主要内容容器CSS END */
</style>