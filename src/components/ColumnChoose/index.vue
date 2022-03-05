<template>
  <div class="course-choose">
    <el-dialog
      title="选择专栏"
      :visible.sync="dialogVisible"
      width="80%"
      top="5%"
      :modal-append-to-body="false"
      append-to-body
      @closed="handleClosed"
    >
      <div class="d-flex">
        <!-- left -->
        <div class="" style="width: 100px; height: 70vh; overflow-y: auto">
          <el-menu
            class="h-100 bg-light"
            :default-active="activeIndex"
            mode="vertical"
            @select="menuSelect"
          >
            <el-menu-item index="column">专栏</el-menu-item>
          </el-menu>
        </div>
        <!-- right -->
        <div class="flex-fill ps-2 py-0" style="height: 70vh; overflow: hidden; overflow-y: auto">
          <base-table
            ref="baseTableCom"
            class="mt-0 border--none"
            :options="{ height: height , checkboxConfig:{
              highlight: !isRadio,
              trigger: 'row'
            }, radioConfig:{highlight: false, trigger: 'row'}}"
            :columns="columnsComputed"
            :list="list"
            :pagination="getList"
            :total.sync="total"
            :page.sync="listQuery.page"
            :size.sync="listQuery.size"
            :loading="listLoading"
            @checkbox-change="handleCheckboxChange"
          >
            <template #col_content="{row}">
              <div class="d-flex">
                <img v-lazy="row.cover" alt="" width="100px">
                <div class="ms-2 d-flex flex-column h7">
                  <p class="p-0 m-0">
                    {{ row.title }}
                  </p>
                  <p class="p-0 m-0 mt-3 text-red">¥ {{row.price }}</p>
                </div>
              </div>
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
import { getColumnListApi } from '@/api/column'

export default {
  name: 'CourseChoose',
  components: { BaseTable },
  props: {
    isRadio: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      height: 0,
      listLoading: false,
      dialogVisible: false,
      list: [],
      listQuery: {
        page: 0,
        limit: 10
      },
      total: 0,
      activeIndex: 'column',
      menuSelectList: []
      // columns: [
      //   { title: '内容', slots: { default: 'col_content' }}
      // ]
    }
  },
  computed: {
    columnsComputed() {
      const columns = [
        { title: '内容', slots: { default: 'col_content' }}
      ]
      const checkbox = { type: 'checkbox', title: '', width: '43' }
      const radio = { type: 'radio', title: '', width: '43' }
      if (this.isRadio) {
        columns.unshift(radio)
      } else {
        columns.unshift(checkbox)
      }
      return columns
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
    },
    'activeIndex': {
      handler(type) {
        this.getList()
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
      params.limit = this.listQuery.limit
      params.status = null
      params.title = ''
      const { items, total } = (await getColumnListApi(params)).data
      this.list = []
      setTimeout(() => {
        this.list = items
      })
      this.total = total
      this.listLoading = false
    },
    show() {
      this.dialogVisible = true
    },
    close() {
      this.dialogVisible = false
    },
    handleClosed() {
      // 清空所有行的选中状态
      this.menuSelectList = []
      this.$refs.baseTableCom.setAllCheckboxRow()
    },
    confirm() {
      if (this.isRadio) {
        const row = this.$refs.baseTableCom.getRadioRecord()
        if (row) {
          this.$emit('confirm', row)
        }
      } else {
        const len = this.menuSelectList.length
        if (len > 0) {
          this.$emit('confirm', this.menuSelectList)
        }
      }
      this.dialogVisible = false
    },
    menuSelect(type) {
      this.activeIndex = type
      this.listQuery.page = 1
    },
    // 当手动勾选并且值发生改变时触发的事件
    handleCheckboxChange({ records }) {
      this.menuSelectList = records
    }
  }
}
</script>
<style scoped lang="scss">
.el-menu{
  border: none;
}
</style>
