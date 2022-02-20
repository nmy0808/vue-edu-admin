<template>
  <div class="search-container">
    <div class="search-inner">
      <i class="el-icon-search me-2" />
    <span>{{ placeholder }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {
    placeholder: {
      type: String,
      default: '请输入搜索关键词'
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
<style scoped lang="scss">
.search-container{
  padding: 10px;
  font-size:14px;
}
.search-inner{
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  background: #eeeeee;
}

</style>
