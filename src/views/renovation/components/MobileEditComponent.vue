<template>
  <div class="p-3">
    <el-form ref="formCom" label-width="80px" label-position="left">
      <!-- search -->
      <template v-if="type === 'search'">
        <el-form-item label="占位提示">
          <el-input v-model="search.placeholder" class="w-75" @input="handleChange('placeholder')" />
        </el-form-item>
      </template>
      <!-- list -->
      <template v-else-if="type === 'list'">
        <el-form-item label="类型">
          <el-radio-group v-model="list.listType" @input="handleChange('listType')">
            <el-radio label="one">单栏</el-radio>
            <el-radio label="two">多栏</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="list.title" placeholder="请输入列表标题" @input="handleChange('title')" />
        </el-form-item>
        <el-form-item label="更多">
          <el-radio-group v-model="list.showMore" @input="handleChange('showMore')">
            <el-radio :label="true">显示</el-radio>
            <el-radio :label="false">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="更多链接">
          <el-button :type="list.more ? 'default':'primary'" @click="handleSelectPage">
            {{ list.more?list.more.title:'选择页面' }}</el-button>
        </el-form-item>
        <el-form-item label="课程列表">
          <el-button
            type="success"
            class="text-center"
            @click="handleAssociationCourse"
          >关联课程</el-button>
          <span class="ms-2 text-black-50 font-size-12">( 最多关联10门, 支持拖拽排序 )</span>
        </el-form-item>
        <el-form-item
          class="py-2 m-0"
          label-width="0px"
          @input="handleChange('data')"
        >
          <!-- 判断列表数量 -->
          <template v-if="!list.data.length">
            <div class="text-center text-black-50">暂无课程列表</div>
          </template>
          <template v-else>
            <mobile-list-drag :list="list.data" @change="handleDragList" />
          </template>
        </el-form-item>
      </template>
    </el-form>
    <course-choose ref="courseChooseCom" @confirm="handleSelectCourseConfirm" />
    <renovation-choose ref="selectPageChooseCom" @confirm="handleSelectPageConfirm" />
  </div>
</template>
<script>
import CourseChoose from '@/components/CourseChoose'
import RenovationChoose from '@/components/RenovationChoose'
import MobileListDrag from './MobileListDrag.vue'
import { clone } from 'xe-utils'
export default {
  components: { MobileListDrag, CourseChoose, RenovationChoose },
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      search: {
        placeholder: ''
      },
      promotion: {
        listType: 'group',
        title: '',
        data: []
      },
      list: {
        listType: 'one',
        title: '',
        showMore: true,
        more: false,
        data: []
      },
      swiper: {
        data: []
      },
      imageAd: {
        data: []
      },
      icons: {
        data: []
      }
    }
  },
  methods: {
    /**
     * 初始化数据
     */
    initVal(value) {
      const type = value.type
      if (type === 'coupon') {
        return
      }
      value = clone(value, true)
      for (const key in value) {
        this[type][key] = value[key]
      }
    },
    /**
     * 表单值触发事件
     */
    handleChange(key) {
      const params = {}
      params.key = key
      params.value = this[this.type][key]
      this.$emit('change', params)
    },
    handleDragList(list) {
      this.$emit('move', list)
    },
    // list: 关联课程
    handleAssociationCourse() {
      this.$refs.courseChooseCom.show()
    },
    // list: 选择关联课程的确认事件
    handleSelectCourseConfirm(list) {
      this.$emit('add', list)
    },
    // 选择页面
    handleSelectPage() {
      this.$refs.selectPageChooseCom.show(1)
    },
    // 选择页面确定事件
    handleSelectPageConfirm(more) {
      // this[this.type].more = page
      const obj = Object.assign({}, this[this.type], { more })
      this[this.type] = obj
      this.$emit('bindPage', more)
    }
  }
}
</script>
<style scoped lang="scss">
.overtext{
  font-size: 18rpx;//自适应字体
  display: -webkit-box;//盒子类型
  word-break: break-all;//自动换行的处理方法。允许在单词内换行
  text-overflow: ellipsis;//溢出时用...
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp:1;//行数
  }
  .list-item{
    cursor: move;
    user-select: none;
  }
</style>
