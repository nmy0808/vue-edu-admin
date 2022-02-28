const Mock = require('mockjs')
const { uniqueId, range, shuffle, random } = require('xe-utils')

const { list } = Mock.mock({
  'list|10': [
    {
      id: '@id()',
      school_id: '@guid()',
      title: '@ctitle(5,10)' + '?',
      expire: '@integer(1,69)',
      pass_score: 60,
      status: '@integer(0,1)',
      total_score: 100,
      created_time: '2021-12-27T14:52:32.000Z',
      updated_time: '2021-12-27T14:52:32.000Z'
    }
  ]
})

module.exports = [
  // 查看试卷详情
  {
    url: '/admin/s/testpaper/read',
    type: 'get',
    response: (_) => {
      return {
        code: 20000,
        data: {
          id: 62,
          title: '试卷名称',
          total_score: 100,
          pass_score: 60,
          expire: 120,
          status: 1,
          questions: [
            {
              score: 0,
              question: {
                id: 180,
                title: '说说你的看法',
                remark: '问题解析',
                type: 'answer',
                value: {
                  options: ['哈哈哈哈哈哈']
                }
              }
            },
            {
              score: 0,
              question: {
                id: 179,
                title: '我超喜欢你',
                remark: '哈哈哈',
                type: 'completion',
                value: {
                  options: ['1000年', '10年'],
                  value: ''
                }
              }
            },
            {
              score: 0,
              question: {
                id: 178,
                title: '请问我是男生还是女生',
                remark: '问题解析',
                type: 'trueOrfalse',
                value: {
                  options: ['正确', '错误'],
                  value: 1
                }
              }
            },
            {
              score: 10,
              question: {
                id: 177,
                title: '你的名字叫什么',
                remark: '问题解析',
                type: 'checkbox',
                value: {
                  options: ['张三', '李四', '王五', '王五哈'],
                  value: [0, 1]
                }
              }
            },
            {
              score: 20,
              question: {
                id: 176,
                title: '你的名字叫什么',
                remark: '问题解析',
                type: 'radio',
                value: {
                  options: ['张三', '李四', '王五', '王五哈'],
                  value: 0
                }
              }
            }
          ]
        }
      }
    }
  },
  // 新建试卷
  {
    url: '/admin/s/testpaper/save',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // 更新试卷
  {
    url: '/admin/s/testpaper/update',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // 删除试卷
  {
    url: '/admin/s/testpaper/delete',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/admin/s/testpaper',
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
