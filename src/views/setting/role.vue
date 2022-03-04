<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      border
      :data="list"
      style="width: 100%"
    >
      <el-table-column
        prop="role_id"
        label="角色key"
      />
      <el-table-column
        prop="name"
        label="角色名称"
      />
      <el-table-column
        prop="desc"
        label="角色描述"
      />
      <el-table-column
        label="操作"
      >
        <template slot-scope="{row}">
          <el-button
            type="primary"
            @click="handleCheckPermissions(row)"
          >查看权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
    <role-dialog ref="roleDialogCom" />
  </div>

</template>
<script>
import Pagination from '@/components/Pagination'

import { getRoleListApi } from '@/api/role'
import RoleDialog from './components/RoleDialog.vue'

export default {
  components: { Pagination, RoleDialog },
  data() {
    return {
      list: [],
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10
      },
      total: 0
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
      const response = await getRoleListApi(this.listQuery.page)
      this.list = response.data.items
      this.total = response.data.total
      this.listLoading = false
    },
    // 查看权限
    handleCheckPermissions(row) {
      this.$refs.roleDialogCom.open(row.id)
    }
  }
}
</script>
<style scoped lang="scss">

</style>
