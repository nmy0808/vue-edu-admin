<template>
  <div class="media-page app-container">
    <base-table
      :columns="columns"
      :list="list"
      :pagination="getList"
      :total.sync="total"
      :page.sync="listQuery.page"
      :size.sync="listQuery.size"
      :loading="listLoading"
    >
      <vxe-column field="id" title="123" />
      <template #form>
        <div class="d-flex pb-3">
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="handleAdd"
          >创建优惠券</el-button>
        </div>
      </template>
      <template #col_content="{ row }">
        {{ row.value.title }}
      </template>
      <template #col_date_range="{ row }">
        <div>起始: {{ row.start_time }}</div>
        <div>结束: {{ row.end_time }}</div>
      </template>
      <template #col_status="{ row }">
        <el-tag :type="row.status === 1 ? 'danger' : 'info'">
          {{ row.status === 1 ? '领取中' : statusMap[row.status] }}
        </el-tag>
      </template>
      <template #col_actions="{ row }">
        <el-button type="primary" size="mini" @click="handleUpdate(row)">
          编辑
        </el-button>
        <el-button
          size="mini"
          :type="row.status===3 ? 'success' : 'info'"
          @click="handleModifyStatus(row, row.status)"
        >
          {{ row.status===3 ? '上架' : '下架' }}
        </el-button>
      </template>
    </base-table>
    <CouponDialog ref="couponDialogCom" />
  </div>
</template>
<script>
import BaseTable from '@/components/BaseTable'
import CouponDialog from './components/CouponDialog.vue'
import { clone, merge } from 'xe-utils'
import { getCouponListApi, setCouponStatusApi } from '@/api/marketing'
export default {
  name: '',
  components: { BaseTable, CouponDialog },
  provide() {
    return {
      getList: this.getList
    }
  },
  data() {
    return {
      statusMap: {
        0: '未开始',
        1: '领取中',
        2: '已结束',
        3: '已下架'
      },
      columns: [
        {
          field: 'id',
          title: '优惠券ID',
          width: 220,
          align: 'center'
        },
        {
          field: 'price',
          title: '面值',
          width: 120,
          align: 'center'
        },
        {
          title: '适用课程',
          align: 'center',
          slots: { default: 'col_content' }
        },
        {
          title: '使用期限',
          width: 260,
          align: 'center',
          slots: { default: 'col_date_range' }
        },
        {
          field: 'c_num',
          title: '发行量',
          width: 120,
          align: 'center'
        },
        {
          field: 'received_num',
          title: '已领取',
          width: 120,
          align: 'center'
        },
        {
          field: 'used_num',
          title: '已使用',
          width: 120,
          align: 'center'
        },
        {
          title: '状态',
          width: 120,
          align: 'center',
          slots: { default: 'col_status' }
        },
        {
          title: '操作',
          width: 210,
          align: 'center',
          slots: { default: 'col_actions' }
        }],
      total: 10,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10
      },
      list: []
    }
  },
  computed: {
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      const response = await getCouponListApi(this.listQuery.page)
      this.list = response.data.items
      this.total = response.data.total
      this.listLoading = false
    },
    handleAdd() {
      this.$refs.couponDialogCom.show()
    },
    handleUpdate(row) {
      this.$refs.couponDialogCom.show(row)
    },
    // 上下架
    async handleModifyStatus(row, status) {
      const params = {}
      params.id = row.id
      if (status === 3) {
        params.status = 1
      } else {
        params.status = 3
      }
      await setCouponStatusApi(params)
      const targetRow = this.list.find(it => it.id === row.id) || {}
      targetRow.status = params.status
      const message = params.status === 1 ? '已上架' : '已下架'
      const type = params.status === 1 ? 'success' : 'info'
      this.$message({
        message,
        type
      })
    }
  }
}
</script>
