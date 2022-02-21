<template>
  <div class="">
    <template v-if="data.length">
      <el-carousel trigger="click" height="150px">
        <el-carousel-item v-for="(item, index) in data" :key="index">
          <img width="100%" :src="item.src" alt="">
          暂无图片, 请在右侧添加/编辑
        </el-carousel-item>
      </el-carousel>
    </template>
    <template v-else>
      <div style="height: 150px" class="d-flex align-items-center justify-content-center bg-light">
        暂无图片, 请在右侧编辑
      </div>
    </template>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {}
}
</script>
<style scoped lang="scss">
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>
