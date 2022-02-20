<template>
  <div class="course-choose">
    <el-dialog
      title="选择页面"
      :visible.sync="dialogVisible"
      width="80%"
      top="5%"
      @closed="handleClosed"
    >
      <div class="d-flex">
        <!-- main -->
        <div class="flex-fill ps-2 py-0" style="height: 70vh; overflow: hidden; overflow-y: auto">
          <base-table
            ref="baseTableCom"
            class="mt-0 border--none"
            :options="{ height: height, radioConfig:{
              trigger: 'row'
            } }"
            :columns="columns"
            :list="list"
            :pagination="getList"
            :total.sync="total"
            :page.sync="listQuery.page"
            :size.sync="listQuery.size"
            :loading="listLoading"
          >
            <template #col_type="{row}">
              {{ row.type == 'index' ? '首页' : '自定义页面' }}
            </template>
          </base-table>
        </div>
      </div>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import BaseTable from '@/components/BaseTable'
import { getCourseListApi } from '@/api/course'
import { getRenovationListApi } from '@/api/renovation'

export default {
  name: 'CourseChoose',
  components: { BaseTable },
  data() {
    return {
      height: 0,
      listLoading: false,
      dialogVisible: false,
      list: [],
      listQuery: {
        page: 0,
        limit: 10,
        ismobile: 0
      },
      total: 0,
      menuSelectList: null,
      columns: [
        { type: 'radio', width: 50, align: 'center' },
        { title: '页面', field: 'title', width: 200 },
        { title: '类型', slots: { default: 'col_type' }}
      ]
    }
  },
  watch: {
    'dialogVisible': {
      handler(val) {
        if (val) {
          this.getList()
          this.$nextTick(() => {
            const parent = document.querySelector('.el-dialog__body')
            this.height = parent ? parent.offsetHeight - 90 : 0
          })
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      const params = {}
      params.page = this.listQuery.page
      params.ismobile = this.ismobile
      const { items, total } = (await getRenovationListApi(params)).data
      this.list = []
      setTimeout(() => {
        this.list = items
      })
      this.total = total
      this.listLoading = false
    },
    show(ismobile) {
      this.listQuery.ismobile = ismobile
      this.dialogVisible = true
    },
    close() {
      this.dialogVisible = false
    },
    handleClosed() {
      // 清空所有行的选中状态
    },
    confirm() {
      const row = this.$refs.baseTableCom.getRadioRecord()
      if (row) this.$emit('confirm', row)
      this.dialogVisible = false
    },
    menuSelect(type) {
      this.listQuery.page = 1
    }
  }
}
</script>
<style scoped lang="scss">
.el-menu{
  border: none;
}
</style>
