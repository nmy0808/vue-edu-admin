<template>
  <div v-loading="listLoading" class="bookDetail-page">
    <div class="bookDetail-header border-bottom">
      <div class="me-auto">
        <el-button class="me-2" type="primary" size="mini" icon="el-icon-back" @click="$router.push({name: 'Book'})" />
        <span class="fs-5">{{ bookName }}</span>
      </div>
      <div class="d-flex align-items-center">
        <span style="width: 140px;font-size:14px;">章节名称:</span> <el-input v-model="temp.title" class="mx-3" placeholder="请输入章节名称" />
        <el-checkbox
          v-model="temp.isfree"
          :true-label="1"
          :false-label="0"
        >免费观看
        </el-checkbox>
        <el-button class="ms-3" type="primary" @click="handleSubmit">保存</el-button>
      </div>
    </div>
    <div class="bookDetail-body">
      <!-- left -->
      <div class="bookDetail-body-left">
        <draggable
          :list="list"
          :disabled="!isMove"
          class="list-group"
          ghost-class="ghost"
          @end="handleMove"
        >
          <!-- 章节项 -->
          <div
            v-for="(item, index) in list"
            :key="item.id"
            class="list-group-item chapter-item w-100 cursor-pointer
        justify-content-between items-center py-3 px-2 border-bottom"
            :class="[activeIndex === index?'selected':'']"
            @click="handleChangeMenu(item,index)"
          >
            <div class="d-inline-block" style="width: 93%;">
              <!-- 标题 -->
              {{ index +1 }}. {{ item.title }}
              <!-- 试听 -->
              <el-tag v-if="item.isfree" type="success" size="mini" class="chapter-item-free">试听</el-tag>
            </div>
            <!-- 删除icon -->
            <i
              class="el-icon-delete cursor-pointer  text-danger ms-1"
              @click.stop="handleDeleteChapter(item, index)"
            />
          </div>
        </draggable>

        <el-button
          type="success"
          plain
          class="mt-2 mb-2"
          style="width: 360px; margin-left: 20px;"
          icon="el-icon-plus"
          @click="handleAddChapter"
        >新增章节</el-button>
        <!--  -->
      </div>
      <!-- 富文本 -->
      <div class="bookDetail-body-main border flex-grow-1">
        <tinymce id="tinymce" ref="tinymce" v-model="temp.content" :height="500" />
      </div>
      <!-- <div class="bookDetail-body-right show-content" v-html="temp.content" /> -->
    </div>
  </div>

</template>
<script>
import Tinymce from '@/components/Tinymce'
import draggable from 'vuedraggable'

import { addBookChapterApi, deleteBookChapterApi, getBookChapterListApi, sortBookChapterApi, updateBookChapterApi } from '@/api/tool'
export default {
  components: { Tinymce, draggable },
  data() {
    return {
      temp: {
        title: '',
        isfree: 0,
        content: ''
      },
      activeIndex: 0,
      list: [],
      listLoaded: false,
      listQuery: {
        page: 1,
        limit: 10
      },
      total: 0,
      isMove: true
    }
  },
  computed: {
    book_id() {
      return this.$route.params.id
    },
    bookName() {
      return this.$route.query.book_name
    }
  },
  watch: {
    'list': {
      handler() {
        setTimeout(() => {
          const item = this.list[this.activeIndex]
          if (!item) return
          this.temp.content = item.content
          this.temp.title = item.title
          this.temp.isfree = item.isfree
          this.$refs.tinymce.setContent(item.content)
        })
      }
    },
    activeIndex: {
      handler() {
        setTimeout(() => {
          const item = this.list[this.activeIndex]
          this.temp.content = item.content
          this.temp.title = item.title
          this.temp.isfree = item.isfree
          this.$refs.tinymce.setContent(item.content)
        })
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 章节列表
    async getList() {
      this.listLoading = true
      const params = {}
      params.page = this.listQuery.page
      params.book_id = this.book_id
      const response = await getBookChapterListApi(params)
      this.list = response.data.items
      this.total = response.data.total
      this.listLoading = false
    },
    handleChangeMenu(item, index) {
      this.temp.content = item.content
      this.temp.title = item.title
      this.temp.isfree = item.isfree
      this.$refs.tinymce.setContent(item.content)
      this.activeIndex = index
    },
    // 新增章节
    async handleAddChapter() {
      this.listLoading = true
      const params = {}
      params.book_id = this.book_id
      params.title = '新章节'
      params.isfree = 0
      const { data } = await addBookChapterApi(params)
      this.listLoading = false
      this.list.push(data)
    },
    // 删除章节
    async handleDeleteChapter(item, index) {
      this.listLoading = true
      this.$confirm(`是否删除标题为'${item.title}'的章节?`, '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const params = {}
        params.book_id = this.book_id
        params.ids = [item.id]
        const { data } = await deleteBookChapterApi(params)
        if (this.activeIndex === index) {
          this.getList()
          this.activeIndex = 0
          const targetItem = this.list[this.activeIndex]
          this.temp.content = targetItem.content
          this.temp.title = targetItem.title
          this.temp.isfree = targetItem.isfree
          this.$refs.tinymce.setContent(targetItem.content)
        } else {
          this.list.splice(index, 1)
        }
      }).catch(() => {})
      this.listLoading = false
    },
    // 提交
    async handleSubmit() {
      this.listLoading = true
      const params = {}
      // 	章节id
      params.id = this.list[this.activeIndex].id
      // 	电子书id
      params.book_id = this.book_id
      // 	章节名称
      params.title = this.temp.title
      // 	是否免费：0否1是
      params.isfree = this.temp.isfree
      // 	章节内容
      params.content = this.temp.content
      updateBookChapterApi(params)
        .then(_ => {
          this.getList()
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        }).finally(() => {
          this.listLoading = false
        })
    },
    async handleMove(e) {
      this.listLoading = true
      const { newIndex, oldIndex } = e
      const params = {}
      params.ids = this.list.map(it => it.id)
      params.book_id = this.book_id
      try {
        this.isMove = false
        await sortBookChapterApi(params)
        this.activeIndex = newIndex
        this.isMove = true
        this.$message({
          message: '排序成功',
          type: 'success'
        })
      } catch (error) {
        await this.getList()
      }
      this.listLoading = false
    }
  }
}
</script>
<style scoped lang="scss">
.bookDetail-page{
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: calc(100vh - 80px);
  .bookDetail-header{
    display: flex;
    align-items: center;
    height: 70px;
    padding: 0 10px;
  }
  .bookDetail-body{
    position:absolute;
    top: 150px;
    left: 0;
    right: 0;
    bottom: 0;
    display:flex;
    justify-content:between;
    .bookDetail-body-left{
      width: 400px;
      font-size: 14px;
      overflow-y: auto;
      .chapter-item.selected{
          color: #2f80ff;
          border: none;
          background: #f9f9f9;
          font-weight: bold;
      }
    }
     .bookDetail-body-main{
      // width: 60%;;
      // flex-shrink: 0;
      flex-flow: 1;
      overflow-y: auto;
      position: relative;
    }
    .bookDetail-body-right{
         width: 40%;
        overflow-y: auto;
        padding: 4px;
        word-break: break-all;
      }
  }
}
</style>
