const Mock = require('mockjs')
const { uniqueId, range } = require('xe-utils')

const List = []
const count = 100

const baseContent =
  '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri =
  'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: '@increment()',
      title: '@ctitle(5)',
      cover: '@image("200x100")',
      try: '试看内容',
      content: '图文内容',
      price: '@integer(1, 20)',
      t_price: '@integer(21, 2000)',
      type: 'media',
      school_id: '@id()',
      'status|1': [0, 1],
      'isend|1': [0, 1],
      'sub_count|1': [0, 2, 4, 6, 8, 29, 19],
      is_single: 1,
      created_time: '@date(yyyy-MM-dd hh:mm:ss)',
      updated_time: '@date(yyyy-MM-dd hh:mm:ss)'
    })
  )
}

module.exports = [
  {
    url: '/admin/s/column/delete',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/admin/s/column/updatestatus',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/admin/s/column/update',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/admin/s/column/save',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/admin/s/column/updateend',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/admin/s/column/read',
    type: 'get',
    response: (_) => {
      return {
        code: 20000,
        data: {
          id: 3,
          title: '第一个专栏3',
          cover: 'http://dummyimage.com/200x100',
          try: '简单介绍',
          content: '图文内容',
          price: '9.98',
          t_price: '20.00',
          school_id: 11,
          status: 1,
          isend: 1,
          sub_count: 0,
          created_time: '2021-02-28T15:21:51.000Z',
          updated_time: '2021-03-21T10:55:05.000Z'
        }
      }
    }
  },
  // 专栏目录
  {
    url: '/admin/s/column_course/save',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/admin/s/column_course/sort',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/admin/s/column_course/delete',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/admin/s/column_course',
    type: 'get',
    response: (_) => {
      return {
        code: 20000,
        data: {
          total: 5,
          code: 20000,
          items: getColumnsCourseList()
        }
      }
    }
  },
  {
    url: '/admin/s/column',
    type: 'get',
    response: (config) => {
      // { page, type, status, title }
      // const {  type, title, page = 1, limit = 20, sort } = config.query
      const { page = 1, type, status = 1, title, limit } = config.query
      const mockList = List.filter((item) => {
        // if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        if (status !== item.status) {
          return false
        }
        return true
      })

      // if (sort === '-id') {
      //   mockList = mockList.reverse()
      // }

      const pageList = mockList.filter(
        (item, index) => index < limit * page && index >= limit * (page - 1)
      )

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  }
]
// 专栏目录列表
function getColumnsCourseList() {
  const list = []
  for (let i = 0; i < 10; i++) {
    const item = {}
    item.course_id = uniqueId()
    item.title = Mock.ctitle()
    item.cover = 'http://dummyimage.com/200x100'
    item.price = range(1, 9) + ''
    item.t_price = range(10, 21) + ''
    item.status = range(0, 1)
    item.type = 'media'
    item.id = uniqueId()
    item.sub_count = 0
    item.orderby = 1
    list.push(item)
  }
  return list
}
