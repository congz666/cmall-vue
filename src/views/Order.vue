<!--
 * @Descripttion: 我的订单页面组件
 * @Author: congz
 * @Date: 2020-07-03 18:01:05
 * @LastEditors: congz
 * @LastEditTime: 2020-08-19 10:55:03
--> 

<template>
  <div class="order" id="order" name="order">
    <div class="order-layout">
      <el-row :gutter="10">
        <div>
          <CenterMenu></CenterMenu>
        </div>
        <el-col :span="20">
          <div class="order-content">
            <div class="extra"></div>
            <!--我的订单头部-->
            <div class="order-title">
              <p>我的订单</p>
            </div>
            <div class="order-select">
              <router-link :to="{ path: '/order'}">
                <span :class="type==0?'select':'no-select'">全部有效订单</span>
              </router-link>
              <span class="cut">|</span>
              <router-link :to="{ path: '/order', query: {type:1} }">
                <span :class="type==1?'select':'no-select'">待支付</span>
              </router-link>
              <span class="cut">|</span>
              <router-link :to="{ path: '/order', query: {type:2} }">
                <span :class="type==2?'select':'no-select'">已支付</span>
              </router-link>
              <span class="cut">|</span>
              <span class="no-select">订单回收站</span>
              <div class="search">
                <el-input placeholder="输入商品名称、订单号" v-model="search">
                  <el-button slot="append" icon="el-icon-search" @click="searchClick"></el-button>
                </el-input>
              </div>
            </div>
            <div v-if="orders.length>0">
              <!--我的订单头部 end-->
              <!--订单列表-->
              <div class="order-list" v-for="(item,index) in orders" :key="index">
                <div class="order-list-head">
                  <div class="order-pay" v-if="item.type==1">等待付款</div>
                  <div class="order-pay" v-else>已付款</div>
                  <div class="order-info">
                    <div style="width:650px;">
                      <span class="info">{{item.created_at | dateFormat}}</span>
                      <span class="cut">|</span>
                      <span class="info">{{item.address_name}}</span>
                      <span class="cut">|</span>
                      <span class="info">订单号：{{item.order_num}}</span>
                      <span class="cut">|</span>
                      <span class="info">在线支付</span>
                    </div>
                    <span class="info" style="margin-left:30px">应付金额：</span>
                    <span class="money">{{item.discount_price*item.num}}</span>
                    <span class="info">元</span>
                  </div>
                </div>
                <div class="order-list-product">
                  <div class="pro-img">
                    <router-link
                      :to="{ path: '/goods/details', query: {productID:item.product_id} }"
                    >
                      <img :src="item.img_path" />
                    </router-link>
                  </div>
                  <div class="pro-info">
                    <p style="margin-bottom:7px">
                      <router-link
                        class="info-href"
                        :to="{ path: '/goods/details', query: {productID:item.product_id} }"
                      >{{item.name}}</router-link>
                    </p>
                    <span>{{item.discount_price}}</span>&nbsp;×
                    <span>{{item.num}}</span>
                  </div>
                  <div class="operate">
                    <div v-if="item.type==1">
                      <router-link :to="{ path: '/payment', query: {orderNum:item.order_num} }">
                        <el-button class="button-pay">立即付款</el-button>
                      </router-link>
                    </div>
                    <div>
                      <router-link
                        :to="{ path: '/order/details', query: {orderNum:item.order_num} }"
                      >
                        <el-button plain class="button-detail">订单详情</el-button>
                      </router-link>
                    </div>
                    <div v-if="item.type==2">
                      <el-button type="info" class="button-detail">删除订单</el-button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 分页 -->
              <div class="pagination">
                <el-pagination
                  background
                  @current-change="handleCurrentChange"
                  :page-size="pageSize"
                  layout="total, prev, pager, next, jumper"
                  :total="total"
                ></el-pagination>
              </div>
              <div class="extra"></div>
              <div class="extra"></div>
            </div>
            <!-- 分页END -->
            <!-- 订单为空的时候显示的内容 -->
            <div v-else class="empty">
              <p>你暂未购买任何商品</p>
              <p>快去购物吧！</p>
            </div>
            <!-- 订单为空的时候显示的内容END -->
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import CenterMenu from '../components/CenterMenu'
import * as ordersAPI from '@/api/orders'
export default {
  name: 'Order',
  data() {
    return {
      orders: [], // 订单列表
      pageSize: 5,
      total: 0,
      start: 0,
      limit: 5,
      type: ''
    }
  },
  activated() {
    if (this.$route.query.type != undefined) {
      this.type = this.$route.query.type
    } else {
      this.type = 0
    }
  },
  watch: {
    // 监听订单类型的变化，请求后端获取商品数据
    type: function() {
      this.getOrders()
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.start = this.limit * (val - 1) // val 页面
      this.getOrders()
    },
    getOrders() {
      // 获取订单数据
      ordersAPI
        .listOrders(
          this.$store.getters.getUser.id,
          this.type,
          this.start,
          this.limit
        )
        .then(res => {
          if (res.status === 200) {
            this.orders = res.data.items
            this.total = res.data.total
          } else if (res.status === 20001) {
            //token过期，需要重新登录
            this.loginExpired(res.msg)
          } else {
            this.notifyError('获取订单失败', res.msg)
          }
        })
        .catch(err => {
          this.notifyError('获取订单失败', err)
        })
    }
  },
  components: {
    CenterMenu
  }
}
</script>
<style scoped>
.order-layout {
  max-width: 1225px;
  margin: 0 auto;
}
.order-content {
  background-color: #ffffff;
  margin-bottom: 30px;
}
.order-title {
  height: 100px;
  display: flex;
  align-items: center;
}
.order-title p {
  font-size: 30px;
  color: #757575;
  margin-left: 50px;
}
.extra {
  height: 10px;
}
.order-select {
  width: 920px;
  margin: 0 auto;
  display: flex;
  align-items: center;
}
.order-select .no-select {
  font-size: 17px;
  color: #757575;
  margin-right: 10px;
}
.order-select .select {
  font-size: 17px;
  color: #ff6700;
  margin-right: 10px;
}
.order-select .cut {
  font-size: 22px;
  color: #c9c7c7;
  margin-right: 15px;
  font-weight: 300;
}
.order-select .search {
  width: 300px;
  margin-left: 225px;
}
/*订单头部*/
.order-list-head {
  height: 100px;
  background-color: #fffaf7;
  width: 920px;
  margin: 0 auto;
  margin-top: 20px;
  border-left: 1px solid #ff6700;
  border-right: 1px solid #ff6700;
  border-top: 1px solid #ff6700;
  border-bottom: 1px solid #feccac;
}
.order-list-head .order-pay {
  font-size: 19px;
  color: #ff6700;
  margin-left: 30px;
  margin-top: 20px;
  margin-bottom: 10px;
}
.order-list-head .order-success-pay {
  font-size: 19px;
  color: #00a724;
  margin-left: 30px;
  margin-top: 20px;
  margin-bottom: 10px;
}
.order-list-head .order-info {
  width: 860px;
  margin: 0 auto;
  margin-top: 5px;
  display: flex;
  align-items: center;
}
.order-list-head .order-info .info {
  font-size: 15px;
  color: #757575;
}
.order-list-head .order-info .cut {
  font-size: 17px;
  color: #c9c7c7;
  margin-left: 10px;
  margin-right: 10px;
  font-weight: 300;
}
.order-list-head .order-info .money {
  font-size: 25px;
  color: #000000;
  margin-right: 5px;
  margin-left: 10px;
}
/*订单头部END*/
/*订单商品*/
.order-list-product {
  height: 130px;
  background-color: #ffffff;
  width: 920px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  border-left: 1px solid #ff6700;
  border-right: 1px solid #ff6700;
  border-bottom: 1px solid #ff6700;
}
.order-list-product .pro-img {
  margin-left: 30px;
  margin-right: 20px;
}
.order-list-product .pro-img img {
  height: 80px;
  width: 80px;
}
.order-list-product .pro-info {
  width: 500px;
  font-size: 15px;
  color: #333333;
}
.order-list-product .pro-info .info-href {
  font-size: 15px;
  color: #333333;
}
.order-list-product .pro-info .info-href:hover {
  color: #ff6700;
}
.order-list-product .operate {
  line-height: 50px;
  margin-left: 150px;
}
.order-list-product .operate .button-pay {
  width: 100px;
  color: #ffffff;
  background-color: #ff6700;
}

.order-list-product .operate .button-detail {
  width: 100px;
}
/*订单商品END*/
.order-content .pagination {
  width: 300px;
  margin: 0 auto;
  margin-top: 20px;
}
.empty {
  width: 200px;
  margin: 0 auto;
  padding-top: 50px;
  padding-bottom: 60px;
  color: #bdbaba;
  font-size: 18px;
}
</style>