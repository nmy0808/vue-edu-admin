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
        <div class="d-flex align-items-center pb-3">
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="handleAddEdit"
          >新增收款账号</el-button>
        </div>
      </template>
      <template #col_actions="{ row }">
        <el-button
          slot="reference"
          size="mini"
          type="primary"
          @click="handleOpenEdit(row)"
        >
          编辑
        </el-button>
        <el-popconfirm
          title="这是一段内容确定删除吗？"
          @onConfirm="handleDeleteOrder(row)"
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
    <payment-edit-dialog ref="payMentEditDialog" />
  </div>
</template>
<script>
import BaseTable from '@/components/BaseTable/'
import { deleteBankAccountByIdsApi, getBankAccountListApi } from '@/api/payment'
import PaymentEditDialog from './components/PaymentEditDialog.vue'
export default {
  name: '',
  components: { BaseTable, PaymentEditDialog },
  provide() {
    return {
      getList: this.getList
    }
  },
  data() {
    return {
      orderTypeMap: {
        default: '普通',
        group: '拼团'
      },
      orderStatusMap: {
        pendding: '待支付',
        success: '成功',
        fail: '失败'
      },
      list: [],
      listQuery: {
        page: 1,
        limit: 10
      },
      total: 0,
      listLoading: false,
      columns: [
        { title: '账号 ', field: 'account', align: 'center', width: 270 },
        { title: '开户人 ', field: 'name', align: 'center', width: 180 },
        { title: '开户行', field: 'bank', align: 'center' },
        { title: '操作', width: 180, slots: { default: 'col_actions' }, align: 'center' }
      ]
    }
  },
  created() { this.getList() },
  methods: {
    async getList() {
      this.listLoading = true
      this.list = []
      const params = {}
      params.page = this.listQuery.page
      params.status = this.listQuery.status
      const { data } = await getBankAccountListApi(params)
      this.list = data.items
      this.total = data.total
      this.listLoading = false
    },
    async handleDeleteOrder(row) {
      const id = row.id
      const ids = [id]
      this.listLoading = true
      try {
        await deleteBankAccountByIdsApi(ids)
        await this.getList()
        this.$message({
          message: '已删除',
          type: 'success'
        })
      } catch (error) {
        console.log(error)
      }
      this.listLoading = false
    },
    // 编辑
    handleOpenEdit(row) {
      this.$refs.payMentEditDialog.show(row)
    },
    // 新增
    handleAddEdit() {
      this.$refs.payMentEditDialog.show()
    }
  }
}
</script>
<style scoped lang="scss"></style>
