<template>
  <div>
    <el-dialog
      :title="temp.id ?'编辑':'新增' + '题目'"
      top="2%"
      :visible.sync="dialogVisible"
      width="80%"
      @closed="handleClosed"
    >
      <el-form ref="formCom" :model="temp" label-width="100px">
        <el-form-item label="题目" prop="title">
          <el-input v-model="temp.title" placeholder="请输入题目" />
        </el-form-item>
        <el-form-item label="题目类型">
          <el-radio-group v-model="temp.type">
            <el-radio-button
              v-for="(item, key) in typeOptions"
              :key="key"
              :label="key"
            >
              {{ item }}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="解析">
          <tinymce-plus ref="tinymce" v-model="temp.remark" :height="300" />
        </el-form-item>
        <el-form-item label="题目答案">
          <base-table
            ref="baseTableCom"
            class="mt-0 border--none"
            :is-pager="false"
            :list="valueOptions[temp.type].options"
            :columns="columns"
            :options="{ highlightHoverRow: false,rowConfig:{isCurrent:false, isHover: false}}"
          >
            <template #col_judge="{$rowIndex}">
              <el-radio
                v-if="temp.type ==='radio' || temp.type ==='trueOrfalse'"
                v-model="valueOptions[temp.type].value"
                :label="$rowIndex"
              >
                {{ wordMap[$rowIndex] }}
              </el-radio>
              <el-checkbox
                v-else-if="temp.type ==='checkbox'"
                v-model="valueOptions[temp.type].value"
                :label="$rowIndex"
              >
                {{ wordMap[$rowIndex] }}
              </el-checkbox>
              <div v-else-if="temp.type ==='completion'" class="text-center">
                {{ $rowIndex + 1 }}
              </div>
            </template>
            <template #col_answer="{row}">
              <tinymce-plus ref="tinymce" v-model="row" :height="300" />
            </template>
            <template #col_action="{$rowIndex}">
              <el-button type="danger" @click="handleDeleteAnswer($rowIndex)">删除</el-button>
            </template>
          </base-table>
          <el-button
            v-if="temp.type !=='trueOrfalse' && temp.type !=='answer' "
            class="mt-2"
            type="primary"
            icon="el-icon-plus"
            @click="handleAddAnswer"
          >添加一个答案
          </el-button>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="hide">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import BaseTable from '@/components/BaseTable'
import TinymcePlus from '@/components/tinymce-plus'
import { getSchoolUserHistoryApi, getSchoolUserOrderListByIdApi, getSchoolUserSubApi } from '@/api/school_user'
import { clone } from 'xe-utils'
const wordMap = []
for (let i = 65; i <= 90; i++) { wordMap.push(String.fromCharCode(i)) }
export default {
  name: 'SchoolUserDialog',
  // eslint-disable-next-line vue/no-unused-components
  components: { BaseTable, TinymcePlus },
  data() {
    return {
      wordMap, // A-Z
      typeOptions: { 'radio': '单选题', 'checkbox': '多选题', 'trueOrfalse': '判断题', 'answer': '问答题', 'completion': '填空题' },
      dialogVisible: false,
      // radio单选，checkbox多选，trueOrfalse判断，answer问答，completion填空
      temp: {
        id: null,
        title: '', // 题目
        type: 'radio',
        remark: '' // 解析
        // value: {
        //   value: -1, // 选项
        //   options: [] // 答案
        // }
      },
      valueOptions: {
        radio: {
          value: 0, // 选项
          options: ['选项1', '选项2'] // 答案
        },
        checkbox: {
          value: [0, 1], // 选项
          options: ['选项1', '选项2', '选项3'] // 答案
        },
        trueOrfalse: {
          value: 0, // 选项
          options: ['选项1', '选项2'] // 答案
        },
        answer: {
          options: ['答案内容'] // 答案
        },
        completion: {
          value: 0, // 选项
          options: ['答案内容'] // 答案
        }
      },
      checkedList: []
    }
  },
  computed: {
    columns() {
      const columns = [
        { title: '是否答案', width: 100, align: 'center', slots: { default: 'col_judge' }},
        { title: '答案', slots: { default: 'col_answer' }},
        { title: '操作', width: 100, slots: { default: 'col_action' }}
      ]
      const type = this.temp.type
      if (type === 'answer') {
        columns.splice(0, 1)
        columns.splice(1, 1)
      } else if (type === 'completion') {
        columns[0].title = ''
      } else if (type === 'trueOrfalse') {
        columns.splice(2, 1)
      }
      return columns
    }
  },
  methods: {
    show(temp) {
      let type = this.temp.type
      if (temp) {
        this.temp = clone(temp, true)
        type = temp.type
        this.valueOptions[type] = temp.value
      }
      this.dialogVisible = true
    },
    hide() {
      this.dialogVisible = false
    },
    handleClosed() {
      this.resetTemp()
    },
    // 确定提交
    handleConfirm() {
      const params = {}
      params.id = this.temp.id
      params.title = this.temp.title
      params.remark = this.temp.remark
      params.type = this.temp.type
      params.value = this.valueOptions[this.temp.type]
      console.log(params)
    },
    // 添加一个答案
    handleAddAnswer() {
      this.valueOptions[this.temp.type].options.push('')
    },
    // 删除指定答案
    handleDeleteAnswer(index) {
      this.valueOptions[this.temp.type].options.splice(index, 1)
    },
    handleCheckboxChange({ records }) {
      this.checkedList = records
    },
    resetTemp() {
      Object.assign(this.$data.temp, this.$options.data().temp)
      Object.assign(this.$data.valueOptions, this.$options.data().valueOptions)
    }
  }
}
</script>
