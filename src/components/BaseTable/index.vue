<template>
  <div class="audio-page">
    <vxe-grid
      ref="xTable"
      class="p-0 sortable-row"
      :height="height?height:undefined"
      :data="list"
      v-bind="[mergeOptions, $listeners]"
      :loading="loading"
      :columns="columns"
      @checkbox-change="handleCheckboxChange"
      @checkbox-all="handleCheckboxChange"
    >
      <!-- <template type="expand" width="80">
        <template #content="{ row, rowIndex }">1231322</template>
      </template> -->

      <template v-for="item in slotNames" #[item]="slotData">
        <CRender
          :key="item"
          :render-fn="$scopedSlots[item]"
          :slot-data="slotData"
        />
      </template>
      <template v-if="isPager" #pager>
        <pagination
          class="p-0"
          :total="total"
          :page="page"
          :limit="limit"
          @pagination="pagination"
          @size-change="handleSizeChange"
          @update:page="handleCurrentChange"
        />
      </template>
    </vxe-grid>
  </div>
</template>
<script>
/**
 * slots:
 * empty    空数据时显示的文本内容
 * form     表单模板
 * toolbar  工具栏模板
 * top      表格顶部模板
 * bottom   表格底部模板
 * pager    分页模板
 */
import Pagination from '@/components/Pagination'
import Sortable from 'sortablejs'
import CRender from './render.vue'
import { clone, isEqual, merge } from 'xe-utils'
import {
  deleteCourseByIdApi,
  getCourseListApi,
  updateCourseStatusApi
} from '@/api/course'
export default {
  name: 'BaseTable',
  components: { Pagination, CRender },
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    },
    columns: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => []
    },
    isPager: {
      type: Boolean,
      default: true
    },
    drag: {
      type: Boolean,
      default: false
    },
    dragHandleClass: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 10
    },
    // 渲染数据列表方法
    pagination: {
      type: Function,
      default: () => {
        console.warn('缺少 getList 方法')
      }
    },
    // 打印配置
    exportConfig: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      gridOptions: {
        // loading: false,
        border: true,
        resizable: true,
        showHeaderOverflow: true,
        showOverflow: true,
        highlightHoverRow: true,
        align: 'left',
        // toolbarConfig: {
        //   slots: {
        //     // 自定义工具栏模板
        //     buttons: 'buttons',
        //     tools: 'tools'
        //   }
        // },
        rowConfig: {
          height: 80,
          isCurrent: true, isHover: true
        },
        // printConfig: {
        //   title: '123'
        // },
        // importConfig: {
        //   remote: true,
        //   importMethod: this.importMethod,
        //   types: ['xlsx'],
        //   modes: ['insert']
        // },
        // exportConfig: {
        //   // remote: true,
        //   exportMethod: this.exportMethod,
        //   types: ['xlsx'],
        //   modes: ['current', 'selected', 'all']
        // },
        checkboxConfig: {
          showHeader: true,
          trigger: 'default',
          highlight: true
        },
        columns: [
          // { type: 'expand', slots: { default: 'col_3_expend' }}
        ]
      }
    }
  },
  computed: {
    mergeOptions() {
      const result = merge(clone(this.gridOptions, true), this.options)
      // 判断是否配置导出功能
      if (this.exportConfig) {
        const defaultExportConfig = {
          // remote: true,
          types: ['xlsx'],
          modes: ['current', 'selected', 'all']
        }
        const mergeExportConfig = merge(defaultExportConfig, this.exportConfig)
        result.exportConfig = mergeExportConfig
      }
      return result
    },
    slotNames() {
      return Object.keys(this.$scopedSlots)
    }
  },
  mounted() {
    if (this.drag) {
      this.rowDrop()
    }
  },
  methods: {
    // 刷新列配置
    refreshColumn() {
      this.$refs.xTable.refreshColumn()
    },
    // 用于 type=checkbox，设置所有行的选中状态
    setAllCheckboxRow() {
      this.$refs.xTable.setAllCheckboxRow()
    },
    // 当手动勾选并且值发生改变时触发的事件
    handleCheckboxChange(...arg) {
      this.$emit('checkbox-change', ...arg)
    },
    // 获取单选选中
    getRadioRecord() {
      return this.$refs.xTable.getRadioRecord()
    },
    // 用于 type=checkbox，获取当前已选中的行数据（当前列表，如果 isFull=true 则获取全表已选中的数据）
    getCheckboxRecords() {
      return this.$refs.xTable.getCheckboxRecords()
    },
    handleSizeChange(val) {
      this.$emit('update:limit', val)
    },
    handleCurrentChange(val) {
      console.log(val)
      this.$emit('update:page', val)
    },
    exportMethod(e) {
      console.log(e)
    },
    importMethod(e) {
      console.log(e)
    },
    // 导出文件
    exportEvent() {
      this.$refs.xTable.openExport({
        // 默认勾选源
        original: true
      })
    },
    // 初始化拖拽
    rowDrop() {
      this.$nextTick(() => {
        const xTable = this.$refs.xTable
        this.sortable1 = Sortable.create(
          xTable.$el.querySelector('.body--wrapper>.vxe-table--body tbody'),
          {
            handle: '.' + this.dragHandleClass,
            onEnd: ({ newIndex, oldIndex }) => {
              const list = clone(this.list, true)
              const currRow = list.splice(oldIndex, 1)[0]
              list.splice(newIndex, 0, currRow)
              this.$emit('dragEnd', list)
            }
          }
        )
      })
    }
  }
}
</script>
<style scoped lang="scss">
::v-deep .sortable-row .drag-btn {
  cursor: move;
  font-size: 12px;
}
::v-deep .sortable-row .vxe-body--row.sortable-ghost,
::v-deep .sortable-row .vxe-body--row.sortable-chosen {
  background-color: #dfecfb;
}
</style>
