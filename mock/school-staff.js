const Mock = require('mockjs')
const { uniqueId, range, shuffle, random } = require('xe-utils')
// 社区列表
const { list } = Mock.mock({
  'list|10': []
})
module.exports = [
  // 员工列表
  {
    url: '/admin/s/schoolstaff',
    type: 'get',
    response: (_) => {
      return {
        code: 20000,
        data: {
          total: 127,
          items: [
            {
              id: 1232,
              school_id: 40,
              user_id: 1,
              iscreator: 0,
              role_ids: '2',
              created_time: '2022-03-02T11:14:37.000Z',
              updated_time: '2022-03-02T11:32:23.000Z',
              userId: 1,
              schoolId: 40,
              user: {
                id: 1,
                username: 'ceshi1',
                nickname: '',
                avatar: 'https://dummyimage.com/200x200.png/47566f/226a3f'
              },
              roles: [
                {
                  id: 2,
                  name: '超级管理员'
                }
              ]
            },
            {
              id: 32,
              school_id: 40,
              user_id: 17,
              iscreator: 1,
              role_ids: '',
              created_time: '2021-03-31T11:30:10.000Z',
              updated_time: '2021-03-31T11:30:10.000Z',
              userId: 17,
              schoolId: 40,
              user: {
                id: 17,
                username: 'admin',
                nickname: '',
                avatar: 'https://dummyimage.com/200x200.png/47566f/226a3f'
              },
              roles: []
            }
          ]
        }
      }
    }
  },
  // 创建员工
  {
    url: '/admin/s/schoolstaff/save',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // 删除员工
  {
    url: '/admin/s/schoolstaff/delete',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // 给员工配置权限
  {
    url: '/admin/s/schoolstaff/setroles',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
