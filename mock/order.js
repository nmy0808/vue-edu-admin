const Mock = require('mockjs')
const { shuffle } = require('xe-utils')

const count = 100
const { list } = Mock.mock({
  'list|10': [
    {
      id: '@guid()',
      school_id: '@guid()',
      user_id: '@guid()',
      no: '@increment(1)',
      status: '@pick(["pendding", "success","fail"])',
      price: '@integer(1,200)' + '.00',
      total_price: '@integer(200,500)' + '.00',
      type: '@pick(["group", "default"])',
      pay_method: '@pick(["微信", "支付宝"])',
      pay_time: '@date(yyyy-MM-dd hh:mm:ss)',
      created_time: '@date(yyyy-MM-dd hh:mm:ss)',
      updated_time: '@date(yyyy-MM-dd hh:mm:ss)',
      'goods|3-10': [
        {
          title: '@ctitle(8)'
        }
      ],
      title: '[专栏]' + '@ctitle(8)'
    }
  ]
})
module.exports = [
  // 查看订单列表
  {
    url: '/admin/s/order',
    type: 'get',
    response: (_) => {
      return {
        msg: 'ok',
        code: 20000,
        data: {
          total: 100,
          items: []
        }
      }
    }
  },
  // 删除订单
  {
    url: '/admin/s/order/delete',
    type: 'post',
    response: (_) => {
      return {
        msg: 'ok',
        code: 20000,
        data: true
      }
    }
  }
]
