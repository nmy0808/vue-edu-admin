const Mock = require('mockjs')
const { uniqueId, range, shuffle, random } = require('xe-utils')
// 社区列表
const { list } = Mock.mock({
  'list|10': [
    {
      id: '@id()',
      name: '@Ctitle(6,12)',
      level_id: '@guid()',
      level_last_time: '@date(yyyy-MM-dd hh:mm:ss)',
      user_id: '@guid()',
      balance: '0.00',
      w_balance: '10.00',
      t_balance: '210.00',
      appid: '@guid()',
      status: '@integer(0,1)',
      created_time: '2021-03-10T18:01:46.000Z',
      updated_time: '2021-03-10T18:01:46.000Z',
      userId: '@guid()'
    }
  ]
})
module.exports = [
  // 查看当前网校信息
  {
    url: '/admin/s/school/read',
    type: 'get',
    response: (_) => {
      return {
        code: 20000,
        data: {
          id: 11,
          name: '第一个网校123',
          level_id: 0,
          level_last_time: null,
          user_id: 1,
          balance: '1.00',
          w_balance: '50.00',
          t_balance: '100.00',
          appid: 'bd9d01ecc75dbbaaefce',
          status: 1,
          created_time: '2021-02-27T16:18:58.000Z',
          updated_time: '2021-03-12T13:11:46.000Z',
          userId: 1,
          weburl: 'ssss-weqe-adas-sdf',
          user: {
            email: '1236***@qq.com',
            phone: '136****2211',
            id: 1,
            username: 'ceshi1',
            nickname: ''
          }
        }
      }
    }
  },
  // 创建网校
  {
    url: '/admin/school/save',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // 更新网校信息
  {
    url: '/admin/s/school/update',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // 网校列表
  {
    url: '/admin/school',
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
  }
]
