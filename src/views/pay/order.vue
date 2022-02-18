<template>
  <div class="order-page app-container">
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
      @checkbox-change="handleCheckboxChange"
    >
      <template #toolbar>
        <div class="d-flex align-items-center pb-3">
          <el-button type="primary" :disabled="selectedList.length === 0" @click="handleExport">导出选中</el-button>
          <el-select v-model="listQuery.status" placeholder="支付方式" class="ms-auto">
            <el-option
              v-for="item in [{label:'全部',value:''},{label:'待支付',value:'pendding'},{label:'失败',value:'fail'},{label:'成功',value:'success'}]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-input v-model="listQuery.no" placeholder="订单编号" class="w-25 m-2" />
          <el-button
            type="primary"
            icon="el-icon-search"
            :loading="listLoading"
            @click="handleFilter"
          >搜索</el-button>
        </div>
      </template>
      <template #col_type="{ row }">
        <el-tag :type="row.type?'success':'warning'">
          {{ orderTypeMap[row.type] }}</el-tag>
      </template>
      <template #col_status="{ row }">
        <span :class="[{pendding:'text-primary',success:'text-success',fail:'text-danger'}[row.status]]">{{ orderStatusMap[row.status] }}</span>
      </template>
      <template #col_price="{ row }">
        {{ row.total_price }} / <span class="text-danger text-weight-bold">{{ row.price }}</span>
      </template>
      <template #col_date="{ row }">
        <p class="py-1 m-0">创建时间: {{ row.created_time }}</p>
        <p class="py-1 m-0">支付时间: {{ row.pay_time }}</p>
      </template>
      <template #col_actions="{ row }">
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
  </div>
</template>
<script>
import BaseTable from '@/components/BaseTable/'
import { deleteOrderByIdsApi, getOrderListApi } from '@/api/order'
export default {
  name: '',
  components: { BaseTable },
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
        limit: 10,
        no: '',
        status: '' // pendding待支付，success成功,fail失败
      },
      total: 0,
      listLoading: false,
      columns: [
        { type: 'checkbox', align: 'center', width: 60 },
        { title: '订单号 ', field: 'no', align: 'center' },
        { title: '商品名称 ', field: 'title', align: 'center' },
        { title: '订单类型', slots: { default: 'col_type' }, align: 'center', width: 100 },
        { title: '订单状态 ', slots: { default: 'col_status' }, width: 100, align: 'center' },
        { title: '原价/实付(元)', width: 200, slots: { default: 'col_price' }, align: 'center' },
        { title: '支付方式', field: 'pay_method', width: 100, align: 'center' },
        { title: '创建/支付时间', field: 'pay_time', width: 260, slots: { default: 'col_date' }, align: 'center' },
        { title: '操作', width: 100, slots: { default: 'col_actions' }, align: 'center' }
      ],
      selectedList: []
    }
  },
  created() { this.getList() },
  methods: {
    async getList() {
      this.listLoading = true
      this.list = []
      const params = {}
      params.page = this.listQuery.page
      params.no = this.listQuery.no
      params.status = this.listQuery.status
      const { data } = await getOrderListApi(params)
      this.list = data.items
      this.total = data.total
      this.listLoading = false
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    async handleDeleteOrder(row) {
      const id = row.id
      const params = { ids: [id] }
      await deleteOrderByIdsApi(params)
      this.getList()
      this.$message({
        message: '已删除',
        type: 'success'
      })
    },
    handleCheckboxChange({ records }) {
      this.selectedList = records
    },
    // 打印
    handleExport() {
      this.$refs.baseTableCom.exportEvent()
    }
  }
}
</script>
<style scoped lang="scss"></style>
