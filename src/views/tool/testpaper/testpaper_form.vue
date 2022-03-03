<template>
  <div class="app-container testpaper-page">
    <el-form
      ref="formCom"
      :rules="rules"
      class="px-5 py-3"
      :model="temp"
      label-width="150px"
      label-position="left"
      label-suffix=": "
    >
      <el-form-item label="试卷名称" prop="title" class="w-50">
        <el-input v-model="temp.title" />
      </el-form-item>
      <el-form-item label="是否公开">
        <el-radio-group v-model="temp.status">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="总分">
        <el-input-number
          v-model="temp.total_score"
          :min="0"
        /> 分
      </el-form-item>
      <el-form-item label="及格分">
        <el-input-number
          v-model="temp.pass_score"
          :min="0"
        /> 分
      </el-form-item>
      <el-form-item label="时间限制">
        <el-input-number
          v-model="temp.expire"
          :min="0"
        /> 分钟
      </el-form-item>
      <el-form-item label="题目列表">
        <el-card
          v-for="(item,index) in temp.questions"
          :key="item.title"
          shadow="hover"
          class="box-card mb-3"
        >
          <div slot="header" class="d-flex">
            <div style="width: 80%;">
              <el-tag
                class="me-1"
                style="width: 4em; textAlign: center;  transform:translateY(-3px);"
                size="mini"
              >{{ typeOptions[item.question.type] }}</el-tag>
              <span class="fw-bold fs-6">第{{ index +1 }}题</span>
              <span class="ms-2 fs-5" v-html="item.question.title" />
            </div>
            <!-- 分值 -->
            <div class="d-flex justify-content-end flex-grow-1 align-items-center">
              <span>分值: </span>
              <el-input-number
                v-model="item.score"
                style="width: 100px;"
                :min="0"
                class="me-3 ms-2"
                size="mini"
              />
              <el-button size="mini" type="danger" @click="handleDeleteQuestion(index)">删除</el-button>
            </div>
          </div>
          <!-- card forEach -->
          <div
            v-for="(answer,aIndex) in item.question.value.options"
            :key="answer"
            :class="[aIndex === item.question.value.options.length -1?'mb-0':'mb-3']"
          >
            <div class="d-flex">
              <el-tag
                v-if="item.question.type === 'answer'"
                type="success"
                class="me-2"
                style="transform:translateY(3px);"
              >正确解答</el-tag>
              <el-tag
                v-else-if="item.question.type === 'completion'"
                type="success"
                class="me-2"
                style="transform:translateY(3px);"
              >{{ aIndex +1 }}</el-tag>
              <el-tag
                v-else
                :type="judgeCurrentCorrect(item.question.value.value,aIndex)? 'success':'info'"
                class="me-2"
                style="transform:translateY(3px);"
              >{{ wordMap[aIndex] }}</el-tag>
              <p v-html="answer" />
            </div>
          </div>
          <!-- cart-footer 答案-->
          <div v-if="item.question.value.value || item.question.value.value === 0" class="mt-2 pt-3 border-top">
            答案: <span class="fw-bold">{{ convertAnswerFormat(item.question.type,item.question.value.value) }}</span>
          </div>
        </el-card>
        <el-button
          type="success"
          icon="el-icon-plus"
          @click="$refs.questionChooseCom.open()"
        >添加题目</el-button>
      </el-form-item>
    </el-form>
    <!--  -->
    <question-choose
      ref="questionChooseCom"
      @confirm="handleQuestionChooseConfirm"
    />
    <div class="testpaper-action bg-white">
      <span>当前已有题目分数: </span>
      <span class="fs-4 text-danger">{{ sumScore }}</span> 分
      <el-button
        class="ms-3"
        type="primary"
        plain
        @click="handleReset"
      >重置</el-button>
      <el-button
        type="primary"
        @click="handleSubmit"
      >提交</el-button>
    </div>
  </div>
</template>
<script>
const wordMap = []
for (let i = 65; i <= 90; i++) { wordMap.push(String.fromCharCode(i)) }
import { addTestpaperApi, getTestpaperByIdsApi, updateTestpaperApi } from '@/api/tool'
import QuestionChoose from '@/components/QuestionChoose'
import Sticky from '@/components/Sticky'
import { clone } from 'xe-utils'

export default {
  components: { QuestionChoose },
  data() {
    return {
      wordMap,
      typeOptions: { 'radio': '单选题', 'checkbox': '多选题',
        'trueOrfalse': '判断题', 'answer': '问答题', 'completion': '填空题' },
      temp: {
        id: null,
        title: '',
        total_score: '',
        pass_score: '',
        expire: '',
        status: 1,
        questions: []
      },
      infoTemp: {},
      rules: {
        title: [
          { required: true, message: '标题内容不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    id() {
      return this.$route.query.id
    },
    // 计算当前分数综合
    sumScore() {
      let result = 0
      this.temp.questions.forEach((item) => {
        result += item.score
      })
      return result
    }
  },
  async created() {
    if (this.id) {
      const { data } = await getTestpaperByIdsApi(this.id)
      this.temp = data
      // 用于重置数据
      this.infoTemp = clone(data, true)
    }
  },
  mounted() {
  },
  methods: {
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
    // convertAnswerFormat(value) {
    //   if (Array.isArray(value)) {
    //     return value.map(it => wordMap[it]).join(', ')
    //   } else {
    //     return wordMap[value]
    //   }
    // },
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
    handleDeleteQuestion(index) {
      this.temp.questions.splice(index, 1)
    },
    // 选择增加题目事件
    handleQuestionChooseConfirm(list) {
      const result = list.map(item => {
        const obj = {}
        obj.question = {}
        obj.score = 0
        obj.question_id = item.id
        obj.question.id = item.id
        obj.question.title = item.title
        obj.question.remark = item.remark
        obj.question.type = item.type
        obj.question.value = item.value
        return obj
      })
      this.temp.questions = this.temp.questions.concat(result)
    },
    // 重置数据
    handleReset() {
      if (this.id) {
        this.temp = this.infoTemp
      } else {
        Object.assign(this.$data.temp, this.$options.data().temp)
      }
    },
    // 提交
    async handleSubmit() {
      this.$refs['formCom'].validate(async(valid) => {
        if (valid) {
          const id = this.id
          const params = clone(this.temp, true)
          // 整理请求参数
          params.questions.forEach(item => {
            delete item['question']
          })
          // fetch
          if (id) {
            await updateTestpaperApi(params)
          } else {
            await addTestpaperApi(params)
          }
          this.$message({
            message: id ? '编辑成功' : '新增成功',
            type: 'success'
          })
          this.$router.push({ name: 'Testpaper' })
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.testpaper-page{
  padding-bottom: 100px;
}
.testpaper-action{
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
