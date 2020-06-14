<template>
	<div class="register">
		<div class="main-contianer">
      <el-card class="box-card">
			<div class="mycard">
				<div class="title">登录：</div>
				<el-form ref="form" :model="form" label-width="80px">
					<el-form-item label="账号" :rules="[{ required: true, message: '账号不能为空'},]">
						<el-input v-model="form.user_name"></el-input>
					</el-form-item>

					<el-form-item label="密码" :rules="[{ required: true, message: '密码不能为空'},]">
						<el-input type="password" v-model="form.password"></el-input>
					</el-form-item>
          <el-form-item>
						<GtPage @ok="ok"></GtPage>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmit">登录</el-button>
					</el-form-item>
				</el-form>
			</div>
      </el-card>
		</div>
	</div>
</template>
<script>
  import { mapActions } from "vuex";
  import * as userAPI from '@/api/users';
  import GtPage from '../components/GtPage.vue';
	export default {
		name: 'Login',
		data() {
			return {
				okk: 0,
				form: {
					user_name: '',
					password: '',
				},
			};
		},
		methods: {
			ok(val) {
				this.okk = val;
      },
      ...mapActions(["setUser", "setShowLogin"]),
			onSubmit() {
				if (this.okk == 1) {
					userAPI.postLogin(this.form).then((res) => {
						if (res.status > 0) {
							this.$notify.error({
								title: '登录失败',
								message: res.msg,
							});
						} else {
              // 登录信息存到本地
              let user = JSON.stringify(res.data);
              localStorage.setItem("user", user);
              // 登录信息存到vuex
              this.setUser(res.data);
              // 弹出通知框提示登录成功信息
              this.notifySucceed(res.msg);
							this.$router.push({
								name: 'Home'
							});
						}

					}).catch((error) => {
						this.$notify.error({
							title: '登录失败',
							message: error,
						});
					});
				} else {
					this.$notify.error({
						title: '请验证',
						message: '',
					});
				}

			},
		},
		comments: {},
		components: {
      GtPage,
		},
	};
</script>

<style>
	.title {
		font-family: Microsoft Yahei;
		font-weight: 500;
		font-size: 30px;
		padding: 20px;
	}

  .box-card {
    width: 400px;
    margin:0 auto;
    margin-top: 40px;
    border-radius: 10px;
    margin-bottom: 251px;
  }
</style>
