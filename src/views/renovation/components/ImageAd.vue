<template>
  <div>
    <div class="imageAd-item" v-for="(item, index) in data" :key="index">
      <img width="100%" height="150px" :src="item.src" alt="">
    </div>
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
.imageAd-item{

}
</style>
