<template>
  <el-card shadow="false">
    <div slot="header">
      <div class="d-flex h-100 align-items-center justify-content-between">
        <span>{{ title }}</span>
        <span v-show="showMore" class="font-size-12 text-text-black-50">查看全部</span>
      </div>
    </div>
    <el-row v-if="listType==='two'" class="list" :gutter="20">
      <!-- 循环项 -->
      <el-col v-for="(item, index) in data" :key="index" :span="12" class="mb-2">
        <div class="list-item border">
          <img width="100%" height="90px" :src="item.cover" alt="">
          <div class="p-2">
            <div class="font-size-16 text-weight-bold pb-1 overtext">{{ item.title }}</div>
            <div class="font-size-14 text-black-50 overtext" style="height:20px;">{{ item.try }}
            </div>
            <div>
              <span class="font-size-14 text-weight-bold text-danger">¥{{ item.price }}</span>
              <del class="font-size-12 text-black-50 ms-1">¥{{ item.t_price }}</del>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div v-else>
      <div v-for="(item, index) in data" :key="index" class="mb-2">
        <div class="list-item border d-flex">
          <img width="140px" height="90px" :src="item.cover" alt="">
          <div class="p-2">
            <div class="font-size-16 text-weight-bold pb-1 overtext">{{ item.title }}</div>
            <div
              class="font-size-14 text-black-50 overtext"
              style="height:30px;"
            >{{ item.desc }}</div>
            <div>
              <span class="font-size-14 text-weight-bold text-danger">¥{{ item.price }}</span>
              <del class="font-size-12 text-black-50 ms-1">¥{{ item.t_price }}</del>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    </div></el-card>
</template>
<script>
export default {
  components: {},
  props: {
    listType: {
      type: String,
      default: 'one'
    },
    title: {
      type: String,
      default: '列表标题'
    },
    showMore: {
      type: Boolean,
      default: true
    },
    more: {
      type: Object,
      default: () => ({})
    },
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
.overtext{
  font-size: 18rpx;//自适应字体
  display: -webkit-box;//盒子类型
  word-break: break-all;//自动换行的处理方法。允许在单词内换行
  text-overflow: ellipsis;//溢出时用...
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp:1;//行数
  }
</style>
