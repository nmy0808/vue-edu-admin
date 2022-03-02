const Mock = require('mockjs')
const { uniqueId, range, shuffle, random } = require('xe-utils')
// 社区列表
const { list } = Mock.mock({
  'list|10': [
    {
      id: '@id()',
      name: '@Ctitle(6,12)',
      level_id: '@guid()',
      level_last_time: '@date(yyyy-MM-dd hh:mm:ss)',
      user_id: '@guid()',
      balance: '0.00',
      w_balance: '10.00',
      t_balance: '210.00',
      appid: '@guid()',
      status: '@integer(0,1)',
      created_time: '2021-03-10T18:01:46.000Z',
      updated_time: '2021-03-10T18:01:46.000Z',
      userId: '@guid()'
    }
  ]
})
module.exports = [
  // 查看角色权限
  {
    url: '/admin/role/read',
    type: 'get',
    response: (_) => {
      return {
        code: 20000,
        data: {
          id: 2,
          name: '超级管理员',
          role_id: 'admin',
          desc: '描述',
          status: 1,
          created_time: '2021-02-21T17:23:14.000Z',
          updated_time: '2021-02-21T17:23:14.000Z',
          menus: [
            {
              id: 8,
              title: '可视化',
              access_id: 0,
              children: [
                {
                  id: 28,
                  title: '移动端',
                  access_id: 8,
                  children: []
                },
                {
                  id: 29,
                  title: '移动端装修',
                  access_id: 8,
                  children: []
                },
                {
                  id: 30,
                  title: 'PC端',
                  access_id: 8,
                  children: []
                },
                {
                  id: 31,
                  title: 'PC端装修',
                  access_id: 8,
                  children: []
                }
              ]
            },
            {
              id: 2,
              title: '课程',
              access_id: 0,
              children: [
                {
                  id: 9,
                  title: '图文',
                  access_id: 2,
                  children: []
                },
                {
                  id: 10,
                  title: '音频',
                  access_id: 2,
                  children: []
                },
                {
                  id: 11,
                  title: '视频',
                  access_id: 2,
                  children: []
                },
                {
                  id: 12,
                  title: '专栏',
                  access_id: 2,
                  children: []
                },
                {
                  id: 13,
                  title: '专栏详情',
                  access_id: 2,
                  children: []
                }
              ]
            },
            {
              id: 3,
              title: '工具',
              access_id: 0,
              children: [
                {
                  id: 14,
                  title: '小社群',
                  access_id: 3,
                  children: []
                },
                {
                  id: 15,
                  title: '题库',
                  access_id: 3,
                  children: []
                },
                {
                  id: 16,
                  title: '试卷',
                  access_id: 3,
                  children: []
                },
                {
                  id: 17,
                  title: '组卷',
                  access_id: 3,
                  children: []
                },
                {
                  id: 18,
                  title: '考试管理',
                  access_id: 3,
                  children: []
                },
                {
                  id: 128,
                  title: '小社群帖子列表',
                  access_id: 3,
                  children: []
                },
                {
                  id: 129,
                  title: '电子书',
                  access_id: 3,
                  children: []
                },
                {
                  id: 130,
                  title: '电子书章节管理',
                  access_id: 3,
                  children: []
                }
              ]
            },
            {
              id: 4,
              title: '用户',
              access_id: 0,
              children: []
            },
            {
              id: 5,
              title: '交易',
              access_id: 0,
              children: [
                {
                  id: 19,
                  title: '订单管理',
                  access_id: 5,
                  children: []
                },
                {
                  id: 20,
                  title: '资产管理',
                  access_id: 5,
                  children: []
                },
                {
                  id: 21,
                  title: '支付设置',
                  access_id: 5,
                  children: []
                }
              ]
            },
            {
              id: 6,
              title: '营销',
              access_id: 0,
              children: [
                {
                  id: 22,
                  title: '拼团',
                  access_id: 6,
                  children: []
                },
                {
                  id: 23,
                  title: '秒杀',
                  access_id: 6,
                  children: []
                },
                {
                  id: 24,
                  title: '优惠券',
                  access_id: 6,
                  children: []
                }
              ]
            },
            {
              id: 7,
              title: '设置',
              access_id: 0,
              children: [
                {
                  id: 25,
                  title: '店铺设置',
                  access_id: 7,
                  children: []
                },
                {
                  id: 26,
                  title: '员工管理',
                  access_id: 7,
                  children: []
                },
                {
                  id: 27,
                  title: '角色管理',
                  access_id: 7,
                  children: []
                }
              ]
            }
          ],
          accesses: [
            {
              id: 34,
              title: '用户模块',
              access_id: 0,
              children: [
                {
                  id: 67,
                  title: '开启/禁止访问',
                  access_id: 34,
                  children: []
                },
                {
                  id: 62,
                  title: '查看网校用户列表',
                  access_id: 34,
                  children: []
                },
                {
                  id: 63,
                  title: '查询网校用户详细信息',
                  access_id: 34,
                  children: []
                },
                {
                  id: 64,
                  title: '查看网校用户订阅列表',
                  access_id: 34,
                  children: []
                },
                {
                  id: 65,
                  title: '查看网校用户订单列表',
                  access_id: 34,
                  children: []
                },
                {
                  id: 66,
                  title: '查看网校用户观看历史',
                  access_id: 34,
                  children: []
                },
                {
                  id: 68,
                  title: '开启/禁止评论',
                  access_id: 34,
                  children: []
                }
              ]
            },
            {
              id: 35,
              title: '交易模块',
              access_id: 0,
              children: [
                {
                  id: 69,
                  title: '删除订单',
                  access_id: 35,
                  children: []
                },
                {
                  id: 70,
                  title: '新增收款账户',
                  access_id: 35,
                  children: []
                },
                {
                  id: 71,
                  title: '修改收款账户',
                  access_id: 35,
                  children: []
                },
                {
                  id: 72,
                  title: '收款账户列表',
                  access_id: 35,
                  children: []
                },
                {
                  id: 73,
                  title: '删除收款账户',
                  access_id: 35,
                  children: []
                },
                {
                  id: 74,
                  title: '申请提现列表',
                  access_id: 35,
                  children: []
                },
                {
                  id: 75,
                  title: '申请提现',
                  access_id: 35,
                  children: []
                }
              ]
            },
            {
              id: 36,
              title: '营销模块',
              access_id: 0,
              children: [
                {
                  id: 76,
                  title: '添加拼团',
                  access_id: 36,
                  children: []
                },
                {
                  id: 77,
                  title: '更新拼团',
                  access_id: 36,
                  children: []
                },
                {
                  id: 78,
                  title: '上架/下架拼团',
                  access_id: 36,
                  children: []
                },
                {
                  id: 79,
                  title: '拼团列表',
                  access_id: 36,
                  children: []
                },
                {
                  id: 80,
                  title: '添加秒杀',
                  access_id: 36,
                  children: []
                },
                {
                  id: 81,
                  title: '更新秒杀',
                  access_id: 36,
                  children: []
                },
                {
                  id: 82,
                  title: '上架/下架秒杀',
                  access_id: 36,
                  children: []
                },
                {
                  id: 83,
                  title: '秒杀列表',
                  access_id: 36,
                  children: []
                },
                {
                  id: 84,
                  title: '添加优惠券',
                  access_id: 36,
                  children: []
                },
                {
                  id: 85,
                  title: '更新优惠券',
                  access_id: 36,
                  children: []
                },
                {
                  id: 86,
                  title: '上架/下架优惠券',
                  access_id: 36,
                  children: []
                },
                {
                  id: 87,
                  title: '优惠券列表',
                  access_id: 36,
                  children: []
                }
              ]
            },
            {
              id: 38,
              title: '可视化模块',
              access_id: 0,
              children: [
                {
                  id: 122,
                  title: '添加页面',
                  access_id: 38,
                  children: []
                },
                {
                  id: 123,
                  title: '更新页面',
                  access_id: 38,
                  children: []
                },
                {
                  id: 124,
                  title: '删除页面',
                  access_id: 38,
                  children: []
                },
                {
                  id: 125,
                  title: '页面列表',
                  access_id: 38,
                  children: []
                },
                {
                  id: 132,
                  title: '查看页面模板数据',
                  access_id: 38,
                  children: []
                }
              ]
            },
            {
              id: 126,
              title: '公共模块',
              access_id: 0,
              children: [
                {
                  id: 127,
                  title: '上传文件',
                  access_id: 126,
                  children: []
                },
                {
                  id: 131,
                  title: '导入excel',
                  access_id: 126,
                  children: []
                },
                {
                  id: 133,
                  title: '后台首页数据统计',
                  access_id: 126,
                  children: []
                }
              ]
            },
            {
              id: 32,
              title: '课程模块',
              access_id: 0,
              children: [
                {
                  id: 50,
                  title: '上架/下架课程',
                  access_id: 32,
                  children: []
                },
                {
                  id: 51,
                  title: '新增专栏',
                  access_id: 32,
                  children: []
                },
                {
                  id: 52,
                  title: '修改专栏',
                  access_id: 32,
                  children: []
                },
                {
                  id: 55,
                  title: '上架/下架专栏',
                  access_id: 32,
                  children: []
                },
                {
                  id: 46,
                  title: '新增课程',
                  access_id: 32,
                  children: []
                },
                {
                  id: 47,
                  title: '修改课程',
                  access_id: 32,
                  children: []
                },
                {
                  id: 48,
                  title: '课程列表',
                  access_id: 32,
                  children: []
                },
                {
                  id: 49,
                  title: '删除课程',
                  access_id: 32,
                  children: []
                },
                {
                  id: 53,
                  title: '专栏列表',
                  access_id: 32,
                  children: []
                },
                {
                  id: 54,
                  title: '删除专栏',
                  access_id: 32,
                  children: []
                },
                {
                  id: 56,
                  title: '修改专栏更新状态',
                  access_id: 32,
                  children: []
                },
                {
                  id: 57,
                  title: '查看专栏详情',
                  access_id: 32,
                  children: []
                },
                {
                  id: 58,
                  title: '新增专栏目录',
                  access_id: 32,
                  children: []
                },
                {
                  id: 59,
                  title: '查看专栏目录',
                  access_id: 32,
                  children: []
                },
                {
                  id: 60,
                  title: '专栏目录排序',
                  access_id: 32,
                  children: []
                },
                {
                  id: 61,
                  title: '删除专栏目录',
                  access_id: 32,
                  children: []
                }
              ]
            },
            {
              id: 33,
              title: '工具模块',
              access_id: 0,
              children: [
                {
                  id: 88,
                  title: '添加社区',
                  access_id: 33,
                  children: []
                },
                {
                  id: 89,
                  title: '更新社区',
                  access_id: 33,
                  children: []
                },
                {
                  id: 90,
                  title: '显示/隐藏社区',
                  access_id: 33,
                  children: []
                },
                {
                  id: 91,
                  title: '删除社区',
                  access_id: 33,
                  children: []
                },
                {
                  id: 92,
                  title: '社区列表',
                  access_id: 33,
                  children: []
                },
                {
                  id: 93,
                  title: '给社区分配管理员',
                  access_id: 33,
                  children: []
                },
                {
                  id: 94,
                  title: '帖子列表',
                  access_id: 33,
                  children: []
                },
                {
                  id: 95,
                  title: '取消/置顶帖子',
                  access_id: 33,
                  children: []
                },
                {
                  id: 96,
                  title: '删除帖子',
                  access_id: 33,
                  children: []
                },
                {
                  id: 97,
                  title: '帖子评论列表',
                  access_id: 33,
                  children: []
                },
                {
                  id: 98,
                  title: '删除帖子评论',
                  access_id: 33,
                  children: []
                },
                {
                  id: 99,
                  title: '添加题目',
                  access_id: 33,
                  children: []
                },
                {
                  id: 100,
                  title: '更新题目',
                  access_id: 33,
                  children: []
                },
                {
                  id: 101,
                  title: '删除题目',
                  access_id: 33,
                  children: []
                },
                {
                  id: 102,
                  title: '题目列表',
                  access_id: 33,
                  children: []
                },
                {
                  id: 103,
                  title: '添加试卷',
                  access_id: 33,
                  children: []
                },
                {
                  id: 104,
                  title: '更新试卷',
                  access_id: 33,
                  children: []
                },
                {
                  id: 105,
                  title: '删除试卷',
                  access_id: 33,
                  children: []
                },
                {
                  id: 106,
                  title: '试卷列表',
                  access_id: 33,
                  children: []
                },
                {
                  id: 107,
                  title: '考试列表',
                  access_id: 33,
                  children: []
                },
                {
                  id: 108,
                  title: '删除考试',
                  access_id: 33,
                  children: []
                },
                {
                  id: 109,
                  title: '查看考试详情',
                  access_id: 33,
                  children: []
                },
                {
                  id: 110,
                  title: '查看试卷详情',
                  access_id: 33,
                  children: []
                },
                {
                  id: 111,
                  title: '考试阅卷',
                  access_id: 33,
                  children: []
                },
                {
                  id: 112,
                  title: '添加电子书',
                  access_id: 33,
                  children: []
                },
                {
                  id: 113,
                  title: '更新电子书',
                  access_id: 33,
                  children: []
                },
                {
                  id: 114,
                  title: '电子书列表',
                  access_id: 33,
                  children: []
                },
                {
                  id: 115,
                  title: '删除电子书',
                  access_id: 33,
                  children: []
                },
                {
                  id: 116,
                  title: '上架/下架电子书',
                  access_id: 33,
                  children: []
                },
                {
                  id: 117,
                  title: '添加电子书章节',
                  access_id: 33,
                  children: []
                },
                {
                  id: 118,
                  title: '更新电子书章节',
                  access_id: 33,
                  children: []
                },
                {
                  id: 119,
                  title: '删除电子书章节',
                  access_id: 33,
                  children: []
                },
                {
                  id: 120,
                  title: '查看电子书章节列表',
                  access_id: 33,
                  children: []
                },
                {
                  id: 121,
                  title: '电子书章节排序',
                  access_id: 33,
                  children: []
                }
              ]
            },
            {
              id: 37,
              title: '设置模块',
              access_id: 0,
              children: [
                {
                  id: 41,
                  title: '添加员工',
                  access_id: 37,
                  children: []
                },
                {
                  id: 39,
                  title: '角色列表',
                  access_id: 37,
                  children: []
                },
                {
                  id: 40,
                  title: '员工列表',
                  access_id: 37,
                  children: []
                },
                {
                  id: 42,
                  title: '给员工分配角色',
                  access_id: 37,
                  children: []
                },
                {
                  id: 43,
                  title: '删除员工',
                  access_id: 37,
                  children: []
                },
                {
                  id: 44,
                  title: '查看网校详细信息',
                  access_id: 37,
                  children: []
                },
                {
                  id: 45,
                  title: '修改网校名称',
                  access_id: 37,
                  children: []
                }
              ]
            }
          ]
        }
      }
    }
  },
  // 网校列表
  {
    url: '/admin/role',
    type: 'get',
    response: (_) => {
      return {
        code: 20000,
        data: {
          total: 7,
          items: [
            {
              id: 2,
              name: '超级管理员',
              role_id: 'admin',
              desc: '描述',
              status: 1,
              created_time: '2021-02-21T17:23:14.000Z',
              updated_time: '2021-02-21T17:23:14.000Z',
              menus: [
                '可视化',
                '移动端',
                '移动端装修',
                '课程',
                '图文',
                '音频',
                '视频',
                '专栏',
                '专栏详情',
                'PC端',
                'PC端装修',
                '工具',
                '用户',
                '交易',
                '营销',
                '设置',
                '小社群',
                '题库',
                '试卷',
                '组卷',
                '考试管理',
                '订单管理',
                '资产管理',
                '支付设置',
                '拼团',
                '秒杀',
                '优惠券',
                '店铺设置',
                '员工管理',
                '角色管理',
                '小社群帖子列表',
                '电子书',
                '电子书章节管理'
              ],
              accesses: [
                '用户模块',
                '交易模块',
                '营销模块',
                '可视化模块',
                '开启/禁止访问',
                '删除订单',
                '新增收款账户',
                '修改收款账户',
                '收款账户列表',
                '删除收款账户',
                '申请提现列表',
                '申请提现',
                '添加拼团',
                '更新拼团',
                '上架/下架拼团',
                '拼团列表',
                '添加秒杀',
                '更新秒杀',
                '上架/下架秒杀',
                '秒杀列表',
                '添加优惠券',
                '更新优惠券',
                '上架/下架优惠券',
                '优惠券列表',
                '添加页面',
                '更新页面',
                '删除页面',
                '页面列表',
                '公共模块',
                '上传文件',
                '导入excel',
                '查看页面模板数据',
                '后台首页数据统计',
                '课程模块',
                '工具模块',
                '设置模块',
                '添加员工',
                '上架/下架课程',
                '新增专栏',
                '修改专栏',
                '上架/下架专栏',
                '添加社区',
                '角色列表',
                '员工列表',
                '给员工分配角色',
                '删除员工',
                '查看网校详细信息',
                '修改网校名称',
                '新增课程',
                '修改课程',
                '课程列表',
                '删除课程',
                '专栏列表',
                '删除专栏',
                '修改专栏更新状态',
                '查看专栏详情',
                '新增专栏目录',
                '查看专栏目录',
                '专栏目录排序',
                '删除专栏目录',
                '查看网校用户列表',
                '查询网校用户详细信息',
                '查看网校用户订阅列表',
                '查看网校用户订单列表',
                '查看网校用户观看历史',
                '开启/禁止评论',
                '更新社区',
                '显示/隐藏社区',
                '删除社区',
                '社区列表',
                '给社区分配管理员',
                '帖子列表',
                '取消/置顶帖子',
                '删除帖子',
                '帖子评论列表',
                '删除帖子评论',
                '添加题目',
                '更新题目',
                '删除题目',
                '题目列表',
                '添加试卷',
                '更新试卷',
                '删除试卷',
                '试卷列表',
                '考试列表',
                '删除考试',
                '查看考试详情',
                '查看试卷详情',
                '考试阅卷',
                '添加电子书',
                '更新电子书',
                '电子书列表',
                '删除电子书',
                '上架/下架电子书',
                '添加电子书章节',
                '更新电子书章节',
                '删除电子书章节',
                '查看电子书章节列表',
                '电子书章节排序'
              ]
            },
            {
              id: 4,
              name: '运营',
              role_id: 'editor',
              desc: '描述运营',
              status: 1,
              created_time: '2021-02-21T17:36:00.000Z',
              updated_time: '2021-02-21T17:36:00.000Z',
              menus: [],
              accesses: []
            },
            {
              id: 7,
              name: '测试角色',
              role_id: 'test',
              desc: '',
              status: 1,
              created_time: '2021-08-15T18:51:39.000Z',
              updated_time: '2021-08-15T18:51:39.000Z',
              menus: [
                '可视化',
                '移动端',
                '移动端装修',
                'PC端',
                'PC端装修',
                '课程',
                '工具',
                '用户',
                '交易',
                '营销',
                '设置',
                '图文',
                '音频',
                '视频',
                '专栏',
                '专栏详情',
                '小社群',
                '题库',
                '试卷',
                '组卷',
                '考试管理',
                '订单管理',
                '资产管理',
                '支付设置',
                '拼团',
                '秒杀',
                '优惠券',
                '店铺设置',
                '员工管理',
                '角色管理',
                '小社群帖子列表',
                '电子书',
                '电子书章节管理'
              ],
              accesses: [
                '用户模块',
                '开启/禁止访问',
                '后台首页数据统计',
                '课程模块',
                '工具模块',
                '交易模块',
                '营销模块',
                '设置模块',
                '可视化模块',
                '角色列表',
                '员工列表',
                '添加员工',
                '给员工分配角色',
                '删除员工',
                '查看网校详细信息',
                '修改网校名称',
                '新增课程',
                '修改课程',
                '课程列表',
                '删除课程',
                '上架/下架课程',
                '新增专栏',
                '修改专栏',
                '专栏列表',
                '删除专栏',
                '上架/下架专栏',
                '修改专栏更新状态',
                '查看专栏详情',
                '新增专栏目录',
                '查看专栏目录',
                '专栏目录排序',
                '删除专栏目录',
                '查看网校用户列表',
                '查询网校用户详细信息',
                '查看网校用户订阅列表',
                '查看网校用户订单列表',
                '查看网校用户观看历史',
                '开启/禁止评论',
                '删除订单',
                '新增收款账户',
                '修改收款账户',
                '收款账户列表',
                '删除收款账户',
                '申请提现列表',
                '申请提现',
                '添加拼团',
                '更新拼团',
                '上架/下架拼团',
                '拼团列表',
                '添加秒杀',
                '更新秒杀',
                '上架/下架秒杀',
                '秒杀列表',
                '添加优惠券',
                '更新优惠券',
                '上架/下架优惠券',
                '优惠券列表',
                '添加社区',
                '更新社区',
                '显示/隐藏社区',
                '删除社区',
                '社区列表',
                '给社区分配管理员',
                '帖子列表',
                '取消/置顶帖子',
                '删除帖子',
                '帖子评论列表',
                '删除帖子评论',
                '添加题目',
                '更新题目',
                '删除题目',
                '题目列表',
                '添加试卷',
                '更新试卷',
                '删除试卷',
                '试卷列表',
                '考试列表',
                '删除考试',
                '查看考试详情',
                '查看试卷详情',
                '考试阅卷',
                '添加电子书',
                '更新电子书',
                '电子书列表',
                '删除电子书',
                '上架/下架电子书',
                '添加电子书章节',
                '更新电子书章节',
                '删除电子书章节',
                '查看电子书章节列表',
                '电子书章节排序',
                '添加页面',
                '更新页面',
                '删除页面',
                '页面列表',
                '公共模块',
                '上传文件',
                '导入excel',
                '查看页面模板数据'
              ]
            },
            {
              id: 9,
              name: '测试角色2',
              role_id: 'test2',
              desc: '',
              status: 1,
              created_time: '2021-08-15T21:12:55.000Z',
              updated_time: '2021-08-15T21:12:55.000Z',
              menus: [
                '课程',
                '工具',
                '用户',
                '交易',
                '营销',
                '设置',
                '可视化',
                '图文',
                '音频',
                '视频',
                '专栏',
                '专栏详情',
                '小社群',
                '题库',
                '试卷',
                '组卷',
                '考试管理',
                '订单管理',
                '资产管理',
                '支付设置',
                '拼团',
                '秒杀',
                '优惠券',
                '店铺设置',
                '员工管理',
                '角色管理',
                '移动端',
                '移动端装修',
                'PC端',
                'PC端装修',
                '小社群帖子列表',
                '电子书',
                '电子书章节管理'
              ],
              accesses: [
                '交易模块',
                '删除订单',
                '新增收款账户',
                '修改收款账户',
                '收款账户列表',
                '删除收款账户',
                '申请提现列表',
                '申请提现',
                '课程模块',
                '工具模块',
                '用户模块',
                '营销模块',
                '设置模块',
                '可视化模块',
                '角色列表',
                '员工列表',
                '添加员工',
                '给员工分配角色',
                '删除员工',
                '查看网校详细信息',
                '修改网校名称',
                '新增课程',
                '修改课程',
                '课程列表',
                '删除课程',
                '上架/下架课程',
                '新增专栏',
                '修改专栏',
                '专栏列表',
                '删除专栏',
                '上架/下架专栏',
                '修改专栏更新状态',
                '查看专栏详情',
                '新增专栏目录',
                '查看专栏目录',
                '专栏目录排序',
                '删除专栏目录',
                '查看网校用户列表',
                '查询网校用户详细信息',
                '查看网校用户订阅列表',
                '查看网校用户订单列表',
                '查看网校用户观看历史',
                '开启/禁止访问',
                '开启/禁止评论',
                '添加拼团',
                '更新拼团',
                '上架/下架拼团',
                '拼团列表',
                '添加秒杀',
                '更新秒杀',
                '上架/下架秒杀',
                '秒杀列表',
                '添加优惠券',
                '更新优惠券',
                '上架/下架优惠券',
                '优惠券列表',
                '添加社区',
                '更新社区',
                '显示/隐藏社区',
                '删除社区',
                '社区列表',
                '给社区分配管理员',
                '帖子列表',
                '取消/置顶帖子',
                '删除帖子',
                '帖子评论列表',
                '删除帖子评论',
                '添加题目',
                '更新题目',
                '删除题目',
                '题目列表',
                '添加试卷',
                '更新试卷',
                '删除试卷',
                '试卷列表',
                '考试列表',
                '删除考试',
                '查看考试详情',
                '查看试卷详情',
                '考试阅卷',
                '添加电子书',
                '更新电子书',
                '电子书列表',
                '删除电子书',
                '上架/下架电子书',
                '添加电子书章节',
                '更新电子书章节',
                '删除电子书章节',
                '查看电子书章节列表',
                '电子书章节排序',
                '添加页面',
                '更新页面',
                '删除页面',
                '页面列表',
                '公共模块',
                '上传文件',
                '导入excel',
                '查看页面模板数据',
                '后台首页数据统计'
              ]
            },
            {
              id: 10,
              name: '课程模块',
              role_id: 'course',
              desc: '只显示课程模块',
              status: 1,
              created_time: '2021-08-28T01:50:58.000Z',
              updated_time: '2021-08-28T01:51:28.000Z',
              menus: [
                '课程',
                '工具',
                '用户',
                '交易',
                '营销',
                '设置',
                '可视化',
                '图文',
                '音频',
                '视频',
                '专栏',
                '专栏详情',
                '小社群',
                '题库',
                '试卷',
                '组卷',
                '考试管理',
                '订单管理',
                '资产管理',
                '支付设置',
                '拼团',
                '秒杀',
                '优惠券',
                '店铺设置',
                '员工管理',
                '角色管理',
                '移动端',
                '移动端装修',
                'PC端',
                'PC端装修',
                '小社群帖子列表',
                '电子书',
                '电子书章节管理'
              ],
              accesses: [
                '课程模块',
                '工具模块',
                '用户模块',
                '交易模块',
                '营销模块',
                '设置模块',
                '可视化模块',
                '角色列表',
                '员工列表',
                '添加员工',
                '给员工分配角色',
                '删除员工',
                '查看网校详细信息',
                '修改网校名称',
                '新增课程',
                '修改课程',
                '课程列表',
                '删除课程',
                '上架/下架课程',
                '新增专栏',
                '修改专栏',
                '专栏列表',
                '删除专栏',
                '上架/下架专栏',
                '修改专栏更新状态',
                '查看专栏详情',
                '新增专栏目录',
                '查看专栏目录',
                '专栏目录排序',
                '删除专栏目录',
                '查看网校用户列表',
                '查询网校用户详细信息',
                '查看网校用户订阅列表',
                '查看网校用户订单列表',
                '查看网校用户观看历史',
                '开启/禁止访问',
                '开启/禁止评论',
                '删除订单',
                '新增收款账户',
                '修改收款账户',
                '收款账户列表',
                '删除收款账户',
                '申请提现列表',
                '申请提现',
                '添加拼团',
                '更新拼团',
                '上架/下架拼团',
                '拼团列表',
                '添加秒杀',
                '更新秒杀',
                '上架/下架秒杀',
                '秒杀列表',
                '添加优惠券',
                '更新优惠券',
                '上架/下架优惠券',
                '优惠券列表',
                '添加社区',
                '更新社区',
                '显示/隐藏社区',
                '删除社区',
                '社区列表',
                '给社区分配管理员',
                '帖子列表',
                '取消/置顶帖子',
                '删除帖子',
                '帖子评论列表',
                '删除帖子评论',
                '添加题目',
                '更新题目',
                '删除题目',
                '题目列表',
                '添加试卷',
                '更新试卷',
                '删除试卷',
                '试卷列表',
                '考试列表',
                '删除考试',
                '查看考试详情',
                '查看试卷详情',
                '考试阅卷',
                '添加电子书',
                '更新电子书',
                '电子书列表',
                '删除电子书',
                '上架/下架电子书',
                '添加电子书章节',
                '更新电子书章节',
                '删除电子书章节',
                '查看电子书章节列表',
                '电子书章节排序',
                '添加页面',
                '更新页面',
                '删除页面',
                '页面列表',
                '公共模块',
                '上传文件',
                '导入excel',
                '查看页面模板数据',
                '后台首页数据统计'
              ]
            },
            {
              id: 19,
              name: '04172912_1',
              role_id: '个人测试用户',
              desc: '测试',
              status: 1,
              created_time: '2022-02-14T01:03:28.000Z',
              updated_time: '2022-02-14T01:03:28.000Z',
              menus: [
                '课程',
                '工具',
                '用户',
                '交易',
                '营销',
                '设置',
                '可视化',
                '图文',
                '音频',
                '视频',
                '专栏',
                '专栏详情',
                '小社群',
                '题库',
                '试卷',
                '组卷',
                '考试管理',
                '订单管理',
                '资产管理',
                '支付设置',
                '拼团',
                '秒杀',
                '优惠券',
                '店铺设置',
                '员工管理',
                '角色管理',
                '移动端',
                '移动端装修',
                'PC端',
                'PC端装修',
                '小社群帖子列表',
                '电子书',
                '电子书章节管理'
              ],
              accesses: [
                '课程模块',
                '工具模块',
                '用户模块',
                '交易模块',
                '营销模块',
                '设置模块',
                '可视化模块',
                '角色列表',
                '员工列表',
                '添加员工',
                '给员工分配角色',
                '删除员工',
                '查看网校详细信息',
                '修改网校名称',
                '新增课程',
                '修改课程',
                '课程列表',
                '删除课程',
                '上架/下架课程',
                '新增专栏',
                '修改专栏',
                '专栏列表',
                '删除专栏',
                '上架/下架专栏',
                '修改专栏更新状态',
                '查看专栏详情',
                '新增专栏目录',
                '查看专栏目录',
                '专栏目录排序',
                '删除专栏目录',
                '查看网校用户列表',
                '查询网校用户详细信息',
                '查看网校用户订阅列表',
                '查看网校用户订单列表',
                '查看网校用户观看历史',
                '开启/禁止访问',
                '开启/禁止评论',
                '删除订单',
                '新增收款账户',
                '修改收款账户',
                '收款账户列表',
                '删除收款账户',
                '申请提现列表',
                '申请提现',
                '添加拼团',
                '更新拼团',
                '上架/下架拼团',
                '拼团列表',
                '添加秒杀',
                '更新秒杀',
                '上架/下架秒杀',
                '秒杀列表',
                '添加优惠券',
                '更新优惠券',
                '上架/下架优惠券',
                '优惠券列表',
                '添加社区',
                '更新社区',
                '显示/隐藏社区',
                '删除社区',
                '社区列表',
                '给社区分配管理员',
                '帖子列表',
                '取消/置顶帖子',
                '删除帖子',
                '帖子评论列表',
                '删除帖子评论',
                '添加题目',
                '更新题目',
                '删除题目',
                '题目列表',
                '添加试卷',
                '更新试卷',
                '删除试卷',
                '试卷列表',
                '考试列表',
                '删除考试',
                '查看考试详情',
                '查看试卷详情',
                '考试阅卷',
                '添加电子书',
                '更新电子书',
                '电子书列表',
                '删除电子书',
                '上架/下架电子书',
                '添加电子书章节',
                '更新电子书章节',
                '删除电子书章节',
                '查看电子书章节列表',
                '电子书章节排序',
                '添加页面',
                '更新页面',
                '删除页面',
                '页面列表',
                '公共模块',
                '上传文件',
                '导入excel',
                '查看页面模板数据',
                '后台首页数据统计'
              ]
            },
            {
              id: 21,
              name: '小鱼',
              role_id: '小鱼',
              desc: '小鱼',
              status: 1,
              created_time: '2022-02-15T09:34:26.000Z',
              updated_time: '2022-02-15T09:34:26.000Z',
              menus: [
                '课程',
                '图文',
                '音频',
                '视频',
                '专栏',
                '专栏详情',
                '小社群',
                '题库',
                '试卷',
                '组卷',
                '考试管理',
                '订单管理',
                '资产管理',
                '支付设置',
                '拼团',
                '秒杀',
                '优惠券',
                '店铺设置',
                '员工管理',
                '角色管理',
                '移动端',
                '移动端装修',
                'PC端',
                'PC端装修',
                '小社群帖子列表',
                '电子书',
                '电子书章节管理'
              ],
              accesses: [
                '课程模块',
                '角色列表',
                '员工列表',
                '添加员工',
                '给员工分配角色',
                '删除员工',
                '查看网校详细信息',
                '修改网校名称',
                '新增课程',
                '修改课程',
                '课程列表',
                '删除课程',
                '上架/下架课程',
                '新增专栏',
                '修改专栏',
                '专栏列表',
                '删除专栏',
                '上架/下架专栏',
                '修改专栏更新状态',
                '查看专栏详情',
                '新增专栏目录',
                '查看专栏目录',
                '专栏目录排序',
                '删除专栏目录',
                '查看网校用户列表',
                '查询网校用户详细信息',
                '查看网校用户订阅列表',
                '查看网校用户订单列表',
                '查看网校用户观看历史',
                '开启/禁止访问',
                '开启/禁止评论',
                '删除订单',
                '新增收款账户',
                '修改收款账户',
                '收款账户列表',
                '删除收款账户',
                '申请提现列表',
                '申请提现',
                '添加拼团',
                '更新拼团',
                '上架/下架拼团',
                '拼团列表',
                '添加秒杀',
                '更新秒杀',
                '上架/下架秒杀',
                '秒杀列表',
                '添加优惠券',
                '更新优惠券',
                '上架/下架优惠券',
                '优惠券列表',
                '添加社区',
                '更新社区',
                '显示/隐藏社区',
                '删除社区',
                '社区列表',
                '给社区分配管理员',
                '帖子列表',
                '取消/置顶帖子',
                '删除帖子',
                '帖子评论列表',
                '删除帖子评论',
                '添加题目',
                '更新题目',
                '删除题目',
                '题目列表',
                '添加试卷',
                '更新试卷',
                '删除试卷',
                '试卷列表',
                '考试列表',
                '删除考试',
                '查看考试详情',
                '查看试卷详情',
                '考试阅卷',
                '添加电子书',
                '更新电子书',
                '电子书列表',
                '删除电子书',
                '上架/下架电子书',
                '添加电子书章节',
                '更新电子书章节',
                '删除电子书章节',
                '查看电子书章节列表',
                '电子书章节排序',
                '添加页面',
                '更新页面',
                '删除页面',
                '页面列表',
                '上传文件',
                '导入excel',
                '查看页面模板数据',
                '后台首页数据统计'
              ]
            }
          ]
        }
      }
    }
  }
]
