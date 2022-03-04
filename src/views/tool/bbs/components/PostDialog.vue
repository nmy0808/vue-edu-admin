<template>
  <el-dialog
    title="查看回复"
    :visible.sync="dialogVisible"
    top="2%"
    width="70%"
    @closed="handleClosed"
  >
    <base-table
      ref="baseTableCom"
      class="mt-0 border--none"
      :height="500"
      :columns="columns"
      :list="list"
      :pagination="getList"
      :total.sync="total"
      :page.sync="listQuery.page"
      :size.sync="listQuery.size"
      :loading="listLoading"
    >
      <template #col_content="{row}">
        <span
          v-if="row.reply_user"
          style="color:blue;"
        >@{{
          row.reply_user.nickname || row.reply_user.username
        }}</span>
        {{ row.content }}
      </template>

      <template #col_date="{ row }">
        {{ conversionTimeFormat(row.created_time) }}
      </template>
      <template #col_actions="{ row, $rowIndex }">
        <el-popconfirm
          title="这是一段内容确定删除吗？"
          @onConfirm="handleDelete(row, $rowIndex)"
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
    <div slot="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button
        type="primary"
        @click="handleConfirm"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import BaseTable from '@/components/BaseTable'
import { addBbsApi, deletePostCommentByIdApi, getPostCommentApi, updateBbsApi } from '@/api/tool'
import { clone, toDateString } from 'xe-utils'
export default {
  components: { BaseTable },
  data() {
    return {
      statusOptions: [
        { label: 1, key: '显示' },
        { label: 0, key: '隐藏' }
      ],
      dialogVisible: false,
      listLoading: false,
      list: [],
      listQuery: {
        post_id: null,
        page: 1,
        limit: 10
      },
      total: 0,
      columns: [
        { title: '回复内容', minWidth: 220, slots: { default: 'col_content' }},
        { title: '用户', field: 'user.username', width: 140 },
        { title: '回复时间', field: 'created_time', width: 220, slots: { default: 'col_date' }},
        { title: '操作', width: 80, slots: { default: 'col_actions' }}
      ]
    }
  },
  methods: {
    async getList() {
      this.listLoading = true
      this.list = []
      const params = {}
      params.page = this.listQuery.page
      params.post_id = this.post_id
      const { data } = await getPostCommentApi(params)
      this.list = data.items
      this.total = data.total
      this.listLoading = false
    },
    // 提交
    async handleConfirm() {
      const params = {}
      params.id = this.temp.id
      params.title = this.temp.title
      params.status = this.temp.status
      if (this.temp.id) {
        await updateBbsApi(params)
      } else {
        await addBbsApi(params)
      }
      this.getList()
      this.$message({
        message: this.temp.id ? '编辑成功' : '新增成功',
        type: 'success'
      })
    },
    async handleDelete(row, index) {
      const id = row.id
      const post_id = this.post_id
      const params = {}
      params.ids = [id]
      params.post_id = post_id
      await deletePostCommentByIdApi(params)
      this.list.splice(index, 1)
      this.$message({
        message: '删除成功',
        type: 'success'
      })
    },
    // 转换时间格式
    conversionTimeFormat(data) {
      return toDateString(data)
    },
    open(post_id) {
      this.post_id = post_id
      this.getList()
      this.dialogVisible = true
    },
    close() {
      this.dialogVisible = false
    },
    handleClosed() {
      Object.assign(this.$data, this.$options.data())
    }
  }
}
</script>
<style scoped lang="scss">
</style>
