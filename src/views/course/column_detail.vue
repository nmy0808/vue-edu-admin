<template>
  <div class="app-container">
    <!-- 专栏详情 -->
    <el-card shadow="always">
      <div class="d-flex justify-content-between">
        <!-- left -->
        <div style="width:200px;">
          <img
            class="shadow-sm"
            style="width:200px; display:inline-block;"
            :src="detailData.cover"
            alt=""
          >
        </div>
        <!-- center -->
        <div class="flex-fill px-4">
          <p class="h6 pt-1">{{ detailData.title }}</p>
          <p
            class="text-secondary font-size-12 m-0 p-0"
            style="height: 52px;"
          >{{ detailData.try }}</p>
          <p class="text-danger font-size-14 text-weight-bold">¥ {{ detailData.price }}</p>
          <div>
            <el-button
              class="font-size-12"
              :type="detailData.status === 0 ? 'success':'warning'"
              size="medium"
              @click="updateColumnStatus"
            >
              {{ detailData.status?'下架':'上架' }}</el-button>
            <el-button
              class="font-size-12"
              style="width: 100px;"
              :type="!detailData.isend?'primary':'default'"
              size="medium"
              @click="updateColumnISendStatus"
            >
              {{ !detailData.isend?'设为完结':'设为连载中' }}</el-button>
          </div>
        </div>
        <!-- right -->
        <div>
          <el-tag v-if="!detailData.isend" type="primary" class="font-size-14">连载中</el-tag>
          <el-tag v-else type="success" class="font-size-14">已完结</el-tag>
        </div>
      </div>
    </el-card>
    <!-- 专栏目录 -->
  </div>
</template>
<script>
import { getColumnDetailApi, updateColumnISendStatusApi, updateColumnStatusApi } from '@/api/column'
export default {
  name: '',
  components: {},
  data() {
    return {
      detailData: {
        'id': null,
        'title': '',
        'cover': '',
        'try': '',
        'content': '',
        'price': '',
        't_price': '',
        'school_id': null,
        'status': null,
        'isend': null,
        'sub_count': 0,
        'created_time': '',
        'updated_time': ''
      }
    }
  },
  computed: {
    column_id() {
      return this.$route.query.column_id
    }
  },
  created() {
    if (!this.column_id) {
      this.$message({
        message: '请先选择对应专栏目录, 在进入该目录详情页面',
        type: 'info',
        duration: 2000
      })
      this.$router.push({ name: 'Column' })
    }
    this.getColumnDetail()
  },
  methods: {
    async getColumnDetail() {
      this.detailData = (await getColumnDetailApi(this.column_id)).data
      console.log(this.detailData)
    },
    // 修改专栏更新状态
    async updateColumnISendStatus() {
      const params = {}
      if (this.detailData.isend === 1) {
        params.isend = 0
      } else {
        params.isend = 1
      }
      params.id = this.column_id
      await updateColumnISendStatusApi(params)
      this.detailData.isend = params.isend
      this.$message({
        message: params.isend ? '设置为已完结' : '设置为连载中',
        type: params.isend ? 'success' : 'primary',
        duration: 500
      })
    },
    // 上架/下架专栏
    async updateColumnStatus() {
      const params = {}
      params.id = this.column_id
      if (this.detailData.status === 1) {
        params.status = 0
      } else {
        params.status = 1
      }
      await updateColumnStatusApi(params)
      this.detailData.status = params.status
      const flag = params.status === 1
      this.$message({
        message: flag ? '已上架' : '已下架',
        type: flag ? 'success' : 'info'
      })
    }
  }
}
</script>
