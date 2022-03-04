<template>
  <div class="audio-page app-container">
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
          >添加用户</el-button>
        </div>
      </template>
      <template #col_title="{ row }">
        <div class="d-flex">
          <el-avatar size="medium" :src="row.user.avatar" />
          <div class="ms-2 d-flex flex-column h7">
            <p class="p-0 m-0 mt-1">
              {{ row.user.username }}
            </p>
          </div>
        </div>
      </template>
      <template #col_role="{ row }">
        <span>{{
          convertRoleFormats(row.roles)
        }}</span>
      </template>
      <template #col_created_time="{ row }">
        <span>{{
          conversionTimeFormat(row.created_time)
        }}</span>
      </template>
      <template #col_actions="{ row }">
        <el-button
          type="primary"
          size="mini"
          class="me-2"
          @click="handleSetRole(row)"
        >
          配置权限
        </el-button>
        <el-popconfirm
          title="这是一段内容确定删除吗？"
          @onConfirm="handleDelete(row)"
        >
          <el-button
            slot="reference"
            size="mini"
            type="danger"
          >
            删除
          </el-button>
        </el-popconfirm>
      </template>
    </base-table>
    <staff-dialog ref="staffDialogCom" />
    <staffs-permission-dialog ref="staffsPermissionDialogCom" />
  </div>
</template>
<script>
import BaseTable from '@/components/BaseTable'
import StaffDialog from './components/StaffsDialog.vue'
import StaffsPermissionDialog from './components/StaffsPermissionDialog.vue'
import { clone, merge, toDateString } from 'xe-utils'
import { deleteStaffByIdApi, getStaffListApi } from '@/api/school-staff'
import { getRoleListApi, getRolePermissionApi } from '@/api/role'
export default {
  provide() {
    return {
      getList: this.getList
    }
  },
  components: { BaseTable, StaffDialog, StaffsPermissionDialog },
  data() {
    return {
      columns: [
        {
          field: 'content',
          title: '用户',
          slots: { default: 'col_title' }
        },
        {
          align: 'center',
          title: '角色',
          width: 420,
          slots: { default: 'col_role' }
        },
        {
          field: 'created_time',
          title: '创建时间',
          align: 'center',
          width: 280,
          slots: { default: 'col_created_time' }
        },
        {
          title: '操作',
          width: 275,
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
      const response = await getStaffListApi(this.listQuery.page)
      this.list = response.data.items
      this.total = response.data.total
      this.listLoading = false
    },
    async handleAdd() {
      this.$refs.staffDialogCom.open()
    },
    async handleDelete(row) {
      const staff_id = row.id
      await deleteStaffByIdApi(staff_id)
      this.$message({
        message: '删除成功',
        type: 'success'
      })
      this.getList()
    },
    // 配置权限
    async handleSetRole(row) {
      this.listLoading = true
      const params = {}
      // 用户id
      params.id = row.id
      // 所有权限列表
      // params.roles = (await getRoleListApi(1)).data.items
      getRoleListApi(1).then((res) => {
        params.roles = res.data.items
        // 当前用户的权限
        params.role_ids = row.roles.map(it => it.id)
        this.$refs.staffsPermissionDialogCom.open(params)
      }).finally(() => {
        this.listLoading = false
      })
    },
    // 转换时间格式
    conversionTimeFormat(date) {
      return toDateString(date)
    },
    // 转换角色格式
    convertRoleFormats(role) {
      if (Array.isArray(role) && role.length > 0) {
        return role.filter(it => it).map(it => it.name).join(', ')
      } else {
        return Array.isArray(role) ? '无' : role
      }
    }
  }
}
</script>
