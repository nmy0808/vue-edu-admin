<template>
  <div class="payment-page app-container">
    <base-table
      ref="baseTableCom"
      class="mt-0 border--none"
      :columns="columns"
      :list="list"
      :pagination="getList"
      :total.sync="total"
      :page.sync="listQuery.page"
      :size.sync="listQuery.size"
      :loading="listLoading"
      :export-config="{}"
    >
      <template #toolbar>
        <el-row class="align-items-center mb-3" :gutter="30">
          <el-col :span="8" class="d-flex align-items-center">
            <div class="w-100 border p-3" style="height: 140px;">
              <div class="font-size-14 text-weight-bold d-flex pb-3 justify-content-between border-bottom align-items-center">
                可用余额 (元)
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-edit"
                  @click="handleGetCash"
                >申请提现</el-button>
              </div>
              <div class="h3 d-flex align-items-center mt-4">
                <countTo :start-val="0" :end-val="+ schoolDetail.balance" :duration="1000" />
              </div>
            </div>
          </el-col>
          <!--  -->
          <el-col :span="8" class="d-flex align-items-center">
            <div class="w-100 border p-3" style="height: 140px;">
              <div class="font-size-14 text-weight-bold d-flex pb-3 justify-content-between border-bottom align-items-center">
                累计收入（元)
              </div>
              <div class="h3 d-flex align-items-center mt-4">
                <countTo :start-val="0" :end-val="+ schoolDetail.t_balance" :duration="1000" />
              </div>
            </div>
          </el-col>
          <!--  -->
          <el-col :span="8" class="d-flex align-items-center">
            <div class="w-100 border p-3" style="height: 140px;">
              <div class="font-size-14 text-weight-bold d-flex pb-3 justify-content-between border-bottom align-items-center">
                待结算金额 (元)
              </div>
              <div class="h3 d-flex align-items-center mt-4">
                <countTo :start-val="0" :end-val="+ schoolDetail.w_balance" :duration="1000" />
              </div>
            </div>
          </el-col>
        </el-row>
      </template>
      <template #col_date="{row}">
        {{ conversionTimeFormat(row.created_time) }}
      </template>
      <template #col_actions="{ row }">
        <el-tag v-if="row.status" type="primary">已通过</el-tag>
        <el-tag v-else type="danger">审核中</el-tag>
      </template>
    </base-table>
    <assets-dialog ref="assetsDialogCom" @confirm="getSchoolInfo" />
  </div>
</template>
<script>
import CountTo from 'vue-count-to'
import BaseTable from '@/components/BaseTable/'
import { getCashListApi } from '@/api/cash'
import { getSchoolUserInfoApi } from '@/api/school_user'
import AssetsDialog from './components/AssetsDialog.vue'
import { toDateString } from 'xe-utils'
import { getSchoolInfoApi } from '@/api/school'
import { getSchoolId } from '@/utils/auth'
export default {
  name: '',
  components: { BaseTable, CountTo, AssetsDialog },
  provide() {
    return {
      getList: this.getList
    }
  },
  data() {
    return {
      schoolDetail: {
        balance: 0,
        t_balance: 0,
        w_balance: 0
      },
      list: [],
      listQuery: {
        page: 1,
        limit: 10
      },
      total: 0,
      listLoading: false,
      columns: [
        { title: '交易时间', align: 'center', slots: { default: 'col_date' }},
        { title: '提款账号', field: 'account', align: 'center', width: 370 },
        { title: '开户人 ', field: 'name', align: 'center', width: 380 },
        { title: '提现金额', field: 'price', align: 'center' },
        { title: '状态', width: 180, slots: { default: 'col_actions' }, align: 'center' }
      ]
    }
  },
  created() {
    this.getSchoolInfo()
    this.getList()
  },
  methods: {
    async getSchoolInfo() {
      Object.assign(this.$data.schoolDetail, this.$options.data().schoolDetail)
      // 参数是网校id
      // const { data } = await getSchoolUserInfoApi()
      const { data } = await getSchoolInfoApi(getSchoolId())
      this.schoolDetail = {
        balance: data.balance || 0,
        t_balance: data.t_balance || 0,
        w_balance: data.w_balance || 0
      }
    },
    async getList() {
      this.listLoading = true
      this.list = []
      const params = {}
      params.page = this.listQuery.page
      const { data } = await getCashListApi(params)
      console.log(data.items)
      this.list = data.items
      this.total = data.total
      this.listLoading = false
    },
    // 申请提现
    handleGetCash() {
      this.$refs.assetsDialogCom.show()
    },
    // 转换时间格式
    conversionTimeFormat(data) {
      return toDateString(data)
    }
  }
}
</script>
<style scoped lang="scss"></style>
