<template>
  <div class="dialog">
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      fullscreen
      @closed="handleClosed"
    >
      <!--  -->
      <div style="position: fixed; bottom: 50px; right: 50px">
        <el-button @click="dialogVisible = false"> 取消</el-button>
        <el-button type="primary" @click="handleSubmit"> 确定 </el-button>
      </div>
      <el-form
        ref="editFormCom"
        class="w-75"
        :rules="rules"
        :model="temp"
        label-position="right"
        label-width="120px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="封面">
          <!-- :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove" -->
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            :limit="1"
            list-type="picture-card"
            :file-list="coverFileList"
            :on-success="handleUploadCoverSuccess"
            :on-remove="handleRemoveCover"
          >
            <i class="el-icon-plus" />
          </el-upload>
        </el-form-item>
        <el-form-item label="课程介绍" prop="try">
          <tinymce ref="tinymce1" v-model="temp.try" :height="300" />
        </el-form-item>
        <el-form-item label="课程内容" prop="try">
          <tinymce ref="tinymce2" v-model="temp.content" :height="300" />
        </el-form-item>
        <el-form-item label="课程价格">
          <el-input-number v-model="temp.price" :min="0" />
        </el-form-item>
        <el-form-item label="划线价格">
          <el-input-number v-model="temp.t_price" :min="0" />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="temp.status">
            <el-radio :label="1">上架</el-radio>
            <el-radio :label="0">下架</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { clone, omit, pick } from 'xe-utils'
import Tinymce from '@/components/Tinymce'

export default {
  name: 'MediaDialog',
  components: { Tinymce },
  data() {
    return {
      dialogVisible: false,
      temp: {
        id: null,
        title: '',
        cover: '',
        try: '',
        content: '',
        price: 0,
        t_price: 0,
        type: 'media',
        status: 1
      },
      coverFileList: [], // 封面_文件
      rules: {
        title: [
          { required: true, message: '标题内容不能为空', trigger: 'blur' }
        ],
        try: [{ required: true, message: '试看内容不能为空', trigger: 'blur' }],
        content: [
          { required: true, message: '课程内容不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    // 整理请求参数
    fetchParams() {
      const keys = ['id', 'title', 'cover', 'try', 'content', 'price', 't_price', 'type', 'status']
      const params = pick(this.temp, keys)
      if (params.id === '' || params.id === null || params.id === undefined) {
        delete params['id']
      }
      return params
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.editFormCom.validate(flag => {
        if (flag) {
          const id = this.temp.id
          // 编辑提交
          if (id) {
            console.log(this.fetchParams)
          } else {
            console.log(this.fetchParams)
            // 添加提交
          }
          this.dialogVisible = false
        }
      })
    },
    //  封面_文件处理
    handleUploadCoverSuccess(response) {
      this.temp.cover = response.data
    },
    handleRemoveCover(response) {
      this.coverFileList = []
    },
    show(updateObj) {
      if (updateObj) {
        const cloneOptions = this.temp = clone(updateObj, true)
        this.coverFileList = [{ name: cloneOptions.cover, url: cloneOptions.cover }]
        setTimeout(() => {
          this.$refs.tinymce1.setContent(updateObj.try)
          this.$refs.tinymce2.setContent(updateObj.content)
        }, 100)
      }
      this.dialogVisible = true
    },
    close() {
      this.dialogVisible = false
    },
    handleClosed() {
      this.$refs.editFormCom.clearValidate()
      this.$refs.tinymce1.setContent('')
      this.$refs.tinymce2.setContent('')
      this.coverFileList = []
      this.contentFileList = []
      Object.assign(this.temp, this.$options.data().temp)
    }
  }
}
</script>
<style scoped lang="scss">
.dialog {
}
</style>
