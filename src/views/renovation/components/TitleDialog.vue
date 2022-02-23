<template>
  <div>
    <el-dialog
      :title="temp.id?'编辑':'新增'"
      :visible.sync="dialogVisible"
      width="35%"
      @closed="handleClosed"
    >
      <el-form ref="formCom" :model="temp" :rules="rules" inline>
        <el-form-item label="标题内容" prop="title">
          <el-input v-model="temp.title" style="width: 300px;" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="onConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addRenovationApi, updateRenovationApi } from '@/api/renovation'
import { clone } from 'xe-utils'
export default {
  name: '',
  components: {},
  inject: ['getList'],
  data() {
    return {
      dialogVisible: false,
      temp: {
        id: null,
        title: '',
        // 是否是移动端：0否1是
        ismobile: 0,
        isdefault: '',
        type: ''
      },
      rules: {
        title: [
          { required: true, message: '标题内容不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    show(ismobile = 0, temp) {
      if (temp) {
        this.temp = clone(temp, true)
      }
      this.temp.ismobile = ismobile
      this.dialogVisible = true
    },
    close() {
      this.dialogVisible = false
    },
    handleClosed() {
      this.$refs['formCom'].clearValidate()
      Object.assign(this.$data.temp, this.$options.data().temp)
    },
    onConfirm() {
      this.$refs['formCom'].validate(async(valid) => {
        if (valid) {
          // id
          const id = this.temp.id
          // 编辑
          if (id) {
            await updateRenovationApi(this.temp)
          } else {
            // 增加
            await addRenovationApi(this.temp)
          }
          this.getList()
          this.$message({
            message: id ? '编辑' : '新增' + '完成',
            type: 'success'
          })
          this.close()
        }
      })
    }
  }
}
</script>
