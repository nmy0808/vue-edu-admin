<template>
  <div class='coupon-container'>
    <div v-for="(item,index) in data" :key="index" class="d-flex coupon-item">
      <div class="coupon-left">
        <p>{{ item.price }}</p>
        <p>{{ item.condition }}</p>
      </div>
      <div class="coupon-right">领取</div>
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
.coupon-container{
  display: flex;
  padding-left: 5px;
  overflow-x: auto;
}
.coupon-item{
  margin: 0 5px;
  width: 30%;
  height: 50px;
  color: #ffffff;
  font-size: 12px;
  flex-shrink: 0;
  .coupon-left{
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;
    width: 70%;
    background: #c9960b;
    p{
      margin: 0;
      padding: 0;
    }
  }
  .coupon-right{
    line-height: 50px;
    text-align: center;
    width: 30%;
    background: #fabc13;
  }
}
</style>
