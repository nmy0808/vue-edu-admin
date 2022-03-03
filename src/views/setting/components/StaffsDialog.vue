<template>
  <div class="">
    <el-dialog
      title="添加员工"
      :visible.sync="dialogVisible"
      width="40%"
      @closed="handleClosed"
    >
      <el-form ref="formCom" :model="temp" :rules="rules" label-width="80px">
        <el-form-item label="关键词" prop="keyword">
          <el-input v-model="temp.keyword" placeholder="用户名/手机/邮箱" />
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
import { createStaffApi } from '@/api/school-staff'
import { clone } from 'xe-utils'
export default {
  components: {},
  inject: ['getList'],
  data() {
    return {
      dialogVisible: false,
      temp: { keyword: '' },
      rules: {
        keyword: [
          { required: true, message: '标题内容不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleConfirm() {
      this.$refs['formCom'].validate(async(valid) => {
        if (valid) {
          await createStaffApi(this.temp.keyword)
          this.getList()
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.close()
        }
      })
    },
    async open() {
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
