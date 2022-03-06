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
          <el-select v-model="listQuery.answer_status" placeholder="答题状态">
            <el-option
              v-for="item in answerStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select v-model="listQuery.read_status" class="mx-2" placeholder="阅卷状态">
            <el-option
              v-for="item in readStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="getList"
          >搜索</el-button>
        </div>
      </template>
      <template #col_answer_status="{ row }">
        <span v-if="row.answer_status" class="text-success">答题完成</span>
        <span v-else type="danger">未完成</span>
      </template>
      <template #col_read_status="{ row }">
        <el-tag v-if="row.read_status" type="success">是</el-tag>
        <el-tag v-else type="danger">否</el-tag>
      </template>
      <template #col_actions="{ row }">
        <el-button
          style="width: 70px"
          type="primary"
          size="mini"
          class="me-2"
          :disabled="row.read_status === 1"
          @click="handleOpenReadDialog(row.id)"
        >{{ row.read_status ? '已阅卷':'阅卷' }}</el-button>
        <el-popconfirm
          title="这是一段内容确定删除吗？"
          @onConfirm="handleDeleteRow(row)"
        >
          <el-button
            slot="reference"
            style="width: 70px"
            size="mini"
            type="danger"
          >
            删除
          </el-button>
        </el-popconfirm>
      </template>
    </base-table>
    <UserTestDialog ref="userTestDialogCom" />
  </div>
</template>
<script>

import BaseTable from '@/components/BaseTable'
import { deleteUserTestByIdsApi, getUserTestByIdApi, getUserTestListApi } from '@/api/tool'
import UserTestDialog from './components/UserTestDialog'
export default {
  name: 'QuestionPage',
  components: { BaseTable, UserTestDialog },
  provide() {
    return {
      getList: this.getList
    }
  },
  data() {
    return {
      answerStatusOptions: [
        {
          label: '答题中',
          value: 0
        },
        {
          label: '答题完成',
          value: 1
        }
      ],
      readStatusOptions: [
        {
          label: '否',
          value: 0
        },
        {
          label: '是',
          value: 1
        }
      ],
      listLoading: false,
      list: [],
      listQuery: {
        page: 1,
        limit: 10,
        answer_status: '', //  回答状态：0否1是
        read_status: '' //  阅卷状态：0否1是
      },
      total: 0,
      columns: [
        { title: 'ID', field: 'id', width: '90', align: 'center' },
        { title: '用户名', field: 'user.username', width: '130', align: 'center' },
        { title: '试卷标题', field: 'testpaper.title', align: 'left' },
        { title: '答题状态', width: 120, align: 'center', slots: { default: 'col_answer_status' }},
        { title: '是否阅卷 ', width: 120, align: 'center', slots: { default: 'col_read_status' }},
        { title: '开始时间', field: 'created_time', width: 220, align: 'center' },
        { title: '分数', field: 'score', width: 120, align: 'center' },
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
      params.answer_status = this.listQuery.answer_status
      params.read_status = this.listQuery.read_status
      const { data } = await getUserTestListApi(params)
      this.list = data.items
      this.total = data.total
      this.listLoading = false
    },
    async handleDeleteRow(row) {
      const params = [row.id]
      await deleteUserTestByIdsApi(params)
      this.$message({
        message: '删除成功',
        type: 'success'
      })
      this.getList()
    },
    // 打开阅读状态设置的dialog弹窗
    async handleOpenReadDialog(id) {
      const { data } = await getUserTestByIdApi(id)
      this.$refs.userTestDialogCom.show(data)
    },
    // 跳转至组卷页面
    toPageTestpaperForm(row) {
      this.$router.push({ name: 'TestpaperForm', query: { id: row.id }})
    }
  }
}
</script>
