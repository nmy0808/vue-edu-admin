const Mock = require('mockjs')
const { uniqueId, range, shuffle, random } = require('xe-utils')
// 社区列表
const { list: bbsList } = Mock.mock({
  'list|10': [
    {
      id: '@id()',
      school_id: '@guid()',
      title: '@ctitle(6,10)',
      status: '@integer(0,1)',
      created_time: '2022-02-28T13:20:18.000Z',
      updated_time: '2022-02-28T13:29:33.000Z',
      'managers|10': [
        {
          id: '@guid()',
          username: '@name()',
          avatar: "@image('120x120','#f4f6f9','#2c384c','jpg','avatar')",
          nickname: '@cname()',
          bbs_manager: {
            id: '@guid()',
            bbs_id: '@guid()',
            user_id: '@guid()',
            created_time: '2022-02-28T14:06:31.000Z',
            updated_time: '2022-02-28T14:06:31.000Z',
            userId: '@guid()'
          }
        }
      ]
    }
  ]
})
// 帖子列表
const { list: postList } = Mock.mock({
  'list|10': [
    {
      id: '@id()',
      school_id: '@guid()',
      bbs_id: '@guid()',
      desc: '{"text":"88888","images":[]}',
      'content|2-3': [
        {
          text: '@ctitle(6,11)',
          'images|5': [
            "@image('200x200','#f4f6f9','#2c384c','jpg','img')"
          ]
        }
      ],
      user_id: '@guid()',
      comment_count: '@integer(0,10)',
      support_count: '@integer(0,10)',
      is_top: 0,
      created_time: '2022-02-21T04:01:38.000Z',
      updated_time: '2022-02-26T15:48:10.000Z',
      userId: '@guid()',
      user: {
        id: '@guid()',
        username: '@name()',
        avatar: "@image('100x100','#f4f6f9','#2c384c','jpg','avatar')",
        nickname: '@cname()'
      }
    }
  ]
})
// 评论列表
const { list: postCommentList } = Mock.mock({
  'list|10': [
    {
      id: '@id()',
      school_id: '@guid()',
      post_id: '@guid()',
      content: '@cparagraph(10,30)',
      user_id: '@guid()',
      reply_id: '@guid()',
      reply_user: {
        avatar: "@image('100x100','#f4f6f9','#2c384c','jpg','avatar')",
        nickname: '@cname()',
        username: '@name()'
      },
      is_top: 0,
      created_time: '2021-03-01T16:00:00.000Z',
      updated_time: '2021-03-01T16:00:00.000Z',
      userId: '@guid()',
      user: {
        id: '@guid()',
        username: '@name()',
        avatar: "@image('100x100','#f4f6f9','#2c384c','jpg','avatar')",
        nickname: '@cname()'
      }
    }
  ]
})
module.exports = [
  // 社区模和帖子模块 -------------------------------------------
  // 新增社区
  {
    url: '/admin/s/bbs/save',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // 更新社区
  {
    url: '/admin/s/bbs/update',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // 显示/隐藏社区
  {
    url: '/admin/s/bbs/updatestatus',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // 删除社区
  {
    url: '/admin/s/bbs/delete',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // 给社区分配管理员
  {
    url: '/admin/s/bbs/setmanagers',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  // 取消/置顶帖子
  {
    url: '/admin/s/post/updateistop',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // 删除帖子
  {
    url: '/admin/s/post/delete',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // 删除评论
  {
    url: '/admin/s/post_comment/delete',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // 社区列表
  {
    url: '/admin/s/bbs',
    type: 'get',
    response: (_) => {
      return {
        code: 20000,
        data: {
          total: 100,
          items: shuffle(bbsList)
        }
      }
    }
  },
  // 帖子列表
  {
    url: '/admin/s/post',
    type: 'get',
    response: (_) => {
      return {
        code: 20000,
        data: {
          total: 100,
          items: shuffle(postList)
        }
      }
    }
  },
  // 帖子评论列表
  {
    url: '/admin/s/post_comment',
    type: 'get',
    response: (_) => {
      return {
        code: 20000,
        data: {
          total: 100,
          items: shuffle(postCommentList)
        }
      }
    }
  }
]
