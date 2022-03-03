import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/school_select',
    meta: { title: '选择网校', icon: 'tree-table' },
    component: () => import('@/views/school/index')
  },
  {
    path: '/',
    component: Layout,
    redirect: { name: 'Dashboard' },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '概览', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/course',
    name: 'Course',
    component: Layout,
    redirect: '/course/media', // 重定向地址，在面包屑中点击会重定向去的地址
    alwaysShow: true, // 一直显示根路由
    meta: {
      icon: 'el-icon-s-management',
      title: '课程',
      roles: ['admin', 'editor']
    }, // 你可以在根路由设置权限，这样它下面所有的子路由都继承了这个权限
    children: [
      {
        path: 'media',
        component: () => import('@/views/course/media.vue'),
        name: 'Media',
        meta: {
          title: '图文'
        }
      },
      {
        path: 'video',
        component: () => import('@/views/course/video.vue'),
        name: 'Video',
        meta: {
          title: '视频'
        }
      },
      {
        path: 'column',
        component: () => import('@/views/course/column.vue'),
        name: 'Column',
        meta: {
          title: '专栏'
        }
      },
      {
        path: 'audio',
        component: () => import('@/views/course/audio.vue'),
        name: 'Audio',
        meta: {
          title: '音频'
        }
      },
      {
        path: 'column_detail',
        hidden: true,
        component: () => import('@/views/course/column_detail.vue'),
        name: 'ColumnDetail',
        meta: {
          title: '专栏详情',
          activeMenu: '/course/column'
        }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: { name: 'User' }, // 重定向地址，在面包屑中点击会重定向去的地址
    children: [
      {
        path: 'user',
        name: 'User',
        meta: {
          icon: 'el-icon-user-solid',
          title: '用户',
          roles: ['admin', 'editor']
        },
        component: () => import('@/views/user')
      }
    ]
  },
  {
    path: '/pay',
    component: Layout,
    name: 'Pay',
    meta: { title: '交易', icon: 'el-icon-s-finance' },
    redirect: { name: 'Order' }, // 重定向地址，在面包屑中点击会重定向去的地址
    children: [
      {
        path: 'order',
        name: 'Order',
        meta: {
          title: '订单管理',
          roles: ['admin', 'editor']
        },
        component: () => import('@/views/pay/order.vue')
      },
      {
        path: 'assets',
        name: 'Assets',
        meta: {
          title: '资产管理',
          roles: ['admin', 'editor']
        },
        component: () => import('@/views/pay/assets.vue')
      },
      {
        path: 'payment',
        name: 'Payment',
        meta: {
          title: '支付设置',
          roles: ['admin', 'editor']
        },
        component: () => import('@/views/pay/payment.vue')
      }
    ]
  },
  {
    path: '/renovation',
    component: Layout,
    name: 'Renovation',
    meta: { title: '可视化', icon: 'el-icon-s-open' },
    redirect: { name: 'MobileIndex' }, // 重定向地址，在面包屑中点击会重定向去的地址
    children: [
      {
        path: 'mobile',
        name: 'MobileIndex',
        meta: {
          title: '移动端',
          roles: ['admin', 'editor']
        },
        component: () => import('@/views/renovation/mobile/index.vue')
      },
      {
        path: 'mobile/edit/:id',
        name: 'MobileEdit',
        hidden: true,
        meta: {
          title: '移动端装修',
          roles: ['admin', 'editor']
        },
        component: () => import('@/views/renovation/mobile/edit.vue')
      },
      {
        path: 'pc',
        name: 'PcIndex',
        meta: {
          title: 'PC端',
          roles: ['admin', 'editor']
        },
        component: () => import('@/views/renovation/pc/index.vue')
      },
      {
        path: 'pc/edit/:id',
        name: 'PcEdit',
        hidden: true,
        meta: {
          title: 'PC端装修',
          roles: ['admin', 'editor']
        },
        component: () => import('@/views/renovation/pc/edit.vue')
      }
    ]
  },
  {
    path: '/marketing',
    component: Layout,
    name: 'Marketing',
    meta: { title: '营销', icon: 'el-icon-s-order' },
    redirect: { name: 'Group' }, // 重定向地址，在面包屑中点击会重定向去的地址
    children: [
      {
        path: 'group',
        name: 'Group',
        meta: {
          title: '拼团',
          roles: ['admin', 'editor']
        },
        component: () => import('@/views/marketing/group.vue')
      },
      {
        path: 'flashsale',
        name: 'Flashsale',
        meta: {
          title: '秒杀',
          roles: ['admin', 'editor']
        },
        component: () => import('@/views/marketing/flashsale.vue')
      },
      {
        path: 'coupon',
        name: 'Coupon',
        meta: {
          title: '优惠券',
          roles: ['admin', 'editor']
        },
        component: () => import('@/views/marketing/coupon.vue')
      }
    ]
  },
  {
    path: '/tool',
    name: 'Tool',
    component: Layout,
    meta: { title: '工具', icon: 'el-icon-s-platform' },
    redirect: { name: 'Bbs' }, // 重定向地址，在面包屑中点击会重定向去的地址
    children: [
      {
        path: 'bbs',
        name: 'Bbs',
        meta: {
          title: '小社群',
          roles: ['admin', 'editor']
        },
        component: () => import('@/views/tool/bbs/bbs.vue')
      },
      {
        path: 'bbs_post/:id',
        name: 'BbsPost',
        hidden: true,
        meta: {
          title: '小社群帖子列表',
          roles: ['admin', 'editor'],
          activeMenu: '/tool/bbs'
        },
        component: () => import('@/views/tool/bbs/bbs-post.vue')
      },
      {
        path: 'question',
        name: 'Question',
        meta: {
          title: '题库',
          roles: ['admin', 'editor']
        },
        component: () => import('@/views/tool/question.vue')
      },
      {
        path: 'testpaper',
        name: 'Testpaper',
        meta: {
          title: '试卷',
          roles: ['admin', 'editor']
        },
        component: () => import('@/views/tool/testpaper/index.vue')
      },
      {
        path: 'testpaper_form',
        name: 'TestpaperForm',
        hidden: true,
        meta: {
          title: '组卷',
          roles: ['admin', 'editor'],
          activeMenu: '/tool/testpaper'
        },
        component: () => import('@/views/tool/testpaper/testpaper_form.vue')
      },
      {
        path: 'testpaper_manage',
        name: 'TestpaperTest',
        hidden: true,
        meta: {
          title: '考试管理',
          roles: ['admin', 'editor'],
          activeMenu: '/tool/testpaper'
        },
        component: () => import('@/views/tool/testpaper/testpaper_manage.vue')
      },
      {
        path: 'book',
        name: 'Book',
        meta: {
          title: '电子书',
          roles: ['admin', 'editor']
        },
        component: () => import('@/views/tool/book/index.vue')
      },
      {
        path: 'book_detail/:id',
        name: 'BookDetail',
        hidden: true,
        meta: {
          title: '电子书章节管理',
          roles: ['admin', 'editor'],
          activeMenu: '/tool/book'
        },
        component: () => import('@/views/tool/book/book-detail.vue')
      }
    ]
  },
  // setting
  {
    path: '/setting',
    component: Layout,
    name: 'Setting',
    meta: { title: '员工设置', icon: 'el-icon-setting' },
    redirect: { name: 'SettingIndex' }, // 重定向地址，在面包屑中点击会重定向去的地址
    children: [
      {
        path: 'setting_index',
        name: 'SettingIndex',
        meta: {
          title: '店铺设置',
          roles: ['admin', 'editor']
        },
        component: () => import('@/views/setting/setting_index.vue')
      },
      {
        path: 'staffs',
        name: 'Staffs',
        meta: {
          title: '员工管理',
          roles: ['admin', 'editor']
        },
        component: () => import('@/views/setting/staffs.vue')
      },
      {
        path: 'role',
        name: 'Role',
        meta: {
          title: '角色管理',
          roles: ['admin', 'editor']
        },
        component: () => import('@/views/setting/role.vue')
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
