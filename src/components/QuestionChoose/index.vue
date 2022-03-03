<template>
  <el-dialog
    title="选择试题"
    :visible.sync="dialogVisible"
    width="60%"
    top="2%"
    @closed="handleClosed"
  >
    <div class="d-flex mb-2">
      <el-input
        v-model="listQuery.title"
        class="w-25 ms-auto me-1"
        placeholder="标题"
        clearable
      />
      <el-button
        type="primary"
        @click="handleFilterSearch"
      >搜索</el-button>
    </div>
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
      @checkbox-change="handleCheckboxChange"
    >
      <template #col_type="{row}">
        {{ typeOptions[row.type] }}
      </template>
    </base-table>
    <div slot="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import BaseTable from '@/components/BaseTable'
import { getQuestionListApi, getTestpaperListApi } from '@/api/tool'
import { clone } from 'xe-utils'
export default {
  name: 'QuestionChoose',
  components: { BaseTable },
  data() {
    return {
      typeOptions: { 'radio': '单选题', 'checkbox': '多选题', 'trueOrfalse': '判断题', 'answer': '问答题', 'completion': '填空题' },
      list: [],
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
        type: '',
        title: ''
      },
      total: 0,
      dialogVisible: false,
      columns: [
        { type: 'checkbox', width: 50, align: 'center' },
        { title: '类型', width: 100, align: 'center', slots: { default: 'col_type' }},
        { title: '题目', field: 'title' }
      ],
      selectedList: []
    }
  },
  methods: {
    async getList() {
      this.listLoading = true
      this.list = []
      const params = {}
      params.page = this.listQuery.page
      params.title = this.listQuery.title
      params.type = this.listQuery.type
      const { data } = await getQuestionListApi(params)
      this.list = data.items
      this.total = data.total
      this.listLoading = false
    },
    // 搜索
    handleFilterSearch() {
      this.listQuery.page = 1
      this.getList()
    },
    // 选中事件
    handleCheckboxChange({ records }) {
      this.selectedList = records
    },
    // 确定事件
    handleConfirm() {
      const list = clone(this.selectedList, true)
      if (list.length > 0) {
        this.$emit('confirm', list)
      }
      this.close()
    },
    open() {
      this.getList()
      this.dialogVisible = true
    },
    close() {
      this.dialogVisible = false
    },
    handleClosed() {
      // 清空选中
      this.$refs.baseTableCom.setAllCheckboxRow()
    }
  }
}
</script>
