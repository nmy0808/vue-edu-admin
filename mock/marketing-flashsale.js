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
      s_num: '@integer(18,29)',
      used_num: '@integer(18,29)',
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
// 拼团列表
module.exports = [
  {
    url: '/admin/s/flashsale',
    type: 'get',
    response: (_) => {
      return {
        code: 20000,
        data: {
          total: list.length,
          items: shuffle(list)
        }
      }
    }
  },
  // 更新拼团
  {
    url: '/admin/s/flashsale/update',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // 新增拼团
  {
    url: '/admin/s/flashsale/save',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // 上架/下架拼团
  {
    url: '/admin/s/flashsale/updatestatus',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
