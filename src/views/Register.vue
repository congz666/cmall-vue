<template>
	<div class="register">
		<div class="main-contianer">
      <el-card class="box-card">
			<div class="mycard">
				<div class="title">注册：</div>
				<el-form ref="form" :model="form" label-width="80px">
					<el-form-item label="用户昵称" :rules="[{ required: true, message: '账号不能为空'},]">
						<el-input v-model="form.nickname"></el-input>
					</el-form-item>
					<el-form-item label="账号" :rules="[{ required: true, message: '账号不能为空'},]">
						<el-input v-model="form.user_name"></el-input>
					</el-form-item>

					<el-form-item label="密码" :rules="[{ required: true, message: '密码不能为空'},]">
						<el-input type="password" v-model="form.password"></el-input>
					</el-form-item>
					<el-form-item label="确认密码" :rules="[{ required: true, message: '密码不能为空'},]">
						<el-input type="password" v-model="form.password_confirm"></el-input>
					</el-form-item>
          <el-form-item>
						<GtPage @ok="ok"></GtPage>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmit">注册</el-button>
					</el-form-item>
				</el-form>
			</div>
      </el-card>
		</div>
	</div>
</template>
<script>
  import * as userAPI from '@/api/users';
  import GtPage from '../components/GtPage.vue';
	export default {
		name: 'Register',
		data() {
			return {
				okk: 0,
				imageUrl: '',
				form: {
					nickname: '',
					user_name: '',
					password: '',
					password_confirm: '',
				},
			};
		},
		methods: {
			ok(val) {
				this.okk = val;
			},
			onSubmit() {
				if (this.okk == 1) {
					userAPI.postUser(this.form).then((res) => {
						if (res.status > 0) {
							this.$notify.error({
								title: '注册失败',
								message: res.msg,
							});
						} else {
							this.$notify({
								title: '注册成功',
								message: 'success',
								type: 'success',
							});
							this.$router.push({
								name: 'Login'
							});
						}

					}).catch((error) => {
						this.$notify.error({
							title: '注册失败惹',
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
