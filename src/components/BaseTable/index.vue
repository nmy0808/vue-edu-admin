<template>
  <div class="audio-page">
    <vxe-grid
      class="p-0"
      :data="list"
      v-bind="[mergeOptions, $listeners]"
      :loading="loading"
      :columns="columns"
    >
      <template
        v-for="item in slotNames"
        #[item]="slotData"
      >
        <CRender :key="item" :render-fn="$scopedSlots[item]" :slot-data="slotData" />
      </template>
      <template v-if="isPager" #pager>
        <pagination
          class="p-0"
          :total="total"
          :page="page"
          :limit="limit"
          @pagination="pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
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
import CRender from './render.vue'
import { clone, merge } from 'xe-utils'
import { deleteCourseByIdApi, getCourseListApi, updateCourseStatusApi } from '@/api/course'
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
          height: 80
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
        columns: [
        ]
      }
    }
  },
  computed: {
    mergeOptions() {
      return merge(clone(this.gridOptions, true), this.options)
    },
    slotNames() {
      return Object.keys(this.$scopedSlots)
    }
  },
  mounted() {
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('update:limit', val)
    },
    handleCurrentChange(val) {
      this.$emit('update:size', val)
    },
    exportMethod(e) {
      console.log(e)
    },
    importMethod(e) {
      console.log(e)
    }
  }
}
</script>
<style scoped lang="scss">
</style>
