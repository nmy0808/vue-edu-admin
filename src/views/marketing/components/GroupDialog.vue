<template>
  <div class="dialog">
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      @closed="handleClosed"
    >
      <el-form ref="formCom" :model="temp" :rules="rules" label-width="130px">
        <el-form-item label="类型" prop="type">
          <el-select v-model="temp.type" placeholder="placeholder">
            <el-option label="课程" value="course" />
            <el-option label="专栏" value="column" />
          </el-select>
        </el-form-item>
        <el-form-item :label="temp.type==='course'?'关联课程':'关联专栏'" prop="value">
          <el-button
            v-if="temp.type==='course'"
            type="primary"
            size="mini"
            @click="$refs.courseChooseCom.show()"
          >关联课程</el-button>
          <el-button
            v-else
            type="primary"
            size="mini"
            @click="$refs.columnChooseCom.show()"
          >关联专栏</el-button>
        </el-form-item>
        <el-form-item v-if="temp.value">
          <div class="card" style="width: 200px;">
            <div
              v-if="!temp.value.cover"
              class="bg-light"
              style="width: 200px;height:120px;"
            />
            <img
              v-else
              :src="temp.value.cover"
              class="card-img-top"
              alt=""
            >
            <div class="card-body">
              <p class="card-title fs-6">{{ temp.value.title }}</p>
              <p class="card-text text-danger">¥{{ temp.value.price }}</p>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="拼团价" prop="price">
          <el-input-number
            v-model="temp.price"
            :min="1"
            :max="10"
            :precision="2"
          />
        </el-form-item>
        <el-form-item label="拼团人数" prop="p_num">
          <el-input-number
            v-model="temp.p_num"
            :min="1"
            :max="10"
          />
        </el-form-item>
        <el-form-item label="拼团时限" prop="expire">
          <el-radio-group v-model="temp.expire">
            <el-radio :label="24">24小时</el-radio>
            <el-radio :label="48">48小时</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否开启凑团" prop="auto">
          <el-radio-group v-model="temp.auto">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动时间范围">
          <el-date-picker
            v-model="calcScopeActivityTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false"> 取消</el-button>
        <el-button type="primary" @click="handleSubmit"> 确定 </el-button>
      </div>
    </el-dialog>
    <course-choose ref="courseChooseCom" is-radio @confirm="handleConfirmCourse" />
    <column-choose ref="columnChooseCom" is-radio @confirm="handleColumnCourse" />
  </div>
</template>
<script>
import { clone, get, omit, pick, set } from 'xe-utils'
import CourseChoose from '@/components/CourseChoose'
import ColumnChoose from '@/components/ColumnChoose'
import { addGroupApi, updateGroupApi } from '@/api/marketing'

export default {
  name: 'MediaDialog',
  components: { CourseChoose, ColumnChoose },
  inject: ['getList'],
  data() {
    return {
      dialogVisible: false,
      temp: {
        type: 'course', // 类型：course课程，column专栏
        goods_id: null, // 课程/专栏id
        price: 0,
        p_num: 1, // 成团人数
        auto: 1, // 自动成团：0否1是
        expire: 24, // 拼团时间
        status: 1, // 状态：0禁用1启用
        start_time: '', //
        end_time: '',
        value: null // 当前选中的关联课程/专栏对象
      },
      rules: {
        value: [
          { required: true, message: '没有关联课程/专栏', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    // 活动时间范围
    // el-date-picker 组件
    calcScopeActivityTime: {
      set([start, end]) {
        this.temp.start_time = start
        this.temp.end_time = end
      },
      get() {
        return [this.temp.start_time, this.temp.end_time]
      }
    }
  },
  watch: {
    'temp.type': {
      handler() {
        this.temp.value = null
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.formCom.validate(async flag => {
        if (!this.temp.start_time || !this.temp.end_time) {
          this.$message({
            message: '必须活动时间范围',
            type: 'warning'
          })
          return
        }
        if (flag) {
          const id = this.temp.id
          // 编辑提交
          if (id) {
            await updateGroupApi(this.temp)
          } else {
          // 添加提交
            await addGroupApi(this.temp)
          }
          this.$message({
            message: id ? '编辑成功' : '新增成功',
            type: 'success'
          })
          this.getList()
          this.dialogVisible = false
        }
      })
    },
    show(updateObj) {
      if (updateObj) {
        const cloneOptions = this.temp = clone(updateObj, true)
      }
      this.dialogVisible = true
    },
    close() {
      this.dialogVisible = false
    },
    handleClosed() {
      this.$refs.formCom.clearValidate()
      Object.assign(this.temp, this.$options.data().temp)
    },
    // 确认选择课程
    handleConfirmCourse(course) {
      this.goods_id = course.id
      this.temp.value = course
    },
    // 确认选择专栏
    handleColumnCourse(column) {
      this.temp.goods_id = column.id
      this.temp.value = column
    }
  }
}
</script>
