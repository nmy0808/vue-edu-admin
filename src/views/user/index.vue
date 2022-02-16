<template>
  <div class="user-page app-container">
    <base-table
      ref="baseTableCom"
      class="mt-0 border--none"
      :columns="columns"
      :list="list"
      :pagination="getList"
      :total.sync="total"
      :page.sync="listQuery.page"
      :size.sync="listQuery.size"
      :loading="listLoading"
    >
      <template #col_user="{ row }">
        <div class="d-flex align-items-center">
          <el-avatar circle :size="medium" :src="row.user.avatar" />
          <div class="ms-2">
            {{ row.user.username }}
          </div>
        </div>
      </template>
      <template #col_total_consume="{ row }">
        ¥ {{ row.total_consume }}
      </template>
      <template #col_actions="{ row }">
        <el-button type="primary" size="mini">详情</el-button>
        <el-dropdown class="ms-2">
          <el-button type="danger" size="mini">
            黑名单设置<i class="el-icon-arrow-down el-icon--right" />
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>禁止评论</el-dropdown-item>
            <el-dropdown-item>禁止访问</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </base-table>
  </div>
</template>
<script>
import BaseTable from '@/components/BaseTable'
import { getSchoolUserListApi } from '@/api/school_user'
export default {
  name: '',
  components: { BaseTable },
  data() {
    return {
      listLoading: false,
      list: [],
      listQuery: {
        page: 1,
        limit: 10,
        keyword: '' // 搜索用户名关键字
      },
      total: 0,
      columns: [
        { title: '用户 ', slots: { default: 'col_user' }},
        { title: '消费总额 ', width: 120, align: 'center', slots: { default: 'col_total_consume' }},
        { title: '创建时间 ', field: 'created_time', align: 'center', width: 190 },
        { title: '操作 ', width: 210, align: 'center', slots: { default: 'col_actions' }}
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      this.list = []
      const params = {}
      params.page = this.listQuery.page
      params.keyword = this.listQuery.keyword
      const { data } = await getSchoolUserListApi(params)
      this.list = data.items
      this.total = data.total
      this.listLoading = false
    }
  }
}
</script>
<style scoped lang="scss">
.user-page {
}
</style>
