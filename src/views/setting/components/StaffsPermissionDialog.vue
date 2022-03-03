<template>
  <div class="">
    <el-dialog
      title="配置权限"
      :visible.sync="dialogVisible"
      width="40%"
      @closed="handleClosed"
    >
      <el-checkbox
        v-for="item in temp.roles"
        :key="item.id"
        v-model="temp.role_ids"
        :label="item.id"
      >{{ item.name }}</el-checkbox>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { createStaffApi, setStaffPermissionApi } from '@/api/school-staff'
import { clone } from 'xe-utils'
export default {
  components: {},
  inject: ['getList'],
  data() {
    return {
      dialogVisible: false,
      temp: {
        id: '', // 用户id
        roles: [], // 所有权限列表
        role_ids: [] // 当前用户选中的权限ids
      }
    }
  },
  methods: {
    async handleConfirm() {
      const params = {}
      params.id = this.temp.id
      params.role_ids = this.temp.role_ids
      console.log(params)
      await setStaffPermissionApi(params)
      this.getList()
      this.$message({
        message: '配置成功',
        type: 'success'
      })
      this.close()
    },
    // 参数 : 用户id;  所有权限列表 ; 当前用户选中的权限
    async open({ id, roles, role_ids }) {
      this.temp.id = id
      this.temp.roles = roles
      this.temp.role_ids = role_ids
      this.dialogVisible = true
    },
    close() {
      this.dialogVisible = false
    },
    handleClosed() {
      Object.assign(this.$data.temp, this.$options.data().temp)
    }
  }
}
</script>
<style scoped lang="scss">
.role-dialog-content{
  height: 500px;
  overflow-y: auto;
}
.role-row{
  display: flex;
  line-height: 30px;
  margin-bottom: 40px;
  .role-title{
    font-weight: bold;
    width: 100px;
  }
  .role-desc{
  }
}
</style>
