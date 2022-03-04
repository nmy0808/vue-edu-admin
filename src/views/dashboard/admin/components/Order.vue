<template>
  <div>
    <el-card shadow="never" :body-style="{ padding: '0' }">
      <div slot="header">
        <span>最新订单</span>
      </div>
      <el-table
        v-loading="listLoading"
        :data="list"
        :border="false"
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column label="商品名称" min-width="150px">
          <template slot-scope="{row}">
            <p v-for="(item,index) in row.goods" :key="index" class="m-0 p-0">{{ item.title }}</p>
          </template>
        </el-table-column>
        <el-table-column label="订单类型" width="100" align="center">
          <template slot-scope="{row}">
            <div style="height: 60px; line-height: 60px;">
              {{ row.type | typeFilter }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="订单状态" width="100" align="center">
          <template slot-scope="{row}">
            <el-tag :type="row.status == 'success' ? 'success' : 'danger'">
              {{ row.status | statusFilter }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="180" align="left">
          <template slot-scope="{row}">
            <p>{{ conversionTimeFormat(row.created_time) }}</p>
          </template>
        </el-table-column>

      </el-table>
    </el-card>
  </div>
</template>
<script>
import {
  parseTime
} from '@/utils'
const statusOptions = {
  pendding: '待支付',
  success: '成功',
  fail: '失败',
  closed: '取消'
}
const typeOptions = {
  group: '拼团',
  default: '普通'
}
import {
  getOrderListApi
} from '@/api/order'
import { toDateString } from 'xe-utils'
export default {
  filters: {
    statusFilter(val) {
      return statusOptions[val]
    },
    typeFilter(val) {
      return typeOptions[val]
    }
  },
  data() {
    return {
      listLoading: false,
      list: []
    }
  },
  created() {
    this.listLoading = true
    getOrderListApi({
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
