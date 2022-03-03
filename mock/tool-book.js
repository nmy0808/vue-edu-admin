const Mock = require('mockjs')
const { uniqueId, range, shuffle, random } = require('xe-utils')
// 电子书列表
const { list: bookList } = Mock.mock({
  'list|10': [
    {
      id: '@id()',
      school_id: '@guid()',
      title: '@ctitle(6,12)',
      cover: "@image('250x250','#f4f6f9','#2c384c','jpg','img')",
      desc: '@cparagraph(13,35)',
      try: '@cparagraph(13,35)',
      price: '@integer(23,35)' + '.00',
      t_price: '@integer(43,135)' + '.00',
      status: '@integer(0,1)',
      sub_count: '@integer(0,11)',
      is_single: 1,
      created_time: '2021-12-06T03:29:06.000Z',
      updated_time: '2021-12-10T12:43:52.000Z'
    }
  ]
})
// 电子书章节列表
const { list: bookChapterList } = Mock.mock({
  'list|10': [
    {
      id: '@id()',
      title: '@ctitle(5,12)',
      content: '@cparagraph(23,45)',
      isfree: '@integer(0,1)',
      orderby: 0
    }
  ]
})
module.exports = [
  // 新增电子书
  {
    url: '/admin/s/book/save',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // 更新电子书
  {
    url: '/admin/s/book/update',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  // 上架/下架电子书
  {
    url: '/admin/s/book/updatestatus',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  // 新增电子书章节
  {
    url: '/admin/s/book_detail/save',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: {
          id: uniqueId(),
          title: '新章节',
          content: '',
          isfree: 0,
          orderby: 0
        }
      }
    }
  },
  // 更新电子书章节
  {
    url: '/admin/s/book_detail/update',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // 电子书章节排序
  {
    url: '/admin/s/book_detail/sort',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // 删除电子书章节
  {
    url: '/admin/s/book_detail/delete',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
   // 电子书章节列表
   {
    url: '/admin/s/book_detail',
    type: 'get',
    response: (_) => {
      return {
        code: 20000,
        data: {
          total: 100,
          items: shuffle(bookChapterList)
        }
      }
    }
  },
  // 电子书列表
  {
    url: '/admin/s/book',
    type: 'get',
    response: (_) => {
      return {
        code: 20000,
        data: {
          total: 100,
          items: shuffle(bookList)
        }
      }
    }
  },

]
