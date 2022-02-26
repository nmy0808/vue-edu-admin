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
          >创建拼团</el-button>
        </div>
      </template>
      <template #col_content="{ row }">
        <div class="d-flex">
          <img :src="row.value.cover" alt="" width="100px">
          <div class="ms-2 d-flex flex-column font-size-12">
            <p class="p-0 m-0 fw-bold">
              {{ row.value.title }}
            </p>
            <div>
              <p class="p-0 m-0 fs-7 text-decoration-line-through text-secondary opacity-50">原始价格: ¥{{ row.value.price }}</p>
              <p class="p-0 m-0 fs-7 text-red">拼团价格: ¥{{ row.price }}</p>
            </div>
          </div>
        </div>
      </template>
      <template #col_status="{ row }">
        <el-tag :type="row.status === 1 ? 'danger' : 'info'">
          {{ row.status === 1 ? '拼团中' : statusMap[row.status] }}
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
    <GroupDialog ref="groupDiaCom" />
  </div>
</template>
<script>
import BaseTable from '@/components/BaseTable'
import GroupDialog from './components/GroupDialog.vue'
import { clone, merge } from 'xe-utils'
import { getGroupListApi, setGroupStatusApi } from '@/api/marketing'
export default {
  name: '',
  components: { BaseTable, GroupDialog },
  provide() {
    return {
      getList: this.getList
    }
  },
  data() {
    return {
      statusMap: {
        0: '未开始',
        1: '拼团中',
        2: '已结束',
        3: '已下架'
      },
      columns: [
        {
          title: '拼团内容',
          slots: { default: 'col_content' }
        },
        {
          field: 'p_num',
          title: '成团人数',
          width: 120, align: 'center'
        },
        {
          field: 'expire',
          title: '拼团时限(小时)',
          width: 180, align: 'center'
        },
        {
          field: 'status',
          title: '拼团状态',
          width: 80,
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
      const response = await getGroupListApi(this.listQuery.page)
      this.list = response.data.items
      this.total = response.data.total
      this.listLoading = false
    },
    handleAdd() {
      this.$refs.groupDiaCom.show()
    },
    handleUpdate(row) {
      this.$refs.groupDiaCom.show(row)
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
      await setGroupStatusApi(params)
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
