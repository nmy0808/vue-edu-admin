<template>
  <div>
    <el-dialog
      title="新增网校"
      :visible.sync="dialogVisible"
      width="40%"
      @closed="handleClosed"
    >
      <div>
        <el-form ref="formCom" :model="temp" :rules="rules" label-width="80px">
          <el-form-item label="网校名称" prop="name">
            <el-input v-model="temp.name" />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="handleConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { createSchoolApi } from '@/api/school'
export default {
  inject: ['getList'],
  components: {},
  data() {
    return {
      dialogVisible: false,
      rules: {
        name: [
          { required: true, message: '网校名称不能为空', trigger: 'blur' }
        ]
      },
      loading: false,
      temp: {
        name: ''
      }
    }
  },
  methods: {
    handleConfirm() {
      this.$refs['formCom'].validate(async(valid) => {
        if (valid) {
          this.loading = true
          await createSchoolApi(this.temp.name)
          this.$message({
            message: '创建成功',
            type: 'success'
          })
          this.getList()
          this.close()
          this.loading = false
        }
      })
    },
    open() {
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
</style>
