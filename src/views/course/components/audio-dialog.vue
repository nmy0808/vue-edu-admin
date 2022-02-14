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
        <el-form-item label="音频文件" prop="content">
          <el-upload
            accept="mp3、m4a"
            :multiple="false"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleContentChange"
            :file-list="contentFileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              格式支持mp3、m4a，为保证音频加载与播放的流畅性，建议上传大小不超过500M</div>
          </el-upload>
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
  name: 'AudioDialog',
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
        type: 'audio',
        status: 1
      },
      coverFileList: [], // 封面_文件
      contentFileList: [], // 课程内容_文件
      rules: {
        title: [
          { required: true, message: '标题内容不能为空', trigger: 'blur' }
        ],
        try: [{ required: true, message: '课程介绍不能为空', trigger: 'blur' }],
        content: [
          { required: true, message: '音配文件不能为空', trigger: 'blur' }
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
    // 提交
    handleSubmit() {
      this.$refs['editFormCom'].validate((valid) => {
        if (valid) {
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
    //  mp3_文件处理
    handleUploadContentChange(response) {
      this.temp.content = response.data
    },
    handleContentChange() {
      console.log('change')
    },
    show(updateObj) {
      if (updateObj) {
        const cloneOptions = this.temp = clone(updateObj, true)
        this.coverFileList = [{ name: cloneOptions.cover, url: cloneOptions.cover }]
        setTimeout(() => {
          this.$refs.tinymce1.setContent(updateObj.content)
        }, 100)
      }
      this.dialogVisible = true
    },
    close() {
      this.dialogVisible = false
    },
    handleClosed() {
      this.$refs.editFormCom.resetFields()
      this.$refs.editFormCom.clearValidate()
      this.$refs.tinymce1.setContent('')
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
