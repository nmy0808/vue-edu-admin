<template>
  <div>
    <el-dialog
      title="申请提现"
      :visible.sync="dialogVisible"
      width="50%"
      @closed="handleClosed"
    >
      <el-form
        ref="formCom"
        :model="temp"
        :rules="rules"
        label-width="200px"
      >
        <el-form-item prop="price" label="提现金额">
          <el-input-number
            v-model="temp.price"
            :precision="2"
            :min="0"
          />
        </el-form-item>
        <el-form-item prop="cash_id" label="提现账户">
          <el-select
            v-model="temp.cash_id"
            style="width: 300px;"
            placeholder="请选择银行账户"
          >
            <el-option
              v-for="item in bankAccountList"
              :key="item.value"
              :label="item.bank"
              :value="item.id"
            >
              <span style="float: left">{{ item.bank }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="handleConfirm">{{ loading ?'提现中...' :'确定' }} </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getBankAccountListApi } from '@/api/payment'
import { getCashApi } from '@/api/cash'

export default {
  name: '',
  components: {},
  data() {
    return {
      dialogVisible: false,
      loading: false,
      temp: {
        // 价格
        price: '',
        // 收款账户id
        cash_id: ''
      },
      // 收款账号列表
      bankAccountList: [],
      rules: {
        price: [
          { validator: (rule, value, callback) => {
            if (value === 0) {
              return Promise.reject(new Error('价格不能为0元'))
            } else {
              callback()
            }
          }, trigger: 'blur' }
        ],
        cash_id: [
          { required: true, message: '请选择银行账户', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async getList() {
      const params = {}
      params.page = 1
      params.status = 1
      params.limit = 100
      this.bankAccountList = []
      const { data } = await getBankAccountListApi(params)
      this.bankAccountList = data.items
    },
    async show() {
      await this.getList()
      this.dialogVisible = true
    },
    close() {
      this.dialogVisible = false
    },
    handleClosed() {
      this.bankAccountList = []
      this.$refs['formCom'].clearValidate()
      Object.assign(this.$data.temp, this.$options.data().temp)
    },
    // 提交
    handleConfirm() {
      this.$refs['formCom'].validate(async(valid) => {
        if (valid) {
          const params = {}
          params.cash_id = this.temp.cash_id
          params.price = this.temp.price
          this.loading = true
          await getCashApi(params)
          this.$message({
            message: '提现成功',
            type: 'success'
          })
          this.loading = false
          this.close()
          this.$emit('confirm')
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
</style>
