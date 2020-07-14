<template>
  <div class="address" id="address" name="address">
    <div class="address-layout">
      <el-row :gutter="10">
        <div>
          <CenterMenu></CenterMenu>
        </div>
        <el-col :span="20">
          <div class="address-content">
            <div class="extra"></div>
            <div class="address-title">
              <p>收货地址</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import CenterMenu from '../components/CenterMenu'
export default {
  name: 'Details',
  data() {
    return {}
  },
  components: {
    CenterMenu
  }
}
</script>
<style scoped>
.address-layout {
  max-width: 1225px;
  margin: 0 auto;
}
.address-content {
  background-color: #ffffff;
}
.address-title {
  height: 100px;
  display: flex;
  align-items: center;
}
.address-title p {
  font-size: 30px;
  color: #757575;
  margin-left: 50px;
}
.extra {
  height: 10px;
}
</style>