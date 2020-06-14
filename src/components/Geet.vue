<template>
  <div>
    <i ref="btn"></i>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  //   接受父组件传递的值，用来控制图形验证的加载
  props: ["isGeet"],
  methods: {
    GtCaptcha() {
      let _this = this;
      //   此url是极验官网的测试请求地址，加随机数防止缓存
      _this.axios
        .get(
          "http://www.geetest.com/demo/gt/register-slide?t=" +
            new Date().getTime()
        )
        .then(res => {
          console.log("1,页面初始化，调用极验接口1，进行图形验证码的加载");
          // 极验第一次，请求回来的参数
          console.log(res);
          let data = res.data;
          var handlerEmbed = function(captchaObj) {
            //   图形验证成功
            captchaObj
              .onSuccess(function() {
                var result = captchaObj.getValidate();
                let param = {
                  geetest_challenge: result.geetest_challenge,
                  geetest_validate: result.geetest_validate,
                  geetest_seccode: result.geetest_seccode,
                  status: data.success
                };
                // 极验校验的参数，将其传给服务端，进行校验。
                console.log(
                  "3，图形验证通过，将数据传递给父组件，进行服务端验证"
                );
                _this.$emit("geetPath", param);
              })
              .onError(function() {
                //   图形验证失败
              });
            //   为此页面的虚拟按钮添加点击事件
            _this.$refs.btn.addEventListener("click", function demo() {
              // 极验图片触发之后，修改控制变量额布尔值，实现再次触发
              _this.$emit("clickChange", false);
              if (_this.isGeet) {
                captchaObj.verify();
              }
            });
          };
          //   初始化极验
          _this.$initGeet(
            {
              gt: data.gt,
              challenge: data.challenge,
              product: "bind",
              offline: !data.success,
              https: true
            },
            handlerEmbed
          );
        });
    }
  },

  computed: {},

  created() {
    // 页面创建，调用函数
    this.GtCaptcha();
  },

  mounted() {},
  watch: {
    // 监听参数的变化，调用极验
    isGeet: function() {
      //   这里通过按钮事件调用极验
      this.$refs.btn.click();
    }
  }
};
</script>
<style scoped></style>
