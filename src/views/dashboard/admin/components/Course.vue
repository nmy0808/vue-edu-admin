<template>
  <div>
    <el-card shadow="never" :body-style="{ padding: '0' }">
      <div slot="header">
        <span>最新课程</span>
      </div>
      <el-table
        v-loading="listLoading"
        :data="list"
        :border="false"
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column label="内容" min-width="180px">
          <template slot-scope="{ row }">
            <div style="display: flex">
              <img
                :src="row.cover"
                style="width: 100px; height: 60px; margin-right: 10px"
              >
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                "
              >
                <span>{{ row.title }}</span>
                <span style="color: red">￥{{ row.price }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="250px" align="center">
          <template slot-scope="{ row }">
            <span>{{ conversionTimeFormat(row.created_time) }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import {
  getCourseListApi
} from '@/api/course'
import { toDateString } from 'xe-utils'
export default {
  data() {
    return {
      listLoading: false,
      list: []
    }
  },
  created() {
    this.listLoading = true
    getCourseListApi({
      page: 1
    }).then(res => {
      this.list = res.data.items
    }).finally(() => {
      this.listLoading = false
    })
  },
  methods: {
    // 转换时间格式
    conversionTimeFormat(data) {
      return toDateString(data)
    }
  }
}
</script>
