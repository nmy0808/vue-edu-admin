<template>
  <div>
    <el-dialog
      :title="temp.id ?'编辑':'新增' + '题目'"
      top="2%"
      :visible.sync="dialogVisible"
      width="80%"
      fullscreen
      lock-scroll
      @closed="handleClosed"
    >
      <el-form ref="formCom" :model="temp" class="w-75 m-auto" label-width="100px" :rules="rules">
        <el-form-item label="题目" prop="title">
          <el-input v-model="temp.title" placeholder="请输入题目" />
        </el-form-item>
        <el-form-item label="题目类型">
          <el-radio-group v-model="temp.type" @change="handleTypeChange">
            <el-radio-button
              v-for="(item, key) in typeOptions"
              :key="key"
              :label="key"
            >
              {{ item }}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="解析" prop="remark">
          <tinymce-plus v-model="temp.remark" :height="300" />
        </el-form-item>
        <el-form-item label="题目答案">
          <el-table
            border
            :data="valueOptions[temp.type].options"
            style="width: 100%"
          >
            <el-table-column
              v-if="temp.type !== 'answer'"
              align="center"
              :label="temp.type === 'completion' ? '' : '是否答案' "
              width="100px"
            >
              <template slot-scope="{$index}">
                <el-radio
                  v-if="temp.type ==='radio' || temp.type ==='trueOrfalse'"
                  v-model="valueOptions[temp.type].value"
                  :label="$index"
                >
                  {{ wordMap[$index] }}
                </el-radio>
                <el-checkbox
                  v-else-if="temp.type ==='checkbox'"
                  v-model="valueOptions[temp.type].value"
                  :label="$index"
                >
                  {{ wordMap[$index] }}
                </el-checkbox>
                <div v-else-if="temp.type ==='completion'" class="text-center">
                  {{ $index + 1 }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              header-align="center"
              prop="prop"
              label="答案"
            >
              <template slot-scope="{row,$index}">
                <tinymce-plus
                  ref="tinymce"
                  :value="row"
                  :height="300"
                  @input="handleAnswerChange($event,$index)"
                />
              </template>
            </el-table-column>
            <el-table-column
              v-if="temp.type !== 'answer'&& temp.type !== 'trueOrfalse'"
              header-align="center"
              width="100px"
              align="center"
              prop="prop"
              label="操作"
            >
              <template slot-scope="{$index}">
                <el-button type="danger" @click="handleDeleteAnswer($index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button
            v-if="temp.type !=='trueOrfalse' && temp.type !=='answer' "
            class="mt-2 w-100"
            type="primary"
            plain
            icon="el-icon-plus"
            @click="handleAddAnswer"
          >添加一个答案
          </el-button>
        </el-form-item>
      </el-form>
      <div class="question-action">
        <el-button @click="hide">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import BaseTable from '@/components/BaseTable'
import TinymcePlus from '@/components/tinymce-plus'
import { getSchoolUserHistoryApi, getSchoolUserOrderListByIdApi, getSchoolUserSubApi } from '@/api/school_user'
import { clone } from 'xe-utils'
import { addQuestionApi, updateQuestionApi } from '@/api/tool'
import Sticky from '@/components/Sticky'
const wordMap = []
for (let i = 65; i <= 90; i++) { wordMap.push(String.fromCharCode(i)) }
export default {
  name: 'SchoolUserDialog',
  // eslint-disable-next-line vue/no-unused-components
  components: { BaseTable, TinymcePlus, Sticky },
  provide() {
    return {
      setTinymceCom: this.setTinymceCom,
      closeAllEdit: this.closeAllEdit
    }
  },
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
      rules: {
        title: [
          { required: true, message: '标题内容不能为空', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '解析内容不能为空', trigger: 'blur' }
        ]
      },
      checkedList: []
    }
  },
  computed: {
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
    /**
     * 将富文本组件添加至数组
     */
    setTinymceCom(com) {
      this.tinymceCom.push(com)
    },
    // 确定提交
    handleConfirm() {
      this.closeAllEdit()
      this.$refs['formCom'].validate(async(valid) => {
        if (valid) {
          const params = {}
          params.id = this.temp.id
          params.title = this.temp.title
          params.remark = this.temp.remark
          params.type = this.temp.type
          params.value = this.valueOptions[this.temp.type]
          // 判断是否有空白无效的答案项
          const flag = params.value.options.find(it => !it.trim())
          if (flag === '') {
            this.$message({
              message: '答案不能为空白',
              type: 'error'
            })
            return
          }
          // 编辑
          if (params.id) {
            await updateQuestionApi(params)
          } else {
            // 新增
            await addQuestionApi(params)
          }
          // 刷新列表
          await this.getList()
          this.$message({
            message: params.id ? '编辑成功' : '新增完成',
            type: 'success'
          })
          this.hide()
        }
      })
    },
    // 添加一个答案
    handleAddAnswer() {
      this.valueOptions[this.temp.type].options.push('')
    },
    // 删除指定答案
    handleDeleteAnswer(index) {
      this.closeAllEdit()
      this.$nextTick(() => {
        this.valueOptions[this.temp.type].options.splice(index, 1)
      })
    },
    // 关闭所有富文本激活状态
    closeAllEdit() {
      this.tinymceCom.forEach(it => {
        it.isShow = true
      })
    },
    // 监听 编辑答案富文本的事件
    handleAnswerChange(value, index) {
      this.valueOptions[this.temp.type].options.splice(index, 1, value)
    },
    // 切换类型tab时触发
    handleTypeChange() {
      this.closeAllEdit()
    },
    resetTemp() {
      Object.assign(this.$data.temp, this.$options.data().temp)
      Object.assign(this.$data.valueOptions, this.$options.data().valueOptions)
    }
  }
}
</script>
<style scoped lang="scss">
.question-action{
  position: fixed;
  right: 30px;
  bottom: 20px;
}
</style>
