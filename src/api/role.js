import request from '@/utils/request'

// export function getRoutes() {
//   return request({
//     url: '/vue-element-admin/routes',
//     method: 'get'
//   })
// }

// export function getRoles() {
//   return request({
//     url: '/vue-element-admin/roles',
//     method: 'get'
//   })
// }

// export function addRole(data) {
//   return request({
//     url: '/vue-element-admin/role',
//     method: 'post',
//     data
//   })
// }

// export function updateRole(id, data) {
//   return request({
//     url: `/vue-element-admin/role/${id}`,
//     method: 'put',
//     data
//   })
// }

// export function deleteRole(id) {
//   return request({
//     url: `/vue-element-admin/role/${id}`,
//     method: 'delete'
//   })
// }

/**
 * 角色列表
 */
export function getRoleListApi(page) {
  return request({
    url: '/admin/role',
    method: 'get',
    params: { page }
  })
}
/**
 * 查看角色权限
 */
export function getRolePermissionApi(id) {
  return request({
    url: '/admin/role/read',
    method: 'get',
    params: { id }
  })
}
/**
 * 添加
 */
export function addRoleApi({ name, role_id, status, desc }) {
  return request({
    url: '/platform/role/save',
    method: 'post',
    data: { name, role_id, status, desc }
  })
}
/**
 * 删除
 */
export function deleteRoleByIdApi(ids) {
  return request({
    url: '/platform/role/delete',
    method: 'post',
    data: { ids }
  })
}
/**
 * 修改角色权限
 */
export function updateRoleByIdApi({ id, name, role_id, status, desc }) {
  return request({
    url: '/platform/role/update',
    method: 'post',
    data: { id, name, role_id, status, desc }
  })
}
/**
 * 获取对应角色的权限列表
 */
export function getRoleListByIdApi(id) {
  return request({
    url: '/platform/role/read',
    method: 'get',
    params: { id }
  })
}
/**
 * 获取权限列表
 * 类型：rule权限，menu菜单
 */
export function getRoleListByTypeApi(type) {
  return request({
    url: '/platform/access',
    method: 'get',
    params: { type }
  })
}
/**
 * 给角色设置权限
 * 类型：rule权限，menu菜单
 */
export function setPermissionsToRolesApi({ role_id, access_ids }) {
  return request({
    url: '/platform/role/setrules',
    method: 'post',
    data: { role_id, access_ids }
  })
}
