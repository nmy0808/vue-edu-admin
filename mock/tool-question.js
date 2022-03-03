const Mock = require('mockjs')
const { uniqueId, range, shuffle, random } = require('xe-utils')

const { list } = Mock.mock({
  'list|10': [
    {
      id: '@id()',
      school_id: '@guid()',
      title: '@ctitle(5,10)' + '?',
      remark: '@cparagraph(13,35)',
      type: '@pick(["radio", "checkbox","trueOrfalse","answer","completion",])',
      // value: {
      //   value: 0,
      //   options: ['选项1']
      // },
      created_time: '2021-12-27T14:52:32.000Z',
      updated_time: '2021-12-27T14:52:32.000Z'
    }
  ]
})
// 根据类型生成对应value
const generateValueByType = () => {
  list.forEach((item) => {
    const type = item.type
    const obj = {}
    if (type === 'radio') {
      obj.value = 0
      obj.options = ['选项一', '选项二', '选项三']
    } else if (type === 'checkbox') {
      obj.value = [0, 1]
      obj.options = ['多选一', '多选二', '多选三']
    } else if (type === 'trueOrfalse') {
      obj.value = 0
      obj.options = ['判断一', '判断二', '判断三']
    } else if (type === 'answer') {
      obj.options = ['我是答案.....']
    } else {
      obj.options = ['填空答案1', '填空答案2', '填空答案3']
    }
    item.value = obj
  })
}
generateValueByType()
// 优惠券列表
module.exports = [
  {
    url: '/admin/s/question',
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
  // 新建题目
  {
    url: '/admin/s/question/save',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // 更新题目
  {
    url: '/admin/s/question/update',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // 删除题目
  {
    url: '/admin/s/question/delete',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
