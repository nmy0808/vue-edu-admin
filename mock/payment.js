const Mock = require('mockjs')
const { shuffle } = require('xe-utils')

const { list } = Mock.mock({
  'list|10': [
    {
      id: '@guid()',
      school_id: '@guid()',
      account: '@integer(621612345678907287,621692345678907287)',
      province: '@province()',
      city: '@city()',
      area: '@county()',
      path: '高新园 百悦国际 a4栋 4单元 2201',
      bank: '@pick(["中国银行北京西罗园支行", "盛京银行皇姑区支行"])',
      name: '@cname()',
      status: '@integer(0,1)',
      created_time: '@date(yyyy-MM-dd hh:mm:ss)',
      updated_time: '@date(yyyy-MM-dd hh:mm:ss)'
    }
  ]
})
module.exports = [
  // 查看账户列表
  {
    url: '/admin/s/cash',
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
  // 新增收款账户
  {
    url: '/admin/s/cash/save',
    type: 'post',
    response: (_) => {
      return {
        msg: 'ok',
        code: 20000,
        data: true
      }
    }
  },
  // 更新收款账户
  {
    url: '/admin/s/cash/update',
    type: 'post',
    response: (_) => {
      return {
        msg: 'ok',
        code: 20000,
        data: true
      }
    }
  },
  // 新增收款账户
  {
    url: '/admin/s/cash/delete',
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
