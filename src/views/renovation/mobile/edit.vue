<template>
  <div class="d-flex renovation-edit-page" style="background: #eeeeee;">
    <div class="item flex-grow-1 px-3 py-3">
      <div class="shadow-sm rounded-1 bg-white item-inner">
        <div class="p-3 py-2" style="border-bottom: 1px solid #eeeeee">
          <p class="p-0 m-0 font-size-14 text-weight-bold">组件列表</p>
          <small class="text-opacity-25 text-dark font-size-12">点击组件，添加至页面</small>
        </div>
        <div class="d-flex px-3 flex-wrap pt-3 justify-content-between">
          <!-- 组件列表 -->
          <div
            v-for="(item, index) in componentOptions"
            :key="index"
            class="cursor-pointer p-3 py-2 border
            d-flex align-items-center mb-3 component-item"
            style="width: 48%;"
            @click="addComponentItem(item)"
          >
            <i class="me-1" :class="item.icon" />
            <span>{{ item.title }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="item edit-item px-3 py-3">
      <div class="shadow-sm rounded-1 bg-white item-inner">
        1
      </div>
    </div>
    <div class="item flex-grow-1 px-3 py-3">
      <div class="shadow-sm rounded-1 bg-white item-inner">
        <div class="p-3 py-2" style="border-bottom: 1px solid #eeeeee">
          <p class="p-0 m-0 font-size-14 text-weight-bold">组件编辑</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getRenovationDetailApi } from '@/api/renovation'
export default {
  name: '',
  components: {},
  data() {
    return {
      temp: {
        id: null,
        title: '',
        ismobile: '',
        template: []
      },
      // 所有组件模板
      componentOptions: [
        {
          icon: 'el-icon-s-order',
          title: '课程列表',
          type: 'list',
          default: {
            listType: 'one',
            title: '最新列表',
            showMore: true,
            more: false,
            data: []
          }
        }, {
          icon: 'el-icon-search',
          title: '搜索框',
          type: 'search',
          default: {
            placeholder: '请输入搜索关键词'
          }
        }, {
          icon: 'el-icon-s-help',
          title: '轮播图',
          type: 'swiper',
          default: {
            data: []
          }
        }, {
          icon: 'el-icon-menu',
          title: '图标分类',
          type: 'icons',
          default: {
            data: [{
              src: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
              name: '分类',
              type: '',
              url: '',
              page_id: 0,
              page_title: '',
              course_title: '',
              course_id: ''
            }, {
              src: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
              name: '分类',
              type: '',
              url: '',
              page_id: 0,
              page_title: '',
              course_title: '',
              course_id: ''
            }, {
              src: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
              name: '分类',
              type: '',
              url: '',
              page_id: 0,
              page_title: '',
              course_title: '',
              course_id: ''
            }, {
              src: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
              name: '分类',
              type: '',
              url: '',
              page_id: 0,
              page_title: '',
              course_title: '',
              course_id: ''
            }]
          }
        }, {
          icon: 'el-icon-s-finance',
          title: '优惠券',
          type: 'coupon',
          default: {
            data: [{
              price: 100,
              condition: '满￥200可用'
            }, {
              price: 100,
              condition: '满￥200可用'
            }, {
              price: 100,
              condition: '满￥200可用'
            }, {
              price: 100,
              condition: '满￥200可用'
            }]
          }
        }, {
          icon: 'el-icon-s-order',
          title: '限时拼团',
          type: 'promotion',
          default: {
            listType: 'group',
            title: '拼团',
            data: []
          }
        }, {
          icon: 'el-icon-picture-outline',
          title: '图片广告',
          type: 'imageAd',
          default: {
            data: []
          }
        }]
    }
  },
  created() {
    this.getRenovationDetail()
  },
  methods: {
    // 查看模板详情
    async getRenovationDetail() {
      const id = this.$route.params.id
      const { data } = await getRenovationDetailApi(id)
      this.temp.id = data.id
      this.temp.title = data.title
      this.temp.ismobile = data.ismobile
      this.temp.template = data.template
      console.log(data)
    },
    // 添加组件
    addComponentItem(template) {
      template.checked = false
      this.temp.template.push(template)
    }
  }
}
</script>
<style scoped lang='scss'>
.renovation-edit-page{
  height: calc(100vh - 85px);
  .edit-item{
    width: 40%;
  }
  .item{
    .item-inner{
    min-height: 500px;
    }
  }
  .component-item:hover{
    color: #448ef7;
    border: 1px solid #448ef7 !important;
    transition: all 0.3s;
  }
}

</style>
