<template>
  <div class="app-container">
    <el-form
      ref="formCom"
      class="px-5"
      :model="temp"
      label-width="150px"
      label-position="left"
      label-suffix=": "
    >
      <el-form-item label="试卷名称">
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
      <el-form-item
        label="当前已有题目分数"
      >
        <el-tag class="me-1" type="success">100</el-tag> 分
      </el-form-item>
    </el-form>
    <!--  -->
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
          <span class="fw-bold fs-5">第{{ index +1 }}题</span>
          <span class="ms-3 opacity-75 fs-5" v-html="item.question.title" />
        </div>
        <!-- 分值 -->
        <div>
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
          <el-tag v-if="item.question.type === 'answer'" type="info" class="me-2">解答</el-tag>
          <el-tag
            v-else-if="item.question.type === 'completion'"
            type="info"
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
        答案: <span class="fw-bold">{{ convertAnswerFormat(item.question.value.value) }}</span>
      </div>
    </el-card>
    <!--  -->
    <el-button type="success" icon="el-icon-plus">添加题目</el-button>
  </div>
</template>
<script>
const wordMap = []
for (let i = 65; i <= 90; i++) { wordMap.push(String.fromCharCode(i)) }
import { getTestpaperByIdsApi } from '@/api/tool'
export default {
  name: '',
  components: {},
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
      }
    }
  },
  computed: {
    id() {
      return this.$route.query.id
    }
  },
  async created() {
    if (this.id) {
      const { data } = await getTestpaperByIdsApi(this.id)
      this.temp = data
      console.log(data)
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
    convertAnswerFormat(value) {
      if (Array.isArray(value)) {
        return value.map(it => wordMap[it]).join(', ')
      } else {
        return wordMap[value]
      }
    },
    handleDeleteQuestion(index) {
      this.temp.questions.splice(index, 1)
    }
  }
}
</script>
<style scoped lang="scss">
</style>
