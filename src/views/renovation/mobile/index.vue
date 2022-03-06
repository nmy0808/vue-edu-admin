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
          >新增子页面</el-button>
        </div>
      </template>
      <template #col_actions="{ row }">
        <el-button
          slot="reference"
          size="mini"
          type="success"
          @click="handleToPageRenovation(row.id)"
        >
          装修
        </el-button>
        <el-button
          slot="reference"
          size="mini"
          type="primary"
          @click="handleOpenEdit(row)"
        >
          编辑
        </el-button>
        <el-popconfirm
          class="ms-2"
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
      <template #col_created_time="{ row }">
        {{ conversionTimeFormat(row.created_time) }}
      </template>
      <template #col_updated_time="{ row }">
        {{ conversionTimeFormat(row.updated_time) }}
      </template>
    </base-table>
    <title-dialog ref="titleDialogCom" />
  </div>
</template>
<script>
import BaseTable from '@/components/BaseTable/'
import { deleteRenovationByIdsApi, getRenovationListApi } from '@/api/renovation'
import TitleDialog from '../components/TitleDialog.vue'
import { toDateString } from 'xe-utils'
export default {
  name: '',
  components: { BaseTable, TitleDialog },
  provide() {
    return {
      getList: this.getList
    }
  },
  data() {
    return {
      list: [],
      listQuery: {
        page: 1,
        limit: 10,
        ismobile: 1 // 0:pc, 1:移动
      },
      total: 0,
      listLoading: false,
      columns: [
        { title: '页面名称', field: 'title', align: 'left' },
        { title: '创建时间 ', field: 'created_time', align: 'center', width: 180, slots: { default: 'col_created_time' }},
        { title: '更新时间', field: 'updated_time', align: 'center', width: 180, slots: { default: 'col_updated_time' }},
        { title: '操作', width: 280, slots: { default: 'col_actions' }, align: 'center' }
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
      params.ismobile = this.listQuery.ismobile
      const { data } = await getRenovationListApi(params)
      this.list = data.items
      this.total = data.total
      this.listLoading = false
    },
    async handleDeleteOrder(row) {
      const id = row.id
      await deleteRenovationByIdsApi([id])
      this.getList()
      this.$message({
        message: '已删除',
        type: 'success'
      })
    },
    // 编辑
    handleOpenEdit(row) {
      this.$refs.titleDialogCom.show(this.listQuery.ismobile, row)
    },
    // 新增
    handleAddEdit() {
      this.$refs.titleDialogCom.show(this.listQuery.ismobile)
    },
    // 跳转到装修页面
    handleToPageRenovation(id) {
      this.$router.push({ name: 'MobileEdit', params: { id }})
    },
    // 转换时间格式
    conversionTimeFormat(data) {
      return toDateString(data)
    }
  }
}
</script>
<style scoped lang="scss"></style>
