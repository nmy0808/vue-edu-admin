<template>
  <div class="audio-page app-container">
    <base-table
      :columns="columns"
      :list="list"
      :pagination="getList"
      :total.sync="total"
      :page.sync="listQuery.page"
      :size.sync="listQuery.size"
      :loading="listLoading"
    >
      <vxe-column field="id" title="123" />
      <template #form>
        <div class="d-flex pb-3">
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="handleAdd"
          >新增电子书</el-button>
          <el-select
            v-model="listQuery.status"
            placeholder="商品状态"
            class="ms-auto me-2"
            style="width: 200px"
          >
            <el-option label="全部" :value="null" />
            <el-option label="已上架" :value="1" />
            <el-option label="已下架" :value="0" />
          </el-select>
          <el-input v-model="listQuery.keyword" class="w-25  me-2" placeholder="请输入标题" clearable />
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleFilter"
          >搜索</el-button>
        </div>
      </template>
      <template #col_title="{ row }">
        <div class="d-flex">
          <img :src="row.cover" alt="" height="60px" class="my-2">
          <div class="ms-2 d-flex flex-column h7">
            <p class="p-0 m-0 mt-3">
              {{ row.title }}
            </p>
            <p class="p-0 m-0 mt-1 text-red">¥ {{ (row.price -0 ).toFixed(2) }}</p>
          </div>
        </div>
      </template>
      <template #col_status="{ row }">
        <el-tag :type="row.status ? 'primary' : 'info'">
          {{ row.status ? '已上架' : '已下架' }}
        </el-tag>
      </template>
      <template #col_isend="{ row }">
        <span :class="row.isend ? 'text-danger' : 'text-success'">
          {{ row.isend ? '连载中' : '已完结' }}
        </span>
      </template>
      <template #col_created_time="{ row }">
        <span>{{
          conversionTimeFormat(row.created_time)
        }}</span>
      </template>
      <template #col_actions="{ row, $index }">
        <el-button type="warning" size="mini" @click="toPageBookDetail(row)">
          目录
        </el-button>
        <el-button type="primary" size="mini" @click="handleUpdate(row)">
          编辑
        </el-button>
        <el-button
          size="mini"
          :type="row.status ? 'info' : 'success'"
          @click="handleModifyStatus(row, row.status?0:1)"
        >
          {{ row.status ? '下架' : '上架' }}
        </el-button>
      </template>
    </base-table>
    <column-dialog ref="columnDialog" />
  </div>
</template>
<script>
import BaseTable from '@/components/BaseTable'
import ColumnDialog from './components/BookDialog.vue'
import { clone, merge, toDateString } from 'xe-utils'
import { getBookListApi, setBookStatusApi } from '@/api/tool'
export default {
  provide() {
    return {
      getList: this.getList
    }
  },
  components: { BaseTable, ColumnDialog },
  data() {
    return {
      columns: [{
        field: 'id',
        title: 'id',
        align: 'center',
        width: 100
      },
      {
        field: 'content',
        title: '电子书',
        slots: { default: 'col_title' }
      },
      {
        field: 'sub_count',
        align: 'center',
        title: '订阅量',
        width: 120
      },
      {
        field: 'status',
        title: '状态',
        align: 'center',
        width: 80,
        slots: { default: 'col_status' }
      },
      {
        field: 'created_time',
        title: '创建时间',
        align: 'center',
        width: 180,
        slots: { default: 'col_created_time' }
      },
      {
        title: '操作',
        width: 275,
        align: 'center',
        slots: { default: 'col_actions' }
      }],
      total: 10,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
        status: null,
        keyword: ''
      },
      list: []
    }
  },
  computed: {
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      const response = await getBookListApi(this.listQuery)
      this.list = response.data.items
      this.total = response.data.total
      this.listLoading = false
    },
    handleAdd() {
      this.$refs.columnDialog.show()
    },
    handleUpdate(row) {
      this.$refs.columnDialog.show(row)
    },
    // 上下架
    async handleModifyStatus(row, status) {
      const params = {}
      params.id = row.id
      params.status = status
      await setBookStatusApi(params)
      this.list.forEach((it) => {
        if (it.id === row.id) {
          it.status = status
        }
      })
      this.$message({
        message: '操作成功',
        type: 'success'
      })
    },
    // 搜索
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    toPageBookDetail(row) {
      const id = row.id
      this.$router.push({
        name: 'BookDetail',
        params: {
          id
        },
        query: {
          book_name: row.title
        }
      })
    },
    // 转换时间格式
    conversionTimeFormat(date) {
      return toDateString(date)
    }
  }
}
</script>
