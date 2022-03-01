<template>
  <el-dialog
    title=""
    :visible.sync="dialogVisible"
    width="70%"
    @closed="handleClosed"
  >
    <el-form ref="formCom" :model="temp" label-width="80px" :rules="rules">
      <el-form-item label="社区标题" prop="title">
        <el-input v-model="temp.title" />
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="temp.status">
          <el-radio
            v-for="item in statusOptions"
            :key="item.label"
            :label="item.label"
          >{{ item.key }}</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button
        type="primary"
        @click="handleConfirm"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { addBbsApi, updateBbsApi } from '@/api/tool'
import { clone } from 'xe-utils'
export default {
  inject: ['getList'],
  components: {},
  data() {
    return {
      statusOptions: [
        { label: 1, key: '显示' },
        { label: 0, key: '隐藏' }
      ],
      dialogVisible: false,
      temp: {
        id: null,
        title: '',
        status: 1
      },
      rules: {
        title: [
          { required: true, message: '标题内容不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 提交
    async handleConfirm() {
      this.$refs['formCom'].validate(async(valid) => {
        if (valid) {
          const params = {}
          params.id = this.temp.id
          params.title = this.temp.title
          params.status = this.temp.status
          if (this.temp.id) {
            await updateBbsApi(params)
          } else {
            await addBbsApi(params)
          }
          this.getList()
          this.$message({
            message: this.temp.id ? '编辑成功' : '新增成功',
            type: 'success'
          })
          this.close()
        }
      })
    },
    open(temp) {
      if (temp) {
        this.temp = clone(temp, true)
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
</style>
