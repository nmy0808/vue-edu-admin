const Mock = require('mockjs')
const { shuffle } = require('xe-utils')

const { list } = Mock.mock({
  'list|10': [
    {
      id: '@id()',
      price: '@integer(23,235)' + '.00',
      status: '@integer(0,1)',
      name: '@ctitle()',
      account: '@integer(6116,6996)' + ' **** **** ' + '@integer(1287,7287)',
      created_time: '@date(yyyy-MM-dd hh:mm:ss)'
    }
  ]
})
module.exports = [
  // 查看申请提现列表
  {
    url: '/admin/s/cashconfirm',
    type: 'get',
    response: (_) => {
      return {
        msg: 'ok',
        code: 20000,
        data: {
          total: 100,
          items: shuffle(list)
        }
      }
    }
  },
  // 申请提现
  {
    url: '/admin/s/cashconfirm/save',
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
