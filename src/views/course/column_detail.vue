<template>
  <div class="app-container">
    <!-- 专栏详情 -->
    <el-card class="shadow-none" shadow="always">
      <div class="d-flex justify-content-between">
        <!-- left -->
        <div style="width: 200px">
          <img
            class="shadow-sm"
            style="width: 200px; display: inline-block"
            :src="detailData.cover"
            alt=""
          >
        </div>
        <!-- center -->
        <div class="flex-fill px-4">
          <p class="h6 pt-1">{{ detailData.title }}</p>
          <p class="text-secondary font-size-12 m-0 p-0" style="height: 52px">
            {{ detailData.try }}
          </p>
          <p class="text-danger font-size-14 text-weight-bold">
            ¥ {{ detailData.price }}
          </p>
          <div>
            <el-button
              class="font-size-12"
              :type="detailData.status === 0 ? 'success' : 'warning'"
              size="medium"
              @click="updateColumnStatus"
            >
              {{ detailData.status ? '下架' : '上架' }}</el-button>
            <el-button
              class="font-size-12"
              style="width: 100px"
              :type="!detailData.isend ? 'primary' : 'default'"
              size="medium"
              @click="updateColumnISendStatus"
            >
              {{ !detailData.isend ? '设为完结' : '设为连载中' }}</el-button>
          </div>
        </div>
        <!-- right -->
        <div>
          <el-tag
            v-if="!detailData.isend"
            type="primary"
            class="font-size-14"
          >连载中</el-tag>
          <el-tag v-else type="success" class="font-size-14">已完结</el-tag>
        </div>
      </div>
    </el-card>
    <!-- 专栏目录 -->
    <base-table
      class="mt-4 border--none"
      drag
      drag-handle-class="drag-btn"
      :columns="columns"
      :list="list"
      :is-pager="false"
      :loading="listLoading"
      @dragEnd="handleDragEnd"
    >
      <template #form>
        <el-button class="mb-4" icon="el-icon-edit" type="primary">新增目录</el-button>
      </template>
      <template #col_content="{row}">
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
      <template #col_actions="{ row }">
        <el-popconfirm
          title="这是一段内容确定删除吗？"
          @onConfirm="handleDeleteColumnCourse(row.id)"
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
      <template #col_drag>
        <div class="drag-btn d-flex align-items-center justify-content-center" style="width: 60px; height: 50px; user-select:none;">
          <svg-icon class="" icon-class="drag" style="cursor: move;" />
        </div>
      </template>
    </base-table>
  </div>
</template>
<script>
import {
  deleteColumnCourseApi,
  getColumnCourseListApi,
  getColumnDetailApi,
  sortColumnCourseApi,
  updateColumnISendStatusApi,
  updateColumnStatusApi
} from '@/api/column'
import BaseTable from '@/components/BaseTable'

export default {
  name: '',
  components: { BaseTable },
  data() {
    return {
      columns: [
        { field: '', title: '', width: '80', align: 'center', slots: { default: 'col_drag' }},
        { type: 'seq', width: '60' },
        { title: '单品内容', slots: { default: 'col_content' }},
        { field: 'sub_count', title: '订阅量', width: '100' },
        { field: 'status', title: '状态', width: '80', slots: { default: 'col_status' }},
        { title: '操作', width: '93', slots: { default: 'col_actions' }}
      ],
      detailData: {
        id: null,
        title: '',
        cover: '',
        try: '',
        content: '',
        price: '',
        t_price: '',
        school_id: null,
        status: null,
        isend: null,
        sub_count: 0,
        created_time: '',
        updated_time: ''
      },
      listLoading: false,
      list: [],
      listQuery: {
        page: 1,
        limit: 10
      },
      total: 0
    }
  },
  computed: {
    column_id() {
      return this.$route.query.column_id
    }
  },
  created() {
    // 判断进入页面时是否携带query参数
    if (!this.column_id) {
      this.$message({
        message: '请先选择对应专栏目录, 在进入该目录详情页面',
        type: 'info',
        duration: 2000
      })
      this.$router.push({ name: 'Column' })
    } else {
      // 获取数据
      this.getColumnDetail()
      this.getList()
    }
  },
  methods: {
    // 渲染专栏详细信息
    async getColumnDetail() {
      this.detailData = (await getColumnDetailApi(this.column_id)).data
    },
    // 渲染专栏目录列表
    async getList() {
      const params = {}
      params.column_id = this.column_id
      params.page = this.listQuery.page
      const { items, total } = (await getColumnCourseListApi(params)).data
      this.list = items
      this.total = total
    },
    // 修改专栏更新状态
    async updateColumnISendStatus() {
      const params = {}
      if (this.detailData.isend === 1) {
        params.isend = 0
      } else {
        params.isend = 1
      }
      params.id = this.column_id
      await updateColumnISendStatusApi(params)
      this.detailData.isend = params.isend
      this.$message({
        message: params.isend ? '设置为已完结' : '设置为连载中',
        type: params.isend ? 'success' : 'primary',
        duration: 500
      })
    },
    // 上架/下架专栏
    async updateColumnStatus() {
      const params = {}
      params.id = this.column_id
      if (this.detailData.status === 1) {
        params.status = 0
      } else {
        params.status = 1
      }
      await updateColumnStatusApi(params)
      this.detailData.status = params.status
      const flag = params.status === 1
      this.$message({
        message: flag ? '已上架' : '已下架',
        type: flag ? 'success' : 'info'
      })
    },
    // 处理拖拽
    async handleDragEnd(list) {
      const params = {}
      params.column_id = this.column_id
      params.ids = list.map(it => it.id)
      try {
        await sortColumnCourseApi(params)
        // 重新渲染表格列表
        this.list = []
        this.$nextTick(() => {
          this.list = list
        })
        this.$message({
          message: '排序完成',
          type: 'success'
        })
      } catch (error) {
        // 如果排序失败, 恢复原先排序
        const temp = this.list
        this.list = []
        this.$nextTick(() => {
          this.list = temp
        })
        this.$message({
          message: '排序失败, 已恢复正确排序',
          type: 'warning'
        })
      }
    },
    // 删除专栏目录
    async handleDeleteColumnCourse(id) {
      const params = {}
      params.column_id = this.column_id
      params.ids = [id]
      await deleteColumnCourseApi(params)
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 600
      })
    }
  }
}
</script>
