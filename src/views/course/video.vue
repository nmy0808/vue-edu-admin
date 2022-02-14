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
          >新增视频</el-button>
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
          <el-input v-model="listQuery.title" class="w-25  me-2" placeholder="请输入搜索名称" clearable />
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleFilter"
          >搜索</el-button>
        </div>
      </template>
      <template #col_title="{ row }">
        <div class="d-flex">
          <img :src="row.cover" alt="" width="100px">
          <div class="ms-2 d-flex flex-column h7">
            <p class="p-0 m-0">
              {{ row.title }}
            </p>
            <p class="p-0 m-0 mt-3 text-red">¥ {{ (row.price -0 ).toFixed(2) }}</p>
          </div>
        </div>
      </template>
      <template #col_status="{ row }">
        <el-tag :type="row.status ? 'primary' : 'info'">
          {{ row.status ? '已上架' : '已下架' }}
        </el-tag>
      </template>
      <template #col_created_time="{ row }">
        <span>{{
          row.created_time | parseTime('{y}-{m}-{d} {h}:{i}:{m}')
        }}</span>
      </template>
      <template #col_actions="{ row, $index }">
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
        <el-popconfirm
          class="ms-2"
          title="这是一段内容确定删除吗？"
          @onConfirm="handleDelete(row, $index)"
        >
          <el-button
            v-if="row.status != 'deleted'"
            slot="reference"
            size="mini"
            type="danger"
          >
            删除
          </el-button>
        </el-popconfirm>
      </template>
    </base-table>
    <video-dialog ref="videoDiaCom" />
  </div>
</template>
<script>
import BaseTable from '@/components/BaseTable'
import VideoDialog from './components/video-dialog.vue'
import { clone, merge } from 'xe-utils'
import { deleteCourseByIdApi, getCourseListApi, updateCourseStatusApi } from '@/api/course'
export default {
  name: '',
  components: { BaseTable, VideoDialog },
  data() {
    return {
      columns: [{
        field: 'id',
        title: 'id',
        width: 100
      },
      {
        field: 'content',
        title: '内容',
        slots: { default: 'col_title' }
      },
      {
        field: 'sub_count',
        title: '订阅量',
        width: 120
      },
      {
        field: 'status',
        title: '状态',
        width: 80,
        slots: { default: 'col_status' }
      },
      {
        field: 'created_time',
        title: '创建时间',
        width: 180,
        slots: { default: 'col_created_time' }
      },
      {
        title: '操作',
        width: 210,
        slots: { default: 'col_actions' }
      }],
      total: 10,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
        status: null,
        title: '',
        type: 'video',
        sort: '+id'
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
      const response = await getCourseListApi(this.listQuery)
      this.list = response.data.items
      this.total = response.data.total
      this.listLoading = false
    },
    handleAdd() {
      this.$refs.videoDiaCom.show()
    },
    handleUpdate(row) {
      this.$refs.videoDiaCom.show(row)
    },
    // 上下架
    async handleModifyStatus(row, status) {
      const params = {}
      params.id = row.id
      params.status = status
      await updateCourseStatusApi(params)
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
    // 删除
    async handleDelete(row, index) {
      await deleteCourseByIdApi([row.id])
      this.$notify({
        title: '删除',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
    },
    // 搜索
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    }
  }
}
</script>
