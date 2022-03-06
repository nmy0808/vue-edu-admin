<template>
  <div class="">
    <el-card shadow="false">
      <div slot="header">
        <div class="d-flex h-100 align-items-center justify-content-between">
          <span>{{ title }}</span>
        </div>
      </div>
      <el-row class="list" :gutter="20">
        <!-- 循环项 -->
        <el-col
          v-for="(item, index) in data"
          :key="index"
          :span="12"
          class="mb-2"
        >
          <div class="list-item border">
            <img width="100%" height="90px" v-lazy="item.cover" alt="">
            <div class="p-2">
              <div class="font-size-16 text-weight-bold pb-1 overtext">
                {{ item.title }}
              </div>
              <!-- <div
                class="font-size-14 text-black-50 overtext"
                style="height: 20px"
                v-html="item.try"
              >
              </div> -->
              <div>
                <span class="text-danger fs-7 me-1">{{ listType==='group'?'拼团':'限时' }}</span>
                <span
                  class="font-size-14 text-weight-bold text-danger"
                >¥{{ item.price }}</span>
                <del
                  class="font-size-12 text-black-50 ms-1"
                >¥{{ item.t_price }}</del>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- <div>
      <div>
        <img width="100px" height="80px" src="http://demo-mp3.oss-cn-shenzhen.aliyuncs.com/egg-edu-demo/308b79051d27dc5cacba.png" alt="">
        <div>
          <div>title</div>
          <div>title-desc</div>
          <div><span>$20.00</span><span>$30.00</span></div>
        </div>
      </div>
    </div> -->
    </el-card>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    data: {
      type: Array,
      default: () => []
    },
    listType: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
<style scoped lang="scss">
</style>
