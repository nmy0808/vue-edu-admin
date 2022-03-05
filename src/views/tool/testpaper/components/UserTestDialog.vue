<template>
  <div class="user-manage">
    <el-dialog
      title="验卷"
      :visible.sync="dialogVisible"
      fullscreen
      lock-scroll
      @closed="handleClosed"
    >
      <div class="d-flex mb-5 mt-2">
        <div style="width: 80px;">试卷标题:</div>
        <div>{{ temp.testpaper.title }}</div>
      </div>
      <div class="d-flex w-100 ">
        <div style="width: 80px;">题目:</div>
        <div class=" flex-grow-1">
          <el-card
            v-for="(item,index) in temp.questions"
            :key="item.title"
            shadow="hover"
            class="box-card mb-3"
          >
            <div slot="header" class="d-flex">
              <div style="width: 90%;" class="d-flex align-items-lg-center">
                <div style="width: 118px;" class="d-flex flex-shrink-0">
                  <el-tag
                    class="m-0 p-0 mt-1"
                    style="width: 4em; textAlign: center; "
                    size="mini"
                  >{{ typeOptions[item.question.type] }}</el-tag>
                  <div class="fw-bold fs-6 ms-1">第 {{ index +1 }} 题</div>
                </div>
                <div class="fs-6 flex-grow-1" v-html="item.question.title" />
              </div>
              <!-- 分值 -->
              <div
                class="d-flex
                flex-column
                flex-shrink-0
              justify-content-end align-items-center"
              >
                <div>
                  <span class="me-2">打分:</span>
                  <el-input-number
                    v-model="temp.values[index].score"
                    size="mini"
                    :min="0"
                    :max="item.score"
                    class="me-1"
                  />
                </div>
                <span class="mt-2 me-3">(本题分值: <span class="text-danger">{{ item.score }}</span> 分)</span>
              </div>
            </div>
            <!-- card forEach -->
            <div
              v-for="(answer,aIndex) in item.question.value.options"
              :key="answer"
            >
              <div class="d-flex">
                <el-tag v-if="item.question.type === 'answer'" type="success" class="me-2">正确答案</el-tag>
                <el-tag
                  v-else-if="item.question.type === 'completion'"
                  type="success"
                  class="me-2"
                >{{ aIndex +1 }}</el-tag>
                <el-tag
                  v-else
                  :type="judgeCurrentCorrect(item.question.value.value,aIndex)? 'success':'info'"
                  class="me-2"
                >{{ wordMap[aIndex] }}</el-tag>
                <p v-html="answer" />
              </div>
            </div>
            <!-- cart-footer 答案-->
            <div v-if="item.question.value.value || item.question.value.value === 0" class="mt-2 pt-3 border-top">
              <span class="text-success">
                正确答案:
              </span>
              <span class="fw-bold">
                {{ convertAnswerFormat(item.question.type, item.question.value.value) }}
              </span>
            </div>
            <div class="mt-2 pt-3 border-top">
              <span class="">
                用户答案:
              </span>
              <span class="fw-bold">
                {{ convertAnswerFormat(temp.values[index].type,temp.values[index].answer) }}
              </span>
            </div>
          </el-card></div>
      </div>
      <div class="user-manage-action bg-white">
        <span>用户最终得分: </span>
        <span class="fs-4 text-danger">{{ sumScore }}</span> 分
        <el-button
          class="ms-3"
          @click="handleCancel"
        >取消</el-button>
        <el-button
          type="primary"
          @click="handleSubmit"
        >提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { clone } from 'xe-utils'
import { addQuestionApi, getUserTestReadApi } from '@/api/tool'
const wordMap = []
for (let i = 65; i <= 90; i++) { wordMap.push(String.fromCharCode(i)) }
export default {
  name: 'SchoolUserDialog',
  components: { },
  inject: ['getList'],
  data() {
    return {
      wordMap, // A-Z
      tinymceCom: [], // 所有富文本组件
      typeOptions: { 'radio': '单选题', 'checkbox': '多选题', 'trueOrfalse': '判断题', 'answer': '问答题', 'completion': '填空题' },
      dialogVisible: false,
      // radio单选，checkbox多选，trueOrfalse判断，answer问答，completion填空
      temp: {
        id: null,
        score: 0,
        testpaper: { id: null, title: '' },
        questions: [],
        values: []
      }
    }
  },
  computed: {
    // 计算当前分数综合
    sumScore() {
      let result = 0
      this.temp.values.forEach((item) => {
        result += item.score
      })
      return result
    }
  },
  methods: {
    show(temp) {
      if (temp) {
        this.temp = clone(temp, true)
      }
      this.dialogVisible = true
    },
    hide() {
      this.dialogVisible = false
    },
    handleClosed() {
      this.resetTemp()
    },
    // 取消
    handleCancel() {
      this.hide()
    },
    // 确定提交
    async handleSubmit() {
      const params = {}
      params.id = this.temp.id
      params.scores = this.temp.values.map(item => item.score)
      await getUserTestReadApi(params)
      // 刷新列表
      await this.getList()
      this.$message({
        message: '已设置为阅卷状态',
        type: 'success'
      })
      this.hide()
    },
    /**
     * 判断当前单选或者多选项是否是正确答案
     */
    judgeCurrentCorrect(value, currentValue) {
      let flag = false
      if (Array.isArray(value)) {
        flag = value.includes(currentValue)
      } else {
        flag = value === currentValue
      }
      return flag
    },
    /**
     * 转换的答案数组的格式
     */
    convertAnswerFormat(type, value) {
      if (type === 'checkbox') {
        return value.map(it => wordMap[it]).join(', ')
      } else if (type === 'radio') {
        return wordMap[value]
      } else if (type === 'answer') {
        return Array.isArray(value) ? value.join(',') : value
      } else if (type === 'completion') {
        return clone(value, true).map((it, index) => index + 1 + '.' + it).join(' ')
      } else if (type === 'trueOrfalse') {
        return wordMap[value]
      }
    },
    resetTemp() {
      Object.assign(this.$data.temp, this.$options.data().temp)
    }
  }
}
</script>
<style scoped lang="scss">
.user-manage-page{
  padding-bottom: 100px;
  p{
    padding-bottom: 0;
    margin-bottom: 0;
  }
}
.user-manage-action{
  position: fixed;
  right: 10px;
  left: 0;
  bottom: 0px;
  height: 70px;
  line-height: 70px;
  z-index: 2;
  text-align:right;
  border-top: 1px solid #dfe6ec;
}
</style>
