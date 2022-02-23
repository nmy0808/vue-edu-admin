import request from '@/utils/request'
// ----- 拼团 --------
/**
 * 拼团列表
 */
export function getGroupListApi(page) {
  return request({
    url: '/admin/s/group',
    method: 'get',
    params: { page }
  })
}
/**
 * 更新拼团
 */
export function updateGroupApi({
  id,
  type, // 类型：course课程，column专栏
  goods_id, // 课程/专栏id
  price,
  p_num, // 成团人数
  auto, // 自动成团：0否1是
  expire, // 拼团时间
  status, // 状态：0禁用1启用
  start_time,
  end_time
}) {
  return request({
    url: '/admin/s/group/update',
    method: 'post',
    data: {
      id,
      type,
      goods_id,
      price,
      p_num,
      auto,
      expire,
      status,
      start_time,
      end_time
    }
  })
}
/**
 * 新增拼团
 */
export function addGroupApi({
  type, // 类型：course课程，column专栏
  goods_id, // 课程/专栏id
  price,
  p_num, // 成团人数
  auto, // 自动成团：0否1是
  expire, // 拼团时间
  status, // 状态：0禁用1启用
  start_time,
  end_time
}) {
  return request({
    url: '/admin/s/group/save',
    method: 'post',
    data: {
      type,
      goods_id,
      price,
      p_num,
      auto,
      expire,
      status,
      start_time,
      end_time
    }
  })
}
/**
 * 上架/下架拼团
 * 状态：0禁用1启用
 */
export function setGroupStatusApi({ id, status }) {
  return request({
    url: '/admin/s/group/updatestatus',
    method: 'post',
    data: {
      id,
      status
    }
  })
}
// ----- 秒杀 --------
export function getFlashsaleListApi(page) {
  return request({
    url: '/admin/s/flashsale',
    method: 'get',
    params: { page }
  })
}
/**
 * 更新拼团
 */
export function updateFlashsaleApi({
  id,
  type, // 类型：course课程，column专栏
  goods_id, // 课程/专栏id
  price,
  s_num, // 秒杀人数
  status, // 状态：0禁用1启用
  start_time,
  end_time
}) {
  return request({
    url: '/admin/s/flashsale/update',
    method: 'post',
    data: {
      id,
      type,
      goods_id,
      price,
      s_num,
      status,
      start_time,
      end_time
    }
  })
}
/**
 * 新增拼团
 */
export function addFlashsaleApi({
  type, // 类型：course课程，column专栏
  goods_id, // 课程/专栏id
  price,
  s_num, // 秒杀人数
  status, // 状态：0禁用1启用
  start_time,
  end_time
}) {
  return request({
    url: '/admin/s/flashsale/save',
    method: 'post',
    data: {
      type,
      goods_id,
      price,
      s_num,
      status,
      start_time,
      end_time
    }
  })
}
/**
 * 上架/下架拼团
 * 状态：0禁用1启用
 */
export function setFlashsaleStatusApi({ id, status }) {
  return request({
    url: '/admin/s/flashsale/updatestatus',
    method: 'post',
    data: {
      id,
      status
    }
  })
}
// ----- 优惠券 --------

