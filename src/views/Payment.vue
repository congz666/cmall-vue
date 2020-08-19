<!--
 * @Descripttion: 登录页面组件
 * @Author: congz
 * @Date: 2020-06-11 11:08:34
 * @LastEditors: congz
 * @LastEditTime: 2020-08-18 23:15:35
--> 

<template>
  <div class="payment">
    <div class="payment-content" v-if="order">
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="payment-clearfix">
          <span>支付订单</span>
        </div>
        <div class="payment-item">
          <div class="payment-tips">
            <span>温馨提示:您的支付会用作捐赠，不会发货，如需购买商品，请移至小米商城官网</span>
            <p>注意：微信支付功能还未完善，请尽量使用支付宝支付</p>
          </div>
          <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="payment-form">
            <el-form-item label="捐赠金额" prop="amount">
              <el-select v-model="form.amount" placeholder="请选择捐赠金额">
                <el-option label="￥1 谢谢老板" value="1"></el-option>
                <el-option label="￥10 感谢您的捐赠" value="10"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="payment-paytype-header">
            <span>支付方式</span>
          </div>
          <div class="payment-paytype">
            <div :class="form.pay_type=='alipay'? 'select':'no-select'" @click="selectAlipay">
              <a href="javascript:;">
                <img src="http://xmall.exrick.cn/static/images/alipay@2x.png" />
              </a>
            </div>

            <div :class="form.pay_type=='wechat'? 'select':'no-select'" @click="selectWechat">
              <a href="javascript:;">
                <img src="http://xmall.exrick.cn/static/images/weixinpay@2x.png" />
              </a>
            </div>
          </div>
          <div class="pay-operate">
            <div class="pay-price">
              <span>订单金额:</span>
            </div>
            <div class="pay-price-num">
              <span>{{order.discount_price*order.num}}元</span>
            </div>
            <div class="should-pay">
              <span>实际应付金额:</span>
            </div>
            <div class="pay-price-num">
              <span>{{form.amount}}元</span>
            </div>
            <div class="pay-btn">
              <el-button type="primary" @click="pay('form')">立即支付</el-button>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <div class="not-found" v-else>查询不到该订单</div>
  </div>
</template>
<script>
import * as ordersAPI from '@/api/orders'
import * as paymentAPI from '@/api/payment'
export default {
  name: 'Payment',
  data() {
    return {
      orderNum: '',
      order: '',
      form: {
        order_num: '',
        amount: '',
        pay_type: 'alipay'
      },
      rules: {
        amount: [
          { required: true, message: '请选择捐赠金额', trigger: 'change' }
        ]
      }
    }
  },
  activated() {
    if (this.$route.query.orderNum != undefined) {
      this.orderNum = this.$route.query.orderNum
    }
  },
  watch: {
    // 监听商品id的变化，请求后端获取商品数据
    orderNum: function() {
      this.load()
    }
  },
  methods: {
    load() {
      ordersAPI
        .showOrder(this.orderNum)
        .then(res => {
          if (res.status === 200) {
            this.order = res.data
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
    },
    selectWechat() {
      this.form.pay_type = 'wechat'
    },
    selectAlipay() {
      this.form.pay_type = 'alipay'
    },
    pay(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return
        }
        this.form.order_num = String(this.orderNum)
        paymentAPI
          .initPayment(this.form)
          .then(res => {
            if (res.status === 200) {
              window.location.href = res.data.payUrl
            } else if (res.status === 20001) {
              //token过期，需要重新登录
              this.loginExpired(res.msg)
            } else {
              this.notifyError('获取收款码失败', res.msg)
            }
          })
          .catch(err => {
            this.notifyError('获取收款码失败', err)
          })
      })
    }
  },
  created() {},
  components: {}
}
</script>

<style scoped>
.payment .payment-content {
  width: 800px;
  margin: 0 auto;
  margin-bottom: 50px;
}

.payment .payment-content .payment-item .payment-tips {
  width: 600px;
  margin: 0 auto;
  text-align: center;
  color: #757575;
}
.payment .payment-content .payment-item .payment-form {
  width: 550px;
  margin: 0 auto;
  margin-top: 50px;
}
.payment .payment-content .payment-item .payment-paytype-header {
  width: 700px;
  margin: 0 auto;
  margin-top: 30px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
}
.payment .payment-content .payment-item .payment-paytype {
  display: flex;
  align-items: center;
  height: 130px;
  width: 700px;
  margin: 0 auto;
  border-bottom: 1px solid #e0e0e0;
}
.payment .payment-content .payment-item .payment-paytype img {
  height: 60px;
  width: 240px;
}
.payment .payment-content .payment-item .payment-paytype .no-select {
  border-radius: 10px;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  margin-right: 50px;
}
.payment .payment-content .payment-item .payment-paytype .select {
  margin-right: 50px;
  border-radius: 10px;
  background-color: #ffffff;
  border: 1px solid #0400ff;
}
.payment .payment-content .pay-operate {
  width: 700px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: 60px;
}
.payment .payment-content .pay-operate .pay-price {
  margin-left: 170px;
  height: 20px;
}
.payment .payment-content .pay-operate .pay-price-num {
  font-size: 30px;
  color: #ff6700;
  width: 110px;
  margin-left: 10px;
}
.payment .payment-content .pay-operate .should-pay {
  margin-left: 20px;
  height: 20px;
}
.payment .payment-content .pay-operate .pay-btn {
  height: 30px;
}

/*v-else*/
.payment .not-found {
  height: 500px;
  text-align: center;
}
/*v-else END*/
</style>
