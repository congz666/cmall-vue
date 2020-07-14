<template>
  <div class="details" id="details" name="details">
    <div class="details-layout">
      <el-row :gutter="10">
        <div>
          <CenterMenu></CenterMenu>
        </div>
        <el-col :span="20">
          <div class="details-content">
            <div class="extra"></div>
            <div class="details-title">
              <p>个人信息</p>
            </div>
            <div class="details-form">
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="头像:">
                  <el-upload
                    class="avatar-uploader"
                    action
                    label="描述"
                    ref="upload"
                    :before-upload="fnBeforeUpload"
                    :http-request="fnUploadRequest"
                    :show-file-list="false"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    <div class="el-upload__tip" slot="tip">只能上传png/jpg文件，且不超过2M</div>
                  </el-upload>
                </el-form-item>
                <el-form-item label="昵称:   ">
                  <el-input v-model="form.nickname"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" style="margin-bottom:83px" @click="save">保存</el-button>
                  <el-button>取消</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import CenterMenu from '../components/CenterMenu'
import { mapActions } from 'vuex'
import * as uplpadAPI from '@/api/upload/'
import * as userAPI from '@/api/users/'
export default {
  name: 'Details',
  data() {
    return {
      form: {
        nickname: '',
        avatar: ''
      },
      imageUrl: ''
    }
  },
  methods: {
    ...mapActions(['setUser']),
    fnBeforeUpload(file) {
      const isPNG = file.type === 'image/png' || file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isPNG) {
        this.$message.error('上传头像图片只能是 PNG/JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isPNG && isLt2M
    },
    fnUploadRequest(option) {
      uplpadAPI
        .UploadAvatar(option.file.name)
        .then(res => {
          const oReq = new XMLHttpRequest()
          oReq.open('PUT', res.data.put, true)
          oReq.send(option.file)
          oReq.onload = () => {
            this.imageUrl = res.data.get
            this.form.avatar = res.data.key
          }
        })
        .catch(error => {
          this.$notify.error({
            title: '网路错误，或者服务器宕机',
            message: error
          })
        })
    },
    save() {
      userAPI
        .updateUser(this.form)
        .then(res => {
          if (res.status > 0) {
            this.$notify.error({
              title: '修改失败',
              message: res.msg
            })
          } else {
            // 登录信息存到本地
            let user = JSON.stringify(res.data)
            localStorage.setItem('user', user)
            // 登录信息存到vuex
            this.setUser(res.data)
            this.$notify({
              title: '修改成功',
              type: 'success'
            })
            this.$router.go(0)
          }
        })
        .catch(error => {
          this.$notify.error({
            title: '修改失败惹',
            message: error
          })
        })
    }
  },
  beforeMount() {
    this.form.nickname = this.$store.getters.getUser.nickname
    this.imageUrl = this.$store.getters.getUser.avatar
  },
  components: {
    CenterMenu
  }
}
</script>
<style >
.details-layout {
  max-width: 1225px;
  margin: 0 auto;
}
.details-content {
  background-color: #ffffff;
}
.details-title {
  height: 100px;
  display: flex;
  align-items: center;
}
.details-title p {
  font-size: 30px;
  color: #757575;
  margin-left: 50px;
}
.details-form {
  width: 500px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 100%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #ff6700;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  max-width: 178px;
  max-height: 178px;
  border-radius: 100%;
  display: block;
}
.extra {
  height: 10px;
}
</style>