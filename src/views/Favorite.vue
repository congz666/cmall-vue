<!--
 * @Descripttion: 我的收藏页面组件
 * @Author: congz
 * @Date: 2020-07-03 22:55:29
 * @LastEditors: congz
 * @LastEditTime: 2020-08-05 15:41:53
--> 

<template>
  <div class="favorite" id="favorite" name="favorite">
    <div class="favorite-layout">
      <el-row :gutter="10">
        <div>
          <CenterMenu></CenterMenu>
        </div>
        <el-col :span="20">
          <div class="favorite-content">
            <div class="extra"></div>
            <div class="favorite-title">
              <p>我的收藏</p>
            </div>
            <div v-if="collectList.length>0">
              <div class="goods-list">
                <MyList :list="collectList" :isDelete="true"></MyList>
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
              <!-- 分页END -->
            </div>
            <!-- 订单为空的时候显示的内容 -->
            <div v-else class="empty">
              <p>你暂未收藏任何商品</p>
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
import * as favoriteAPI from '@/api/favorites'
export default {
  name: 'Favorite',
  data() {
    return {
      collectList: [],
      pageSize: 12,
      total: 0,
      start: 0,
      limit: 12
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.start = this.limit * (val - 1) // val 页面
      this.getFavorites()
    },
    getFavorites() {
      // 获取收藏数据
      favoriteAPI
        .showFavorites(this.$store.getters.getUser.id, this.start, this.limit)
        .then(res => {
          if (res.status === 200) {
            this.collectList = res.data.items
            this.total = res.data.total
          } else if (res.status === 20001) {
            //token过期，需要重新登录
            this.loginExpired(res.msg)
          } else {
            this.notifyError('获取收藏夹失败', res.msg)
          }
        })
        .catch(err => {
          this.notifyError('获取收藏夹失败', err)
        })
    }
  },
  activated() {
    this.getFavorites()
  },
  components: {
    CenterMenu
  }
}
</script>
<style scoped>
.favorite-layout {
  max-width: 1225px;
  margin: 0 auto;
}
.favorite-content {
  background-color: #ffffff;
  margin-bottom: 30px;
}
.favorite-title {
  height: 100px;
  display: flex;
  align-items: center;
}
.favorite-title p {
  font-size: 30px;
  color: #757575;
  margin-left: 50px;
}
.extra {
  height: 10px;
}
.goods-list {
  overflow: hidden;
}
.favorite-content .pagination {
  width: 300px;
  margin: 0 auto;
  margin-top: 20px;
}
.empty {
  width: 200px;
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 70px;
  color: #bdbaba;
  font-size: 18px;
}
</style>