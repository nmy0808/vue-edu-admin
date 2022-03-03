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
            @click="$refs.BbsDialogCom.open()"
          >新增社群</el-button>
        </div>
      </template>
      <template #col_status="{ row }">
        <el-tag v-if="row.status" type="success">显示</el-tag>
        <el-tag v-else type="danger">隐藏</el-tag>
      </template>
      <template #col_manager="{ row }">
        {{ convertAdminName(row.managers) }}
      </template>
      <template #col_created_time="{ row }">
        {{ convertDate(row.created_time) }}
      </template>
      <template #col_actions="{ row }">
        <el-button
          class=""
          type="primary"
          size="mini"
          style="width: 60px;"
          @click="$router.push({name :'BbsPost',params: {id: row.id}})"
        >管理</el-button>
        <el-button
          class="me-2"
          :type="row.status?'danger':'success'"
          size="mini"
          style="width: 60px;"
          @click="setBbsStatus(row)"
        >{{ row.status?'隐藏':'显示' }}</el-button>
        <el-dropdown size="mini">
          <el-button size="mini" style="width: 60px;">
            更多<i class="el-icon-arrow-down el-icon--right" />
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="$refs.BbsDialogCom.open(row)">编辑</el-dropdown-item>
            <el-dropdown-item @click.native="updateSchoolUser(row.id)">修改管理员</el-dropdown-item>
            <el-dropdown-item @click.native="handleDeleteBbs(row)">删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </base-table>
    <bbs-dialog ref="BbsDialogCom" />
    <SchoolUserChoose
      ref="SchoolUserChoose"
    />
  </div>
</template>
<script>

import BaseTable from '@/components/BaseTable'
import BbsDialog from './components/BbsDialog.vue'
import SchoolUserChoose from '@/components/SChoolUserChoose/index.vue'
import { deleteBbsByIdsApi, getBbsListApi, setBbsManagerApi, setBbsStatusApi } from '@/api/tool'
import { toDateString } from 'xe-utils'
export default {
  name: 'QuestionPage',
  components: { BaseTable, BbsDialog, SchoolUserChoose },
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
        limit: 10
      },
      total: 0,
      columns: [
        { title: 'ID', field: 'id', width: '90', align: 'center' },
        { title: '社区名称', field: 'title', align: 'left' },
        { title: '管理员', minWidth: 120, align: 'center', slots: { default: 'col_manager' }},
        { title: '创建时间', width: 190, align: 'center', slots: { default: 'col_created_time' }},
        { title: '状态', width: 90, align: 'center', slots: { default: 'col_status' }},
        { title: '操作 ', width: 250, align: 'center', slots: { default: 'col_actions' }}
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
      const { data } = await getBbsListApi(params)
      this.list = data.items
      this.total = data.total
      this.listLoading = false
    },
    async handleDeleteBbs(row) {
      this.$confirm(`确定删除'${row.title}'?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        // 删除fetch
        const params = {}
        params.ids = [row.id]
        await deleteBbsByIdsApi(params)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getList()
      }).catch(err => err)
    },
    // 显示/隐藏社区
    async setBbsStatus(row) {
      const { id, status } = row
      const params = {}
      params.id = id
      params.status = !status
      await setBbsStatusApi(params)
      this.list.find(it => it.id === id).status = params.status
      this.$message({
        message: status ? '已隐藏' : '已显示',
        type: status ? 'danger' : 'success'
      })
    },
    // 修改管理员
    updateSchoolUser(id) {
      // 确认选择管理员 (回调的方式)
      this.$refs.SchoolUserChoose.show(async(users) => {
        const params = {}
        params.id = id
        params.user_ids = users.map(it => it.id)
        // fetch
        await setBbsManagerApi(params)
        this.getList()
        this.$message({
          message: '修改完成',
          type: 'success'
        })
      })
    },

    // 转换管理员名字格式
    convertAdminName(list) {
      return list.map(it => it.username || it.nickname).join(', ')
    },
    convertDate(date) {
      return toDateString(date)
    }
  }
}
</script>
