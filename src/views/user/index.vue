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
          <el-input v-model="listQuery.keyword" class="w-25 me-2" clearable placeholder="请输入用户名" />
          <el-button type="primary" icon="el-icon-search" @click="getList">搜索</el-button>
          <el-dropdown class="ms-auto">
            <el-button :disabled="!checkedList.length">
              批量设置<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleBatchSetCommentStatus(1)">
                禁止评论</el-dropdown-item>
              <el-dropdown-item @click.native="handleBatchSetCommentAccess(1)">
                禁止访问</el-dropdown-item>
              <el-dropdown-item @click.native="handleBatchSetCommentStatus(0)">
                允许评论</el-dropdown-item>
              <el-dropdown-item @click.native="handleBatchSetCommentAccess(0)">
                允许访问</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </template>
      <template #col_user="{ row }">
        <div class="d-flex align-items-center">
          <img v-lazy="row.user.avatar" alt="" class="el-avatar--circle el-avatar--medium">
          <!-- <el-avatar :src="row.user.avatar" /> -->
          <div class="ms-2">
            {{ row.user.username }}
          </div>
        </div>
      </template>
      <template #col_total_consume="{ row }">
        <span class="text-danger">¥ {{ row.total_consume }}</span>
      </template>
       <template #col_created_date="{ row }">
        <span>{{ conversionTimeFormat(row.created_time) }}</span>
      </template>
      <template #col_actions="{ row }">
        <el-button type="primary" size="mini" @click="openUserInfoDialog(row)">详情</el-button>
        <el-dropdown class="ms-2">
          <el-button type="danger" size="mini">
            黑名单设置<i class="el-icon-arrow-down el-icon--right" />
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleSetCommentStatus(row)">
              {{ row.no_comment?'允许评论':'禁止评论' }}</el-dropdown-item>
            <el-dropdown-item @click.native="handleSetCommentAccess(row)">
              {{ row.no_access?'允许访问':'禁止访问' }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </base-table>
    <school-user-dialog ref="userInfoDialogCom" />
  </div>
</template>
<script>
import BaseTable from '@/components/BaseTable'
import { getSchoolUserInfoApi, getSchoolUserListApi, setSchoolUserAccessApi, setSchoolUserCommentApi } from '@/api/school_user'
import SchoolUserDialog from './components/school-user-dialog.vue'
import axios from 'axios'
import { toDateString } from 'xe-utils'
export default {
  name: '',
  components: { BaseTable, SchoolUserDialog },
  data() {
    return {
      listLoading: false,
      list: [],
      listQuery: {
        page: 1,
        limit: 10,
        keyword: '' // 搜索用户名关键字
      },
      total: 0,
      checkedList: [],
      columns: [
        { type: 'checkbox', width: '40' },
        { title: '用户 ', slots: { default: 'col_user' }},
        { title: '消费总额 ', width: 120, align: 'center', slots: { default: 'col_total_consume' }},
        { title: '创建时间 ', field: 'created_time', align: 'center', width: 190, slots: { default: 'col_created_date' }},
        { title: '操作 ', width: 210, align: 'center', slots: { default: 'col_actions' }}
      ]
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
      params.keyword = this.listQuery.keyword
      const { data } = await getSchoolUserListApi(params)
      this.list = data.items
      this.total = data.total
      this.listLoading = false
    },
    async openUserInfoDialog(row) {
      const userId = row.userId
      const { data: userInfoData } = await getSchoolUserInfoApi(userId)
      this.$refs.userInfoDialogCom.show(userInfoData)
    },
    // 评论处理
    async handleSetCommentStatus(row) {
      let no_comment
      const params = {}
      params.id = row.userId
      if (row.no_comment === 1) {
        no_comment = 0
      } else {
        no_comment = 1
      }
      params.no_comment = no_comment
      await setSchoolUserCommentApi(params)
      this.list.find(it => it.userId === row.userId).no_comment = no_comment
      this.$message({
        message: no_comment ? '已禁止' : '已开启',
        type: no_comment ? 'danger' : 'success'
      })
    },
    // 访问处理
    async handleSetCommentAccess(row) {
      let no_access
      const params = {}
      params.id = row.userId
      if (row.no_access === 1) {
        no_access = 0
      } else {
        no_access = 1
      }
      params.no_access = no_access
      await setSchoolUserAccessApi(params)
      this.list.find(it => it.userId === row.userId).no_access = no_access
      this.$message({
        message: no_access ? '已禁止' : '已开启',
        type: no_access ? 'danger' : 'success'
      })
    },
    // 批量评论处理
    handleBatchSetCommentStatus(val) {
      if (this.checkedList.length > 0) {
        const fetches = this.checkedList.map(it => {
          const params = {}
          params.id = it.userId
          params.no_comment = val
          return setSchoolUserCommentApi(params)
        })
        axios.all(fetches.filter(it => it.no_comment !== val))
          .then(res => {
            this.$message({
              message: val ? '已批量禁止评论' : '已批量开启评论',
              type: val ? 'error' : 'success'
            })
          }).catch(err => err)
        this.$refs.baseTableCom.setAllCheckboxRow()
        this.getList()
        this.checkedList = []
      }
    },
    // 批量访问处理
    handleBatchSetCommentAccess(val) {
      if (this.checkedList.length > 0) {
        const fetches = this.checkedList.map(it => {
          const params = {}
          params.id = it.userId
          params.no_access = val
          return setSchoolUserAccessApi(params)
        })
        axios.all(fetches.filter(it => it.no_access !== val))
          .then(res => {
            this.$message({
              message: val ? '已批量禁止访问' : '已批量开启访问',
              type: val ? 'error' : 'success'
            })
          }).catch(err => err)
        this.$refs.baseTableCom.setAllCheckboxRow()
        this.getList()
        this.checkedList = []
      }
    },
    handleCheckboxChange({ records }) {
      this.checkedList = records
    },
    // 转换时间格式
    conversionTimeFormat(data) {
      return toDateString(data)
    }
  }
}
</script>
