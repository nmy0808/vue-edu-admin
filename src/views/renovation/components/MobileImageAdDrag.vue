<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" :disabled="tempList.length === 1" @click="add">新增图片广告</el-button>
    <p class="mt-1 font-size-12 text-black-50">( 只支持1个图片广告 )</p>
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
        class="mb-2 list-item bg-light"
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
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            @click.native="handleClickActiveIndex(index)"
          >
            <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
            <img v-if="item.src" class="avatar" width="140px" height="90px" :src="item.src" alt="">
            <div v-else style="width: 140px; height:90px; background-color: #eee;" class="d-flex align-items-center justify-content-center">
              <i class="h3 el-icon-plus avatar-uploader-icon" />
            </div>
          </el-upload>
          <div class="ps-2">
            <el-select
              v-model="item.type"
              placeholder="请选择关联"
              class="mt-2"
              style="width: 120px;"
              @change="handleTypeChange"
            >
              <el-option
                v-for="it in options"
                :key="it.value"
                :label="it.label"
                :value="it.value"
              />
            </el-select>
            <div class="mt-1">
              <el-input v-if="item.type === 'webview'" v-model="item.url" style="width: 210px;" placeholder="请输入url" @change="handleTypeChange" />
              <el-button
                v-if="item.type === 'course'"
                type="primary"
                placeholder="请输入url"
                icon="el-icon-plus"
                @click.stop="handleSelectCourse(index)"
              >
                {{ item.course_title?item.course_title:'关联课程' }}
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </draggable>
    <course-choose ref="courseChooseCom" is-radio @confirm="handleConfirmCourse" />
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
    draggable,
    CourseChoose
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
      type: '',
      enabled: true,
      dragging: false,
      options: [
        { label: '课程', value: 'course' },
        { label: '网页地址', value: 'webview' }
      ]
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
    add: function() {
      if (this.tempList.length === 1) return
      this.tempList.push({
        src: '',
        type: '', // 课程course, 网页地址webview
        course_title: '',
        course_id: '',
        url: ''
      })
    },
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
    handleTypeChange() {
      this.$emit('change', this.tempList)
    },
    // 打开关联课程窗口
    handleSelectCourse(index) {
      this.activeIndex = index
      this.$refs.courseChooseCom.show()
    },
    // 确认选择关联课程
    handleConfirmCourse(course) {
      const item = this.tempList[this.activeIndex]
      item.src = course.cover
      item.type = 'course'
      item.course_title = course.title
      item.course_id = course.id
      item.url = ''
      this.$emit('change', this.tempList)
    },
    // 点击激活index事件
    handleClickActiveIndex(index) {
      this.activeIndex = index
    },
    // 上传成功事件
    handleAvatarSuccess(res, file) {
      const item = this.tempList[this.activeIndex]
      item.src = URL.createObjectURL(file.raw)
      this.$emit('change', this.tempList)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
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
