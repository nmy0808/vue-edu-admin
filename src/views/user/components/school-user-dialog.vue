<template>
  <div class="school-user-dialog">
    <el-dialog
      title="用户详情"
      top="2%"
      :visible.sync="dialogVisible"
      width="80%"
      @closed="handleClosed"
    >
      <!-- 用户信息 -->
      <div>
        <el-row>
          <el-col class="d-flex" :span="6"><p style="width: 60px;">ID:</p>{{ userInfoData.userId }}</el-col>
          <el-col class="d-flex" :span="6"><p style="width: 60px;">用户名:</p>{{ userInfoData.user.username }}</el-col>
          <el-col class="d-flex" :span="6"><p style="width: 60px;">昵称:</p>{{ userInfoData.user.nickname }}</el-col>
          <el-col class="d-flex" :span="6"><p style="width: 60px;">手机号:</p>{{ userInfoData.user.phone }}</el-col>
        </el-row>
        <el-row>
          <el-col class="d-flex" :span="6"><p style="width: 60px;">锁定:</p>{{ userInfoData.status?'否':'是' }}</el-col>
          <el-col class="d-flex" :span="6"><p style="width: 60px;">会员:</p>{{ userInfoData.user_level }}</el-col>
          <el-col class="d-flex" :span="6"><p style="width: 90px;">会员到期时间:</p>{{ userInfoData.user_level_expire }}</el-col>
          <el-col class="d-flex" :span="6"><p style="width: 90px;">注册时间:</p>{{ userInfoData.created_time }}</el-col>
        </el-row>
      </div>
      <!-- table -->
      <el-tabs v-model="activeName" :before-leave="handleTabChange">
        <el-tab-pane
          v-for="item in tabOptions"
          :key="item.name"
          :label="item.label"
          :name="item.name"
        >
          <base-table
            ref="baseTableCom"
            class="mt-0 border--none"
            :height="480"
            :columns="currentColumns"
            :list="list"
            :pagination="getList"
            :total.sync="total"
            :page.sync="listQuery.page"
            :size.sync="listQuery.size"
            :loading="listLoading"
          >
            <!-- 课程订阅 -->
            <template #col_1_title="{row}">
              <p>{{ row.title }}</p>
            </template>
            <!--  -->
            <template #col_3_expand="{row}">
              <el-tag
                v-for="item in row.goods"
                :key="item.title"
                type="primary"
                class="ms-2 my-3"
              >{{ item.title }}</el-tag>
            </template>
            <template #col_3_status="{row}">
              <el-tag
                v-if="row.status"
                type="success"
              >已支付</el-tag>
              <el-tag
                v-else
                type="info"
              >未支付</el-tag>
            </template>
            <!--  -->
            <template #col_4_total_time="{ row }">
              <el-progress :percentage="parseInt(row.total_time)" />
            </template>
            <template #col_4_type="{ row }">
              {{ courseMap[row.type] }}
            </template>
            <!--  -->
            <template #col_5_type="{ row }">
              {{ courseMap[row.type] }}
            </template>
          </base-table>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import BaseTable from '@/components/BaseTable'
import { getSchoolUserHistoryApi, getSchoolUserOrderListByIdApi, getSchoolUserSubApi } from '@/api/school_user'
export default {
  name: 'SchoolUserDialog',
  components: { BaseTable },
  data() {
    return {
      listLoading: false,
      dialogVisible: false,
      userInfoData: {
        id: null,
        school_id: '',
        user_id: '',
        no_comment: 1,
        no_access: 1,
        total_consume: '',
        created_time: '',
        updated_time: '',
        userId: '',
        user: {
          id: '',
          username: '',
          nickname: '',
          avatar: ''
        }
      },
      list: [],
      listQuery: {
        page: 1,
        limit: 10
      },
      total: 0,
      activeName: '1',
      courseMap: {
        media: '图文',
        video: '视频',
        audio: '音频',
        column: '专栏'
      },
      tabOptions: [
        { name: '1', label: '课程订阅',
          fetchApi: getSchoolUserSubApi,
          columns: [
            { title: '课程标题 ', slots: { default: 'col_1_title' }, align: 'center' },
            { title: '购买价格 ', field: 'price', align: 'center', width: 190 },
            { title: '购买时间 ', field: 'created_time', align: 'center', width: 190 }
          ] },
        { name: '2', label: '专栏订阅',
          fetchApi: getSchoolUserSubApi,
          columns: [
            { title: '课程标题 ', field: 'title', align: 'center' },
            { title: '购买价格 ', field: 'price', align: 'center', width: 190 },
            { title: '购买时间 ', field: 'created_time', align: 'center', width: 190 }
          ]

        },
        { name: '3', label: '订单记录',
          fetchApi: getSchoolUserOrderListByIdApi,
          columns: [
            { type: 'expand', align: 'center', width: 40, slots: { content: 'col_3_expand' }},
            { title: 'ID ', field: 'id', align: 'center', width: 120 },
            { title: '订单号 ', field: 'no', align: 'center' },
            { title: '购买价格 ', field: 'total_price', align: 'center', width: 100 },
            { title: '状态', align: 'center', width: 87, slots: { default: 'col_3_status' }},
            { title: '购买时间 ', field: 'pay_time', align: 'center', width: 190 }
          ]

        },
        { name: '4', label: '观看历史',
          fetchApi: getSchoolUserHistoryApi,
          columns: [
            { title: '课程标题 ', field: 'title', align: 'center' },
            { title: '课程类型 ', align: 'center', width: 190, slots: { default: 'col_4_type' }},
            { title: '学习时长 ', slots: { default: 'col_4_total_time' }, width: 190 }
          ]

        },
        { name: '5', label: '用户评论',
          fetchApi: getSchoolUserSubApi,
          columns: [
            { title: '评论内容', field: 'comment', align: 'center' },
            { title: '评论时间 ', field: 'comment_time', align: 'center', width: 190 },
            { title: '课程标题 ', field: 'title', align: 'center' },
            { title: '类型 ', align: 'center', width: 100, slots: { default: 'col_5_type' }}
          ]

        }
      ]
    }
  },
  computed: {
    currentGetList() {
      return this.tabOptions.find(it => it.name === this.activeName).fetchApi
    },
    currentColumns() {
      return this.tabOptions.find(it => it.name === this.activeName).columns
    },
    // 根据tab切换获取对应请求参数
    fetchParams() {
      const currentName = this.activeName
      const params = {}
      params.page = this.listQuery.page
      params.user_id = this.userInfoData.userId
      switch (currentName) {
        // 课程订阅
        case '1':
          params.type = 'course'
          break
        // 专栏订阅
        case '2':
          params.type = 'column'
          break
        // 订单记录
        case '3':
          break
        // 观看历史
        case '4':
          break
        // 用户评论
        case '5':
          params.type = 'column'
          params.comment = 1
          break
      }
      return params
    }
  },
  methods: {
    show(infoData) {
      this.userInfoData = infoData
      this.getList()
      this.dialogVisible = true
    },
    hide() {
      this.dialogVisible = false
    },
    handleClosed() {
      Object.assign(this.$data, this.$options.data())
    },
    async getList() {
      this.listLoading = true
      this.list = []
      const { data } = await this.currentGetList(this.fetchParams)
      this.list = data.items
      this.total = data.total
      this.listLoading = false
    },
    handleTabChange(newActive, oldActive) {
      if (newActive === oldActive) return
      this.listQuery.page = 1
      this.$nextTick(() => {
        this.getList()
      })
    }
  }
}
</script>
