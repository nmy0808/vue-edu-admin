<template>
  <div class="app-container">
    <el-button
      class="mb-3"
      type="success"
      icon="el-icon-plus"
      @click="$refs.roleAddDialogCom.open()"
    >添加角色</el-button>
    <el-table
      v-loading="listLoading"
      border
      :header-cell-style="{background:'#f4f6f9'}"
      :data="list"
      style="width: 100%"
    >
      <el-table-column
        prop="name"
        label="角色名称"
        width="240"
      />
      <el-table-column
        prop="role_id"
        label="角色key"
        width="240"
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
            style="width:80px;"
            type="primary"
            plain
            size="mini"
            @click="$refs.roleAddDialogCom.open(row)"
          >修改角色</el-button>
          <el-button
            style="width:80px;"
            class="me-2"
            type="primary"
            size="mini"
            @click="$refs.roleDialogCom.open(row.id)"
          >权限管理</el-button>

          <el-popconfirm
            v-if="isplatform"
            title="确定删除吗？"
            @onConfirm="handleDeleteRole(row)"
          >
            <el-button
              slot="reference"
              style="width:80px;"
              size="mini"
              type="danger"
            >
              删除
            </el-button>
          </el-popconfirm>

        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
    <RoleDialog ref="roleDialogCom" />
    <RoleAddDialog ref="roleAddDialogCom" />
  </div>

</template>
<script>
import Pagination from '@/components/Pagination'
import RoleAddDialog from './components/RoleAddDialog'
import { addRoleApi, deleteRoleByIdApi, getRoleListApi } from '@/api/role'
import RoleDialog from './components/RoleDialog.vue'

export default {
  provide() {
    return {
      getList: this.getList
    }
  },
  components: { Pagination, RoleDialog, RoleAddDialog },
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
    isplatform() {
      return this.$store.getters.isplatform
    }
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
    },
    // 删除角色
    async handleDeleteRole(row) {
      try {
        this.listLoading = true
        await deleteRoleByIdApi([row.id])
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.getList()
      } catch (error) {
        this.listLoading = false
      }
      this.listLoading = false
    }
  }
}
</script>
<style scoped lang="scss">

</style>
