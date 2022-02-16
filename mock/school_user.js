const Mock = require('mockjs')
const { shuffle } = require('xe-utils')

const count = 100
const { list } = Mock.mock({
  'list|10': [
    {
      id: '@increment(1)',
      school_id: '@guid()',
      user_id: '@guid()',
      no_comment: '@pick([0, 1])',
      no_access: '@pick([0, 1])',
      total_consume: '@integer(13,435)' + '.00',
      created_time: '@date(yyyy-MM-dd hh:mm:ss)',
      updated_time: '@date(yyyy-MM-dd hh:mm:ss)',
      userId: '@guid()',
      user: {
        id: '@guid()',
        username: '@title(1)',
        nickname: '@cname()',
        avatar: "@image('120x120','#2f2f33','#fff','jpg','img')"
      }
    }
  ]
})
// 用户订阅列表(课程/专栏)
const { list: subList } = Mock.mock({
  'list|10': [
    {
      id: '@increment(1)',
      price: '@integer(23,35)' + '.00',
      title: '@title(8)',
      type: '',
      comment: '@cparagraph(3,5)',
      created_time: '@date(yyyy-MM-dd hh:mm:ss)',
      updated_time: '@date(yyyy-MM-dd hh:mm:ss)'
    }
  ]
})
// 用户订单列表
const { list: orderList } = Mock.mock({
  'list|10': [
    {
      id: '@increment(1)',
      school_id: '@id()',
      user_id: '@id()',
      no: '@integer(20191211194940843468,20191211197940843468)',
      status: '@pick(["pendding", "success"])',
      price: '@integer(23,35)' + '.00',
      total_price: '@integer(123,135)' + '.00',
      type: 'default',
      pay_method: null,
      pay_time: '@date(yyyy-MM-dd hh:mm:ss)',
      title: '[专栏]' + '@ctitle()',
      'goods|2-8': [
        {
          title: '@ctitle()',
          type: 'media'
        }
      ],
      created_time: '@date(yyyy-MM-dd hh:mm:ss)',
      updated_time: '@date(yyyy-MM-dd hh:mm:ss)'
    }
  ]
})
// 观看历史列表
const { list: historyList } = Mock.mock({
  'list|10': [
    {
      id: '@increment(1)',
      title: '@ctitle()',
      total_time: '@integer(1,100)' + '%',
      type: 'media'
    }
  ]
})
module.exports = [
  // 查询网校用户详细信息
  {
    url: '/admin/s/school_user/read',
    type: 'get',
    response: ({ query }) => {
      const id = query.id
      return {
        msg: 'ok',
        code: 20000,
        data: list.filter((it) => it.userId === id)[0]
      }
    }
  },
  // 查看网校用户订阅列表
  {
    url: '/admin/s/order_item',
    type: 'get',
    response: (_) => {
      return {
        msg: 'ok',
        code: 20000,
        data: {
          total: 100,
          items: shuffle(subList)
        }
      }
    }
  },
  // 查看网校用户订单列表
  {
    url: '/admin/s/order',
    type: 'get',
    response: (_) => {
      return {
        msg: 'ok',
        code: 20000,
        data: {
          total: orderList.length,
          items: orderList
        }
      }
    }
  },
  // 查看网校用户观看历史
  {
    url: '/admin/s/user_history',
    type: 'get',
    response: (_) => {
      return {
        msg: 'ok',
        code: 20000,
        data: {
          total: historyList.length,
          items: historyList
        }
      }
    }
  },
  // 禁止/开启访问
  {
    url: '/admin/s/school_user/updateaccess',
    type: 'post',
    response: (_) => {
      return {
        msg: 'ok',
        code: 20000,
        data: true
      }
    }
  },
  // 禁止/开启评论
  {
    url: '/admin/s/school_user/updatecomment',
    type: 'post',
    response: (_) => {
      return {
        msg: 'ok',
        code: 20000,
        data: true
      }
    }
  },
  // 网校用户列表
  {
    url: '/admin/s/school_user',
    type: 'get',
    response: (config) => {
      return {
        msg: 'ok',
        code: 20000,
        data: {
          total: 100,
          items: shuffle(list)
        }
      }
    }
  }
]
