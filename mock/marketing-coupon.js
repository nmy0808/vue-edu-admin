const Mock = require('mockjs')
const { uniqueId, range, shuffle, random } = require('xe-utils')

const { list } = Mock.mock({
  'list|10': [
    {
      id: '@id()',
      school_id: '@guid()',
      type: '@pick(["course", "column"])',
      goods_id: '@guid()',
      price: '@integer(23,35)' + '.00',
      c_num: '@integer(18,29)',
      received_num: '@integer(18,29)', //已领取
      used_num: '@integer(18,29)', //已使用
      auto: '@integer(0,1)',
      expire: '@pick([24, 48])',
      status: '@integer(0,3)',
      start_time: '@date(yyyy-MM-dd hh:mm:ss)',
      end_time: '@date(yyyy-MM-dd hh:mm:ss)',
      created_time: '@date(yyyy-MM-dd hh:mm:ss)',
      updated_time: '@date(yyyy-MM-dd hh:mm:ss)',
      value: {
        id: '@guid()',
        title: '@ctitle(5,10)',
        cover: "@image('200x130','#f4f6f9','#2c384c','jpg','img')",
        price: '@integer(23,35)' + '.00',
        type: 'media'
      }
    }
  ]
})
// 优惠券列表
module.exports = [
  {
    url: '/admin/s/coupon',
    type: 'get',
    response: (_) => {
      return {
        code: 20000,
        data: {
          total: 100,
          items: shuffle(list)
        }
      }
    }
  },
  // 更新优惠券
  {
    url: '/admin/s/coupon/update',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // 新增优惠券
  {
    url: '/admin/s/coupon/save',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // 上架/下架优惠券
  {
    url: '/admin/s/coupon/updatestatus',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
