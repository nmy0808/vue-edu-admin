import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 过滤有效路由
 * @param routes asyncRoutes
 * @param menus
 */
function filterAsyncRoutes(routes, menus) {
  const res = []
  routes.forEach(r => {
    menus.forEach(m => {
      const rName = r.name
      const mName = m.name
      if (rName === mName) {
        res.push(r)
        if (r.children && r.children.length > 0) {
          const list = filterAsyncRoutes(r.children, m.children)
          r.children = list
        }
      }
    })
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, menus) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, menus)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
