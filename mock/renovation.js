const Mock = require('mockjs')
const { shuffle, uniqueId } = require('xe-utils')

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
          id: uniqueId(),
          title: '首页',
          ismobile: 1,
          template: [
            {
              placeholder: '请输入搜索关键词',
              checked: false,
              type: 'search'
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
                  title: 'uni-app实战视频点播app小程序',
                  try: '一句话推荐',
                  price: 100,
                  t_price: 299
                },
                {
                  cover:
                    'https://edu-image.nosdn.127.net/9d416f92eb9f4b0f99673914671a6805.png?imageView&quality=100&crop=0_0_900_499&thumbnail=223y124',
                  title: 'uni-app多端企业网盘全栈开发',
                  try: '一句话推荐',
                  price: 100,
                  t_price: 299
                },
                {
                  cover:
                    'https://edu-image.nosdn.127.net/9769ffd1157747c9b0f668276cf559cc.png?imageView&quality=100&crop=0_0_1280_719&thumbnail=223y124',
                  title: 'VueCli 实战商城后台管理系统',
                  try: '一句话推荐',
                  price: 100,
                  t_price: 299
                },
                {
                  cover:
                    'https://edu-image.nosdn.127.net/b4d2d9f9e6fe41d696133254133178d9.png?imageView&quality=100&crop=0_0_900_499&thumbnail=223y124',
                  title: 'uni-app实战商城类app和小程序',
                  try: '一句话推荐',
                  price: 100,
                  t_price: 299
                },
                {
                  cover:
                    'https://edu-image.nosdn.127.net/561821cf12524f69bde0c6e9d3f3b030.png?imageView&quality=100&crop=0_0_900_499&thumbnail=223y124',
                  title: 'uni-app实战视频点播app小程序',
                  try: '一句话推荐',
                  price: 100,
                  t_price: 299
                },
                {
                  cover:
                    'https://edu-image.nosdn.127.net/9d416f92eb9f4b0f99673914671a6805.png?imageView&quality=100&crop=0_0_900_499&thumbnail=223y124',
                  title: 'uni-app多端企业网盘全栈开发',
                  try: '一句话推荐',
                  price: 100,
                  t_price: 299
                },
                {
                  cover:
                    'https://edu-image.nosdn.127.net/9769ffd1157747c9b0f668276cf559cc.png?imageView&quality=100&crop=0_0_1280_719&thumbnail=223y124',
                  title: 'VueCli 实战商城后台管理系统',
                  try: '一句话推荐',
                  price: 100,
                  t_price: 299
                },
                {
                  cover:
                    'https://edu-image.nosdn.127.net/b4d2d9f9e6fe41d696133254133178d9.png?imageView&quality=100&crop=0_0_900_499&thumbnail=223y124',
                  title: 'uni-app实战商城类app和小程序',
                  try: '一句话推荐',
                  price: 100,
                  t_price: 299
                }
              ]
            },
            {
              data: [
                {
                  src: 'https://dummyimage.com/365x150',
                  type: '',
                  course_title: '',
                  course_id: '',
                  url: ''
                },
                {
                  src: 'https://dummyimage.com/366x150',
                  type: '',
                  course_title: '',
                  course_id: '',
                  url: ''
                }
              ],
              checked: false,
              type: 'swiper'
            },
            {
              data: [
                {
                  src: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
                  name: '分类1',
                  type: 'webview',
                  url: 'http://www.dishaxy.com',
                  page_id: 0,
                  page_title: '',
                  course_title: '',
                  course_id: ''
                },
                {
                  src: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
                  name: '分类2',
                  type: 'course',
                  url: '',
                  page_id: 0,
                  page_title: '',
                  course_title: 'test12',
                  course_id: 550
                },
                {
                  src: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
                  name: '分类3',
                  type: 'page',
                  url: '',
                  page_id: 53,
                  page_title: '测试新增页面111',
                  course_title: '',
                  course_id: ''
                },
                {
                  src: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
                  name: '分类4',
                  type: 'page',
                  url: '',
                  page_id: 8,
                  page_title: '新页面111133333',
                  course_title: '',
                  course_id: ''
                }
              ],
              checked: false,
              type: 'icons'
            },
            {
              listType: 'group',
              title: '拼团',
              data: [
                {
                  id: 550,
                  title: 'test12',
                  cover:
                    'http://demo-mp3.oss-cn-shenzhen.aliyuncs.com/egg-edu-demo/ed6222ff0a0cbec6cc42.jpg',
                  try: '<p>test11测试11</p>',
                  content:
                    'http://demo-mp3.oss-cn-shenzhen.aliyuncs.com/egg-edu-demo/9440c713f6d2e8940583.mp3',
                  price: '20.00',
                  t_price: '30.00',
                  type: 'audio',
                  school_id: 11,
                  status: 1,
                  sub_count: 0,
                  is_single: 1,
                  created_time: '2021-05-11T03:49:14.000Z',
                  updated_time: '2021-05-11T03:49:14.000Z'
                },
                {
                  id: 539,
                  title: '我是音频123',
                  cover:
                    'http://demo-mp3.oss-cn-shenzhen.aliyuncs.com/egg-edu-demo/0bb3ed1eae1762280ad5.png',
                  try: '<p>我是音频1</p>',
                  content:
                    'http://demo-mp3.oss-cn-shenzhen.aliyuncs.com/egg-edu-demo/c087e9b00b7c0dd3235e.mp3',
                  price: '10.00',
                  t_price: '20.00',
                  type: 'audio',
                  school_id: 11,
                  status: 1,
                  sub_count: 0,
                  is_single: 1,
                  created_time: '2021-04-15T07:47:38.000Z',
                  updated_time: '2021-04-15T08:08:14.000Z'
                },
                {
                  id: 525,
                  title: '第二个音频',
                  cover:
                    'http://demo-mp3.oss-cn-shenzhen.aliyuncs.com/egg-edu-demo/11abd59c652ddf25afbc.png',
                  try: '<p>第二个音频</p>',
                  content:
                    'http://demo-mp3.oss-cn-shenzhen.aliyuncs.com/egg-edu-demo/2ee01b4af4da756812b1.mp3',
                  price: '10.10',
                  t_price: '20.00',
                  type: 'audio',
                  school_id: 11,
                  status: 1,
                  sub_count: 0,
                  is_single: 1,
                  created_time: '2021-04-06T04:30:51.000Z',
                  updated_time: '2021-05-20T07:14:26.000Z'
                }
              ],
              checked: false,
              type: 'promotion'
            },
            {
              data: [
                {
                  src: 'blob:http://localhost:9527/a9b7d759-6730-4e26-8fb3-5843bc7db43a',
                  type: '',
                  course_title: '',
                  course_id: '',
                  url: ''
                }
              ],
              checked: false,
              type: 'imageAd'
            },
            {
              data: [
                {
                  price: 100,
                  condition: '满￥200可用'
                },
                {
                  price: 200,
                  condition: '满￥400可用'
                },
                {
                  price: 300,
                  condition: '满￥600可用'
                },
                {
                  price: 400,
                  condition: '满￥800可用'
                }
              ],
              checked: true,
              type: 'coupon'
            }
          ]
        }
      }
    }
  },
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
  }
]
