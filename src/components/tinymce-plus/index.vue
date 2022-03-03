<template>
  <div class="tinymce-plus">

    <div
      v-if="isShow"
      class="text-overflew border p-2"
      @click="handleToggle"
      v-html="value || '点击编辑内容...'"
    />
    <div v-else>
      <!-- <div class="tinymce-mask" @click="handleToggle" /> -->
      <tinymce
        ref="tinymceCom"
        :value="value"
        :height="height"
        @input="handleInput"
      />
      <div class="tinymce-plus-action">
        <el-button
          class="mt-3"
          :type="isShow? 'primary' :'success' "
          :icon="isShow? 'el-icon-edit':'el-icon-check'"
          size="small"
          @click="handleToggle"
        >{{ isShow?'编辑':'完成' }}</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'

export default {
  name: 'TinymcePlus',
  components: { Tinymce },
  inject: ['setTinymceCom', 'closeAllEdit'],
  props: {
    value: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 200
    }
  },
  data() {
    return {
      isShow: true
    }
  },
  mounted() {
    this.setTinymceCom(this)
  },
  methods: {
    handleInput(e) {
      this.$emit('input', e)
    },
    /**
     * 设置富文本内容
     */
    setContent(value) {
      this.$refs.tinymceCom.setContent(value)
    },
    /**
     * 清空富文本内容
     */
    clearContent() {
      this.$refs.tinymceCom.setContent('')
    },
    handleToggle() {
      if (this.isShow) {
        this.closeAllEdit()
      }
      this.$nextTick(() => {
        this.isShow = !this.isShow
      })
    }

  }
}
</script>
<style scoped lang="scss">
.tinymce-plus{
  position: relative;
}
.tinymce-plus-action{
  margin-bottom: 10px;
  text-align: right;
}
.text-overflew{
  min-height: 40px;
  font-size: 12px;//自适应字体
  display: -webkit-box;//盒子类型
  word-break: break-all;//自动换行的处理方法。允许在单词内换行
  text-overflow: ellipsis;//溢出时用...
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp:2;//行数
}
.tinymce-mask{
  width: 100vw;
  height: 100vh;
  position:fixed;
  left: 0;
  top: 0;
  // background: #000;
}
</style>
