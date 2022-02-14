const Mock = require('mockjs')
const { random, uniqueId } = require('xe-utils')

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
      cover: '@image("160x100")',
      try: '试看内容',
      content: '图文内容',
      price: '@integer(1, 20)',
      t_price: '@integer(21, 2000)',
      type: 'media',
      school_id: '@id()',
      'status|1': [0, 1],
      'sub_count|1': [0, 2, 4, 6, 8, 29, 19],
      is_single: 1,
      created_time: '@date(yyyy-MM-dd hh:mm:ss)',
      updated_time: '@date(yyyy-MM-dd hh:mm:ss)'
    })
  )
}

module.exports = [
  {
    url: '/admin/s/course',
    type: 'get',
    response: (config) => {
      // { page, type, status, title }
      // const {  type, title, page = 1, limit = 20, sort } = config.query
      // const { page = 1, type, status = 1, title, limit } = config.query
      // const mockList = List.filter((item) => {
      //   // if (type && item.type !== type) return false
      //   // if (title && item.title.indexOf(title) < 0) return false
      //   // if (status !== item.status) {
      //   //   return false
      //   // }
      //   return true
      // })

      // if (sort === '-id') {
      //   mockList = mockList.reverse()
      // }

      // const pageList = mockList.filter(
      //   (item, index) => index < limit * page && index >= limit * (page - 1)
      // )

      return {
        code: 20000,
        data: {
          total: List.length,
          items: List.slice(0, 10)
        }
      }
    }
  },
  {
    url: '/admin/s/course/delete',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/admin/s/course/updatestatus',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/admin/s/course/update',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/admin/s/course/update',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
  // ,{
  //   url: '/vue-element-admin/article/detail',
  //   type: 'get',
  //   response: config => {
  //     const { id } = config.query
  //     for (const article of List) {
  //       if (article.id === +id) {
  //         return {
  //           code: 20000,
  //           data: article
  //         }
  //       }
  //     }
  //   }
  // },

  // {
  //   url: '/vue-element-admin/article/pv',
  //   type: 'get',
  //   response: _ => {
  //     return {
  //       code: 20000,
  //       data: {
  //         pvData: [
  //           { key: 'PC', pv: 1024 },
  //           { key: 'mobile', pv: 1024 },
  //           { key: 'ios', pv: 1024 },
  //           { key: 'android', pv: 1024 }
  //         ]
  //       }
  //     }
  //   }
  // },

  // {
  //   url: '/vue-element-admin/article/create',
  //   type: 'post',
  //   response: _ => {
  //     return {
  //       code: 20000,
  //       data: 'success'
  //     }
  //   }
  // },

  // {
  //   url: '/vue-element-admin/article/update',
  //   type: 'post',
  //   response: _ => {
  //     return {
  //       code: 20000,
  //       data: 'success'
  //     }
  //   }
  // }
]
