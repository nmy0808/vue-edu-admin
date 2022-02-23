<template>
  <div class="icons-container">
    <template v-if="data.length">
      <div v-for="(item, index) in data" :key="index" class="icons-item">
        <div class="bg-black-50 icons-icon">
          <img v-if="item.src" :src="item.src" width="100%" alt="">
        </div>
        <div class="fs-7">{{ item.name || '分类标题' }}</div>
        <div />
      </div>
    </template>
    <template v-else>
      <div class="icons-default">
        暂无分类, 请在右侧添加/编辑分类
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
    return {}
  },
  methods: {}
}
</script>
<style scoped lang="scss">
.icons-container{
  display: flex;
  flex-wrap: wrap;
  .icons-item{
      width: 25%;
      padding: 5px;
      text-align: center;
      .icons-icon{
        width: 40px;
        height: 40px;
        background: lightgray;
        display: inline-block;
        overflow: hidden;
        border-radius: 50%;
      }
  }
  .icons-default{
    width: 100%;
    height: 80px;
    margin: 10px;
    background: #ebebeb;
    line-height: 80px;
    text-align: center;
    }
}

</style>
