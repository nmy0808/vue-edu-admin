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
    >
      <template #form>
        <div class="d-flex pb-3">
          <el-button
            type="success"
            icon="el-icon-plus"
            @click="$router.push({name: 'TestpaperForm'})"
          >手动组卷</el-button>
          <el-button type="primary">考试管理</el-button>
          <el-input
            v-model="listQuery.title"
            class="w-25 me-2 ms-auto"
            clearable
            placeholder="请输入标题"
          />
          <el-button type="primary" icon="el-icon-search" @click="getList">搜索</el-button>
        </div>
      </template>
      <template #col_status="{ row }">
        <el-tag v-if="row.status" type="success">是</el-tag>
        <el-tag v-else type="danger">否</el-tag>
      </template>
      <template #col_actions="{ row }">
        <el-button type="primary" size="mini" @click="toPageTestpaperForm(row)">编辑</el-button>
        <el-popconfirm
          title="这是一段内容确定删除吗？"
          @onConfirm="handleDeleteRow(row)"
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

import BaseTable from '@/components/BaseTable'
import { deleteTestpaperByIdsApi, getTestpaperListApi } from '@/api/tool'
import axios from 'axios'
export default {
  name: 'QuestionPage',
  components: { BaseTable },
  provide() {
    return {
      getList: this.getList
    }
  },
  data() {
    return {
      listLoading: false,
      list: [],
      listQuery: {
        page: 1,
        limit: 10,
        type: '',
        title: '' // 搜索用户名关键字
      },
      total: 0,
      columns: [
        { title: 'ID', field: 'id', width: '90', align: 'center' },
        { title: '试卷标题 ', field: 'title', align: 'left' },
        { title: '是否公开 ', width: 120, align: 'center', slots: { default: 'col_status' }},
        { title: '总分', field: 'total_score', width: 120, align: 'center' },
        { title: '及格分', field: 'pass_score', width: 120, align: 'center' },
        { title: '时长(分钟)', field: 'expire', width: 120, align: 'center' },
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
      const { data } = await getTestpaperListApi(params)
      this.list = data.items
      this.total = data.total
      this.listLoading = false
    },
    async handleDeleteRow(row) {
      const params = [row.id]
      await deleteTestpaperByIdsApi(params)
      this.$message({
        message: '删除成功',
        type: 'success'
      })
      this.getList()
    },
    // 跳转至组卷页面
    toPageTestpaperForm(row) {
      this.$router.push({ name: 'TestpaperForm', query: { id: row.id }})
    }
  }
}
</script>
