<template>
  <div class="d-flex renovation-edit-page app-container" style="background: #eeeeee; overflow-y: auto;">
    <div class="item px-3 py-3" style="width: 500px;">
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
    <div class="item edit-item px-3 py-3 mx-5 pb-5" style="width: 500px;">
      <div class="shadow-sm rounded-1 bg-white item-inner">
        <!-- 中间面板区域 -->
        <div
          v-for="(item, index) in temp.template"
          :key="index"
          class="mb-1"
          :class="{'middle-item-active':item.checked, 'cursor-pointer':true}"
          @click="handleSelectChange(index)"
        >
          <!-- search -->
          <template v-if="item.type ==='search'">
            <search :placeholder="item.placeholder" />
          </template>
          <!-- list -->
          <template v-if="item.type ==='list'">
            <list :data="item.data" :title="item.title" :show-more="item.showMore" :list-type="item.listType" />
          </template>
          <!-- swiper -->
          <template v-if="item.type ==='swiper'">
            <swiper :data="item.data" />
          </template>
          <!-- icons -->
          <template v-if="item.type ==='icons'">
            <Icons :data="item.data"/>
          </template>
          <div>123</div>

          <!--  -->
          <!-- 右侧上下移动操作面板 -->
          <div
            v-if="item.checked"
            class="actions-panel d-flex flex-column"
          >
            <i
              class="el-icon-top"
              :class="{disable:index===0}"
              @click.stop="handleMoveUp(index)"
            />
            <i
              class="el-icon-bottom"
              :class="{disable:index===temp.template.length-1}"
              @click.stop="handleMoveDown(index)"
            />
            <i
              class="el-icon-close"
              @click.stop="handleClose(index)"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="item  px-3 py-3" style="width: 500px;">
      <div class="shadow-sm rounded-1 bg-white item-inner">
        <div class="p-3 py-2" style="border-bottom: 1px solid #eeeeee">
          <p class="p-0 m-0 font-size-14 text-weight-bold">组件编辑</p>
        </div>
        <MobileEditComponent
          ref="editComponent"
          :type="activeItem.type"
          @change="handleChange"
          @move="handleMove"
          @add="handleAddData"
          @bindPage="handBindPage"
          @swiperChange="handleSwiperChange"
          @iconsChange="handleIconsChange"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { getRenovationDetailApi } from '@/api/renovation'
import MobileEditComponent from '../components/MobileEditComponent.vue'
import Search from '../components/Search.vue'
import List from '../components/List.vue'
import { moveDown, moveUp } from '@/utils'
import { clone } from 'xe-utils'
import Swiper from '../components/Swiper.vue'
import Icons from '../components/Icons.vue'
export default {
  components: { MobileEditComponent, Search, List, Swiper, Icons },
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
  computed: {
    // 中间面板区:当前激活的组件项
    activeItem() {
      return this.temp.template[this.activeIndex] || {}
    },
    activeIndex() {
      return this.temp.template.findIndex(it => it.checked)
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
    },
    // 添加组件
    addComponentItem(template) {
      template.checked = false
      const obj = { ...template.default }
      obj.type = template.type
      obj.title = template.title
      obj.checked = false
      this.temp.template.push(obj)
    },
    // 在中间面板选中组件的事件
    handleSelectChange(index) {
      const newTemp = this.temp.template.map(it => {
        return {
          ...it,
          checked: false
        }
      })
      newTemp[index].checked = true
      this.temp.template = newTemp

      this.$refs.editComponent.initVal(newTemp[index])
    },
    // moveTo上移
    handleMoveUp(index) {
      if (index === 0) return
      const newTemplate = moveUp(this.temp.template, index)
      this.temp.template = []
      this.$nextTick(() => {
        this.temp.template = newTemplate
        console.log(this.temp.template)
      })
    },
    // moveTo下移
    handleMoveDown(index) {
      if (index === this.temp.template.length - 1) return
      const newTemplate = moveDown(this.temp.template, index)
      this.temp.template = []
      this.$nextTick(() => {
        this.temp.template = newTemplate
      })
    },
    // 删除该项
    handleClose(index) {
      this.$msgbox({
        title: '删除',
        message: '是否删除?',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(action => {
        const copy = clone(this.temp.template, true)
        copy.splice(index, 1)
        setTimeout(() => {
          copy.forEach(it => {
            it.checked = false
          })
          this.temp.template = copy
        }, 100)
      }).catch(err => err)
    },
    // 监听: 右侧值改变事件
    handleChange({ key, value }) {
      this.temp.template[this.activeIndex][key] = value
    },
    // 监听: 列表拖拽事件
    handleMove(list) {
      this.temp.template[this.activeIndex].data = list
    },
    // 监听: 列表添加事件
    handleAddData(items) {
      const list = this.temp.template[this.activeIndex].data
      this.temp.template[this.activeIndex].data = list.concat(items)
      this.$refs.editComponent.initVal(this.temp.template[this.activeIndex])
    },
    // 监听右侧面板绑定页面事件
    handBindPage(page) {
      this.temp.template[this.activeIndex].more = page
    },
    // 监听 swiper 事件
    handleSwiperChange(newData) {
      this.temp.template[this.activeIndex].data = newData
    },
    //
    handleIconsChange(newData) {
      console.log(13123)
      this.temp.template[this.activeIndex].data = newData
    }
  }
}
</script>
<style scoped lang='scss'>
.renovation-edit-page{
  min-height: calc(100vh - 85px);
  .edit-item{
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
  .middle-item-active{
    border: 1px dashed #448ef7;
    padding: 3px 0;
    position: relative;
    cursor: pointer;
    .actions-panel{
      height: 90px;
      position:absolute;
      right: -2.1em;
      top: -1px;
      z-index: 10;
      background: #fff;
       i{
         width: 2em;
         height: 2em;
         display: flex;
         justify-content: center;
         align-items: center;
         &:not(.disable):hover{
           background: #448ef7;
           color: white;
         }
         &.disable{
           color: #ccc;
           cursor: not-allowed;
         }
       }
    }
  }
}

</style>
