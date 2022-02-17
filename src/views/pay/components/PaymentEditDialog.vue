<template>
  <div>
    <el-dialog
      :title="temp.id?'编辑':'新增'"
      :visible.sync="dialogVisible"
      top="5%"
      width="50%"
      @closed="onClosed"
    >
      <el-form ref="formCom" class="p-3" :model="temp" :rules="rules" label-position="left" label-width="100px">
        <el-form-item prop="account" label="账号">
          <el-input v-model="temp.account" />
        </el-form-item>
        <el-form-item prop="area" label="省市区">
          <v-distpicker
            :province="temp.province"
            :city="temp.city"
            :area="temp.area"
            @selected="handleSelected"
          />
        </el-form-item>
        <el-form-item prop="path" label="详细地址">
          <el-input v-model="temp.path" />
        </el-form-item>
        <el-form-item prop="bank" label="所属银行">
          <el-select v-model="temp.bank" placeholder="选择所属银行">
            <el-option
              v-for="item in bankOptions"
              :key="item.value"
              :label="item.text"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="name" label="姓名">
          <el-input v-model="temp.name" />
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
import { clone } from 'xe-utils'
import { getBank } from '@/utils/bank'
import VDistpicker from 'v-distpicker'
import { addBankAccountApi, updateBankAccountApi } from '@/api/payment'
export default {
  name: '',
  components: { VDistpicker },
  inject: ['getList'],
  data() {
    return {
      dialogVisible: false,
      temp: {
        id: null,
        account: '',
        province: '',
        city: '',
        area: '',
        path: '',
        bank: '',
        name: '',
        status: 1
      },
      bankOptions: getBank(),
      rules: {
        account: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        area: [
          { required: true, message: '省市区不能为空', trigger: 'blur' }
        ],
        path: [
          { required: true, message: '详细地址不能为空', trigger: 'blur' }
        ],
        bank: [
          { required: true, message: '所属银行不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    show(temp) {
      if (temp) {
        this.temp = clone(temp, true)
      }
      this.dialogVisible = true
    },
    close() {
      this.dialogVisible = false
    },
    onClosed() {
      this.$refs['formCom'].clearValidate()
      Object.assign(this.$data.temp, this.$options.data().temp)
    },
    onConfirm() {
      this.$refs['formCom'].validate(async(valid) => {
        if (valid) {
          const id = this.temp.id
          if (id) {
            await updateBankAccountApi(this.temp)
          } else {
            await addBankAccountApi(this.temp)
          }
          this.$message({
            message: id ? '编辑成功' : '新增成功',
            type: 'success'
          })
          this.getList()
          this.dialogVisible = false
        }
      })
    },
    // 省市区选择事件触发
    handleSelected({ province, city, area }) {
      this.temp.province = province.value
      this.temp.city = city.value
      this.temp.area = area.value
    }
  }
}
</script>
