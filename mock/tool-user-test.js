const Mock = require('mockjs')
const { uniqueId, range, shuffle, random } = require('xe-utils')

const { list } = Mock.mock({
  'list|10': [
    {
      id: '@id()',
      answer_status: '@integer(0,1)',
      read_status: '@integer(0,1)',
      score: '@integer(10,100)',
      created_time: '@date(yyyy-MM-dd hh:mm:ss)',
      testpaper: {
        id: '@guid()',
        title: '@ctitle(5,10)'
      },
      user: {
        id: '@guid()',
        username: '@name()',
        nickname: '@cname()'
      }
    }
  ]
})

module.exports = [
  // 查看试卷详情
  {
    url: '/admin/s/user_test/read',
    type: 'get',
    response: (_) => {
      return {
        code: 20000,
        data: {
          id: 354,
          score: 0,
          values: [
            {
              type: 'answer',
              answer: ['123'],
              score: 0
            },
            {
              type: 'completion',
              answer: ['嗯', '嗯'],
              score: 0
            },
            {
              type: 'checkbox',
              answer: [0, 1],
              score: 0
            },
            {
              type: 'trueOrfalse',
              answer: 0,
              score: 0
            },
            {
              type: 'radio',
              answer: 2,
              score: 0
            },
            {
              type: 'completion',
              answer: ['嗯', ''],
              score: 0
            },
            {
              type: 'answer',
              answer: ['是'],
              score: 0
            },
            {
              type: 'trueOrfalse',
              answer: 0,
              score: 0
            },
            {
              type: 'checkbox',
              answer: [0],
              score: 0
            },
            {
              type: 'radio',
              answer: 0,
              score: 0
            }
          ],
          testpaper: {
            id: 61,
            title: '开学考试啊'
          },
          questions: [
            {
              score: 10,
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
              score: 10,
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
              score: 10,
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
                id: 176,
                title: '你的名字叫什么',
                remark: '问题解析',
                type: 'radio',
                value: {
                  options: ['张三', '李四', '王五', '王五哈'],
                  value: 0
                }
              }
            },
            {
              score: 10,
              question: {
                id: 168,
                title: '<p>修空调师傅修______空调</p>',
                remark: '<p>格力空调</p>',
                type: 'completion',
                value: {
                  options: ['<p>格力11</p>']
                }
              }
            },
            {
              score: 10,
              question: {
                id: 167,
                title: '<p>师傅，你怎么修空调</p>',
                remark: '<p>清洗滤网</p>',
                type: 'answer',
                value: {
                  options: ['<p>清洗滤网</p>']
                }
              }
            },
            {
              score: 10,
              question: {
                id: 166,
                title: '<p>师傅，你是修空调的吗？</p>',
                remark: '<p>修空调</p>',
                type: 'trueOrfalse',
                value: {
                  value: 0,
                  options: ['正确', '错误']
                }
              }
            },
            {
              score: 10,
              question: {
                id: 165,
                title: '<p>师傅，你是做什么工作的呀？</p>',
                remark: '<p>修格力空调</p>',
                type: 'checkbox',
                value: {
                  value: [0, 1],
                  options: [
                    '<p>修空调</p>',
                    '<p>修格力空调</p>',
                    '选项三',
                    '选项四'
                  ]
                }
              }
            },
            {
              score: 10,
              question: {
                id: 164,
                title: '<p>师傅，你是做什么工作的呀？</p>',
                remark: '<p>修空调</p>',
                type: 'radio',
                value: {
                  value: 0,
                  options: ['<p>修空调</p>', '选项二', '选项三', '选项四']
                }
              }
            }
          ]
        }
      }
    }
  },
  // 删除试卷
  {
    url: '/admin/s/user_test/delete',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // 设置考试管理阅卷状态
  {
    url: '/admin/s/user_test/update_readstatus',
    type: 'get',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // 列表
  {
    url: '/admin/s/user_test',
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
