<template>
  <div class="user-page app-container">
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
      @checkbox-change="handleCheckboxChange"
    >
      <template #form>
        <div class="d-flex pb-3">
          <el-button type="primary" @click="openQuestionDialog">新增题目</el-button>
          <el-button type="danger" :disabled="checkedList.length === 0" @click="handleBatchDelete">批量删除</el-button>
          <div class="me-auto ms-2 d-flex align-items-center">
            <el-upload
              :action="uploadOptions.importExcelAction"
              :headers="uploadOptions.headers"
              :show-file-list="false"
              :on-success="handleUploadSuccess"
              :on-error="handleUploadError"
            >
              <el-button type="success">导入项目</el-button>
            </el-upload>
            <a class="ms-2 btn-link cursor-pointer align-bottom" href="/QuestionImportTemplate.xlsx" target="_blank">下载导入模板</a>
          </div>
          <el-select v-model="listQuery.type" placeholder="类型">
            <el-option
              v-for="(value,key) in typeOptions"
              :key="key"
              :label="value"
              :value="key"
            />
          </el-select>
          <el-input v-model="listQuery.title" class="w-25 me-2" clearable placeholder="请输入用户名" />
          <el-button type="primary" icon="el-icon-search" @click="getList">搜索</el-button>
        </div>
      </template>
      <template #col_type="{ row }">
        {{ typeOptions[row.type] }}
      </template>
      <template #col_actions="{ row }">
        <el-button type="primary" size="mini" @click="openQuestionDialog(row)">编辑</el-button>
        <el-popconfirm
          title="这是一段内容确定删除吗？"
          @onConfirm="handleDelete(row)"
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
    <QuestionDialog ref="userInfoDialogCom" />
  </div>
</template>
<script>
import BaseTable from '@/components/BaseTable'
import { deleteQuestionByIdsApi, getQuestionListApi } from '@/api/tool'
import QuestionDialog from './components/QuestionDialog.vue'
import uploadOptions from '@/utils/upload.js'
export default {
  name: 'QuestionPage',
  components: { BaseTable, QuestionDialog },
  provide() {
    return {
      getList: this.getList
    }
  },
  data() {
    return {
      uploadOptions,
      listLoading: false,
      list: [],
      listQuery: {
        page: 1,
        limit: 10,
        type: '',
        title: '' // 搜索用户名关键字
      },
      total: 0,
      checkedList: [],
      columns: [
        { type: 'checkbox', width: '40' },
        { title: '类型 ', width: 120, align: 'center', slots: { default: 'col_type' }},
        { title: '题目 ', field: 'title', align: 'left' },
        { title: '操作 ', width: 210, align: 'center', slots: { default: 'col_actions' }}
      ],
      typeOptions: { 'radio': '单选题', 'checkbox': '多选题', 'trueOrfalse': '判断题', 'answer': '问答题', 'completion': '填空题' }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      this.list = []
      const params = {}
      params.page = this.listQuery.page
      params.type = this.listQuery.type
      params.title = this.listQuery.title
      const { data } = await getQuestionListApi(params)
      this.list = data.items
      this.total = data.total
      this.listLoading = false
    },
    async handleDelete(row) {
      const ids = [row.id]
      this.listLoading = true
      try {
        await deleteQuestionByIdsApi(ids)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.getList()
      } catch (error) {
        this.listLoading = false
      }
      this.listLoading = false
    },
    // 批量删除
    async handleBatchDelete() {
      const ids = this.checkedList.map(it => it.id)
      this.listLoading = true
      await deleteQuestionByIdsApi(ids)
      this.$message({
        message: '删除成功',
        type: 'success'
      })
      this.getList()
      this.listLoading = false
    },
    async openQuestionDialog(row) {
      const id = row.id
      this.$refs.userInfoDialogCom.show(id ? row : null)
    },
    // getRadioRecord
    handleCheckboxChange({ records }) {
      console.log(records)
      this.checkedList = records
    },
    handleUploadSuccess(response) {
      this.$message({
        message: '上传成功',
        type: 'success'
      })
      this.getList()
    },
    handleUploadError(response) {
      this.$message({
        message: '上传失败',
        type: 'error'
      })
    }
  }
}
</script>
