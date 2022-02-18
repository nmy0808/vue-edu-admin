const Mock = require('mockjs')
const { shuffle } = require('xe-utils')

const count = 100
const { list: mobileList } = Mock.mock({
  'list|10': [
    {
      id: '@guid()',
      school_id: '@guid()',
      title: '@ctitle(2,7)',
      isdefault: 0,
      type: 'common',
      ismobile: 1,
      created_time: '@date(yyyy-MM-dd hh:mm:ss)',
      updated_time: '@date(yyyy-MM-dd hh:mm:ss)'
    }
  ]
})
const { list: pcList } = Mock.mock({
  'list|10': [
    {
      id: '@guid()',
      school_id: '@guid()',
      title: '@ctitle(2,7)',
      isdefault: 0,
      type: 'common',
      ismobile: 0,
      created_time: '@date(yyyy-MM-dd hh:mm:ss)',
      updated_time: '@date(yyyy-MM-dd hh:mm:ss)'
    }
  ]
})
module.exports = [
  // 查看订单列表
  {
    url: '/admin/s/renovation',
    type: 'get',
    response: (_) => {
      const ismobile = _.query.ismobile
      return {
        msg: 'ok',
        code: 20000,
        data: {
          total: 100,
          items: ismobile ? shuffle(mobileList) : shuffle(pcList)
        }
      }
    }
  },
  // 新增页面
  {
    url: '/admin/s/renovation/save',
    type: 'post',
    response: (_) => {
      return {
        msg: 'ok',
        code: 20000,
        data: true
      }
    }
  },
  // 更新页面
  {
    url: '/admin/s/renovation/update',
    type: 'post',
    response: (_) => {
      return {
        msg: 'ok',
        code: 20000,
        data: true
      }
    }
  },
  // 删除页面
  {
    url: '/admin/s/renovation/delete',
    type: 'post',
    response: (_) => {
      return {
        msg: 'ok',
        code: 20000,
        data: true
      }
    }
  },
  // 查看模板详情
  {
    url: '/admin/s/renovation/read',
    type: 'get',
    response: (_) => {
      return {
        msg: 'ok',
        code: 20000,
        data: {
          id: 1,
          title: '首页',
          ismobile: 1,
          template: [
            {
              type: 'swiper',
              data: [
                {
                  src: 'http://edu-image.nosdn.127.net/96bd39ce1d334b8493bac12bb1aa4223.png?imageView&quality=100&thumbnail=1053y483',
                  url: ''
                },
                {
                  src: 'http://edu-image.nosdn.127.net/0447eb8e514b45d385d9ed9d6c5b6f5f.png?imageView&quality=100&thumbnail=1053y483',
                  url: ''
                }
              ]
            },
            {
              type: 'icons',
              data: [
                {
                  src: 'https://img4.mukewang.com/5fc067a7000130ac05400200.jpg',
                  name: 'Java',
                  url: ''
                },
                {
                  src: 'https://img.mukewang.com/5fc067b30001922705400200.jpg',
                  name: '前端',
                  url: ''
                },
                {
                  src: 'https://img2.mukewang.com/5fc067bd0001575f05400200.jpg',
                  name: 'Python',
                  url: ''
                },
                {
                  src: 'https://img4.mukewang.com/5fc067ca0001048405400200.jpg',
                  name: '大数据',
                  url: ''
                }
              ]
            },
            {
              type: 'promotion',
              title: '拼团',
              data: [
                {
                  cover:
                    'https://edu-image.nosdn.127.net/9b9572c6b6b14964b3e26faed9eafcb9.png',
                  title: '课程标题一',
                  b_num: 10,
                  price: 100,
                  t_price: 299
                },
                {
                  cover:
                    'https://edu-image.nosdn.127.net/6acb1e3d39dc497bb98cf35b325a755d.png?imageView&quality=100&crop=0_0_899_500&thumbnail=223y124',
                  title: '课程标题一',
                  b_num: 10,
                  price: 100,
                  t_price: 299
                },
                {
                  cover:
                    'https://edu-image.nosdn.127.net/9b9572c6b6b14964b3e26faed9eafcb9.png',
                  title: '课程标题一',
                  b_num: 10,
                  price: 100,
                  t_price: 299
                },
                {
                  cover:
                    'https://edu-image.nosdn.127.net/6acb1e3d39dc497bb98cf35b325a755d.png?imageView&quality=100&crop=0_0_899_500&thumbnail=223y124',
                  title: '课程标题一',
                  b_num: 10,
                  price: 100,
                  t_price: 299
                }
              ]
            },
            {
              type: 'imageAd',
              data: 'https://dummyimage.com/800x80'
            },
            {
              type: 'list',
              title: '最新列表',
              listType: 'two',
              showMore: true,
              more: {
                title: '演示页面',
                url: ''
              },
              data: [
                {
                  cover:
                    'https://edu-image.nosdn.127.net/561821cf12524f69bde0c6e9d3f3b030.png?imageView&quality=100&crop=0_0_900_499&thumbnail=223y124',
                  title: '课程标题一',
                  desc: '一句话推荐',
                  price: 100,
                  t_price: 299
                },
                {
                  cover:
                    'https://edu-image.nosdn.127.net/9d416f92eb9f4b0f99673914671a6805.png?imageView&quality=100&crop=0_0_900_499&thumbnail=223y124',
                  title: '课程标题一',
                  desc: '一句话推荐',
                  price: 100,
                  t_price: 299
                },
                {
                  cover:
                    'https://edu-image.nosdn.127.net/9769ffd1157747c9b0f668276cf559cc.png?imageView&quality=100&crop=0_0_1280_719&thumbnail=223y124',
                  title: '课程标题一',
                  desc: '一句话推荐',
                  price: 100,
                  t_price: 299
                },
                {
                  cover:
                    'https://edu-image.nosdn.127.net/b4d2d9f9e6fe41d696133254133178d9.png?imageView&quality=100&crop=0_0_900_499&thumbnail=223y124',
                  title: '课程标题一',
                  desc: '一句话推荐',
                  price: 100,
                  t_price: 299
                },
                {
                  cover:
                    'https://edu-image.nosdn.127.net/561821cf12524f69bde0c6e9d3f3b030.png?imageView&quality=100&crop=0_0_900_499&thumbnail=223y124',
                  title: '课程标题一',
                  desc: '一句话推荐',
                  price: 100,
                  t_price: 299
                },
                {
                  cover:
                    'https://edu-image.nosdn.127.net/9d416f92eb9f4b0f99673914671a6805.png?imageView&quality=100&crop=0_0_900_499&thumbnail=223y124',
                  title: '课程标题一',
                  desc: '一句话推荐',
                  price: 100,
                  t_price: 299
                },
                {
                  cover:
                    'https://edu-image.nosdn.127.net/9769ffd1157747c9b0f668276cf559cc.png?imageView&quality=100&crop=0_0_1280_719&thumbnail=223y124',
                  title: '课程标题一',
                  desc: '一句话推荐',
                  price: 100,
                  t_price: 299
                },
                {
                  cover:
                    'https://edu-image.nosdn.127.net/b4d2d9f9e6fe41d696133254133178d9.png?imageView&quality=100&crop=0_0_900_499&thumbnail=223y124',
                  title: '课程标题一',
                  desc: '一句话推荐',
                  price: 100,
                  t_price: 299
                }
              ]
            },
            {
              type: 'imageAd',
              data: 'https://dummyimage.com/800x80'
            }
          ]
        }
      }
    }
  }
]
