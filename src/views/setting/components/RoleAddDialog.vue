<template>
  <div class="">
    <el-dialog
      title="添加角色"
      :visible.sync="dialogVisible"
      width="40%"
      @closed="handleClosed"
    >
      <el-form ref="formCom" :model="temp" :rules="rules" label-width="80px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="角色标识" prop="role_id">
          <el-input v-model="temp.role_id" />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="temp.status">
            <el-radio :label="0">隐藏</el-radio>
            <el-radio :label="1">显示</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="temp.desc" type="textarea" />
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addRoleApi, getRolePermissionApi, updateRoleByIdApi } from '@/api/role'
import { clone } from 'xe-utils'
export default {
  inject: ['getList'],
  components: {},
  data() {
    return {
      dialogVisible: false,
      temp: {
        name: '',
        role_id: '',
        status: 1,
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ],
        role_id: [
          { required: true, message: '标识不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 查看角色权限
    async getRolePermission(id) {
      const { data } = await getRolePermissionApi(id)
      this.roleData = data
    },
    async handleConfirm(row) {
      const id = this.temp.id
      try {
        if (id) {
          await updateRoleByIdApi(this.temp)
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
        } else {
          const params = {}
          params.name = this.temp.name
          params.role_id = this.temp.role_id
          params.status = this.temp.status
          params.desc = this.temp.desc
          await addRoleApi(params)
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        }
        await this.getList()
      } catch (error) {
        this.close()
      }
      this.close()
    },
    async open(row) {
      if (row) {
        this.temp = clone(row, true)
      }
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
  margin-bottom: 40px;
  .role-title{
    font-weight: bold;
    width: 100px;
  }
  .role-desc{
  }
}
</style>
