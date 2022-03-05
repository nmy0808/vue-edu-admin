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
            type="primary"
            icon="el-icon-back"
            @click="$router.push({name: 'Bbs'})"
          >返回社区列表</el-button>
        </div>
      </template>
      <template #col_content="{ row }">
        <el-popover
          v-for="(item,index) in row.content"
          :key="index"
          placement="bottom"
          width="400"
          trigger="hover"
          content="这是一段内容"
        >
          <p class="fs-6">{{ item.text }}</p>
          <template v-for="(image,iIndex) in item.images">
            <img :key="iIndex" height="80px" width="80px" class="me-2 mb-2" v-lazy="image" alt="">
          </template>
          <el-tag slot="reference" effect="light" class="me-2 cursor-pointer" type="">{{ item.text }}</el-tag>
        </el-popover>
        <!-- <div v-for="(item,index) in row.content" :key="index">
          <div style="height: 50px;">
            <template v-for="(image,iIndex) in item.images">
              <img :key="iIndex" height="100%" class="me-2" v-lazy="image" alt="">
            </template>
          </div>
        </div> -->
      </template>
      <template #col_date="{ row }">
        {{ conversionTimeFormat(row.created_time) }}
      </template>
      <template #col_actions="{ row }">
        <el-button
          style="width: 80px;"
          type=""
          size="mini"
          @click="handleSeeRep(row)"
        >查看回复</el-button>
        <el-button
          style="width: 80px;"
          class="me-2"
          :type="row.is_top ? 'info': 'primary'"
          size="mini"
          @click="setPostTopStatus(row)"
        >{{ row.is_top ? '取消置顶' : '置顶' }}</el-button>
        <el-popconfirm
          title="这是一段内容确定删除吗？"
          @onConfirm="handleDeleteRow(row)"
        >
          <el-button
            slot="reference"
            style="width: 80px;"
            size="mini"
            type="danger"
          >
            删除
          </el-button>
        </el-popconfirm>
      </template>
    </base-table>
    <post-dialog ref="postDialogCom" />
  </div>
</template>
<script>

import BaseTable from '@/components/BaseTable'
import PostDialog from './components/PostDialog'
import { deletePostByIdApi, getPostCommentApi, getPostListApi, setPostTopStatusApi } from '@/api/tool'
import { toDateString } from 'xe-utils'
export default {
  name: 'QuestionPage',
  components: { BaseTable, PostDialog },
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
        { title: '帖子内容 (鼠标滑过显示详情)', field: 'content', minWidth: '190', height: 800, align: 'left', slots: { default: 'col_content' }},
        { title: '用户', field: 'user.username', width: '190', align: 'center' },
        { title: '创建时间', width: '210', align: 'center', slots: { default: 'col_date' }},
        { title: '点赞数', field: 'support_count', width: '120', align: 'center' },
        { title: '评论数', field: 'comment_count', width: '120', align: 'center' },
        { title: '操作 ', width: 290, align: 'center', slots: { default: 'col_actions' }}
      ]
    }
  },
  computed: {
    bbs_id() {
      return this.$route.params.id
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
      params.bbs_id = this.bbs_id
      const { data } = await getPostListApi(params)
      this.list = data.items
      this.total = data.total
      this.listLoading = false
    },
    async handleDeleteRow(row) {
      const params = {}
      params.ids = [row.id]
      params.bbs_id = this.bbs_id
      await deletePostByIdApi(params)
      this.$message({
        message: '删除成功',
        type: 'success'
      })
      this.getList()
    },
    // 置顶
    async setPostTopStatus(row) {
      const params = {}
      params.id = row.id
      params.is_top = +!row.is_top
      this.listLoading = true
      setPostTopStatusApi(params).then(_ => {
        this.list.find(it => it.id === row.id).is_top = params.is_top
        this.$message({
          message: params.is_top ? '已置顶' : '取消置顶',
          type: params.is_top ? 'success' : 'info'
        })
      }).finally(() => {
        this.listLoading = false
      })
    },
    // 查看回复(帖子评论列表)
    async handleSeeRep(row) {
      const id = row.id
      this.$refs.postDialogCom.open(id)
    },
    // 转换时间格式
    conversionTimeFormat(data) {
      return toDateString(data)
    }
  }
}
</script>
