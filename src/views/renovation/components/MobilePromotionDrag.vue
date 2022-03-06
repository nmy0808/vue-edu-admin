<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" @click="handleAssociationCourse">关联课程</el-button>
    <p class="mt-1 text-black-50 fs-7">(最多关联10门课程,支持拖拽排序)</p>
    <draggable
      :list="tempList"
      :disabled="!enabled"
      class="list-group"
      ghost-class="ghost"
      :move="checkMove"
      @start="dragging = true"
      @end="dragging = false"
    >
      <div
        v-for="(item, index) in tempList"
        :key="index"
        class="mb-2 list-item bg-light border"
        style="height:92px;position: relative;"
      >
        <el-popconfirm
          class="cursor-pointer"
          title="这是一段内容确定删除吗？"
          style="position:absolute;left:37%; bottom: 10px"
          @onConfirm="deleteItem"
        >
          <div
            slot="reference"
            class="el-icon-delete text-danger"
            style="transform:translateX(200px);"
          />
        </el-popconfirm>
        <div class="list-item d-flex cursor-move">
          <img width="140px" height="90px" v-lazy="item.cover" alt="">
          <div class="ps-2">
            <div class="d-flex flex-column items-start justify-content-start">
              <span class="font-size-16 text-weight-bold overtext">{{ item.title }}</span>
            <!-- <span
              class="font-size-14 text-black-50 p-0 m-0 overtext"
              style="transform:translateY(-10px);height:20px;"
            >{{ item.try }}</span> -->
            </div>
            <div class="item mt-2" style="transform:translateY(-10px);">
              <span class="font-size-14 text-weight-bold text-danger">¥{{ item.price }}</span>
              <del class="font-size-12 text-black-50 ms-1">¥{{ item.t_price }}</del>
            </div>
          </div>
        </div>
      </div>
    </draggable>
    <course-choose ref="courseChooseCom" @confirm="handleSelectCourseConfirm" />
  </div>
</template>

<script>
import CourseChoose from '@/components/CourseChoose'
import draggable from 'vuedraggable'
import { clone, isEqual } from 'xe-utils'
const id = 1
export default {
  name: 'Simple',
  display: 'Simple',
  order: 0,
  components: {
    draggable, CourseChoose
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tempList: [],
      enabled: true,
      dragging: false
    }
  },
  computed: {
    draggingInfo() {
      return this.dragging ? 'under drag' : ''
    }
  },
  watch: {
    'list': {
      handler() {
        this.tempList = clone(this.list, true)
      },
      immediate: true
    }
  },
  created() {
    this.tempList = clone(this.list, true)
  },
  methods: {
    // add: function(row) {
    //   this.tempList.push(row)
    // },
    deleteItem: function(row) {
      const index = this.tempList.filter(item => {
        return isEqual(row, item)
      })
      this.tempList.splice(index, 1)
      this.$emit('change', this.tempList)
    },
    checkMove(e) {
      this.$emit('change', this.tempList)
    },
    // list: 关联课程
    handleAssociationCourse() {
      this.$refs.courseChooseCom.show()
    },
    // list: 选择关联课程的确认事件
    handleSelectCourseConfirm(list) {
      this.tempList = this.tempList.concat(list)
      this.$emit('change', this.tempList.concat(list))
    }
  }
}
</script>
<style scoped>
.buttons {
  margin-top: 35px;
}

::v-deep .ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
